"use client";

import { useQuery } from "@tanstack/react-query";
import { adminCorporateKeys } from "./adminCorporateKeys";
import { adminCorporateService } from "@/app/services/adminServices/adminCorporate.service";

export function useAdminCorporateAnnouncement(
    id: string,
) {

    return useQuery({

        queryKey:
            adminCorporateKeys.announcement(id),

        queryFn: () =>
            adminCorporateService.getOne(id),

        enabled:
            Boolean(id),

        staleTime:
            10_000,
    });
}