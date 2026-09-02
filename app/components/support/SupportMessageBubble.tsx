import {
    UserSupportMessage,
} from "@/app/types/clientTypes/support.types";

interface Props {
    message: UserSupportMessage;
}

// ============================================================
// FORMAT MESSAGE TIME
// ============================================================

function formatMessageTime(
    value: string | Date,
) {

    const date =
        value instanceof Date
            ? value
            : new Date(value);

    if (
        Number.isNaN(
            date.getTime(),
        )
    ) {
        return "";
    }

    return new Intl.DateTimeFormat(
        "en-NG",
        {
            hour: "numeric",
            minute: "2-digit",
        },
    ).format(date);
}

// ============================================================
// MESSAGE BUBBLE
// ============================================================

export function SupportMessageBubble({
    message,
}: Props) {

    const isUser =
        message.senderType ===
        "user";

    return (
        <div
            className={`
                flex
                w-full
                ${
                    isUser
                        ? "justify-end"
                        : "justify-start"
                }
            `}
        >

            <div
                className={`
                    flex
                    max-w-[82%]
                    flex-col
                    ${
                        isUser
                            ? "items-end"
                            : "items-start"
                    }

                    sm:max-w-[70%]
                `}
            >

                {/* =================================================
                    MESSAGE
                ================================================== */}

                <div
                    className={`
                        rounded-2xl
                        px-4
                        py-2.5
                        text-sm
                        leading-6
                        shadow-sm

                        ${
                            isUser
                                ? `
                                    rounded-br-md
                                    bg-[#1590FC]
                                    text-white
                                `
                                : `
                                    rounded-bl-md
                                    bg-gray-100
                                    text-gray-900
                                `
                        }
                    `}
                >

                    <p
                        className="
                            whitespace-pre-wrap
                            break-words
                        "
                    >
                        {message.message}
                    </p>

                </div>

                {/* =================================================
                    TIME
                ================================================== */}

                <span
                    className="
                        mt-1
                        px-1
                        text-[10px]
                        text-gray-400
                    "
                >
                    {formatMessageTime(
                        message.createdAt,
                    )}
                </span>

            </div>

        </div>
    );
}