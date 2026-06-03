import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export const useAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],

    queryFn: async () => {
      const res = await api.get(
        "/applications/analytics/"
      );

      return res.data.data;
    },
  });
};