import { AdminSupportConversation, AdminSupportMessage } from "@/app/types/adminTypes/adminSupport.types";
import { api } from "../api";
import { SupportConversationStatus } from "@/app/types/sharedTypes/support.types";

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export const adminSupportService = {

    // =========================================================
    // ADMIN — SUPPORT CONVERSATIONS
    // =========================================================

    async getConversations() {

        const response =
            await api.get<
                ApiResponse<AdminSupportConversation[]>
            >(
                "/admin/support/conversations",
            );

        return response.data;
    },

    async getConversation(
        conversationId: string,
    ) {

        const response =
            await api.get<
                ApiResponse<AdminSupportConversation>
            >(
                `/admin/support/conversations/${conversationId}`,
            );

        return response.data;
    },

    async getMessages(
        conversationId: string,
    ) {

        const response =
            await api.get<
                ApiResponse<AdminSupportMessage[]>
            >(
                `/admin/support/conversations/${conversationId}/messages`,
            );

        return response.data;
    },

    async sendMessage(
        conversationId: string,
        message: string,
    ) {

        const response =
            await api.post<
                ApiResponse<AdminSupportMessage>
            >(
                `/admin/support/conversations/${conversationId}/messages`,
                {
                    message,
                },
            );

        return response.data;
    },

    async markAsRead(
        conversationId: string,
    ): Promise<void> {

        await api.patch(
            `/admin/support/conversations/${conversationId}/read`,
        );
    },

    async updateStatus(
        conversationId: string,
        status: SupportConversationStatus,
    ) {

        const response =
            await api.patch<
                ApiResponse<AdminSupportConversation>
            >(
                `/admin/support/conversations/${conversationId}/status`,
                {
                    status,
                },
            );

        return response.data;
    },
};