import type { Metadata } from "next";

import { NotificationsPage } from "@/app/components/notification/NotificationsPage";

export const metadata: Metadata = {
    title: "System Notifications",
    description: "Security alerts, account activity, rewards and system updates.",
};

export default function Page() {

    return (
        <div
            className="pt-6"
        >
            <NotificationsPage />
        </div>
    );
}