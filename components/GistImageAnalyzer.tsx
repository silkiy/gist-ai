"use client";

import { useState } from "react";
import { analyzeImage } from "@/lib/api";

export function GistImageAnalyzer() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    setResult("");

    try {
      const data = await analyzeImage(image);
      setResult(data.analysis);
    } catch (err) {
      setResult("Failed to analyze the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-3 bg-gray-50 text-black rounded-md border border-neutral-500">
      <h3 className="text-sm font-medium">Image Analysis 🧠</h3>

      <div className="flex flex-col items-center space-y-1">
        <label
          htmlFor="image-upload"
          className="cursor-pointer w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-2xl transition"
        >
          Choose Image
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {image && (
          <p className="text-xs text-gray-600">
            {image.name.length > 30
              ? image.name.slice(0, 30) + "..."
              : image.name}
          </p>
        )}
      </div>

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-full rounded-md border object-contain max-h-40"
        />
      )}

      <button
        onClick={handleAnalyze}
        disabled={!image || loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-2xl"
      >
        {loading ? "Analyzing..." : "Analyze Image"}
      </button>

      {result && (
        <div className="bg-white border rounded-md p-3 text-sm text-gray-800 whitespace-pre-wrap max-h-48 overflow-y-auto">
          {result}
        </div>
      )}
    </div>
  );
}
