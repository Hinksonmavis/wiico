"use client";

import {
    AdminSupportMessage,
} from "@/app/types/adminTypes/adminSupport.types";

interface Props {
    message: AdminSupportMessage;
}

export function AdminSupportMessageBubble({
    message,
}: Props) {

    const isAdmin =
        message.senderType === "admin";

    return (
        <div
            className={[
                "flex w-full",
                isAdmin
                    ? "justify-end"
                    : "justify-start",
            ].join(" ")}
        >

            <div
                className={[
                    "max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[70%]",
                    isAdmin
                        ? "rounded-br-md bg-slate-900 text-white"
                        : "rounded-bl-md bg-slate-100 text-slate-900",
                ].join(" ")}
            >

                <p className="whitespace-pre-wrap break-words text-sm leading-6">
                    {message.message}
                </p>

                <div
                    className={[
                        "mt-1.5 text-[10px]",
                        isAdmin
                            ? "text-slate-300"
                            : "text-slate-400",
                    ].join(" ")}
                >
                    {new Date(
                        message.createdAt,
                    ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </div>

            </div>

        </div>
    );
}