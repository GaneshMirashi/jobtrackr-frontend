import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export const useCalendarEvents = () => {
  return useQuery({
    queryKey: ["calendar-events"],

    queryFn: async () => {
      const res = await api.get("/calendar-events/");
      return res.data;
    },
  });
};