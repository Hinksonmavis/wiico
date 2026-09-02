"use client";

import { useQuery } from "@tanstack/react-query";

import { referralService } from "@/app/services/clientServices/referral.service";

export const referralKeys = {
    all: ["referrals"] as const,

    network: () =>
        [...referralKeys.all, "network"] as const,
};

/**
 * Fetch the authenticated user's referral network.
 *
 * Returns:
 * - direct
 * - level1
 * - level2
 * - level3
 */
export function useReferral() {

    return useQuery({
        queryKey: referralKeys.network(),

        queryFn: async () => {
            const response =
                await referralService.getReferrals();

            return response.data;
        },

        staleTime: 60 * 1000,
    });
}