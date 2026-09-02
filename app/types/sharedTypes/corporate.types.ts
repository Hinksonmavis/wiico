export interface CorporateAnnouncement {
    id: string;
    title: string;
    message: string;
    isPublished: boolean;
    publishedAt: string | Date | null;
    createdAt: string | Date;
    updatedAt: string | Date;

    // Present on user endpoint
    isRead?: boolean;
}