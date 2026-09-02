import type { Metadata } from "next";

import { CommunicationCenter } from "@/app/components/communication/CommunicationCenter";

export const metadata: Metadata = {
    title: "Communication Center",
    description: "View announcements, support conversations and system notifications.",
};

export default function CommunicationPage() {

    return (
        <main
            className="
                min-h-screen
                bg-white
                pb-[env(safe-area-inset-bottom)]
                pt-6
            "
        >

            <CommunicationCenter />

        </main>
    );
}