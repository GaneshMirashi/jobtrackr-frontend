"use client";

import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { FileText, Save } from "lucide-react";

type Props = {
    applicationId: number;
    initialNotes: string;
};

export default function NotesEditor({
    applicationId,
    initialNotes,
}: Props) {
    const [notes, setNotes] = useState(initialNotes || "");
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        try {
            setLoading(true);

            await api.patch(`/applications/${applicationId}/`, {
                notes,
            });

            toast.success("Notes updated successfully 🚀");
        } catch (error) {
            toast.error("Failed to update notes");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">

            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <FileText size={20} className="text-blue-600" />

                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        Notes
                    </h2>

                    <p className="text-sm text-gray-500">
                        Save interview feedback, reminders, or job details
                    </p>
                </div>
            </div>

            {/* Textarea */}
            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write your notes here..."
                className="w-full min-h-[220px] rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 resize-none"
            />

            {/* Footer */}
            <div className="flex justify-between items-center mt-4">

                <p className="text-sm text-gray-400">
                    Your notes are saved per application
                </p>

                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 transition disabled:opacity-70"
                >
                    <Save size={16} />

                    {loading ? "Saving..." : "Save Notes"}
                </button>

            </div>
        </div>
    );
}