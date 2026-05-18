"use client";

import { useReminders } from "@/hooks/useReminders";
import { Bell, CalendarDays } from "lucide-react";

export default function RemindersPage() {
  const { data, isLoading } = useReminders();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-6">
        <div className="text-gray-500">Loading reminders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Reminders
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Track upcoming follow-ups and interviews
        </p>
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <Bell className="text-blue-600" size={28} />
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-800">
            No reminders yet 🎉
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Your upcoming follow-ups will appear here.
          </p>
        </div>
      )}

      {/* Reminder Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {data.map((app: any) => (
          <div
            key={app.id}
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >

            {/* Top */}
            <div className="flex items-start justify-between mb-4">

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {app.company_name}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {app.job_title}
                </p>
              </div>

              <div className="bg-blue-100 p-2 rounded-lg">
                <Bell size={18} className="text-blue-600" />
              </div>
            </div>

            {/* Reminder Date */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <CalendarDays size={16} />
              <span>
                Follow-up:{" "}
                <span className="font-medium text-gray-900">
                  {app.follow_up_date || app.reminder_date}
                </span>
              </span>
            </div>

            {/* Status */}
            <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              {app.status}
            </div>

            {/* Notes */}
            {app.notes && (
              <div className="mt-4 border-t pt-3">
                <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
                  Notes
                </p>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {app.notes}
                </p>
              </div>
            )}
          </div>
        ))}

      </div>
    </div>
  );
}