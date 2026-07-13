"use client";

import { useState } from "react";
import { useResumeAnalyzer } from "@/hooks/useResumeAnalyzer";

export default function ResumePage() {
  const { mutate, data, isPending, error } = useResumeAnalyzer();

  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [jobRole, setJobRole] = useState("");

  const handleAnalyze = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("job_role", jobRole);
      mutate(formData);
    } else if (text.trim()) {
      mutate({ text, job_role: jobRole });
    }
  };

  return (
    <div className="min-h-screen ml-64 bg-slate-50 p-4 md:p-8">
      <div className=" mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-semibold text-gray-900">Resume Analyzer</h1>
          <p className="text-gray-600 mt-2 text-lg">
            AI-powered ATS analysis and job role matching
          </p>
        </div>

        {/* INPUT CARD */}
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-8 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Job Role */}
            <div className="lg:col-span-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                TARGET JOB ROLE
              </label>
              <input
                type="text"
                placeholder="e.g. Python Backend Developer"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:border-blue-600 focus:ring-1 focus:ring-blue-200 outline-none text-base"
              />
            </div>

            {/* Resume Text */}
            <div className="lg:col-span-7">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                RESUME TEXT
              </label>
              <textarea
                placeholder="Paste your resume content here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-52 px-5 py-4 border border-gray-300 rounded-xl focus:border-blue-600 focus:ring-1 focus:ring-blue-200 outline-none resize-y text-base"
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="mt-8 border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-gray-400 transition">
            <input
              type="file"
              id="resume-upload"
              className="hidden"
              accept=".pdf,.docx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <label htmlFor="resume-upload" className="cursor-pointer">
              <div className="text-4xl mb-3">📄</div>
              <p className="font-medium text-gray-800">Upload Resume (PDF or DOCX)</p>
              <p className="text-sm text-gray-500 mt-1">Click to browse files</p>
            </label>

            {file && (
              <p className="mt-4 text-sm text-blue-600 font-medium">Selected: {file.name}</p>
            )}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isPending || (!file && !text.trim()) || !jobRole.trim()}
            className="mt-8 w-full bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white font-medium py-4 rounded-xl text-lg transition"
          >
            {isPending ? "Analyzing Resume..." : "Analyze Resume"}
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-5 rounded-2xl mb-8">
            {error.message || "Failed to analyze resume. Please try again."}
          </div>
        )}

        {/* LOADING */}
        {isPending && (
          <div className="bg-white rounded-2xl shadow p-12 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full mx-auto"></div>
            <p className="mt-6 text-gray-600 font-medium">Analyzing with AI...</p>
          </div>
        )}

        {/* RESULTS */}
        {data && (
          <div className="space-y-10">
            {/* ATS SCORE */}
            <div className="bg-white rounded-2xl shadow border border-gray-200 p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-10">
                {/* Circular Progress */}
                <div className="relative w-52 h-52 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="88" fill="none" stroke="#e5e7eb" strokeWidth="18" />
                    <circle
                      cx="100"
                      cy="100"
                      r="88"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="18"
                      strokeDasharray={`${(data.ats_score || 0) * 5.52} 552`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-6xl font-semibold text-gray-900">
                      {data.ats_score || 0}
                    </span>
                    <span className="text-sm text-gray-500 font-medium">/ 100</span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-semibold text-gray-900">ATS Score</h2>
                    <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                      {(data.match_percentage || data.keyword_match || 0)}% Match
                    </span>
                  </div>
                  <p className="mt-4 text-gray-600 leading-relaxed text-[15.5px]">
                    {data.summary || "Your resume is well-aligned with the target role."}
                  </p>
                </div>
              </div>
            </div>

            {/* SKILLS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SkillCard
                title="Matched Skills"
                items={data.skills || data.matched_skills || []}
                color="emerald"
              />
              <SkillCard
                title="Missing Skills"
                items={data.missing_skills || []}
                color="rose"
              />
            </div>

            {/* INSIGHTS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <InsightCard title="Strengths" items={data.strengths} />
              <InsightCard title="Weaknesses" items={data.weaknesses} />
              <InsightCard title="Suggestions" items={data.suggestions} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SkillCard({ title, items, color }: any) {
  if (!items?.length) return null;

  const bgColor = color === "emerald" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-700";

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-200 p-8">
      <h3 className="font-semibold text-xl text-gray-900 mb-6">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {items.map((item: string, i: number) => (
          <span
            key={i}
            className={`${bgColor} px-5 py-2 rounded-2xl text-sm font-medium`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function InsightCard({ title, items }: any) {
  if (!items?.length) return null;

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-200 p-8">
      <h3 className="font-semibold text-xl text-gray-900 mb-6">{title}</h3>
      <ul className="space-y-4">
        {items.map((item: string, i: number) => (
          <li key={i} className="text-gray-700 text-[15px] leading-relaxed flex gap-3">
            <span className="text-emerald-500 mt-0.5">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}