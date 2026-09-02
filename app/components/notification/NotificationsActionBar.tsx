"use client";

import {
    CheckCheck,
    Trash2,
} from "lucide-react";

interface NotificationActionsBarProps {
    unreadCount: number;
    isMarkingAll: boolean;
    isDeletingAll: boolean;
    onMarkAllRead: () => void;
    onDeleteAll: () => void;
}

export function NotificationActionsBar({
    unreadCount,
    isMarkingAll,
    isDeletingAll,
    onMarkAllRead,
    onDeleteAll,
}: NotificationActionsBarProps) {

    return (
        <div
            className="
                mb-4
                flex
                gap-2
                overflow-x-auto
            "
        >

            {unreadCount > 0 && (
                <button
                    type="button"
                    onClick={onMarkAllRead}
                    disabled={isMarkingAll}
                    className="
                        inline-flex
                        shrink-0
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-3
                        py-2
                        text-xs
                        font-semibold
                        text-slate-700
                        shadow-sm
                        disabled:opacity-50
                    "
                >
                    <CheckCheck size={14} />
                    Mark all read
                </button>
            )}

            <button
                type="button"
                onClick={onDeleteAll}
                disabled={isDeletingAll}
                className="
                    inline-flex
                    shrink-0
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-red-100
                    bg-red-50
                    px-3
                    py-2
                    text-xs
                    font-semibold
                    text-red-600
                    disabled:opacity-50
                "
            >
                <Trash2 size={14} />
                Clear all
            </button>

        </div>
    );
}