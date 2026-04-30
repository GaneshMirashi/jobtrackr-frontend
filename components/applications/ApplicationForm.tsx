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
        setSuccess("Application created!");
        reset();
      },
    });
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-surface-border shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Add Application</h2>

      {success && (
        <div className="text-green-600 text-sm mb-2">{success}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        
        <input
          {...register("company_name")}
          placeholder="Company Name"
          className="w-full p-2 border border-surface-border rounded"
        />

        <input
          {...register("job_title")}
          placeholder="Job Title"
          className="w-full p-2 border border-surface-border rounded"
        />

        <select
          {...register("status")}
          className="w-full p-2 border border-surface-border rounded"
        >
          <option value="APPLIED">Applied</option>
          <option value="SCREENING">Screening</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
          <option value="WITHDRAWN">Withdrawn</option>
        </select>

        <input
          type="date"
          {...register("applied_date")}
          className="w-full p-2 border border-surface-border rounded"
        />

        <input
          type="date"
          {...register("follow_up_date")}
          className="w-full p-2 border border-surface-border rounded"
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-brand-500 hover:bg-brand-600 text-white py-2 rounded"
        >
          {isPending ? "Creating..." : "Add Application"}
        </button>
      </form>
    </div>
  );
}