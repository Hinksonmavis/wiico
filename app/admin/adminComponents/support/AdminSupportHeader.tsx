"use client";

import {
    Headphones,
    MessageCircle,
} from "lucide-react";

interface Props {
    totalConversations: number;
}

export function AdminSupportHeader({
    totalConversations,
}: Props) {

    return (
        <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6">

            <div className="flex items-center justify-between gap-4">

                <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">

                        <Headphones
                            className="h-5 w-5"
                        />

                    </div>

                    <div className="min-w-0">

                        <h1 className="truncate text-base font-bold text-slate-900 sm:text-lg">
                            Customer Support
                        </h1>

                        <p className="truncate text-xs text-slate-500 sm:text-sm">
                            Manage user conversations
                        </p>

                    </div>

                </div>

                <div className="flex shrink-0 items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">

                    <MessageCircle
                        className="h-4 w-4 text-slate-600"
                    />

                    <span className="text-xs font-semibold text-slate-700">
                        {totalConversations}
                    </span>

                </div>

            </div>

        </header>
    );
}