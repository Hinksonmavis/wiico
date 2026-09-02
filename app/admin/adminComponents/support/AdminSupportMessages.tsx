"use client";

import {
    useEffect,
    useRef,
} from "react";

import {
    AdminSupportMessage,
} from "@/app/types/adminTypes/adminSupport.types";
import { AdminSupportMessageBubble } from "./AdminSupportMessageBubble";


interface Props {
    messages: AdminSupportMessage[];
    isLoading: boolean;
}

export function AdminSupportMessages({
    messages,
    isLoading,
}: Props) {

    const bottomRef =
        useRef<HTMLDivElement>(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages.length]);

    if (isLoading) {

        return (
            <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">

                <div className="h-12 w-2/3 animate-pulse rounded-2xl bg-slate-100" />

                <div className="ml-auto h-12 w-1/2 animate-pulse rounded-2xl bg-slate-100" />

                <div className="h-16 w-3/4 animate-pulse rounded-2xl bg-slate-100" />

            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto px-3 py-5 sm:px-6">

            {messages.length === 0 ? (

                <div className="flex h-full items-center justify-center">

                    <p className="text-sm text-slate-400">
                        No messages yet.
                    </p>

                </div>

            ) : (

                <div className="mx-auto flex max-w-3xl flex-col gap-3">

                    {messages.map(
                        (message) => (

                            <AdminSupportMessageBubble
                                key={
                                    message.id
                                }
                                message={
                                    message
                                }
                            />

                        ),
                    )}

                    <div
                        ref={bottomRef}
                    />

                </div>

            )}

        </div>
    );
}