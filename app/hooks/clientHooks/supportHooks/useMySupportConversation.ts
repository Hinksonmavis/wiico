"use client";

import {
    useQuery,
} from "@tanstack/react-query";

import {
    supportKeys,
} from "./supportKeys";

import {
    supportService,
} from "@/app/services/clientServices/support.service";

export function useMySupportConversation() {

    return useQuery({

        queryKey:
            supportKeys.conversation(),

        queryFn:
            supportService.getMyConversation,

        staleTime:
            5_000,

        refetchInterval:
            5_000,

        refetchIntervalInBackground:
            true,

        refetchOnWindowFocus:
            true,

        refetchOnReconnect:
            true,
    });
}