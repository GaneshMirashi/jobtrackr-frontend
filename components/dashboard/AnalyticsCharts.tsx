"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function AnalyticsCharts({
  data,
}: any) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">

      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Monthly Applications
      </h2>

      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="count"
              radius={[10, 10, 0, 0]}
              fill="#2563eb"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}