from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

users = []  # Store user details (for demonstration, not a real database)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    print(data)
    users.append(data)  # Simulating user storage
    return jsonify({"message": "User signed up successfully!", "user": data})

if __name__ == '__main__':
    app.run(debug=True)
