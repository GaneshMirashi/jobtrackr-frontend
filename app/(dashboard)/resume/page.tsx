// "use client";

// import { useState } from "react";
// import { useResumeAnalyzer } from "@/hooks/useResumeAnalyzer";

// export default function ResumePage() {
//   const { mutate, data, isPending, error } = useResumeAnalyzer();
//   const [text, setText] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [jobRole, setJobRole] = useState("");

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">
//             AI Resume Analyzer
//           </h1>

//           <p className="text-gray-500 mt-2">
//             Upload your resume and get AI-powered insights
//           </p>
//         </div>

//         <input
//           type="text"
//           placeholder="Enter target job role (Example: Python Backend Developer)"
//           value={jobRole}
//           onChange={(e) => setJobRole(e.target.value)}
//           className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
//         />

//         <textarea
//           placeholder="Paste resume here..."
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           className="w-full rounded-2xl border border-gray-300 px-4 py-4 h-52 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 resize-none"
//         />

//         <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center bg-gray-50">

//           <input
//             type="file"
//             className="hidden"
//             id="resume-upload"
//             onChange={(e) => {
//               const selectedFile = e.target.files?.[0];

//               if (selectedFile) {
//                 setFile(selectedFile);
//               }
//             }}
//           />

//           <label
//             htmlFor="resume-upload"
//             className="cursor-pointer"
//           >
//             <p className="text-sm text-gray-600">
//               Click to upload resume
//             </p>

//             <p className="text-xs text-gray-400 mt-1">
//               PDF, DOCX supported
//             </p>
//           </label>

//           {file && (
//             <p className="mt-3 text-sm text-blue-600 font-medium">
//               {file.name}
//             </p>
//           )}
//         </div>
//         {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
//           Something went wrong
//         </div>}

//         <button
//           onClick={() => {
//             if (file) {
//               const formData = new FormData();
//               formData.append("file", file);
//               formData.append("job_role", jobRole);
//               mutate(formData);
//             } else {
//               mutate({
//                 text,
//                 job_role: jobRole,
//               });
//             }
//           }}
//           className="w-full rounded-2xl bg-blue-600 py-3 text-white font-medium transition hover:bg-blue-700 disabled:opacity-70"
//         >
//           Analyze
//         </button>

//         {isPending && <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center text-gray-500 shadow-sm">
//           Analyzing your resume with AI...
//         </div>}

//         {data && (
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

//             <Card title="Skills" items={data.skills} />
//             <Card title="Strengths" items={data.strengths} />
//             <Card title="Weaknesses" items={data.weaknesses} />
//             <Card title="Suggestions" items={data.suggestions} />

//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function Card({ title, items }: any) {
//   if (!items) return null;

//   return (
//     <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

//       <h2 className="text-lg font-semibold text-gray-900 mb-4">
//         {title}
//       </h2>

//       <ul className="space-y-3">
//         {items.map((item: string, i: number) => (
//           <li
//             key={i}
//             className="text-sm text-gray-600 border-b border-gray-100 pb-2"
//           >
//             {item}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }




"use client";

import { useState } from "react";
import { useResumeAnalyzer } from "@/hooks/useResumeAnalyzer";

export default function ResumePage() {
  const { mutate, data, isPending, error } = useResumeAnalyzer();

  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [jobRole, setJobRole] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 p-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 mb-6">

          <h1 className="text-4xl font-bold text-black">
            AI Resume Analyzer
          </h1>

          <p className="text-black mt-3 text-lg">
            Upload your resume and compare it with your target job role using AI
          </p>

        </div>

        {/* MAIN FORM */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 space-y-6">

          {/* JOB ROLE */}
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Target Job Role
            </label>

            <input
              type="text"
              placeholder="Example: Python Backend Developer"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-4 py-4 text-black placeholder:text-gray-500 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* RESUME TEXT */}
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Resume Content
            </label>

            <textarea
              placeholder="Paste your resume here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-4 py-4 h-56 text-black placeholder:text-gray-500 outline-none resize-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* FILE UPLOAD */}
          <div className="border-2 border-dashed border-gray-300 rounded-3xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition">

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

              <div className="text-5xl mb-4">
                📄
              </div>

              <p className="text-lg font-semibold text-black">
                Click to Upload Resume
              </p>

              <p className="text-sm text-black mt-2">
                PDF and DOCX supported
              </p>

            </label>

            {file && (
              <div className="mt-5 inline-block bg-blue-100 text-black px-4 py-2 rounded-xl text-sm font-medium">
                {file.name}
              </div>
            )}

          </div>

          {/* ERROR */}
          {error && (
            <div className="rounded-2xl border border-red-300 bg-red-50 px-4 py-4 text-red-700 font-medium">
              Something went wrong while analyzing the resume.
            </div>
          )}

          {/* BUTTON */}
          <button
            onClick={() => {
              if (file) {
                const formData = new FormData();

                formData.append("file", file);
                formData.append("job_role", jobRole);

                mutate(formData);

              } else {
                mutate({
                  text,
                  job_role: jobRole,
                });
              }
            }}
            className="w-full rounded-2xl bg-black py-4 text-white text-lg font-semibold transition hover:opacity-90"
          >
            Analyze Resume
          </button>

        </div>

        {/* LOADING */}
        {isPending && (
          <div className="mt-6 bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg">

            <div className="animate-pulse space-y-3">

              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>

            </div>

            <p className="mt-5 text-black font-medium">
              Analyzing your resume with AI...
            </p>

          </div>
        )}

        {/* RESULT */}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">

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
    <div className="bg-white border border-gray-200 rounded-3xl shadow-lg p-6">

      <h2 className="text-xl font-bold text-black mb-5">
        {title}
      </h2>

      <ul className="space-y-3">

        {items.map((item: string, i: number) => (
          <li
            key={i}
            className="text-sm text-black border-b border-gray-200 pb-3 leading-6"
          >
            • {item}
          </li>
        ))}

      </ul>
    </div>
  );
}