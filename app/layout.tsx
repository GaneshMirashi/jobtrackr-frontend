"use client";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setTokens = useAuthStore((state) => state.setTokens);

  useEffect(() => {
    const access = localStorage.getItem("access_token");
    const refresh = localStorage.getItem("refresh_token");

    if (access && refresh) {
      setTokens(access, refresh);
    }
  }, [setTokens]);

  return (
    <html>
      <body>
        <QueryClientProvider client={queryClient}>
           <Toaster position="top-right" />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}