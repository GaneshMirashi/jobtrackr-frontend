import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export const useResumeAnalyzer = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      let res;

      if (payload instanceof FormData) {
        // File upload
        res = await api.post("/resume/resume-analyze/", payload);
      } else {
        // Text input
        res = await api.post("/resume/resume-analyze/", {
          text: payload,
        });
      }

      return res.data.data;
    },
  });
};