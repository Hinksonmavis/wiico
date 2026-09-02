import axiosInstance from "@/app/lib/axios";

import {
    ReferralResponse,
    ReferralStatsResponse,
    ReferralLinkResponse,
} from "@/app/types/clientTypes/referral.types";

class ReferralService {

    /**
     * Returns the authenticated user's
     * referral network.
     */
    async getReferrals(): Promise<ReferralResponse> {

        const response =
            await axiosInstance.get<ReferralResponse>(
                "/referrals",
            );

        return response.data;
    }

    /**
     * Returns referral statistics.
     */
    async getStats(): Promise<ReferralStatsResponse> {

        const response =
            await axiosInstance.get<ReferralStatsResponse>(
                "/referrals/stats",
            );

        return response.data;
    }

    // Returns the authenticated user's referral code and shareable link.
    async getLink(): Promise<ReferralLinkResponse> {

        const response =
            await axiosInstance.get<ReferralLinkResponse>(
                "/referrals/link",
            );

        return response.data;
    }
}

export const referralService =
    new ReferralService();