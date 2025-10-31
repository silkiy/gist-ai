export const summarizeArticle = async (url: string) => {
    const res = await fetch("https://gemini-api-app-bice.vercel.app/api/chat/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleUrl: url }),
    });
    if (!res.ok) throw new Error("Gagal meringkas berita");
    return await res.json();
};

export const chatWithSummary = async (prompt: string, summary: string) => {
    const res = await fetch("https://gemini-api-app-bice.vercel.app/api/chat/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, newsSummary: summary }),
    });
    if (!res.ok) throw new Error("Gagal memproses chat");
    return await res.json();
};
