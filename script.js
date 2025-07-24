const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");

const responses = {
  "hi": "Hello! How can I help you?",
  "hello": "Hi there! What do you need?",
  "how are you": "I'm a bot, but I'm doing great!",
  "bye": "Goodbye! Have a nice day!",
  "name": "I am SmartBot, your friendly assistant.",
  "default": "I'm not sure how to respond to that."
};

function sendMessage() {
  const message = userInput.value.trim();
  if (message === "") return;

  appendMessage("user", message);
  const reply = getBotReply(message.toLowerCase());

  setTimeout(() => {
    appendMessage("bot", reply);
    speak(reply);
  }, 500);

  userInput.value = "";
}

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotReply(msg) {
  return responses[msg] || responses["default"];
}

function clearChat() {
  chatBox.innerHTML = "";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(speech);
}

function speakLast() {
  const messages = chatBox.querySelectorAll(".bot");
  if (messages.length > 0) {
    const last = messages[messages.length - 1].textContent;
    speak(last);
  }
}

// Enter key sends message
userInput.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});
