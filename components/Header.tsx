"use client";

import { Menu, Bell, Search } from "lucide-react";

export default function Header({
  onMenuClick,
}: {
  onMenuClick?: () => void;
}) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-40">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu */}
        <button
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu size={22} />
        </button>

        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-3 py-2 w-72">
          <Search size={18} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2 text-sm w-full"
          />
        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* Notifications */}
        <button className="relative">
          <Bell size={20} className="text-gray-600" />

          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            G
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">
              Ganesh
            </p>

            <p className="text-xs text-gray-500">
              Python Developer
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}