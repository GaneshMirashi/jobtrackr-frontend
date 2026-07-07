"use client";

import { useEffect, useState } from "react";
import { useDeleteApplication } from "@/hooks/useDeleteApplication";
import Link from "next/link";
import { useUpdateApplication } from "@/hooks/useUpdateApplication";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useApplications } from "@/hooks/useApplications";
import ApplicationForm from "@/components/applications/ApplicationForm";
import StatusBadge from "@/components/applications/StatusBadge";
import api from "@/lib/api";

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
        <div className="min-h-screen ml-64 bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-6">
            <div className="flex items-center justify-between mb-6">

                <h1 className="text-3xl font-bold text-gray-900">
                    Applications
                </h1>

                <button
                    onClick={async () => {

                        const response = await api.get(
                            "/applications/export/csv/",
                            {
                                responseType: "blob",
                            }
                        );

                        const url = window.URL.createObjectURL(
                            new Blob([response.data])
                        );

                        const link = document.createElement("a");

                        link.href = url;

                        link.setAttribute(
                            "download",
                            "applications.csv"
                        );

                        document.body.appendChild(link);

                        link.click();
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow-sm"
                >
                    Export CSV
                </button>

            </div>

            {/* ✅ ALWAYS SHOW FORM */}
            <ApplicationForm />

            {/* Loading */}
            {isLoading && <div className="mt-4">Loading...</div>}

            {!isLoading && data?.length === 0 && (
                <div className="mt-4 text-gray-500">
                    No applications found. Add your first one 🚀
                </div>
            )}

            <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-4 flex gap-3">

                {/* 🔍 Search */}
                <input
                    type="text"
                    placeholder="Search company or role..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                />

                {/* 🎯 Filter */}
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
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
            <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-sm">

                    {/* HEADER */}
                    <thead className="bg-gray-50 text-left">
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
                            <tr key={app.id} className="border-t border-gray-100 hover:bg-blue-50/40 transition">

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
                                        <td className="p-4 font-semibold text-gray-900"><Link
                                            href={`/applications/${app.id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {app.company_name}
                                        </Link></td>

                                        <td className="p-4 text-gray-500">{app.job_title}</td>

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