import "./index.css";
import "./App.css";
import user1 from './assets/user1.png';
import bot from './assets/bot.png';
import React, { useState, useRef, useEffect } from "react";

function App() {
  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-header">ChatBot</div>
        <ChatSystem />
      </div>
    </div>
  );
}

function ChatSystem() {
  const [chatMessages, setChatMessages] = useState([
    { message: "Hello! I am your bot 🤖", sender: "bot", id: "id1" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newUserMessage = { message: input, sender: "user", id: Date.now().toString() };
    setChatMessages((prev) => [...prev, newUserMessage]);
    setInput("");

    setIsTyping(true);
    setTimeout(() => {
      const botReply = getBotReply(input);
      setChatMessages((prev) => [
        ...prev,
        { message: botReply, sender: "bot", id: Date.now().toString() + "-bot" }
      ]);
      setIsTyping(false);
    }, 800);
  };

  const getBotReply = (userText) => {
    const lower = userText.toLowerCase();
    if (lower.includes("hello") || lower.includes("hi")) return "Hey Vighnesh 👋";
    if (lower.includes("date")) return `Today's date is ${new Date().toLocaleDateString()}`;
    if (lower.includes("time")) return `The time is ${new Date().toLocaleTimeString()}`;
    if (lower.includes("how are you")) return "I am just a bot, but I'm doing great! 😎";
    if (lower.includes("bye")) return "Goodbye! Have a great day! 👋";
    if (lower.includes("thanks")) return "You're welcome! 😊";
    return "Sorry, I didn’t understand that. 🙈";
  };

  return (
    <>
      <div className="messages">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`message-row ${msg.sender}`}
          >
            {msg.sender === "bot" && <img src={bot} alt="bot" className="avatar" />}
            <div className={`message ${msg.sender}`}>{msg.message}</div>
            {msg.sender === "user" && <img src={user1} alt="user" className="avatar" />}
          </div>
        ))}

        {isTyping && (
          <div className="message-row bot">
            <img src={bot} alt="bot" className="avatar" />
            <div className="message bot typing">Typing...</div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me something..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>➤</button>
      </div>
    </>
  );
}

export default App;
