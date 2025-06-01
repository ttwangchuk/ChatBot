const chatToggle = document.getElementById("chat-toggle");
const chatboxContainer = document.getElementById("chatbox-container");
const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// Toggle the chatbot popup and show FAQ suggestions
chatToggle.addEventListener("click", () => {
  chatboxContainer.classList.toggle("hidden");

  if (!chatboxContainer.classList.contains("hidden")) {
    // Clear previous chat (optional: remove this line if you want history)
    // chatbox.innerHTML = "";

    // Show FAQ suggestions
    chatbox.innerHTML += `
      <div class="text-left my-1">
        <span class="bg-gray-100 p-2 rounded-md inline-block">
          <strong>Here are some FAQs you can try:</strong><br>
          • What programs are offered?<br>
          • How to apply for admission?<br>
          • What are the fees?
        </span>
      </div>`;
    chatbox.scrollTop = chatbox.scrollHeight;
  }
});

// Send a message to the backend
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  // Show user message
  chatbox.innerHTML += `
    <div class="text-right my-1">
      <span class="bg-green-100 p-2 rounded-md inline-block">${message}</span>
    </div>`;
  userInput.value = "";
  chatbox.scrollTop = chatbox.scrollHeight;

  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    chatbox.innerHTML += `
      <div class="text-left my-1">
        <span class="bg-gray-200 p-2 rounded-md inline-block">${data.response}</span>
      </div>`;
    chatbox.scrollTop = chatbox.scrollHeight;
  } catch (error) {
    chatbox.innerHTML += `
      <div class="text-left my-1 text-red-500">
        Error: Could not reach server.
      </div>`;
  }
}

// Send on button click
sendButton.addEventListener("click", sendMessage);

// Send on Enter key
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});