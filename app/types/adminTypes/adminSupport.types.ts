import { SupportConversationStatus, SupportMessage } from "../sharedTypes/support.types";

export interface AdminSupportConversation {
    id: string;

    userId: string;

    status: SupportConversationStatus;

    lastMessageAt: string | Date | null;

    userUnreadCount: number;
    adminUnreadCount: number;

    createdAt: string | Date;
    updatedAt: string | Date;

    userPhone?: string;
    userEmail?: string | null;
    userReferralCode?: string | null;
}

export interface AdminSupportMessage extends SupportMessage {}

export interface AdminSendSupportMessagePayload {
    message: string;
}

export interface UpdateSupportConversationStatusPayload {
    status: SupportConversationStatus;
}