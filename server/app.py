from flask import Flask, request, jsonify
from flask_cors import CORS
from datab import create_database, insert_teachers, insert_students, check_user_exist
import requests
from youtube_recomm import search_youtube_videos
import cohere
from dotenv import load_dotenv
import os
from get_books import scrape_pdfdrive

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

@app.route("/suggest_videos", methods=["POST"])
def suggest_videos():
    """Receive JSON request and return YouTube video suggestions."""
    data = request.get_json()
    print(data)

    # {'subject': 'Science', 'topic': 'magnet', 'language': 'english', 'class': 7}
    
    subject = data.get("subject", "")
    topic = data.get("topic", "")
    language = data.get("language", "")
    class_name = data.get("class", None)  # Expecting an integer

    if not subject or not topic or class_name is None:
        return jsonify({"error": "Subject, topic, and class are required"}), 400

    if not isinstance(class_name, int) or class_name < 6 or class_name > 12:
        return jsonify({"error": "Class must be an integer between 6 and 12"}), 400
# 
    # Create search query
    search_query = f"{subject} {topic} Class {class_name} {language}"



    videos = search_youtube_videos(search_query)
    # print(jsonify({"videos": videos}))
    print(jsonify({"videos": videos}).get_json())  # Extracts the actual JSON data   .....debugging

    return jsonify({"videos": videos})

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    print(data)
    if not data:
        return jsonify({"message": "No data provided"}), 400

    try:
        result = [
            data.get("first_name"), data.get("last_name"), data.get("email"), data.get("password"),
            data.get("country"), data.get("state"), data.get("language"),
            int(data.get("class_name", 0))  # Ensure "class" is an integer
        ]
        result = tuple(result)

        if data.get("role").lower() == "student":
            insert_students(result)
        elif data.get("role").lower() == "teacher":
            insert_teachers(result)

        return jsonify({"message": "User signed up successfully!", "user": data}), 201
    
    except Exception as e:
        print("Database Error:", e)
        return jsonify({"message": "Database error occurred"}), 500


# Load environment variables
load_dotenv()

# Initialize Cohere client
co = cohere.Client(os.getenv('COHERE_API_KEY'))

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_input = data.get("message")

        if not user_input:
            return jsonify({"response": "Invalid input"}), 400

        # Get response from Cohere
        response = co.chat(message=user_input)

        return jsonify({"response": response.text})

    except Exception as e:
        return jsonify({"response": f"Error: {str(e)}"}), 500


@app.route("/get_books", methods=["POST"])
def get_books():
    data = request.get_json()
    subject = data.get("subject")
    class_name = data.get("class")
    print(data)  
    # subject = "Mathematics" #for debugging
    # class_name = 10 # for debugging

    if not subject or not isinstance(class_name, int):
        return jsonify({"error": "Invalid input"}), 400

    books = scrape_pdfdrive(subject, class_name)
    # {'title': 'NCERT Class 10 Mathematics', 'url': 'https://www.pdfdrive.com/ncert-class-10-mathematics-e26847112.html'}, 
    # {'title': 'Mathematics Class 9-10', 'url': 'https://www.pdfdrive.com/mathematics-class-9-10-e9958442.html'},
    # {'title': 'Mathematics (Class 10)', 'url': 'https://www.pdfdrive.com/mathematics-class-10-e158338881.html'}, 
    # {'title': 'NCERT Class 10 Geography', 'url': 'https://www.pdfdrive.com/ncert-class-10-geography-e26851347.html'}, 
    # {'title': 'NCERT Class 12 Mathematics Part 1', 'url': 'https://www.pdfdrive.com/ncert-class-12-mathematics-part-1-e26833165.html'}]


    return jsonify({"books": books})
 
if __name__ == '__main__':
    app.run(debug=True)
