"use client";

import {
    ArrowRight,
    LucideIcon,
} from "lucide-react";

interface CommunicationCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    unreadCount?: number;
    isLoading?: boolean;
    isFetching?: boolean;
    onClick: () => void;
}

export function CommunicationCard({
    title,
    description,
    icon: Icon,
    unreadCount = 0,
    isLoading = false,
    isFetching = false,
    onClick,
}: CommunicationCardProps) {

    const showRefreshing =
        isFetching && !isLoading;

    return (
        <button
            type="button"
            disabled={isLoading}
            onClick={onClick}
            className="
                group
                flex
                w-full
                items-center
                gap-4
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                text-left
                shadow-sm
                transition-all
                active:scale-[0.98]
                hover:border-slate-300
                hover:shadow-md
                disabled:cursor-default
                disabled:active:scale-100
                disabled:hover:border-slate-200
                disabled:hover:shadow-sm
            "
        >

            {/* =====================================================
                ICON
            ====================================================== */}

            <div
                className="
                    relative
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-slate-100
                    text-slate-700
                "
            >

                <Icon
                    size={22}
                    strokeWidth={2}
                />

                {/* Initial Loading */}

                {isLoading && (
                    <span
                        className="
                            absolute
                            -right-1
                            -top-1
                            h-4
                            w-4
                            animate-pulse
                            rounded-full
                            bg-slate-300
                        "
                    />
                )}

                {/* Unread Badge */}

                {!isLoading &&
                    unreadCount > 0 && (
                        <span
                            className="
                                absolute
                                -right-1
                                -top-1
                                flex
                                h-5
                                min-w-5
                                items-center
                                justify-center
                                rounded-full
                                bg-red-500
                                px-1
                                text-[10px]
                                font-bold
                                text-white
                                shadow-sm
                            "
                        >
                            {unreadCount > 99
                                ? "99+"
                                : unreadCount}
                        </span>
                    )}

            </div>

            {/* =====================================================
                CONTENT
            ====================================================== */}

            <div
                className="
                    min-w-0
                    flex-1
                "
            >

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-3
                    "
                >

                    <h3
                        className="
                            text-sm
                            font-semibold
                            text-slate-900
                        "
                    >
                        {title}
                    </h3>

                    <ArrowRight
                        size={18}
                        className="
                            shrink-0
                            text-slate-400
                            transition-transform
                            duration-200
                            group-hover:translate-x-1
                        "
                    />

                </div>

                <p
                    className="
                        mt-1
                        text-xs
                        leading-5
                        text-slate-500
                    "
                >
                    {description}
                </p>

                {/* Background Refresh Indicator */}

                {showRefreshing && (
                    <div
                        className="
                            mt-1.5
                            flex
                            items-center
                            gap-1.5
                            text-[10px]
                            font-medium
                            text-slate-400
                        "
                    >

                        <span
                            className="
                                h-1.5
                                w-1.5
                                animate-pulse
                                rounded-full
                                bg-slate-400
                            "
                        />

                        Checking for updates...

                    </div>
                )}

            </div>

        </button>
    );
}