import requests
import re
import logging
import sys
from bs4 import BeautifulSoup

logging.basicConfig(level=logging.INFO, format="[%(asctime)s] %(levelname)s: %(message)s")
logger = logging.getLogger(__name__)

URL = "https://www.thejewellersassociation.org/"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}


class ScraperError(Exception):
    """Custom exception raised when MJDTA scraper fails to fetch or parse rates."""
    pass


def get_mjdta_rates() -> dict:
    """
    Fetches the latest metal rates from the MJDTA website.
    
    Returns:
        dict: {
            "gold22k": float,
            "silver": float,
            "source": "MJDTA",
            "unit": "INR/gram"
        }
        
    Raises:
        ScraperError: If website fetch fails or parsing fails.
    """
    logger.info("Fetching MJDTA rates from %s", URL)
    try:
        response = requests.get(URL, headers=HEADERS, timeout=20)
        response.raise_for_status()
    except Exception as e:
        logger.error("Failed to connect to MJDTA website: %s", str(e))
        raise ScraperError(f"HTTP request to MJDTA failed: {e}") from e

    soup = BeautifulSoup(response.text, "html.parser")
    text = soup.get_text(" ", strip=True)

    # Regex search for 22K Gold & Silver
    gold22_match = re.search(r"1\s*Gm\s*Gold\s*22Kt\s*([\d,]+(?:\.\d+)?)", text, re.IGNORECASE)
    silver_match = re.search(r"1\s*Gm\s*Silver\s*([\d,]+(?:\.\d+)?)", text, re.IGNORECASE)

    if not gold22_match or not silver_match:
        logger.error("Failed to parse rate matches from MJDTA HTML response.")
        raise ScraperError("Could not parse 22K Gold or Silver rates from MJDTA website HTML.")

    try:
        gold22 = float(gold22_match.group(1).replace(",", ""))
        silver = float(silver_match.group(1).replace(",", ""))
    except ValueError as e:
        logger.error("Failed to convert extracted rates to float: %s", str(e))
        raise ScraperError(f"Rate parsing error: {e}") from e

    if gold22 <= 0 or silver <= 0:
        logger.error("Extracted non-positive rate values: gold22k=%s, silver=%s", gold22, silver)
        raise ScraperError(f"Invalid non-positive rate values parsed: gold22k={gold22}, silver={silver}")

    logger.info("Successfully scraped MJDTA rates - 22K Gold: ₹%s/g, Silver: ₹%s/g", gold22, silver)

    return {
        "gold22k": gold22,
        "silver": silver,
        "source": "MJDTA",
        "unit": "INR/gram"
    }


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    try:
        rates = get_mjdta_rates()
        print()
        print("================================")
        print("       MJDTA METAL RATES")
        print("================================")
        print(f"22K Gold : ₹{rates['gold22k']:,.2f} / gram")
        print(f"Silver   : ₹{rates['silver']:,.2f} / gram")
        print("================================")
    except Exception as err:
        print(f"ERROR: {err}")