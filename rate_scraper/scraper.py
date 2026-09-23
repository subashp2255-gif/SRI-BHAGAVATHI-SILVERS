import requests
from bs4 import BeautifulSoup

url = "https://www.thejewellersassociation.org/"

response = requests.get(
    url,
    headers={
        "User-Agent": "Mozilla/5.0"
    },
    timeout=10
)

print("Status:", response.status_code)

soup = BeautifulSoup(response.text, "html.parser")

print(soup.get_text(" ", strip=True))