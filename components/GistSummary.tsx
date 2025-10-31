"use client";

import { useState } from "react";
import { summarizeArticle } from "@/lib/api";
import { Loader } from "./Loader";

export function GistSummary({
  currentUrl,
  onSummaryReady,
}: {
  currentUrl: string;
  onSummaryReady: (summary: string) => void;
}) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const data = await summarizeArticle(currentUrl);
      setSummary(data.summary);
      onSummaryReady(data.summary);
    } catch (e) {
      setSummary("Gagal mengambil ringkasan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-3">
      <p className="text-xs text-gray-500 break-words">{currentUrl}</p>

      <button
        onClick={handleSummarize}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
      >
        {loading ? "Memproses..." : "Ringkas Artikel"}
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
