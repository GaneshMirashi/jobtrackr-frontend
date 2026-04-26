import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export const useResumeAnalyzer = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
  const res = await api.post("/applications/resume-analyze/", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.data;
},
  });
};