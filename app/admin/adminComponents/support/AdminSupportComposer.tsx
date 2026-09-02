"use client";

import {
    FormEvent,
    useState,
} from "react";

import {
    Send,
} from "lucide-react";

interface Props {
    onSend: (
        message: string,
    ) => void;

    disabled: boolean;
    isSending: boolean;
    isClosed: boolean;
}

export function AdminSupportComposer({
    onSend,
    disabled,
    isSending,
    isClosed,
}: Props) {

    const [
        message,
        setMessage,
    ] = useState("");

    const handleSubmit = (
        event: FormEvent<HTMLFormElement>,
    ) => {

        event.preventDefault();

        if (
            !message.trim() ||
            disabled
        ) {
            return;
        }

        onSend(message);

        setMessage("");
    };

    if (isClosed) {

        return (
            <div className="shrink-0 border-t border-slate-200 bg-slate-50 px-4 py-4 text-center">

                <p className="text-sm font-medium text-slate-600">
                    This conversation is closed.
                </p>

                <p className="mt-1 text-xs text-slate-400">
                    Reopen the conversation to send a message.
                </p>

            </div>
        );
    }

    return (
        <div className="shrink-0 border-t border-slate-200 bg-white p-3 sm:p-4">

            <form
                onSubmit={handleSubmit}
                className="mx-auto flex max-w-3xl items-end gap-2"
            >

                <textarea
                    value={message}
                    onChange={(event) =>
                        setMessage(
                            event.target.value,
                        )
                    }
                    disabled={disabled}
                    placeholder="Write a reply..."
                    rows={1}
                    className="max-h-32 min-h-11 flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                    onKeyDown={(event) => {

                        if (
                            event.key === "Enter" &&
                            !event.shiftKey
                        ) {
                            event.preventDefault();

                            handleSubmit(
                                event as unknown as FormEvent<HTMLFormElement>,
                            );
                        }

                    }}
                />

                <button
                    type="submit"
                    disabled={
                        disabled ||
                        !message.trim()
                    }
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Send message"
                >

                    <Send
                        className={[
                            "h-4 w-4",
                            isSending
                                ? "animate-pulse"
                                : "",
                        ].join(" ")}
                    />

                </button>

            </form>

            <p className="mx-auto mt-2 hidden max-w-3xl text-[10px] text-slate-400 sm:block">
                Press Enter to send • Shift + Enter for a new line
            </p>

        </div>
    );
}