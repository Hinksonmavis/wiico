"use client";

import {
    MessageCircle,
} from "lucide-react";

export function AdminSupportEmptyState() {

    return (
        <div className="flex h-full w-full items-center justify-center px-6">

            <div className="max-w-sm text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">

                    <MessageCircle
                        className="h-7 w-7 text-slate-500"
                    />

                </div>

                <h2 className="mt-5 text-base font-bold text-slate-900">
                    Select a conversation
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                    Choose a user conversation from the list to view messages and respond to their support request.
                </p>

            </div>

        </div>
    );
}