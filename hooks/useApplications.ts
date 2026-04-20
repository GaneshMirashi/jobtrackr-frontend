import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

export const useApplications = (params: {
  search?: string;
  status?: string;
  page?: number;
}) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: ["applications", params],
    queryFn: async () => {
      const res = await api.get("/applications/", {
        params,
      });
      return res.data; 
    },
    enabled: isAuthenticated,
  });
};