import os
import logging
from dotenv import load_dotenv
try:
    from zoneinfo import ZoneInfo
except ImportError:
    from pytz import timezone as ZoneInfo
from apscheduler.schedulers.background import BackgroundScheduler
from database import SessionLocal
from rate_service import fetch_and_update_rates


load_dotenv()

logger = logging.getLogger(__name__)

scheduler = None


def scheduled_rate_update_job():
    """Scheduled job task that runs MJDTA rate scraping and database updates."""
    logger.info("Executing scheduled MJDTA rate update job...")
    db = SessionLocal()
    try:
        result = fetch_and_update_rates(db)
        logger.info("Scheduled rate update job result: status=%s, silver=%s, gold22k=%s",
                    result.get("status"), result.get("silver"), result.get("gold22k"))
    except Exception as e:
        logger.error("Error executing scheduled rate update job: %s", str(e))
    finally:
        db.close()


def start_scheduler():
    """Initializes and starts the APScheduler instance with Kolkata timezone triggers."""
    global scheduler

    if scheduler and scheduler.running:
        logger.warning("Scheduler is already running.")
        return scheduler

    tz_name = os.getenv("TIMEZONE", "Asia/Kolkata")
    h1 = int(os.getenv("RATE_UPDATE_HOUR_1", "9"))
    m1 = int(os.getenv("RATE_UPDATE_MINUTE_1", "35"))
    h2 = int(os.getenv("RATE_UPDATE_HOUR_2", "15"))
    m2 = int(os.getenv("RATE_UPDATE_MINUTE_2", "35"))

    try:
        tz = ZoneInfo(tz_name)
    except Exception as e:
        logger.error("Failed to parse timezone %s: %s", tz_name, str(e))
        tz = ZoneInfo("UTC")


    scheduler = BackgroundScheduler(timezone=tz)

    # Schedule 1: 09:35 AM IST
    scheduler.add_job(
        scheduled_rate_update_job,
        trigger="cron",
        hour=h1,
        minute=m1,
        id="mjdta_morning_update",
        replace_existing=True
    )

    # Schedule 2: 03:35 PM IST (15:35 IST)
    scheduler.add_job(
        scheduled_rate_update_job,
        trigger="cron",
        hour=h2,
        minute=m2,
        id="mjdta_afternoon_update",
        replace_existing=True
    )

    scheduler.start()
    logger.info("APScheduler started successfully (Timezone: %s). Scheduled jobs at %02d:%02d and %02d:%02d.",
                tz_name, h1, m1, h2, m2)
    return scheduler


def shutdown_scheduler():
    """Shuts down the APScheduler instance if running."""
    global scheduler
    if scheduler and scheduler.running:
        scheduler.shutdown(wait=False)
        logger.info("APScheduler shut down successfully.")
