"use client";

import { useEffect, useState } from "react";
import { GistHeader } from "@/components/GistHeader";
import { GistSummary } from "@/components/GistSummary";
import { GistChat } from "@/components/GistChat";
import { GistImageAnalyzer } from "@/components/GistImageAnalyzer";

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
    <div className="w-[400px] h-[600px] bg-white flex flex-col border rounded-md overflow-hidden">
      <GistHeader />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        <GistSummary currentUrl={url} onSummaryReady={setSummary} />
        {summary && <GistChat summary={summary} />}
        <GistImageAnalyzer />
      </div>
    </div>
  );
}
