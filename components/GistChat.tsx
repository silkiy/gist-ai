"use client";

import { useState } from "react";
import { chatWithSummary } from "@/lib/api";
import { Loader } from "./Loader";

export function GistChat({ summary }: { summary: string }) {
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { sender: "user" | "ai"; message: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!chatInput.trim()) return;
    const userMessage = chatInput.trim();
    setChatInput("");
    setChatHistory((prev) => [
      ...prev,
      { sender: "user", message: userMessage },
    ]);
    setLoading(true);

    try {
      const data = await chatWithSummary(userMessage, summary);
      setChatHistory((prev) => [
        ...prev,
        { sender: "ai", message: data.response },
      ]);
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { sender: "ai", message: "Terjadi kesalahan saat memproses." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 border rounded-md p-3 text-sm text-gray-800 flex flex-col space-y-2">
      <div className="max-h-48 overflow-y-auto space-y-2">
        {chatHistory.map((chat, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-md ${
              chat.sender === "user"
                ? "bg-blue-600 text-white self-end ml-auto max-w-[85%]"
                : "bg-white border text-gray-800 max-w-[85%]"
            }`}
          >
            {chat.message}
          </div>
        ))}
        {loading && <Loader />}
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <input
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Tanyakan sesuatu..."
          className="flex-1 border rounded-md px-3 py-1.5 text-sm outline-none"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm"
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
