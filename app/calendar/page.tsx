"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";

export default function CalendarPage() {

  const { data, isLoading } = useCalendarEvents();

  if (isLoading) {
    return (
      <div className="p-6">
        Loading calendar...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Calendar
        </h1>

        <p className="text-gray-500 mt-1">
          Track interviews & follow-ups
        </p>
      </div>

      {/* Calendar Card */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">

        <FullCalendar
          plugins={[
            dayGridPlugin,
            interactionPlugin,
          ]}
          initialView="dayGridMonth"
          height="auto"
          events={data || []}
        />

      </div>
    </div>
  );
}