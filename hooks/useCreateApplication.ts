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
      // ✅ Refresh applications list
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });

      // ✅ Refresh dashboard stats
      queryClient.invalidateQueries({
        queryKey: ["stats"],
      });

      // ✅ Refresh kanban
      queryClient.invalidateQueries({
        queryKey: ["kanban"],
      });

      toast.success("Application added successfully 🚀");
    },

    onError: () => {
      toast.error("Failed to add application ❌");
    },
  });
};