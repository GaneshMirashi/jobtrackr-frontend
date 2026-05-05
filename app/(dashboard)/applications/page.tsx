"use client";

import { useEffect, useState } from "react";
import { useDeleteApplication } from "@/hooks/useDeleteApplication";
import { useUpdateApplication } from "@/hooks/useUpdateApplication";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useApplications } from "@/hooks/useApplications";
import ApplicationForm from "@/components/applications/ApplicationForm";
import StatusBadge from "@/components/applications/StatusBadge";

export default function ApplicationsPage() {

    const deleteMutation = useDeleteApplication();
    const updateMutation = useUpdateApplication();

    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<any>({});

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);

    const { data, isLoading } = useApplications({
        search,
        status,
        page,
    });


    if (isLoading) {
        return <div className="p-4">Loading applications...</div>;
    }


    return (
        // <ProtectedRoute>
        <div className="p-6 bg-[#0b0f14] min-h-screen">
            <h1 className="text-2xl font-semibold mb-4">Applications</h1>

            {/* ✅ ALWAYS SHOW FORM */}
            <ApplicationForm />

            {/* Loading */}
            {isLoading && <div className="mt-4">Loading...</div>}

            {!isLoading && data?.length === 0 && (
                <div className="mt-4 text-gray-500">
                    No applications found. Add your first one 🚀
                </div>
            )}

            <div className="flex gap-3 mt-4">

                {/* 🔍 Search */}
                <input
                    type="text"
                    placeholder="Search company or role..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-surface-border p-2 rounded w-full"
                />

                {/* 🎯 Filter */}
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border border-surface-border p-2 rounded"
                >
                    <option value="">All</option>
                    <option value="APPLIED">Applied</option>
                    <option value="SCREENING">Screening</option>
                    <option value="INTERVIEW">Interview</option>
                    <option value="OFFER">Offer</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="WITHDRAWN">Withdrawn</option>
                </select>

            </div>

            {/* List */}
            <div className="mt-6 bg-[#0b0f14] rounded-xl border border-surface-border overflow-hidden">
                <table className="w-full text-sm">

                    {/* HEADER */}
                    <thead className="bg-surface-muted text-left">
                        <tr>
                            <th className="p-3">Company</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Applied</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {data?.results?.map((app: any) => (
                            <tr key={app.id} className="border-t border-surface-border">

                                {editingId === app.id ? (
                                    <>
                                        <td className="p-3">
                                            <input
                                                value={formData.company_name}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        company_name: e.target.value,
                                                    })
                                                }
                                                className="border p-1 rounded w-full"
                                            />
                                        </td>

                                        <td className="p-3">
                                            <input
                                                value={formData.job_title}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        job_title: e.target.value,
                                                    })
                                                }
                                                className="border p-1 rounded w-full"
                                            />
                                        </td>

                                        <td className="p-3">{app.status}</td>

                                        <td className="p-3">{app.applied_date || "—"}</td>

                                        <td className="p-3">
                                            <button
                                                onClick={() => {
                                                    updateMutation.mutate({
                                                        id: app.id,
                                                        data: formData,
                                                    });
                                                    setEditingId(null);
                                                }}
                                                className="bg-brand-500 hover:bg-brand-600 text-white px-2 py-1 rounded mr-2"
                                            >
                                                Save
                                            </button>

                                            <button
                                                onClick={() => setEditingId(null)}
                                                className="text-gray-500"
                                            >
                                                Cancel
                                            </button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="p-3 font-medium">{app.company_name}</td>

                                        <td className="p-3 text-gray-600">{app.job_title}</td>

                                        <td className="p-3">
                                            <StatusBadge status={app.status} />
                                        </td>

                                        <td className="p-3 text-gray-500">
                                            {app.applied_date || "—"}
                                        </td>

                                        <td className="p-3 flex gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditingId(app.id);
                                                    setFormData(app);
                                                }}
                                                className="text-brand-500"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => deleteMutation.mutate(app.id)}
                                                className="text-red-500"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </>
                                )}

                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <div className="flex justify-between items-center mt-4">

                {/* Total */}
                <div className="text-sm text-gray-500">
                    Total: {data?.count || 0}
                </div>

                {/* Buttons */}
                <div className="flex gap-2">

                    <button
                        disabled={!data?.previous}
                        onClick={() => setPage((p) => p - 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <span className="px-3 py-1">
                        Page {page}
                    </span>

                    <button
                        disabled={!data?.next}
                        onClick={() => setPage((p) => p + 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>

                </div>
            </div>
        </div>
        // </ProtectedRoute>
    );
}