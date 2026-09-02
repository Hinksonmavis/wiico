"use client";

import {
    ArrowLeft,
    CheckCircle2,
    MoreVertical,
} from "lucide-react";

import {
    AdminSupportConversation,
} from "@/app/types/adminTypes/adminSupport.types";

import {
    SupportConversationStatus,
} from "@/app/types/sharedTypes/support.types";

interface Props {
    conversation?: AdminSupportConversation;
    onBack: () => void;
    onStatusChange: (
        status: SupportConversationStatus,
    ) => void;
    isUpdatingStatus: boolean;
}

export function AdminSupportConversationHeader({
    conversation,
    onBack,
    onStatusChange,
    isUpdatingStatus,
}: Props) {

    if (!conversation) {
        return null;
    }

    const displayName =
        conversation.userPhone ||
        conversation.userEmail ||
        "User";

    return (
        <header className="shrink-0 border-b border-slate-200 bg-white px-3 py-3 sm:px-5">

            <div className="flex items-center gap-3">

                <button
                    type="button"
                    onClick={onBack}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 md:hidden"
                    aria-label="Back"
                >
                    <ArrowLeft
                        className="h-5 w-5"
                    />
                </button>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                    {displayName
                        .slice(0, 2)
                        .toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-bold text-slate-900">
                        {displayName}
                    </p>

                    <div className="flex items-center gap-2">

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

                    </div>

                </div>

                <div className="flex items-center gap-1">

                    {conversation.status === "open" ? (

                        <button
                            type="button"
                            disabled={
                                isUpdatingStatus
                            }
                            onClick={() =>
                                onStatusChange(
                                    "closed",
                                )
                            }
                            className="hidden h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 sm:flex"
                        >

                            <CheckCircle2
                                className="h-4 w-4"
                            />

                            Close

                        </button>

                    ) : (

                        <button
                            type="button"
                            disabled={
                                isUpdatingStatus
                            }
                            onClick={() =>
                                onStatusChange(
                                    "open",
                                )
                            }
                            className="hidden h-9 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 sm:block"
                        >
                            Reopen
                        </button>

                    )}

                    <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
                    >
                        <MoreVertical
                            className="h-5 w-5"
                        />
                    </button>

                </div>

            </div>

        </header>
    );
}