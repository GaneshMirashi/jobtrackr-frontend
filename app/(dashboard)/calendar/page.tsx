"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";
import Loader from "@/components/Loader";

export default function CalendarPage() {

  const { data, isLoading } = useCalendarEvents();

  if (isLoading) {
  return (
    <div className="min-h-screen ml-64 flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

        <p className="mt-4 text-gray-600 font-medium">
          Loading calendar...
        </p>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen ml-64 bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-6">

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