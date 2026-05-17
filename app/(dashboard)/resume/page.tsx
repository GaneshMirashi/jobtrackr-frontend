"use client";

import { useState } from "react";
import { useResumeAnalyzer } from "@/hooks/useResumeAnalyzer";

export default function ResumePage() {
  const { mutate, data, isPending, error } = useResumeAnalyzer();
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            AI Resume Analyzer
          </h1>

          <p className="text-gray-500 mt-2">
            Upload your resume and get AI-powered insights
          </p>
        </div>

        <textarea
          placeholder="Paste resume here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-2xl border border-gray-300 px-4 py-4 h-52 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 resize-none"
        />

        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center bg-gray-50">

          <input
            type="file"
            className="hidden"
            id="resume-upload"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];

              if (selectedFile) {
                setFile(selectedFile);
              }
            }}
          />

          <label
            htmlFor="resume-upload"
            className="cursor-pointer"
          >
            <p className="text-sm text-gray-600">
              Click to upload resume
            </p>

            <p className="text-xs text-gray-400 mt-1">
              PDF, DOCX supported
            </p>
          </label>

          {file && (
            <p className="mt-3 text-sm text-blue-600 font-medium">
              {file.name}
            </p>
          )}
        </div>
        {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          Something went wrong
        </div>}

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
          className="w-full rounded-2xl bg-blue-600 py-3 text-white font-medium transition hover:bg-blue-700 disabled:opacity-70"
        >
          Analyze
        </button>

        {isPending && <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center text-gray-500 shadow-sm">
  Analyzing your resume with AI...
</div>}

        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

            <Card title="Skills" items={data.skills} />
            <Card title="Strengths" items={data.strengths} />
            <Card title="Weaknesses" items={data.weaknesses} />
            <Card title="Suggestions" items={data.suggestions} />

          </div>
        )}
      </div>
    </div>
  );
}

function Card({ title, items }: any) {
  if (!items) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {title}
      </h2>

      <ul className="space-y-3">
        {items.map((item: string, i: number) => (
          <li
            key={i}
            className="text-sm text-gray-600 border-b border-gray-100 pb-2"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}