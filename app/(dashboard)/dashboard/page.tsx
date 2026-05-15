"use client";

import { useStats } from "@/hooks/useStats";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#f59e0b",
  "#10b981",
  "#6366f1",
  "#ef4444",
  "#6b7280",
];

export default function DashboardPage() {
  const { data, isLoading } = useStats();

  if (isLoading)
    return <div className="p-6 text-gray-400">Loading dashboard...</div>;

  const chartData = Object.entries(data.status_counts).map(
    ([status, count]) => ({
      name: status,
      value: count,
    })
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-6 space-y-6">

      {/* 🔹 Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>

      {/* 🔹 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total */}
        <div className="bg-white border border-gray-200 shadow-sm p-5 rounded-xl">
          <p className="text-sm text-gray-500">Total Applications</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            {data.total}
          </h2>
        </div>

        {/* Status Cards */}
        {Object.entries(data.status_counts).map(([status, count]) => (
          <div
            key={status}
            className="bg-white border border-gray-200 shadow-sm p-5 rounded-xl"
          >
            <p className="text-sm text-gray-500 capitalize">{status}</p>
            <h2 className="text-xl font-semibold text-gray-900 mt-1">
              {count}
            </h2>
          </div>
        ))}
      </div>

      {/* 🔹 Chart + Recent (2-column layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 📊 Chart */}
        <div className="lg:col-span-2 bg-white border border-gray-200 shadow-sm p-5 rounded-xl">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Applications by Status
          </h2>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 🕒 Recent Applications */}
        <div className="bg-white border border-gray-200 shadow-sm p-5 rounded-xl">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Recent Applications
          </h2>

          <div className="space-y-3">
            {data.recent_applications.map((app: any) => (
              <div
                key={app.id}
                className="flex justify-between items-center border-b border-gray-200 pb-2"
              >
                <div>
                  <p className="text-gray-900 font-medium">
                    {app.company_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {app.job_title}
                  </p>
                </div>

                <span className="text-xs text-gray-300 capitalize">
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}