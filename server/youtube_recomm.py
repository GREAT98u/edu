import os, requests
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")
YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search"

def search_youtube_videos(query, max_results=10):
    """Fetch YouTube videos based on query."""
    params = {
        "part": "snippet",
        "q": query,
        "key": YOUTUBE_API_KEY,
        "maxResults": max_results,
        "type": "video"
    }
    response = requests.get(YOUTUBE_SEARCH_URL, params=params)

    if response.status_code == 200:
        data = response.json()
        videos = [
            {
                "title": item["snippet"]["title"],
                "video_id": item["id"]["videoId"],
                "url": f"https://www.youtube.com/watch?v={item['id']['videoId']}"
            }
            for item in data.get("items", [])
        ]
        return videos
    else:
        return []