import cohere
import json
from dotenv import load_dotenv
import os

load_dotenv()
# Initialize Cohere client (Replace with your API key)
COHERE_API_KEY ="0zSlCk4PAmju3UXTHfm9ao0Se5dfPLURsCOgIqqc"
print(COHERE_API_KEY)
co = cohere.Client(COHERE_API_KEY)
# Function to generate a quiz
def generate_quiz(level, class_num, topic, language):
    prompt = f"""
    You are a professional educational AI. Generate a JSON list of 10 quiz questions on {topic} for Class {class_num} students.
    Difficulty: {level}. Language: {language}.

    *Format each question as follows:*
    [
        {{
            "question": "What is 2 + 2?",
            "options": {{"A": "3", "B": "4", "C": "5", "D": "6"}},
            "correct_answer": "B",
            "explanation": "2 + 2 is 4."
        }},
        ...
    ]

    *IMPORTANT:*
    - Return only a valid JSON list without extra text.
    - Do not repeat similar questions.
    - Ensure the language is strictly {language}.
    """

    response = co.generate(prompt=prompt, max_tokens=1000)
    raw_text = response.generations[0].text.strip()

      # Debugging

    try:
        raw_text = raw_text.strip("json").strip("").strip()  # Clean formatting

        quiz_data = json.loads(raw_text)  # Convert JSON string to Python list

        return quiz_data
    except json.JSONDecodeError as e:
        ran = [{'question': 'What is 63 + 8?', 'options': {'A': '51', 'B': '52', 'C': '54', 'D': '71'}, 'correct_answer': 'D', 'explanation': '63 + 8 is 71.'}, {'question': 'What is 4 * 6?', 'options': {'A': '2', 'B': '4', 'C': '6', 'D': '24'}, 'correct_answer': 'D', 'explanation': '4 * 6 is 24.'}, {'question': 'What is half of 36?', 'options': {'A': '18', 'B': '20', 'C': '22', 'D': '24'}, 'correct_answer': 'A', 'explanation': 'Half of 36 is 18.'}, {'question': 'What is the sum of 4 and 4?', 'options': {'A': '5', 'B': '6', 'C': '7', 'D': '8'}, 'correct_answer': 'D', 'explanation': 'The sum of 4 and 4 is indeed 8.'}, {'question': 'What is 3 * 3?', 'options': {'A': '9', 'B': '12', 'C': '15', 'D': '18'}, 'correct_answer': 'A', 'explanation': '3 * 3 is 9.'}, {'question': 'What is the value of this expression? -7 + 8', 'options': {'A': '-1', 'B': '1', 'C': '-2', 'D': '2'}, 'correct_answer': 'B', 'explanation': '-7 + 8 is 1.'}, {'question': 'What is the value of this expression? 10 - 4', 'options': {'A': '6', 'B': '7', 'C': '8', 'D': '9'}, 'correct_answer': 'A', 'explanation': '10 - 4 is 6.'}, {'question': 'What is 2 / 2?', 'options': {'A': '1', 'B': '2', 'C': '3', 'D': '4'}, 'correct_answer': 'A', 'explanation': '2 / 2 is 1.'}, {'question': 'What is the value of this expression? -3 * 2', 'options': {'A': '-6', 'B': '-4', 'C': '4', 'D': '6'}, 'correct_answer': 'A', 'explanation': '-3 * 2 is -6.'}, {'question': 'What is 5 + 5?', 'options': {'A': '10', 'B': '11', 'C': '12', 'D': '13'}, 'correct_answer': 'A', 'explanation': '5 + 5 is 10.'}]
        print("❌ Error parsing AI response:", e)
        return ran
print(generate_quiz("easy",7,"maths","english"))