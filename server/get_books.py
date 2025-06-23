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

    subject_lower = subject.lower()
    class_lower = f"class {class_name}".lower()

    for book in soup.select(".file-right"):
        title_tag = book.select_one("h2")
        if not title_tag:
            continue
        title = title_tag.text.strip()
        title_lower = title.lower()

        # Apply strict filtering
        if subject_lower in title_lower and class_lower in title_lower:
            link = "https://www.pdfdrive.com" + book.a["href"]
            books.append({"title": title, "url": link})

    if not books:
        return {"message": "No exact matches found. Try modifying the subject/class input."}

    return books[:5]  # Return top 5 filtered results
