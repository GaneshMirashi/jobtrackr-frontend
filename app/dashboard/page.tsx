import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="p-4">Dashboard (Protected)</div>
    </ProtectedRoute>
  );
}