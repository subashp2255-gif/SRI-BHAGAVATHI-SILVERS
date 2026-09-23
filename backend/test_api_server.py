import unittest
from fastapi.testclient import TestClient
from main import app

from database import init_db

class TestFastAPIEndpoints(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        init_db()
        cls.client = TestClient(app)


    def test_01_home(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "online")

    def test_02_get_rates(self):
        response = self.client.get("/rates")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("silver", data)
        self.assertIn("gold22k", data)
        self.assertEqual(data["unit"], "INR/gram")
        self.assertEqual(data["source"], "MJDTA")
        self.assertIn(data["status"], ["success", "stale_last_fetch_failed"])

    def test_03_admin_update_unauthorized(self):
        # Missing header
        response = self.client.post("/admin/rates/update")
        self.assertEqual(response.status_code, 401)

        # Invalid key
        response = self.client.post("/admin/rates/update", headers={"X-API-Key": "wrong-key"})
        self.assertEqual(response.status_code, 401)

    def test_04_admin_update_authorized(self):
        response = self.client.post(
            "/admin/rates/update",
            headers={"X-API-Key": "sri_bhagavathi_admin_secret_key_2026"}
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("silver", data)
        self.assertIn("gold22k", data)
        self.assertEqual(data["status"], "success")

if __name__ == "__main__":
    unittest.main()
