"use client";

import { Menu, Bell, Search, X } from "lucide-react";
import { useState } from "react";
import { useProfile } from "@/hooks/useProfile";

export default function Header({
  onMenuClick,
  onSearch,
}: {
  onMenuClick?: () => void;
  onSearch?: (query: string) => void;
}) {
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { data: profile } = useProfile();
  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  const clearSearch = () => {
    setSearchValue("");
    onSearch?.("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch?.(searchValue);
    }
    if (e.key === "Escape") {
      clearSearch();
    }
  };

  return (
    <header className="h-16 ml-64 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-40">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <Menu size={22} />
        </button>

        {/* Search */}
        <div className="relative hidden md:block">
          <div
            className={`flex items-center bg-gray-100 rounded-2xl px-4 py-2.5 w-80 transition-all duration-200 border
              ${isFocused 
                ? "border-blue-500 bg-white shadow-sm ring-1 ring-blue-200" 
                : "border-transparent hover:bg-gray-50"
              }`}
          >
            <Search size={18} className="text-gray-400 flex-shrink-0" />

            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
              className="bg-transparent outline-none ml-3 text-sm w-full placeholder:text-gray-400"
            />

            {searchValue && (
              <button
                onClick={clearSearch}
                className="ml-2 p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg">
            {profile?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">
              {profile?.name || "Loading..."}
            </p>
            <p className="text-xs text-gray-500">
              {profile?.email}
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}