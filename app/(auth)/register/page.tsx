"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setError("");

      await api.post("/auth/register/", data);

      // After successful registration → go to login
      router.push("/auth/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-page flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-surface-border">
          
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Create account 🚀
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Start tracking your job applications
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 bg-red-50 text-red-600 text-sm p-2 rounded">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="Your name"
                className="mt-1 w-full px-3 py-2 border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                className="mt-1 w-full px-3 py-2 border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className="mt-1 w-full px-3 py-2 border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-500 hover:bg-brand-600 text-white py-2 rounded-lg transition duration-200"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-gray-500 text-center mt-4">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/auth/login")}
              className="text-brand-500 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}