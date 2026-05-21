"use client";

import { useState } from "react";
import api from "@/lib/api";

type Props = {
    appId: number;
    resume?: string;
};

export default function ResumeUpload({
    appId,
    resume,
}: Props) {
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async () => {
        if (!resumeFile) return;

        try {
            setUploading(true);

            const formData = new FormData();

            formData.append("resume", resumeFile);

            await api.patch(
                `/applications/${appId}/`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            window.location.reload();

        } catch (error) {
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        Resume
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Upload and manage resume for this application
                    </p>
                </div>

                {resume && (
                    <a
                        href={resume}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition"
                    >
                        View Resume
                    </a>
                )}
            </div>

            {/* Upload Box */}
            <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-2xl p-8 cursor-pointer hover:border-blue-400 hover:bg-blue-50/40 transition">

                <div className="flex flex-col items-center text-center">

                    {/* Icon */}
                    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                    </div>

                    <p className="text-sm font-medium text-gray-700">
                        Click to upload resume
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                        PDF, DOC, DOCX supported
                    </p>

                    {resumeFile && (
                        <div className="mt-4 rounded-xl bg-blue-100 px-4 py-2 text-sm text-blue-700 font-medium">
                            {resumeFile.name}
                        </div>
                    )}
                </div>

                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                            setResumeFile(e.target.files[0]);
                        }
                    }}
                />
            </label>

            {/* Upload Button */}
            <div className="mt-5 flex justify-end">
                <button
                    onClick={handleUpload}
                    disabled={!resumeFile || uploading}
                    className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                    {uploading ? "Uploading..." : "Upload Resume"}
                </button>
            </div>
        </div>
    );
}