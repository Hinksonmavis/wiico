import { UserSupportConversation, UserSupportMessage } from "@/app/types/clientTypes/support.types";
import { api } from "../api";

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export const supportService = {

    // =========================================================
    // USER SUPPORT
    // =========================================================

    async getMyConversation() {

        const response =
            await api.get<
                ApiResponse<UserSupportConversation>
            >(
                "/support/me",
            );

        return response.data;
    },

    async getMyMessages() {

        const response =
            await api.get<
                ApiResponse<UserSupportMessage[]>
            >(
                "/support/me/messages",
            );

        return response.data;
    },

    async sendMessage(
        message: string,
    ) {

        const response =
            await api.post<
                ApiResponse<UserSupportMessage>
            >(
                "/support/me/messages",
                {
                    message,
                },
            );

        return response.data;
    },

    async markAsRead(): Promise<void> {

        await api.patch(
            "/support/me/read",
        );
    },
};