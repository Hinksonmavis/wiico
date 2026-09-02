import {
    Notification,
} from "@/app/types/clientTypes/notification.types";

import { api } from "../api";

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export const notificationService = {

    // =========================================================
    // USER NOTIFICATIONS
    // =========================================================

    async getAll(): Promise<Notification[]> {

        const response =
            await api.get<
                ApiResponse<Notification[]>
            >(
                "/notifications",
            );

        return response.data;
    },

    async getUnread(): Promise<Notification[]> {

        const response =
            await api.get<
                ApiResponse<Notification[]>
            >(
                "/notifications/unread",
            );

        return response.data;
    },

    async markAsRead(
        notificationId: string,
    ): Promise<Notification> {

        const response =
            await api.patch<
                ApiResponse<Notification>
            >(
                `/notifications/${notificationId}/read`,
            );

        return response.data;
    },

    async markAllAsRead(): Promise<void> {

        await api.patch(
            "/notifications/read-all",
        );
    },

    async delete(
        notificationId: string,
    ): Promise<void> {

        await api.delete(
            `/notifications/${notificationId}`,
        );
    },

    async deleteAll(): Promise<void> {

        await api.delete(
            "/notifications",
        );
    },
};