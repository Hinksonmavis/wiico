"use client";

import {
    useRouter,
} from "next/navigation";

import {
    Bell,
    Building2,
    Headphones,
} from "lucide-react";

import {
    CommunicationHeader,
} from "./CommunicationHeader";

import {
    CommunicationCard,
} from "./CommunicationCard";
import { useChatUnread } from "@/app/hooks/clientHooks/chat/useChatUnread";
import { ROUTES } from "@/app/constants/routes";


export function CommunicationCenter() {

    const router = useRouter();

    const {
        notifications,
        corporate,
        support,
        isLoading,
        isFetching
    } = useChatUnread();

    const totalUnread = notifications + corporate + support;

    return (
        <div
            className="
                mx-auto
                w-full
                max-w-2xl
                px-4
                pb-8
                sm:px-0
            "
        >

            <CommunicationHeader />

            {/* =====================================================
                SUMMARY
            ====================================================== */}

            <div
                className="
                    mb-6
                    rounded-2xl
                    bg-gradient-to-br
                    from-[#1590FC]
                    to-[#0f6fd1]
                    p-5
                    text-white
                    shadow-sm
                    shadow-[#1590FC]/20
                "
            >

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-4
                    "
                >

                    <div className="min-w-0">

                        <p
                            className="
                                text-xs
                                font-medium
                                text-white/70
                            "
                        >
                            Communication Center
                        </p>

                        <h2
                            className="
                                mt-1
                                truncate
                                text-base
                                font-bold
                                sm:text-lg
                            "
                        >
                            {isLoading
                                ? "Checking updates…"
                                : totalUnread > 0
                                    ? "You have new updates"
                                    : "You're all caught up"}
                        </h2>

                    </div>

                    <div
                        aria-hidden={isLoading}
                        aria-label={
                            isLoading
                                ? undefined
                                : `${totalUnread} unread`
                        }
                        className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-white/15
                            text-lg
                            font-bold
                            tabular-nums
                            sm:h-12
                            sm:w-12
                            sm:text-xl
                        "
                    >
                        {isLoading
                            ? (
                                <span
                                    className="
                                        h-4
                                        w-4
                                        animate-pulse
                                        rounded-full
                                        bg-white/50
                                    "
                                />
                            )
                            : totalUnread}
                    </div>

                </div>

                <p
                    className="
                        mt-3
                        text-xs
                        leading-5
                        text-white/70
                    "
                >
                    Access company announcements, customer support and
                    system notifications from one place.
                </p>

            </div>

            {/* =====================================================
                CHANNELS
            ====================================================== */}

            <div className="space-y-2.5 sm:space-y-3">

               <CommunicationCard
                    title="Corporate"
                    description="Official announcements, company news and important updates."
                    icon={Building2}
                    unreadCount={corporate}
                    isLoading={isLoading}
                    isFetching={isFetching}
                    onClick={() =>
                        router.push(ROUTES.CORPORATE)
                    }
                />

                <CommunicationCard
                    title="Support"
                    description="Contact support, view your conversation and get assistance."
                    icon={Headphones}
                    unreadCount={support}
                    isLoading={isLoading}
                    isFetching={isFetching}
                    onClick={() =>
                        router.push(ROUTES.SUPPORT)
                    }
                />

                <CommunicationCard
                    title="System Notifications"
                    description="Security alerts, account activity, rewards and system updates."
                    icon={Bell}
                    unreadCount={notifications}
                    isLoading={isLoading}
                    isFetching={isFetching}
                    onClick={() =>
                        router.push(ROUTES.NOTIFICATION)
                    }
                />

            </div>

        </div>
    );
}