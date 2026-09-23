import sys
import os
import unittest
from datetime import datetime, timezone
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from database import Base
from models import MetalRate, MetalRateHistory
from rate_service import validate_rates, fetch_and_update_rates, get_current_rates
import mjdta_scraper


class TestRateSystem(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Use in-memory SQLite for fast testing
        cls.engine = create_engine("sqlite:///:memory:")
        Base.metadata.create_all(cls.engine)
        cls.SessionLocal = sessionmaker(bind=cls.engine)

    def setUp(self):
        self.db = self.SessionLocal()

    def tearDown(self):
        self.db.close()

    def test_01_validation(self):
        """Test rate validation logic."""
        valid_data = {"gold22k": 14135.0, "silver": 255.0, "source": "MJDTA", "unit": "INR/gram"}
        self.assertTrue(validate_rates(valid_data))

        # Rejections
        self.assertFalse(validate_rates({"gold22k": -100, "silver": 255.0}))
        self.assertFalse(validate_rates({"gold22k": 14135.0, "silver": 0}))
        self.assertFalse(validate_rates({"gold22k": None, "silver": 255.0}))
        self.assertFalse(validate_rates({"gold22k": "invalid", "silver": 255.0}))
        self.assertFalse(validate_rates("invalid format"))

    def test_02_fetch_and_store(self):
        """Test fetching and saving rates into database & history."""
        res = fetch_and_update_rates(self.db)
        self.assertEqual(res["status"], "success")
        self.assertEqual(res["source"], "MJDTA")
        self.assertGreater(res["silver"], 0)
        self.assertGreater(res["gold22k"], 0)

        # Check DB records
        silver = self.db.query(MetalRate).filter(MetalRate.metal == "silver").first()
        gold = self.db.query(MetalRate).filter(MetalRate.metal == "gold22k").first()
        self.assertIsNotNone(silver)
        self.assertIsNotNone(gold)
        self.assertEqual(silver.rate, res["silver"])
        self.assertEqual(gold.rate, res["gold22k"])

        # Check history records
        history = self.db.query(MetalRateHistory).all()
        self.assertGreaterEqual(len(history), 2)
        self.assertEqual(history[0].status, "success")

    def test_03_get_current_rates(self):
        """Test reading latest saved rates from DB without live scraping."""
        res = get_current_rates(self.db)
        self.assertIn("silver", res)
        self.assertIn("gold22k", res)
        self.assertEqual(res["status"], "success")

    def test_04_preserve_rate_on_failure(self):
        """Test that scraper failure preserves previous database rate and logs failed history."""
        # Get existing rate before simulated failure
        before = get_current_rates(self.db)
        original_silver = before["silver"]

        # Simulate scraper exception by patching rate_service.get_mjdta_rates
        import rate_service
        original_func = rate_service.get_mjdta_rates
        try:
            rate_service.get_mjdta_rates = lambda: (_ for _ in ()).throw(mjdta_scraper.ScraperError("MJDTA down"))

            # Run update cycle
            fail_res = fetch_and_update_rates(self.db)
            self.assertIn(fail_res["status"], ["error", "failed", "validation_failed", "database_error"])
            self.assertEqual(fail_res["silver"], original_silver)  # Preserved!

            # Verify failure recorded in history
            latest_hist = self.db.query(MetalRateHistory).order_by(MetalRateHistory.id.desc()).first()
            self.assertEqual(latest_hist.status, "failed")
            self.assertIn("MJDTA down", latest_hist.error_message)

            # DB table still holds previous successful rate
            after = get_current_rates(self.db)
            self.assertEqual(after["silver"], original_silver)
        finally:
            rate_service.get_mjdta_rates = original_func


if __name__ == "__main__":
    unittest.main()
