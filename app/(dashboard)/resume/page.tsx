"use client";

import { useState } from "react";
import { useResumeAnalyzer } from "@/hooks/useResumeAnalyzer";

export default function ResumePage() {
  const { mutate, data, isPending, error } = useResumeAnalyzer();
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="p-6 mx-auto space-y-6 bg-[#0b0f14] rounded-xl">
      <h1 className="text-2xl font-semibold">
        AI Resume Analyzer
      </h1>

      <textarea
        placeholder="Paste resume here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border p-3 rounded h-40"
      />

      <input
        type="file"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];
          if (selectedFile) {
            setFile(selectedFile);
          }
        }}
      />
      {error && <p className="text-red-500">Something went wrong</p>}

      <button
        onClick={() => {
          if (file) {
            const formData = new FormData();
            formData.append("file", file);
            mutate(formData);
          } else {
            mutate(text);
          }
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Analyze
      </button>

      {isPending && <p>Analyzing...</p>}

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Card title="Skills" items={data.skills} />
          <Card title="Strengths" items={data.strengths} />
          <Card title="Weaknesses" items={data.weaknesses} />
          <Card title="Suggestions" items={data.suggestions} />

        </div>
      )}
    </div>
  );
}

function Card({ title, items }: any) {
  if (!items) return null;

  return (
    <div className="bg-[#0b0f14] p-4 rounded-xl border shadow-sm">
      <h2 className="font-medium mb-2">{title}</h2>
      <ul className="text-sm list-disc ml-4 space-y-1">
        {items.map((item: string, i: number) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}