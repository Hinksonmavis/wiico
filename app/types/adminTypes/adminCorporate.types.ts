import {
    CorporateAnnouncement,
} from "../sharedTypes/corporate.types";

export type AdminCorporateAnnouncement =
    CorporateAnnouncement;

export interface CreateCorporateAnnouncementPayload {
    title: string;
    message: string;
    isPublished?: boolean;
}

export interface UpdateCorporateAnnouncementPayload {
    title?: string;
    message?: string;
    isPublished?: boolean;
}