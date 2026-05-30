import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export const useActivities = (id: string) => {
  return useQuery({
    queryKey: ["activities", id],

    queryFn: async () => {
      const res = await api.get(
        `/applications/${id}/activities/`
      );

      return res.data.data;
    },
  });
};