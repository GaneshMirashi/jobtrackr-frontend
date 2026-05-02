import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "react-hot-toast";

// export const useDeleteApplication = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (id: number) => {
//       await api.delete(`/applications/${id}/`);
//     },
//     onSuccess: () => {
//       toast.success("Deleted successfully");
//       queryClient.invalidateQueries({ queryKey: ["applications"] });
//     },
//     onError: () => {
//       toast.error("Delete failed");
//     }
//   });
// };


export const useDeleteApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      api.delete(`/applications/${id}/`),

    // ⚡ Optimistic update
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["applications"] });

      const previous = queryClient.getQueryData<any>(["applications"]);

      queryClient.setQueryData(["applications"], (old: any[]) =>
        old?.filter((item) => item.id !== id)
      );

      return { previous };
    },

    onError: (err, id, context) => {
      queryClient.setQueryData(["applications"], context?.previous);
      toast.error("Delete failed");
    },

    onSuccess: () => {
      toast.success("Deleted");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
};