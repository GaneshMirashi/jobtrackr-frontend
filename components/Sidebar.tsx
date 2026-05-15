"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import {
  LayoutDashboard,
  Briefcase,
  Kanban,
  Bell,
  FileText,
  LogOut,
} from "lucide-react";

export default function Sidebar({
  onClose,
}: {
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Applications",
      href: "/applications",
      icon: Briefcase,
    },
    {
      name: "Kanban",
      href: "/kanban",
      icon: Kanban,
    },
    {
      name: "Reminders",
      href: "/reminders",
      icon: Bell,
    },
    {
      name: "Resume AI",
      href: "/resume",
      icon: FileText,
    },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 shadow-sm p-5 flex flex-col">

      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-600">
          JobTrackr
        </h1>

        <p className="text-xs text-gray-500 mt-1">
          Track your career journey
        </p>
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <button
        onClick={() => {
          logout();
          onClose?.();
        }}
        className="mt-auto flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}