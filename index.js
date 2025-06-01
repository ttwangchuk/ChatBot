const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const intents = JSON.parse(fs.readFileSync("intent.json", "utf-8"));

// Simple pattern matcher
function getResponse(message) {
  message = message.toLowerCase();
  for (const intent of intents.intents) {
    for (const pattern of intent.patterns) {
      if (message.includes(pattern.toLowerCase())) {
        // Randomize response for variety
        const responses = intent.responses;
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
  }
  return "I'm sorry, I didn't understand that. Can you please rephrase?";
}

// POST /chat route
app.post("/chat", (req, res) => {
  const userMessage = req.body.message || "";
  const botResponse = getResponse(userMessage);
  res.json({ response: botResponse });
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
