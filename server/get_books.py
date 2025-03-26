import requests
from bs4 import BeautifulSoup

def scrape_pdfdrive(subject, class_name):
    query = f"{subject} Class {class_name} free pdf"
    url = f"https://www.pdfdrive.com/search?q={query.replace(' ', '+')}"

    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return {"error": "Failed to fetch books"}

    soup = BeautifulSoup(response.text, "html.parser")
    books = []

    for book in soup.select(".file-right"):
        title = book.select_one("h2").text.strip()
        link = "https://www.pdfdrive.com" + book.a["href"]
        books.append({"title": title, "url": link})

    return books[:5]  # Return top 5 books

# Example Call



# Example Run