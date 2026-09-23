import math
import logging
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from models import MetalRate, MetalRateHistory
from mjdta_scraper import get_mjdta_rates, ScraperError

logger = logging.getLogger(__name__)


def validate_rates(data: dict) -> bool:
    """
    Validates that the scraped rate data contains valid positive numeric values
    for silver and gold22k.
    """
    if not isinstance(data, dict):
        logger.warning("Validation failed: input data is not a dictionary")
        return False

    for metal_key in ["silver", "gold22k"]:
        val = data.get(metal_key)
        if val is None:
            logger.warning("Validation failed: %s is missing", metal_key)
            return False
        
        # Must be float or int and not boolean
        if isinstance(val, bool) or not isinstance(val, (int, float)):
            logger.warning("Validation failed: %s value %s is not numeric", metal_key, val)
            return False

        if math.isnan(val) or math.isinf(val):
            logger.warning("Validation failed: %s value is NaN or Inf", metal_key)
            return False

        if val <= 0:
            logger.warning("Validation failed: %s value %s is <= 0", metal_key, val)
            return False

    return True


def fetch_and_update_rates(db: Session) -> dict:
    """
    Triggers MJDTA scraper, validates the extracted rates,
    saves successful values to database, and records execution history.
    
    If scrape/validation fails:
    - Preserves previous successful database rates.
    - Creates a failed history log.
    """
    now = datetime.now(timezone.utc)
    logger.info("Starting MJDTA rate update cycle...")

    try:
        scraped_data = get_mjdta_rates()
    except Exception as e:
        error_msg = f"Scraper error: {str(e)}"
        logger.error(error_msg)
        _log_failed_history(db, now, error_msg)
        return _build_response_from_db(db, status="error", error_detail=error_msg)

    if not validate_rates(scraped_data):
        error_msg = f"Invalid scraped rate data: {scraped_data}"
        logger.error(error_msg)
        _log_failed_history(db, now, error_msg)
        return _build_response_from_db(db, status="validation_failed", error_detail=error_msg)

    # Save to metal_rates & metal_rate_history
    try:
        silver_val = scraped_data["silver"]
        gold22k_val = scraped_data["gold22k"]
        unit = scraped_data.get("unit", "INR/gram")
        source = scraped_data.get("source", "MJDTA")

        # 1. Upsert silver
        _upsert_metal_rate(db, metal="silver", rate=silver_val, unit=unit, source=source, updated_at=now)
        _add_history(db, metal="silver", rate=silver_val, unit=unit, source=source, fetched_at=now, status="success")

        # 2. Upsert gold22k
        _upsert_metal_rate(db, metal="gold22k", rate=gold22k_val, unit=unit, source=source, updated_at=now)
        _add_history(db, metal="gold22k", rate=gold22k_val, unit=unit, source=source, fetched_at=now, status="success")

        db.commit()
        logger.info("Database updated successfully with latest MJDTA rates.")

        return {
            "silver": silver_val,
            "gold22k": gold22k_val,
            "unit": unit,
            "source": source,
            "updatedAt": now.isoformat(),
            "status": "success"
        }
    except Exception as e:
        db.rollback()
        error_msg = f"Database update error: {str(e)}"
        logger.error(error_msg)
        _log_failed_history(db, now, error_msg)
        return _build_response_from_db(db, status="database_error", error_detail=error_msg)


def get_current_rates(db: Session) -> dict:
    """
    Reads the latest stored rate from database without performing live scraping.
    If database is empty, performs an initial scrape & store.
    """
    silver_record = db.query(MetalRate).filter(MetalRate.metal == "silver").first()
    gold_record = db.query(MetalRate).filter(MetalRate.metal == "gold22k").first()

    if not silver_record or not gold_record:
        logger.info("No rate records found in database. Performing initial scrape...")
        return fetch_and_update_rates(db)

    # Check latest history entry status
    latest_history = db.query(MetalRateHistory).order_by(MetalRateHistory.fetched_at.desc()).first()
    overall_status = "success"
    if latest_history and latest_history.status != "success":
        overall_status = "stale_last_fetch_failed"

    return {
        "silver": silver_record.rate,
        "gold22k": gold_record.rate,
        "unit": silver_record.unit,
        "source": silver_record.source,
        "updatedAt": silver_record.updated_at.isoformat(),
        "status": overall_status
    }


def _upsert_metal_rate(db: Session, metal: str, rate: float, unit: str, source: str, updated_at: datetime):
    record = db.query(MetalRate).filter(MetalRate.metal == metal).first()
    if record:
        record.rate = rate
        record.unit = unit
        record.source = source
        record.updated_at = updated_at
    else:
        record = MetalRate(
            metal=metal,
            rate=rate,
            unit=unit,
            source=source,
            updated_at=updated_at
        )
        db.add(record)


def _add_history(db: Session, metal: str, rate: float, unit: str, source: str, fetched_at: datetime, status: str, error_message: str = None):
    history_item = MetalRateHistory(
        metal=metal,
        rate=rate,
        unit=unit,
        source=source,
        fetched_at=fetched_at,
        status=status,
        error_message=error_message
    )
    db.add(history_item)


def _log_failed_history(db: Session, fetched_at: datetime, error_msg: str):
    try:
        _add_history(db, metal="silver", rate=None, unit="INR/gram", source="MJDTA", fetched_at=fetched_at, status="failed", error_message=error_msg[:250])
        _add_history(db, metal="gold22k", rate=None, unit="INR/gram", source="MJDTA", fetched_at=fetched_at, status="failed", error_message=error_msg[:250])
        db.commit()
    except Exception as e:
        db.rollback()
        logger.error("Failed to write failure history log: %s", str(e))


def _build_response_from_db(db: Session, status: str, error_detail: str) -> dict:
    silver_record = db.query(MetalRate).filter(MetalRate.metal == "silver").first()
    gold_record = db.query(MetalRate).filter(MetalRate.metal == "gold22k").first()

    if silver_record and gold_record:
        return {
            "silver": silver_record.rate,
            "gold22k": gold_record.rate,
            "unit": silver_record.unit,
            "source": silver_record.source,
            "updatedAt": silver_record.updated_at.isoformat(),
            "status": status,
            "error": error_detail
        }

    return {
        "silver": None,
        "gold22k": None,
        "unit": "INR/gram",
        "source": "MJDTA",
        "updatedAt": None,
        "status": status,
        "error": error_detail
    }
