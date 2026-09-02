import { SupportConversationStatus } from "../sharedTypes/support.types";

export interface UserSupportConversation {
    id: string;
    status: SupportConversationStatus;

    lastMessageAt: string | Date | null;

    userUnreadCount: number;

    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface UserSupportMessage {
    id: string;
    conversationId: string;

    senderId: string;
    senderType: "user" | "admin";

    message: string;

    isRead: boolean;
    readAt: string | Date | null;

    createdAt: string | Date;
}

export interface SendSupportMessagePayload {
    message: string;
}