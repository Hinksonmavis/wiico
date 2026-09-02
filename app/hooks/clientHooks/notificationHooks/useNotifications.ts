"use client";

import { useQuery } from "@tanstack/react-query";
import { notificationKeys } from "./notification.keys";
import { notificationService } from "@/app/services/clientServices/notification.service";

export function useNotifications() {

    return useQuery({

        queryKey:
            notificationKeys.list(),

        queryFn:
            notificationService.getAll,

        staleTime:
            30_000,

        refetchInterval:
            30_000,
    });
}