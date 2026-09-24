from bs4 import BeautifulSoup

with open("mjdta.html", "r", encoding="utf-8") as file:
    html = file.read()

soup = BeautifulSoup(html, "html.parser")

text = soup.get_text(" ", strip=True)
for keyword in [
    "1 Gm Gold 22Kt",
    "1 Gm Gold 18Kt",
    "1 Gm Gold 14Kt",
    "1 Gm Silver"
]:
    position = text.find(keyword)

    print("\n==============================")
    print(keyword)

    if position != -1:
        print(text[position:position + 300])
    else:
        print("NOT FOUND")