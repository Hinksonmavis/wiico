"use client";

import {
    Bell,
    ChevronRight,
} from "lucide-react";

interface NotifyBarProps {
    message?: string;
}

export default function NotifyBar({
    message = "Recruitment Activity Reward: member will earn a reward of 2100",
}: NotifyBarProps) {
    return (
        <div
            className="
                relative
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-white/20
                bg-white/10
                p-1
                shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                backdrop-blur-xl
            "
        >
            <div
                className="
                    relative
                    flex
                    h-11
                    w-full
                    items-center
                    overflow-hidden
                    rounded-xl
                    bg-white/95
                "
            >
                {/* Notification label */}
                <div
                    className="
                        relative
                        z-20
                        flex
                        h-full
                        shrink-0
                        items-center
                        gap-1.5
                        rounded-xl
                        rounded-r-[28px]
                        bg-[#1491FF]
                        px-3
                        shadow-[4px_0_12px_rgba(20,145,255,0.18)]
                    "
                >
                    <div
                        className="
                            flex
                            h-7
                            w-7
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-white/15
                        "
                    >
                        <Bell
                            size={14}
                            strokeWidth={2.3}
                            className="text-white"
                        />
                    </div>

                    <span
                        className="
                            text-[11px]
                            font-bold
                            tracking-wide
                            text-white
                        "
                    >
                        Notify
                    </span>

                    <span
                        className="
                            ml-0.5
                            flex
                            items-center
                            text-white/80
                        "
                    >
                        <ChevronRight
                            size={11}
                            strokeWidth={3}
                            className="-mr-1.5"
                        />

                        <ChevronRight
                            size={11}
                            strokeWidth={3}
                            className="-mr-1.5"
                        />

                        <ChevronRight
                            size={11}
                            strokeWidth={3}
                        />
                    </span>
                </div>

                {/* Left fade */}
                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        inset-y-0
                        left-[96px]
                        z-10
                        w-8
                        bg-gradient-to-r
                        from-white
                        to-transparent
                    "
                />

                {/* Marquee */}
                <div
                    className="
                        relative
                        min-w-0
                        flex-1
                        overflow-hidden
                    "
                >
                    <div
                        className="
                            notify-marquee
                            flex
                            w-max
                            items-center
                            whitespace-nowrap
                            py-1
                            text-[11px]
                            font-semibold
                            tracking-[0.01em]
                            text-slate-700
                            sm:text-xs
                        "
                    >
                        <span className="px-5">
                            {message}
                        </span>

                        <span
                            aria-hidden="true"
                            className="px-5"
                        >
                            {message}
                        </span>

                        <span
                            aria-hidden="true"
                            className="px-5"
                        >
                            {message}
                        </span>
                    </div>
                </div>

                {/* Right fade */}
                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        inset-y-0
                        right-0
                        z-10
                        w-14
                        bg-gradient-to-l
                        from-white
                        to-transparent
                    "
                />
            </div>
        </div>
    );
}