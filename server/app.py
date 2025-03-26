import datetime
import os

from flask import Flask, request, jsonify
from flask_cors import CORS
from datab import create_database,insert_teachers,insert_students,check_user_exist

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication



@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    # data = {"first_name" : "Dhruv", "last_name":"Joshi", "email":"au@gmail.com","password":"2edbye3","country":"India","state":"MadhyaPradesh","role":"Student","language":"English", "class":7}
    # print(data)
    # users.append(data)  # Simulating user storage
    #return jsonify({"message": "User signed up successfully!", "user": data})
    result = [data.get("first_name"), data.get("last_name"), data.get("email"), data.get("password"),
              data.get("country"), data.get("state"), data.get("role"), data.get("language"), data.get("class")]

    result = tuple(result)
    if data.get("role").lower() == "student":
        insert_students(result)
    elif data.get("role").lower() == "teacher":
        insert_teachers(result)

@app.route('/login', methods=['POST','GET'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Simplified check - just return basic success or failure
    #checking only using students table , role:student only
    user = check_user_exist((email, password))

    if user:
        return jsonify({
            "status": "success",
            "user_id": user[0],
            "role": user[1]
        }), 200
    else:
        return jsonify({
            "status": "error",
            "message": "Invalid credentials"
        }), 401

if __name__ == '__main__':
    create_database()
    app.run(debug=True)
