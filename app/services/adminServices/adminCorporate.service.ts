import { AdminCorporateAnnouncement, CreateCorporateAnnouncementPayload, UpdateCorporateAnnouncementPayload } from "@/app/types/adminTypes/adminCorporate.types";
import { api } from "../api";

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export const adminCorporateService = {

    // =========================================================
    // ADMIN — CORPORATE ANNOUNCEMENTS
    // =========================================================

    async getAll() {

        const response =
            await api.get<
                ApiResponse<AdminCorporateAnnouncement[]>
            >(
                "/admin/corporate",
            );

        return response.data;
    },

    async getOne(
        id: string,
    ) {

        const response =
            await api.get<
                ApiResponse<AdminCorporateAnnouncement>
            >(
                `/admin/corporate/${id}`,
            );

        return response.data;
    },

    async create(
        data: CreateCorporateAnnouncementPayload,
    ) {

        const response =
            await api.post<
                ApiResponse<AdminCorporateAnnouncement>
            >(
                "/admin/corporate",
                data,
            );

        return response.data;
    },

    async update(
        id: string,
        data: UpdateCorporateAnnouncementPayload,
    ) {

        const response =
            await api.patch<
                ApiResponse<AdminCorporateAnnouncement>
            >(
                `/admin/corporate/${id}`,
                data,
            );

        return response.data;
    },

    async publish(
        id: string,
    ) {

        const response =
            await api.patch<
                ApiResponse<AdminCorporateAnnouncement>
            >(
                `/admin/corporate/${id}/publish`,
            );

        return response.data;
    },

    async unpublish(
        id: string,
    ) {

        const response =
            await api.patch<
                ApiResponse<AdminCorporateAnnouncement>
            >(
                `/admin/corporate/${id}/unpublish`,
            );

        return response.data;
    },

    async delete(
        id: string,
    ): Promise<void> {

        await api.delete(
            `/admin/corporate/${id}`,
        );
    },
};