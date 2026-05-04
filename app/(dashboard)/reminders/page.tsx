"use client";

import { useReminders } from "@/hooks/useReminders";

export default function RemindersPage() {
  const { data, isLoading } = useReminders();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Upcoming Reminders
      </h1>

      {data.length === 0 && <p>No reminders 🎉</p>}

      <div className="space-y-3">
        {data.map((app: any) => (
          <div key={app.id} className="border p-3 rounded">
            <p className="font-medium">{app.company_name}</p>
            <p className="text-sm">{app.job_title}</p>
            <p className="text-xs text-gray-500">
              Reminder: {app.reminder_date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}