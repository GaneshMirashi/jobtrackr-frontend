import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export const useMoveApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
      position,
    }: {
      id: number;
      status: string;
      position: number;
    }) => {
      await api.patch(`/applications/${id}/move/`, {
        status,
        position,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kanban"] });
    },
  });
};