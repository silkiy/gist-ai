"use client";

import { useState } from "react";
import { summarizeArticle } from "@/lib/api";
import { Loader } from "./Loader";

export function GistSummary({
  onSummaryReady,
}: {
  onSummaryReady: (summary: string) => void;
}) {
  const [inputUrl, setInputUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!inputUrl.trim()) {
      setSummary("Please enter an article URL first.");
      return;
    }

    setLoading(true);
    try {
      const data = await summarizeArticle(inputUrl);
      setSummary(data.summary);
      onSummaryReady(data.summary);
    } catch (e) {
      console.error(e);
      setSummary("Failed to fetch summary. Make sure the URL is valid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 border rounded-md p-3 text-sm text-gray-800 flex flex-col space-y-2">
      <input
        type="text"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        placeholder="Paste the article URL here..."
        className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSummarize}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
      >
        {loading ? "Loading..." : "Summarize Article"}
      </button>

      {loading && <Loader />}

      {summary && (
        <div
          className="bg-gray-50 border rounded-md p-3 text-sm text-gray-800 whitespace-pre-wrap 
          max-h-64 overflow-y-auto"
        >
          {summary}
        </div>
      )}
    </div>
  );
}
