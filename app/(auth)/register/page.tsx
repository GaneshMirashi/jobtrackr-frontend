// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import api from "@/lib/api";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// const schema = z.object({
//   name: z.string().min(2, "Name is required"),
//   email: z.string().email("Enter a valid email"),
//   password: z.string().min(6, "Minimum 6 characters"),
// });

// type FormData = z.infer<typeof schema>;

// export default function RegisterPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//   });

//   const onSubmit = async (data: FormData) => {
//     try {
//       setLoading(true);
//       setError("");

//       await api.post("/auth/register/", data);

//       // After successful registration → go to login
//       router.push("/login");
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-surface-page flex items-center justify-center px-4">
//       <div className="w-full max-w-md">
//         {/* Card */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 border border-surface-border">
          
//           {/* Header */}
//           <div className="mb-6 text-center">
//             <h1 className="text-2xl font-semibold text-gray-900">
//               Create account 🚀
//             </h1>
//             <p className="text-sm text-gray-500 mt-1">
//               Start tracking your job applications
//             </p>
//           </div>

//           {/* Error */}
//           {error && (
//             <div className="mb-4 bg-red-50 text-red-600 text-sm p-2 rounded">
//               {error}
//             </div>
//           )}

//           {/* Form */}
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
//             {/* Name */}
//             <div>
//               <label className="text-sm font-medium text-gray-700">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 {...register("name")}
//                 placeholder="Your name"
//                 className="mt-1 w-full px-3 py-2 border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
//               />
//               {errors.name && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.name.message}
//                 </p>
//               )}
//             </div>

//             {/* Email */}
//             <div>
//               <label className="text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 {...register("email")}
//                 placeholder="you@example.com"
//                 className="mt-1 w-full px-3 py-2 border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>

//             {/* Password */}
//             <div>
//               <label className="text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 {...register("password")}
//                 placeholder="••••••••"
//                 className="mt-1 w-full px-3 py-2 border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//             {/* Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-brand-500 hover:bg-brand-600 text-white py-2 rounded-lg transition duration-200"
//             >
//               {loading ? "Creating account..." : "Register"}
//             </button>
//           </form>

//           {/* Footer */}
//           <p className="text-sm text-gray-500 text-center mt-4">
//             Already have an account?{" "}
//             <span
//               onClick={() => router.push("/login")}
//               className="text-brand-500 cursor-pointer hover:underline"
//             >
//               Login
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



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

      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white shadow-2xl rounded-3xl p-8 border border-gray-100">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Create Account 🚀
            </h1>

            <p className="text-gray-500 mt-2 text-sm">
              Start tracking your job applications
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                {...register("name")}
                placeholder="John Doe"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3 text-white font-medium transition hover:bg-blue-700 disabled:opacity-70"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="cursor-pointer font-medium text-blue-600 hover:underline"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}