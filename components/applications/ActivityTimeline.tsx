"use client";

import { Clock3 } from "lucide-react";

export default function ActivityTimeline({
  activities,
}: any) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">

      <div className="flex items-center gap-2 mb-6">
        <Clock3 className="text-blue-600" size={20} />

        <h2 className="text-xl font-semibold text-gray-900">
          Activity Timeline
        </h2>
      </div>

      <div className="space-y-6">
        {activities.map((activity: any, index: number) => (
          <div
            key={activity.id}
            className="flex gap-4"
          >

            {/* Line */}
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-blue-600 rounded-full" />

              {index !== activities.length - 1 && (
                <div className="w-[2px] flex-1 bg-gray-200 mt-1" />
              )}
            </div>

            {/* Content */}
            <div className="pb-6">
              <p className="font-medium text-gray-800">
                {activity.action}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {new Date(
                  activity.created_at
                ).toLocaleString()}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}