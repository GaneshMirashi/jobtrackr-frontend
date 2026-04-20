import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/applications/", data);
      return res.data.data;
    },
    onSuccess: () => {
      // Refresh applications list
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
};