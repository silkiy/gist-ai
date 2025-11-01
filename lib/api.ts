export const summarizeArticle = async (url: string) => {
    const res = await fetch("https://gemini-api-app-bice.vercel.app/api/chat/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleUrl: url }),
    });
    if (!res.ok) throw new Error("Failed to summarize the article");
    return await res.json();
};

export const chatWithSummary = async (prompt: string, summary: string) => {
    const res = await fetch("https://gemini-api-app-bice.vercel.app/api/chat/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, newsSummary: summary }),
    });
    if (!res.ok) throw new Error("Failed to process the chat");
    return await res.json();
};

export const analyzeImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("https://gemini-api-app-bice.vercel.app/api/chat/analyze-image", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) throw new Error("Failed to analyze the image");

    return await res.json();
};
