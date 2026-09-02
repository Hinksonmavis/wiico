"use client";

import {
    MessageCircle,
} from "lucide-react";

import {
    AdminSupportConversation,
} from "@/app/types/adminTypes/adminSupport.types";

interface Props {
    conversation: AdminSupportConversation;
    selected: boolean;
    onClick: () => void;
}

export function AdminSupportConversationItem({
    conversation,
    selected,
    onClick,
}: Props) {

    const unread =
        conversation.adminUnreadCount ?? 0;

    const displayName =
        conversation.userPhone ||
        conversation.userEmail ||
        "User";

    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "mb-1 w-full rounded-xl p-3 text-left transition",
                selected
                    ? "bg-slate-100"
                    : "hover:bg-slate-50",
            ].join(" ")}
        >

            <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                    {displayName
                        .slice(0, 2)
                        .toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">

                    <div className="flex items-start justify-between gap-2">

                        <p className="truncate text-sm font-semibold text-slate-900">
                            {displayName}
                        </p>

                        {unread > 0 && (
                            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 px-1.5 text-[10px] font-bold text-white">
                                {unread}
                            </span>
                        )}

                    </div>

                    <div className="mt-1 flex items-center gap-2">

                        <span
                            className={[
                                "h-1.5 w-1.5 rounded-full",
                                conversation.status === "open"
                                    ? "bg-emerald-500"
                                    : "bg-slate-300",
                            ].join(" ")}
                        />

                        <span className="text-xs capitalize text-slate-500">
                            {conversation.status}
                        </span>

                        {conversation.userReferralCode && (
                            <>
                                <span className="text-slate-300">
                                    •
                                </span>

                                <span className="truncate text-xs text-slate-400">
                                    {conversation.userReferralCode}
                                </span>
                            </>
                        )}

                    </div>

                </div>

            </div>

            {unread > 0 && (
                <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-slate-500">

                    <MessageCircle
                        className="h-3 w-3"
                    />

                    New message

                </div>
            )}

        </button>
    );
}