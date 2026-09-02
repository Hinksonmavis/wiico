"use client";

import {
    ArrowLeft,
} from "lucide-react";

import { useRouter } from "next/navigation";

interface NotificationsHeaderProps {
    unreadCount: number;
}

export function NotificationsHeader({
    unreadCount,
}: NotificationsHeaderProps) {

    const router = useRouter();

    return (
        <div
            className="
                mb-5
                flex
                items-center
                gap-3
            "
        >

            <button
                type="button"
                aria-label="Go back"
                onClick={() =>
                    router.back()
                }
                className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-slate-200
                    bg-white
                    shadow-sm
                    active:scale-95
                "
            >
                <ArrowLeft size={18} />
            </button>

            <div className="min-w-0 flex-1">

                <h1
                    className="
                        text-xl
                        font-bold
                        text-slate-950
                    "
                >
                    System Notifications
                </h1>

                <p
                    className="
                        text-xs
                        text-slate-500
                    "
                >
                    {unreadCount} unread
                </p>

            </div>

        </div>
    );
}