import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export const useResumeAnalyzer = () => {
  return useMutation({
    mutationFn: async (text: string) => {
      const res = await api.post("/applications/resume-analyze/", {
        text,
      });
      return res.data.data;
    },
  });
};