from flask import Flask, request, jsonify
from flask_cors import CORS
from datab import create_database, insert_teachers, insert_students, check_user_exist

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

users = []  # Store user details (for demonstration, not a real database)

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

if __name__ == '__main__':
    app.run(debug=True)
