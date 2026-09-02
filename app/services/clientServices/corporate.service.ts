import { UserCorporateAnnouncement } from "@/app/types/clientTypes/corporate.types";
import { api } from "../api";

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export const corporateService = {

    // =========================================================
    // ANNOUNCEMENTS
    // =========================================================

    async getAnnouncements() {

        const response =
            await api.get<
                ApiResponse<UserCorporateAnnouncement[]>
            >(
                "/corporate",
            );

        return response.data;
    },

    async markAsRead(
        announcementId: string,
    ): Promise<void> {

        await api.patch(
            `/corporate/${announcementId}/read`,
        );
    },
};