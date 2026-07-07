"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useEffect, useState } from "react";

import api from "@/lib/api";

export default function AnalyticsPage() {

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {

    const response = await api.get(
      "/applications/analytics/"
    );

    setData(response.data);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen ml-64 bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-6">

      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Analytics
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        <Card
          title="Applications"
          value={data.total}
        />

        <Card
          title="Interviews"
          value={data.interviews}
        />

        <Card
          title="Offers"
          value={data.offers}
        />

        <Card
          title="Success Rate"
          value={`${data.success_rate}%`}
        />

      </div>

      {/* Chart */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">

        <h2 className="text-xl font-semibold mb-4">
          Monthly Applications
        </h2>

        <div className="h-96">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart data={data.monthly}>

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="total"
                fill="#2563eb"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}

function Card({
  title,
  value,
}: any) {

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-2">
        {value}
      </h2>

    </div>
  );
}