import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

export const useNotifications = () => {

    return useQuery({
        queryKey: ["notifications"],

        queryFn: async () => {

            const response = await api.get(
                "/applications/notifications/"
            );

            return response.data;
        },
    });
};