"use client";

import {
    CalendarDays,
    CheckCircle2,
    Megaphone,
} from "lucide-react";

import {
    UserCorporateAnnouncement,
} from "@/app/types/clientTypes/corporate.types";

interface Props {
    announcement: UserCorporateAnnouncement;
    onRead: (id: string) => void;
}

export function CorporateAnnouncementCard({
    announcement,
    onRead,
}: Props) {

    const date = new Date(
        announcement.createdAt,
    );

    return (
        <article
            className={`
                rounded-2xl
                border
                p-4
                shadow-sm
                transition
                ${
                    announcement.isRead
                        ? "border-slate-200 bg-white"
                        : "border-slate-300 bg-slate-50"
                }
            `}
        >

            <div
                className="
                    flex
                    items-start
                    gap-3
                "
            >

                <div
                    className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#1590FC]
                        text-white
                    "
                >
                    <Megaphone size={18} />
                </div>

                <div className="min-w-0 flex-1">

                    <div
                        className="
                            flex
                            items-start
                            justify-between
                            gap-3
                        "
                    >

                        <h2
                            className="
                                text-sm
                                font-bold
                                text-slate-900
                            "
                        >
                            {announcement.title}
                        </h2>

                        {!announcement.isRead && (
                            <span
                                className="
                                    mt-1
                                    h-2
                                    w-2
                                    shrink-0
                                    rounded-full
                                    bg-red-500
                                "
                            />
                        )}

                    </div>

                    <div
                        className="
                            mt-1
                            flex
                            items-center
                            gap-1
                            text-[11px]
                            text-slate-400
                        "
                    >
                        <CalendarDays size={12} />

                        {date.toLocaleDateString(
                            undefined,
                            {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            },
                        )}
                    </div>

                </div>

            </div>

            <p
                className="
                    mt-4
                    whitespace-pre-wrap
                    text-sm
                    leading-6
                    text-slate-600
                "
            >
                {announcement.message}
            </p>

            {!announcement.isRead && (
                <button
                    type="button"
                    onClick={() =>
                        onRead(announcement.id)
                    }
                    className="
                        mt-4
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-[#1590FC]/10
                        px-3
                        py-2
                        text-xs
                        font-semibold
                        text-[#1590FC]
                        transition
                        hover:bg-[#1590FC]/15
                        active:scale-95
                    "
                >
                    <CheckCircle2 size={14} />
                    Mark as read
                </button>
            )}

        </article>
    );
}