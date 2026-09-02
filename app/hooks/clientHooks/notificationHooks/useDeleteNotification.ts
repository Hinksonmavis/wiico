"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { notificationKeys } from "./notification.keys";
import { notificationService } from "@/app/services/clientServices/notification.service";

export function useDeleteNotification() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn:
            notificationService.delete,

        onSuccess: async () => {

            await Promise.all([

                queryClient.invalidateQueries({
                    queryKey:
                        notificationKeys.list(),
                }),

                queryClient.invalidateQueries({
                    queryKey:
                        notificationKeys.unread(),
                }),
            ]);
        },
    });
}