import { Calendar } from "lucide-react";

export default function UpcomingInterviews({
  interviews,
}: any) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">

      <div className="flex items-center gap-2 mb-5">
        <Calendar
          size={20}
          className="text-blue-600"
        />

        <h2 className="text-xl font-semibold text-gray-900">
          Upcoming Interviews
        </h2>
      </div>

      <div className="space-y-4">

        {interviews.length === 0 && (
          <p className="text-gray-400 text-sm">
            No upcoming interviews
          </p>
        )}

        {interviews.map((item: any) => (
          <div
            key={item.id}
            className="border border-gray-100 rounded-2xl p-4"
          >

            <h3 className="font-semibold text-gray-900">
              {item.company_name}
            </h3>

            <p className="text-sm text-gray-500">
              {item.job_title}
            </p>

            <p className="text-sm text-blue-600 mt-2">
              {item.interview_date}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}