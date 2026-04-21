import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export const useKanban = () => {
  return useQuery({
    queryKey: ["kanban"],
    queryFn: async () => {
      const res = await api.get("/applications/kanban/");
      return res.data.data;
    },
  });
};