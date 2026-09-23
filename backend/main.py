import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException, Header, Security, Response
from fastapi.security import APIKeyHeader
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session


from database import init_db, get_db
from rate_service import get_current_rates, fetch_and_update_rates
from scheduler import start_scheduler, shutdown_scheduler

logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] %(levelname)s [%(name)s]: %(message)s"
)
logger = logging.getLogger("main")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup sequence
    logger.info("Initializing Sri Bhagavathi Silvers Rate API service...")
    init_db()

    enable_scheduler = os.getenv("ENABLE_SCHEDULER", "true").lower() == "true"
    if enable_scheduler:
        logger.info("Starting background scheduler...")
        start_scheduler()
    else:
        logger.info("Background scheduler is disabled via ENABLE_SCHEDULER flag.")

    yield

    # Shutdown sequence
    logger.info("Shutting down Sri Bhagavathi Silvers Rate API service...")
    if enable_scheduler:
        shutdown_scheduler()


app = FastAPI(
    title="Sri Bhagavathi Silvers Rate API",
    description="Automated MJDTA Silver & Gold Rate API with PostgreSQL storage and background scheduler",
    version="2.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)


def verify_admin_key(x_api_key: str = Security(api_key_header)):
    """Verifies that the caller provided the correct admin API key."""
    expected_key = os.getenv("RATE_ADMIN_API_KEY", "sri_bhagavathi_admin_secret_key_2026")
    if not x_api_key or x_api_key != expected_key:
        raise HTTPException(
            status_code=401,
            detail="Unauthorized: Invalid or missing X-API-Key header"
        )
    return x_api_key


@app.get("/favicon.ico", include_in_schema=False)
def favicon():
    return Response(status_code=204)



@app.get("/")
def home():

    return {
        "message": "Sri Bhagavathi Silvers Rate API",
        "status": "online",
        "documentation": "/docs"
    }


@app.get("/rates")
def get_rates(db: Session = Depends(get_db)):
    """
    Returns the latest metal rates stored in database.
    Does NOT perform live scraping on customer request.
    """
    return get_current_rates(db)


@app.post("/admin/rates/update")
def trigger_manual_rate_update(
    db: Session = Depends(get_db),
    api_key: str = Depends(verify_admin_key)
):
    """
    Admin-only endpoint for manually triggering an MJDTA rate scrape & database update.
    Requires header: 'X-API-Key: <RATE_ADMIN_API_KEY>'
    """
    logger.info("Manual rate update triggered via admin API endpoint.")
    result = fetch_and_update_rates(db)
    return result


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)