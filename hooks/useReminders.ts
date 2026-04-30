import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export const useReminders = () => {
  return useQuery({
    queryKey: ["reminders"],
    queryFn: async () => {
      const res = await api.get("/applications/reminders/");
      return res.data.data;
    },
  });
};