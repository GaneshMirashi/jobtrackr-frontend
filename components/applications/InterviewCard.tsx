"use client";

import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { CalendarDays, Video, User } from "lucide-react";

type Props = {
  app: any;
};

export default function InterviewCard({ app }: Props) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    interview_date: app.interview_date || "",
    interview_type: app.interview_type || "",
    interviewer_name: app.interviewer_name || "",
    meeting_link: app.meeting_link || "",
  });

  const handleSave = async () => {
    try {
      setLoading(true);

      await api.patch(`/applications/${app.id}/`, formData);

      toast.success("Interview details updated 🚀");

    } catch (error) {
      toast.error("Failed to update interview details");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 mt-6">

      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <CalendarDays className="text-blue-600" size={20} />

        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Interview Details
          </h2>

          <p className="text-sm text-gray-500">
            Track upcoming interviews
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Interview Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interview Date
          </label>

          <input
            type="datetime-local"
            value={formData.interview_date}
            onChange={(e) =>
              setFormData({
                ...formData,
                interview_date: e.target.value,
              })
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
          />
        </div>

        {/* Interview Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interview Type
          </label>

          <select
            value={formData.interview_type}
            onChange={(e) =>
              setFormData({
                ...formData,
                interview_type: e.target.value,
              })
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
          >
            <option value="">Select Type</option>
            <option value="Online">Online</option>
            <option value="Phone">Phone</option>
            <option value="Onsite">Onsite</option>
            <option value="HR Round">HR Round</option>
            <option value="Technical">Technical</option>
          </select>
        </div>

        {/* Interviewer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interviewer Name
          </label>

          <div className="relative">
            <User
              size={16}
              className="absolute left-3 top-4 text-gray-400"
            />

            <input
              type="text"
              value={formData.interviewer_name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  interviewer_name: e.target.value,
                })
              }
              placeholder="John Doe"
              className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Meeting Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meeting Link
          </label>

          <div className="relative">
            <Video
              size={16}
              className="absolute left-3 top-4 text-gray-400"
            />

            <input
              type="text"
              value={formData.meeting_link}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  meeting_link: e.target.value,
                })
              }
              placeholder="https://meet.google.com/..."
              className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
            />
          </div>
        </div>

      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-5">
        <button
          onClick={handleSave}
          disabled={loading}
          className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 transition disabled:opacity-70"
        >
          {loading ? "Saving..." : "Save Interview Details"}
        </button>
      </div>

    </div>
  );
}