"use client";

import { useQuery } from "@tanstack/react-query";

import { referralService } from "@/app/services/clientServices/referral.service";

export const referralLinkKeys = {
    all: ["referral-link"] as const,

    link: () =>
        [...referralLinkKeys.all] as const,
};

/**
 * Fetch the authenticated user's
 * referral code and shareable referral link.
 */
export function useReferralLink() {

    return useQuery({
        queryKey: referralLinkKeys.link(),

        queryFn: async () => {
            const response =
                await referralService.getLink();

            return response.data;
        },

        staleTime: 5 * 60 * 1000,
    });
}