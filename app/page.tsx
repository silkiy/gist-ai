"use client";

import { useEffect, useState } from "react";
import { GistHeader } from "@/components/GistHeader";
import { GistSummary } from "@/components/GistSummary";
import { GistChat } from "@/components/GistChat";
import { GistImageAnalyzer } from "@/components/GistImageAnalyzer";
import { cn } from "@/lib/utils";

declare const chrome:
  | {
      tabs?: {
        query: (
          queryInfo: { active?: boolean; currentWindow?: boolean },
          callback: (tabs: Array<{ url?: string }>) => void
        ) => void;
      };
    }
  | undefined;

export default function Page() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [activeTab, setActiveTab] = useState<"summary" | "image">("summary");

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.query(
        { active: true, currentWindow: true },
        (tabs: { url?: string }[]) => {
          const tabUrl = tabs[0]?.url;
          if (tabUrl) {
            setUrl(tabUrl);
          } else {
            setSummary("Silakan mulai percakapan dengan Gist AI di sini.");
          }
        }
      );
    } else {
      setUrl(
        "https://money.kompas.com/read/2025/10/31/103849226/prabowo-perintahkan-purbaya-airlangga-dan-danantara-cari-solusi-utang-kereta?source=headline"
      );
      setSummary("Silakan mulai percakapan dengan Gist AI di sini.");
    }
  }, []);

  return (
    <div className="w-[400px] h-[600px] flex flex-col bg-white border rounded-xl shadow-md overflow-hidden">
      {/* HEADER */}
      <div className="border-b bg-gradient-to-r from-blue-50 to-indigo-100 p-3">
        <GistHeader />

        {/* Tabs */}
        <div className="flex justify-around mt-3">
          <button
            className={cn(
              "flex-1 py-2 text-sm font-medium rounded-md transition-all",
              activeTab === "summary"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            )}
            onClick={() => setActiveTab("summary")}
          >
            💬 Chat & Summary
          </button>

          <button
            className={cn(
              "flex-1 py-2 text-sm font-medium rounded-md ml-2 transition-all",
              activeTab === "image"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            )}
            onClick={() => setActiveTab("image")}
          >
            🖼️ Image
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 bg-gray-50 flex flex-col overflow-hidden">
        {/* Chat & Summary Section */}
        {activeTab === "summary" && (
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            {/* GistSummary auto-fetch summary dari URL */}
            <GistSummary currentUrl={url} onSummaryReady={setSummary} />

            {/* Setelah summary selesai, munculkan chat */}
            {summary && <GistChat summary={summary} />}
          </div>
        )}

        {/* Image Analyzer Section */}
        {activeTab === "image" && (
          <div className="flex-1 overflow-y-auto p-4">
            <GistImageAnalyzer />
          </div>
        )}
      </div>
    </div>
  );
}
