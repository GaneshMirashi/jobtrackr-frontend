"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { LayoutDashboard, Briefcase, Kanban, Bell, FileText } from "lucide-react";

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Applications", href: "/applications", icon: Briefcase },
    { name: "Kanban", href: "/kanban", icon: Kanban },
    { name: "Reminders", href: "/reminders", icon: Bell },
    { name: "Resume AI", href: "/resume", icon: FileText },
  ];

  return (
    <div className="w-64 h-full bg-white border-r p-4 flex flex-col">
      <h1 className="text-xl font-semibold mb-6">JobTrackr</h1>

      <div className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose} // 👈 closes mobile drawer
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                pathname === item.href
                  ? "bg-brand-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={16} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <button
        onClick={() => {
          logout();
          onClose?.();
        }}
        className="mt-auto text-red-500 text-sm"
      >
        Logout
      </button>
    </div>
  );
}