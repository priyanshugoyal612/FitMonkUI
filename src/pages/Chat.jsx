import { useState, useRef, useEffect } from "react";
import { sendMessage, resetConversationId } from "../services/chat.service";
import { useNavigate } from "react-router";

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "How can I help you to be a fit monk?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef(null);
  const navigate = useNavigate();

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // send message
  const send = async (customText) => {
    const messageText = customText || input;
    if (!messageText.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: messageText },
    ]);

    setInput("");
    setIsTyping(true);

    try {
      const reply = await sendMessage(messageText);

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: reply },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ Error connecting to AI" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen bg-gray-950 text-white flex flex-col">

      {/* 🔥 HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
            🧘
          </div>

          <div>
            <p className="font-semibold">Fit Monk</p>
            <p className="text-xs text-gray-400">AI Coach • Online</p>
          </div>
        </div>

        {/* 🔥 ACTION BUTTONS */}
        <div className="flex gap-2">

          {/* 🏠 Dashboard */}
          <button
            onClick={() => navigate("/")}
            className="px-3 py-1 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg"
          >
            🏠 Dashboard
          </button>

          {/* 🆕 New Chat */}
          <button
            onClick={() => {
              resetConversationId();
              setMessages([]);
            }}
            className="px-3 py-1 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg"
          >
            + New Chat
          </button>

          {/* 🚪 Logout */}
          <button
            onClick={handleLogout}
            className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 rounded-lg"
          >
            Logout
          </button>

        </div>
      </div>

      {/* 🔥 CONTEXT BANNER */}
      <div className="bg-gray-900 text-sm p-3 border-b border-gray-800">
        🔥 Today: 1200 cal | ❌ Workout | ✅ Focus | Score: 72
      </div>

      {/* 🔥 CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">

        {messages.length === 1 && (
          <div className="flex flex-col items-center justify-center text-center text-gray-400 mt-10">
            
            <h2 className="text-xl font-semibold mb-4">
              🧘 Your AI Monk Coach
            </h2>

            <p className="mb-6">
              Ask anything about fitness, discipline, or your daily progress
            </p>

            <div className="grid grid-cols-2 gap-3 max-w-md">
              <button onClick={() => send("Analyze my progress")} className="suggestion-btn">
                🔥 Analyze progress
              </button>
              <button onClick={() => send("Give me a workout plan")} className="suggestion-btn">
                💪 Workout plan
              </button>
              <button onClick={() => send("Fix my diet")} className="suggestion-btn">
                🥗 Fix diet
              </button>
              <button onClick={() => send("Improve focus")} className="suggestion-btn">
                🧠 Improve focus
              </button>
            </div>

          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[70%] px-4 py-2 rounded-xl ${
              msg.role === "user"
                ? "bg-blue-600 self-end"
                : "bg-gray-800 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {isTyping && (
          <div className="text-gray-400">Monk is thinking...</div>
        )}

        <div ref={bottomRef}></div>
      </div>

      {/* 🔥 INPUT */}
      <div className="border-t border-gray-800 p-4 flex justify-center">
        
        <div className="flex w-full max-w-3xl gap-3">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your AI Monk..."
            className="flex-1 bg-gray-900 px-4 py-3 rounded-full outline-none border border-gray-700 focus:border-blue-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
          />

          <button
            onClick={() => send()}
            className="px-5 py-3 bg-blue-500 hover:bg-blue-600 rounded-full"
          >
            ➤
          </button>

        </div>
      </div>

      {/* 🔥 STYLES */}
      <style>
        {`
          .suggestion-btn {
            background: #1e293b;
            padding: 10px;
            border-radius: 10px;
            transition: 0.2s;
          }

          .suggestion-btn:hover {
            background: #334155;
          }
        `}
      </style>

    </div>
  );
}