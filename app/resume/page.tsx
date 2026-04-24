"use client";

import { useState } from "react";
import { useResumeAnalyzer } from "@/hooks/useResumeAnalyzer";

export default function ResumePage() {
  const [text, setText] = useState("");
  const { mutate, data, isPending } = useResumeAnalyzer();

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">
        AI Resume Analyzer
      </h1>

      <textarea
        placeholder="Paste your resume here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border p-3 rounded h-40"
      />

      <button
        onClick={() => mutate(text)}
        className="bg-brand-500 text-white px-4 py-2 rounded"
      >
        Analyze Resume
      </button>

      {isPending && <p>Analyzing...</p>}

      {data && (
        <div className="bg-white p-4 rounded border whitespace-pre-wrap">
          {data}
        </div>
      )}
    </div>
  );
}