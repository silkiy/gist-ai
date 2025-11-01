"use client";

import { useState, useRef, useEffect } from "react";
import { GistHeader } from "@/components/GistHeader";
import { GistImageAnalyzer } from "@/components/GistImageAnalyzer";
import { summarizeArticle, chatWithSummary } from "@/lib/api";
import { cn } from "@/lib/utils";

type Message = {
  sender: "user" | "ai";
  message: string;
};

export default function GistMainPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      message:
        "Hello! I’m Gist AI. Paste a news URL to summarize or ask me anything.",
    },
  ]);
  const [summary, setSummary] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "image">("chat");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "user", message: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      let response: string;

      if (userMessage.startsWith("http")) {
        const data = await summarizeArticle(userMessage);
        response = data.summary || "Unable to summarize the article.";
        setSummary(response);
      } else {
        const data = await chatWithSummary(userMessage, summary);
        response = data.response || "Sorry, I can’t answer that.";
      }

      setMessages((prev) => [...prev, { sender: "ai", message: response }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", message: "An error occurred while processing." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[400px] h-[600px] flex flex-col bg-gray-50 border rounded-xl shadow-md overflow-hidden">
      <div className="border-b from-blue-50 to-indigo-100 p-3">
        <GistHeader />
        <div className="flex justify-around mt-3">
          <button
            className={cn(
              "flex-1 py-2 text-sm font-medium rounded-2xl transition-all",
              activeTab === "chat"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            )}
            onClick={() => setActiveTab("chat")}
          >
            💬 Chat & Summary
          </button>

          <button
            className={cn(
              "flex-1 py-2 text-sm font-medium rounded-2xl ml-2 transition-all",
              activeTab === "image"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            )}
            onClick={() => setActiveTab("image")}
          >
            🖼️ Image
          </button>
        </div>
      </div>

      {activeTab === "chat" ? (
        <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
          <div
            ref={chatRef}
            className="flex-1 flex flex-col overflow-y-auto px-4 py-3 space-y-3"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "px-3 py-2 rounded-xl drop-shadow-sm drop-shadow-gray-400 max-w-[80%] break-words",
                  msg.sender === "ai"
                    ? "bg-blue-100 text-gray-800 self-start"
                    : "bg-blue-600 text-white self-end ml-auto"
                )}
              >
                {msg.message}
              </div>
            ))}

            {loading && (
              <div className="text-gray-400 text-sm italic">Processing...</div>
            )}
          </div>

          <div className="border-t bg-white p-3 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Paste a URL or type a question..."
              className="flex-1 border rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          <GistImageAnalyzer />
        </div>
      )}
    </div>
  );
}
