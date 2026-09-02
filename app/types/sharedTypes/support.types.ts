export type SupportConversationStatus =
    | "open"
    | "closed";

export type SupportSenderType =
    | "user"
    | "admin";

export interface SupportConversation {
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

export interface SupportMessage {
    id: string;
    conversationId: string;
    senderId: string;
    senderType: SupportSenderType;

    message: string;

    isRead: boolean;
    readAt: string | Date | null;

    createdAt: string | Date;

    senderPhone?: string;
    senderEmail?: string | null;
}