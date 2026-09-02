"use client";

import {
    useQuery,
} from "@tanstack/react-query";

import {
    corporateKeys,
} from "./corporateKeys";

import {
    corporateService,
} from "@/app/services/clientServices/corporate.service";

export function useCorporateAnnouncements() {

    return useQuery({

        queryKey:
            corporateKeys.announcements(),

        queryFn:
            corporateService.getAnnouncements,

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