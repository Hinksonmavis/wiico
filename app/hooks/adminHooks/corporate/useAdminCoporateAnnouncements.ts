"use client";

import { useQuery } from "@tanstack/react-query";
import { adminCorporateKeys } from "./adminCorporateKeys";
import { adminCorporateService } from "@/app/services/adminServices/adminCorporate.service";


export function useAdminCorporateAnnouncements() {

    return useQuery({

        queryKey:
            adminCorporateKeys.announcements(),

        queryFn:
            adminCorporateService.getAll,

        staleTime:
            10_000,

        refetchInterval:
            10_000,
    });
}