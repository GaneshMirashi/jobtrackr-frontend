import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export const useCalendarEvents = () => {
  return useQuery({
    queryKey: ["calendar-events"],
    queryFn: async () => {
      const response = await api.get(
        "/applications/calendar/events/"
      );

      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};