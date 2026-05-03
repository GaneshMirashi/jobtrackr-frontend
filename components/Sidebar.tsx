"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function Sidebar() {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Applications", href: "/applications" },
    { name: "Kanban", href: "/kanban" },
    { name: "Reminders", href: "/reminders" },
    { name: "Resume AI", href: "/resume" },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-surface-border p-4 flex flex-col">
      
      {/* Logo */}
      <h1 className="text-xl font-semibold mb-6">
        JobTrackr
      </h1>

      {/* Navigation */}
      <div className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-2 rounded-lg text-sm ${
              pathname === item.href
                ? "bg-brand-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="mt-auto text-red-500 text-sm"
      >
        Logout
      </button>
    </div>
  );
}