"use client";

import { useForm } from "react-hook-form";
import { useCreateApplication } from "@/hooks/useCreateApplication";
import { useState } from "react";

type FormData = {
  company_name: string;
  job_title: string;
  status: string;
  applied_date: string;
  follow_up_date: string;
};

export default function ApplicationForm() {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const { mutate, isPending } = useCreateApplication();

  const [success, setSuccess] = useState("");

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: () => {
        setSuccess("Application created successfully 🚀");
        reset();

        setTimeout(() => {
          setSuccess("");
        }, 3000);
      },
    });
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">

      {/* Header */}
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-900">
          Add Application
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Track your latest job opportunity
        </p>
      </div>

      {/* Success */}
      {success && (
        <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>

          <input
            {...register("company_name")}
            placeholder="Google"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Title
          </label>

          <input
            {...register("job_title")}
            placeholder="Frontend Developer"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>

          <select
            {...register("status")}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="APPLIED">Applied</option>
            <option value="SCREENING">Screening</option>
            <option value="INTERVIEW">Interview</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTED">Rejected</option>
            <option value="WITHDRAWN">Withdrawn</option>
          </select>
        </div>

        {/* Applied Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Applied Date
          </label>

          <input
            type="date"
            {...register("applied_date")}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Follow Up */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Follow Up Date
          </label>

          <input
            type="date"
            {...register("follow_up_date")}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-blue-600 py-3 text-white font-medium transition hover:bg-blue-700 disabled:opacity-70"
          >
            {isPending ? "Creating..." : "Add Application"}
          </button>
        </div>
      </form>
    </div>
  );
}