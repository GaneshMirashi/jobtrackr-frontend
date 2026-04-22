import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export const useStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await api.get("/applications/stats/");
      return res.data.data;
    },
  });
};