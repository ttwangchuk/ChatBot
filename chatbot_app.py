from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import random
import json

app = Flask(__name__)
CORS(app)  # Allow frontend JS to call Flask API

# Load intents
with open('intent.json') as f:
    intents = json.load(f)

# Rule-based intent matcher
def match_intent(user_input):
    user_input = user_input.lower()
    for intent in intents['intents']:
        for pattern in intent['patterns']:
            if pattern.lower() in user_input:
                return random.choice(intent['responses'])
    return "Sorry, I didn't understand that. Can you try asking differently?"

@app.route("/")
def index():
    return render_template("index.html")  # Renders from /templates/

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "")
    response = match_intent(message)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
