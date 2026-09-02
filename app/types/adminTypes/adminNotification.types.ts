import { BaseNotification } from "../sharedTypes/notification.types";

export interface AdminNotification
    extends BaseNotification {
    adminId: string;
}