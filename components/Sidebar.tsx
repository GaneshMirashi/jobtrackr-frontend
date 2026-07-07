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
  Calendar,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Applications", href: "/applications", icon: Briefcase },
    { name: "Kanban", href: "/kanban", icon: Kanban },
    { name: "Reminders", href: "/reminders", icon: Bell },
    { name: "Resume AI", href: "/resume", icon: FileText },
    { name: "Calendar", href: "/calendar", icon: Calendar },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm z-50 flex flex-col overflow-y-auto">
      
      {/* Logo */}
      <div className="px-6 py-8 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-blue-600">JobTrackr</h1>
        <p className="text-xs text-gray-500 mt-1">Track your career journey</p>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100 mt-auto">
        <button
          onClick={() => {
            logout();
            window.location.href = "/login";
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}