"use client";

import {
    FormEvent,
    useState,
} from "react";

import {
    Send,
    Lock,
} from "lucide-react";

interface Props {
    onSend: (
        message: string,
    ) => void;

    disabled?: boolean;

    isSending?: boolean;

    isClosed?: boolean;
}

export function SupportComposer({
    onSend,
    disabled = false,
    isSending = false,
    isClosed = false,
}: Props) {

    const [
        message,
        setMessage,
    ] = useState("");

    const handleSubmit = (
        event: FormEvent,
    ) => {

        event.preventDefault();

        const value =
            message.trim();

        if (
            !value ||
            disabled ||
            isSending
        ) {
            return;
        }

        onSend(value);

        setMessage("");
    };

    // ============================================================
    // CLOSED CONVERSATION
    // ============================================================

    if (isClosed) {

        return (
            <div
                className="
                    relative
                    z-10
                    shrink-0
                    border-t
                    border-gray-200
                    bg-gray-50
                    px-4
                    py-4
                "
            >

                <div
                    className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        text-center
                        text-sm
                        text-gray-500
                    "
                >

                    <Lock
                        size={16}
                    />

                    <span>
                        This support conversation is closed.
                    </span>

                </div>

            </div>
        );
    }

    // ============================================================
    // COMPOSER
    // ============================================================

    return (
        <div
            className="
                relative
                z-10
                shrink-0
                border-t
                border-gray-200
                bg-white
                p-3
                sm:p-4
            "
        >

            <form
                onSubmit={
                    handleSubmit
                }
                className="
                    mx-auto
                    flex
                    max-w-2xl
                    items-end
                    gap-2
                "
            >

                <div
                    className="
                        flex
                        min-h-[46px]
                        flex-1
                        items-center
                        rounded-2xl
                        border
                        border-gray-200
                        bg-gray-50
                        px-4
                        py-1
                        transition
                        focus-within:border-gray-400
                        focus-within:bg-white
                    "
                >

                    <textarea
                        value={
                            message
                        }
                        onChange={(
                            event,
                        ) =>
                            setMessage(
                                event.target.value,
                            )
                        }
                        onKeyDown={(
                            event,
                        ) => {

                            if (
                                event.key ===
                                    "Enter" &&
                                !event.shiftKey
                            ) {

                                event.preventDefault();

                                handleSubmit(
                                    event,
                                );
                            }

                        }}
                        placeholder="Write a message..."
                        rows={1}
                        disabled={
                            disabled ||
                            isSending
                        }
                        className="
                            max-h-28
                            min-h-[38px]
                            w-full
                            resize-none
                            border-0
                            bg-transparent
                            py-2
                            text-sm
                            text-gray-900
                            outline-none
                            placeholder:text-gray-400
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    />

                </div>

                <button
                    type="submit"
                    disabled={
                        !message.trim() ||
                        disabled ||
                        isSending
                    }
                    className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#1590FC]
                        text-white
                        transition
                        hover:bg-[#0f7edc]
                        active:scale-95
                        disabled:cursor-not-allowed
                        disabled:bg-gray-200
                        disabled:text-gray-400
                    "
                    aria-label="Send message"
                >

                    {isSending ? (

                        <span
                            className="
                                h-4
                                w-4
                                animate-spin
                                rounded-full
                                border-2
                                border-white/40
                                border-t-white
                            "
                        />

                    ) : (

                        <Send
                            size={18}
                        />

                    )}

                </button>

            </form>

            <p
                className="
                    mx-auto
                    mt-2
                    max-w-2xl
                    px-1
                    text-[10px]
                    text-gray-400
                "
            >
                Press Enter to send · Shift + Enter for a new line
            </p>

        </div>
    );
}