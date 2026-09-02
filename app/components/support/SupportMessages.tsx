"use client";

import {
    useEffect,
    useRef,
} from "react";

import {
    UserSupportMessage,
} from "@/app/types/clientTypes/support.types";

import {
    SupportMessageBubble,
} from "./SupportMessageBubble";

interface Props {
    messages: UserSupportMessage[];
    isLoading?: boolean;
}

export function SupportMessages({
    messages,
    isLoading = false,
}: Props) {

    const bottomRef =
        useRef<HTMLDivElement | null>(
            null,
        );

    // ============================================================
    // ALWAYS SHOW THE NEWEST MESSAGE
    // ============================================================

    useEffect(() => {

        const timeout =
            window.setTimeout(() => {

                bottomRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                });

            }, 50);

        return () => {
            window.clearTimeout(
                timeout,
            );
        };

    }, [messages]);

    // ============================================================
    // LOADING
    // ============================================================

    if (isLoading) {

        return (
            <div
                className="
                    min-h-0
                    flex-1
                    overflow-hidden
                    px-4
                "
            >

                <div
                    className="
                        flex
                        h-full
                        items-center
                        justify-center
                    "
                >

                    <div className="text-center">

                        <div
                            className="
                                mx-auto
                                h-8
                                w-8
                                animate-spin
                                rounded-full
                                border-2
                                border-gray-200
                                border-t-black
                            "
                        />

                        <p
                            className="
                                mt-3
                                text-sm
                                text-gray-500
                            "
                        >
                            Loading conversation...
                        </p>

                    </div>

                </div>

            </div>
        );
    }

    // ============================================================
    // MESSAGES
    // ============================================================

    return (
        <div
            className="
                min-h-0
                flex-1
                overflow-y-auto
                overscroll-contain
                no-scrollbar
                px-4
                py-4
                sm:px-6
            "
        >

            <div
                className="
                    mx-auto
                    flex
                    w-full
                    max-w-2xl
                    flex-col
                    gap-3
                "
            >

                {messages.length === 0 ? (

                    <div
                        className="
                            flex
                            min-h-[300px]
                            items-center
                            justify-center
                            text-center
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-sm
                                    font-medium
                                    text-gray-700
                                "
                            >
                                No messages yet
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-gray-400
                                "
                            >
                                Send a message to start
                                the conversation.
                            </p>

                        </div>

                    </div>

                ) : (

                    messages.map(
                        (message) => (
                            <SupportMessageBubble
                                key={
                                    message.id
                                }
                                message={
                                    message
                                }
                            />
                        ),
                    )

                )}

                {/* =================================================
                    AUTO-SCROLL ANCHOR
                ================================================== */}

                <div
                    ref={bottomRef}
                    className="
                        h-px
                        w-full
                    "
                    aria-hidden="true"
                />

            </div>

        </div>
    );
}