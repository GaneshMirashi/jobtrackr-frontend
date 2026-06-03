export default function SuccessRateCard({
  rate,
}: {
  rate: number;
}) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">

      <p className="text-sm text-gray-500">
        Success Rate
      </p>

      <h2 className="text-4xl font-bold text-blue-600 mt-3">
        {rate}%
      </h2>

      <p className="text-sm text-gray-400 mt-2">
        Based on offers received
      </p>

    </div>
  );
}