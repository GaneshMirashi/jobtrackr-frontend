import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "react-hot-toast";

export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/applications/", data);
      return res.data.data;
    },
    onSuccess: () => {
      toast.success("Application added 🚀");
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },

    onError: () => {
      toast.error("Failed to add application ❌");
    },
  });
};