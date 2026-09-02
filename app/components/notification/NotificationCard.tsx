"use client";

import {
    Bell,
    Check,
    Trash2,
} from "lucide-react";

import {
    Notification,
} from "@/app/types/clientTypes/notification.types";

interface Props {
    notification: Notification;
    onRead: (id: string) => void;
    onDelete: (id: string) => void;
}

export function NotificationCard({
    notification,
    onRead,
    onDelete,
}: Props) {

    const createdAt =
        new Date(notification.createdAt);

    return (
        <article
            className={`
                rounded-2xl
                border
                p-4
                transition
                ${
                    notification.isRead
                        ? "border-slate-200 bg-white"
                        : "border-slate-300 bg-slate-50"
                }
            `}
        >

            <div className="flex gap-3">

                <div
                    className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-slate-900
                        text-white
                    "
                >
                    <Bell size={17} />
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

                        <div>

                            <h2
                                className="
                                    text-sm
                                    font-bold
                                    text-slate-900
                                "
                            >
                                {notification.title}
                            </h2>

                            <p
                                className="
                                    mt-0.5
                                    text-[10px]
                                    uppercase
                                    tracking-wide
                                    text-slate-400
                                "
                            >
                                {notification.type}
                            </p>

                        </div>

                        {!notification.isRead && (
                            <span
                                className="
                                    h-2
                                    w-2
                                    shrink-0
                                    rounded-full
                                    bg-red-500
                                "
                            />
                        )}

                    </div>

                    <p
                        className="
                            mt-3
                            text-sm
                            leading-6
                            text-slate-600
                        "
                    >
                        {notification.message}
                    </p>

                    <div
                        className="
                            mt-4
                            flex
                            items-center
                            justify-between
                            gap-2
                        "
                    >

                        <span
                            className="
                                text-[11px]
                                text-slate-400
                            "
                        >
                            {createdAt.toLocaleString()}
                        </span>

                        <div className="flex gap-1">

                            {!notification.isRead && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        onRead(
                                            notification.id,
                                        )
                                    }
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-slate-100
                                        text-slate-600
                                        active:scale-95
                                    "
                                    aria-label="Mark as read"
                                >
                                    <Check size={15} />
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={() =>
                                    onDelete(
                                        notification.id,
                                    )
                                }
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-red-50
                                    text-red-500
                                    active:scale-95
                                "
                                aria-label="Delete notification"
                            >
                                <Trash2 size={15} />
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </article>
    );
}