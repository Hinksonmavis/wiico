export type NotificationType = string;

export interface NotificationMetadata {
    [key: string]: unknown;
}

export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    metadata?: NotificationMetadata | null;
    isRead: boolean;
    readAt: string | Date | null;
    createdAt: string | Date;
}