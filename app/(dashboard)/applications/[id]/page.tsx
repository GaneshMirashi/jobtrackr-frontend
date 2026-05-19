"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import StatusBadge from "@/components/applications/StatusBadge";
import {
  ArrowLeft,
  Building2,
  Calendar,
  MapPin,
  IndianRupee,
  FileText,
  Bell,
} from "lucide-react";

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["application", params.id],
    queryFn: async () => {
      const res = await api.get(`/applications/${params.id}/`);
      return res.data;
    },
  });

  const app = data;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading application...
      </div>
    );
  }

  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Application not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-6">

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-6"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Header Card */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {app.company_name}
            </h1>

            <p className="text-gray-500 mt-1 text-lg">
              {app.job_title}
            </p>
          </div>

          <StatusBadge status={app.status} />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

          <InfoCard
            icon={<MapPin size={18} />}
            label="Location"
            value={app.location || "Not specified"}
          />

          <InfoCard
            icon={<Calendar size={18} />}
            label="Applied Date"
            value={app.applied_date || "—"}
          />

          <InfoCard
            icon={<Bell size={18} />}
            label="Follow Up"
            value={app.follow_up_date || "—"}
          />

          <InfoCard
            icon={<IndianRupee size={18} />}
            label="Salary"
            value={
              app.salary_min && app.salary_max
                ? `₹${app.salary_min} - ₹${app.salary_max}`
                : "Not specified"
            }
          />

        </div>
      </div>

      {/* Notes + Resume */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

        {/* Notes */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200 shadow-sm p-6">

          <div className="flex items-center gap-2 mb-4">
            <FileText size={18} className="text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Notes
            </h2>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 min-h-[200px]">
            {app.notes ? (
              <p className="text-gray-700 whitespace-pre-wrap">
                {app.notes}
              </p>
            ) : (
              <p className="text-gray-400">
                No notes added yet.
              </p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">

          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>

          <div className="space-y-3">

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
            >
              Edit Application
            </button>

            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl transition"
            >
              Move Status
            </button>

            <button
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
            >
              Delete Application
            </button>

          </div>

        </div>
      </div>

      {/* Timeline */}
      <div className="mt-6 bg-white rounded-3xl border border-gray-200 shadow-sm p-6">

        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Application Timeline
        </h2>

        <div className="space-y-6">

          <TimelineItem
            title="Application Submitted"
            date={app.applied_date}
          />

          {app.follow_up_date && (
            <TimelineItem
              title="Follow Up Scheduled"
              date={app.follow_up_date}
            />
          )}

          <TimelineItem
            title={`Current Status: ${app.status}`}
            date={app.updated_at}
          />

        </div>
      </div>

    </div>
  );
}

/* ---------- INFO CARD ---------- */

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-gray-50 rounded-2xl p-4">
      <div className="flex items-center gap-2 text-blue-600 mb-2">
        {icon}
        <span className="text-sm font-medium">
          {label}
        </span>
      </div>

      <p className="text-gray-900 font-semibold">
        {value}
      </p>
    </div>
  );
}

/* ---------- TIMELINE ---------- */

function TimelineItem({
  title,
  date,
}: {
  title: string;
  date: string;
}) {
  return (
    <div className="flex gap-4">

      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-blue-600 mt-1" />
        <div className="w-[2px] flex-1 bg-gray-200" />
      </div>

      <div className="pb-6">
        <h3 className="font-medium text-gray-900">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {date || "—"}
        </p>
      </div>

    </div>
  );
}