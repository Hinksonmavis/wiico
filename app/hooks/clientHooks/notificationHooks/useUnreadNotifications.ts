"use client";

import {
    useQuery,
} from "@tanstack/react-query";

import {
    notificationKeys,
} from "./notification.keys";

import {
    notificationService,
} from "@/app/services/clientServices/notification.service";

export function useUnreadNotifications() {

    return useQuery({

        queryKey:
            notificationKeys.unread(),

        queryFn:
            notificationService.getUnread,

        staleTime:
            10_000,

        refetchInterval:
            10_000,

        refetchIntervalInBackground:
            true,

        refetchOnWindowFocus:
            true,

        refetchOnReconnect:
            true,
    });
}