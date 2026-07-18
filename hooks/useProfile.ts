import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get("/auth/profile/");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}