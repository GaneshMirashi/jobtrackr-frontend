"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import StatusBadge from "@/components/applications/StatusBadge";
import ResumeUpload from "@/components/applications/ResumeUpload";
import NotesEditor from "@/components/applications/NotesEditor";
import InterviewCard from "@/components/applications/InterviewCard";
import {
    ArrowLeft,
    Building2,
    Calendar,
    MapPin,
    IndianRupee,
    FileText,
    Bell,
    ArrowRightLeft,
    Pencil,
    Trash2,
} from "lucide-react";
import { useDeleteApplication } from "@/hooks/useDeleteApplication";
import { useUpdateApplication } from "@/hooks/useUpdateApplication";


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


    const deleteMutation = useDeleteApplication();
    const updateMutation = useUpdateApplication();

    const handleDelete = () => {
        const confirmed = confirm(
            "Are you sure you want to delete this application?"
        );

        if (!confirmed) return;

        deleteMutation.mutate(app.id, {
            onSuccess: () => {
                router.push("/applications");
            },
        });
    };

    const handleMoveStatus = () => {
        const nextStatus = prompt(
            "Enter new status:\nAPPLIED\nSCREENING\nINTERVIEW\nOFFER\nREJECTED\nWITHDRAWN",
            app.status
        );

        if (!nextStatus) return;

        updateMutation.mutate({
            id: app.id,
            data: {
                status: nextStatus,
            },
        });
    };


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
                <NotesEditor
                    applicationId={app.id}
                    initialNotes={app.notes}
                />


                {/* Quick Actions */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">

                    <h2 className="text-xl font-semibold text-gray-900 mb-5">
                        Quick Actions
                    </h2>

                    <div className="space-y-4">

                        {/* Edit */}
                        <button
                            onClick={() =>
                                router.push(`/applications/${app.id}/edit`)
                            }
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl transition shadow-sm"
                        >
                            <Pencil size={18} />
                            Edit Application
                        </button>

                        {/* Move Status */}
                        <button
                            onClick={handleMoveStatus}
                            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl transition shadow-sm"
                        >
                            <ArrowRightLeft size={18} />
                            Move Status
                        </button>

                        {/* Delete */}
                        <button
                            onClick={handleDelete}
                            disabled={deleteMutation.isPending}
                            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl transition shadow-sm disabled:opacity-70"
                        >
                            <Trash2 size={18} />

                            {deleteMutation.isPending
                                ? "Deleting..."
                                : "Delete Application"}
                        </button>

                    </div>

                    {/* Current Status */}
                    <div className="mt-6 rounded-2xl bg-gray-50 border border-gray-100 p-4">
                        <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
                            Current Status
                        </p>

                        <p className="text-sm font-semibold text-gray-800">
                            {app.status}
                        </p>
                    </div>

                </div>
                <ResumeUpload
                    appId={app.id}
                    resume={app.resume}
                />
            </div>

            <InterviewCard app={app} />


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