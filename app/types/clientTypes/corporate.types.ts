import { CorporateAnnouncement } from "../sharedTypes/corporate.types";

export interface UserCorporateAnnouncement
    extends CorporateAnnouncement {
    isRead: boolean;
}