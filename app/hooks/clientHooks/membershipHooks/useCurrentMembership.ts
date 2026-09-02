"use client";

import { membershipService } from "@/app/services/clientServices/membership.service";
import { useQuery } from "@tanstack/react-query";

export function useCurrentMembership() {
    return useQuery({
        queryKey: ["membership", "current"],

        queryFn: () =>
            membershipService.getCurrentMembership(),

        staleTime: 30_000,
    });
}