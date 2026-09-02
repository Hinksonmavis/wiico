import {
    CheckCircle2,
    Clock3,
    MessageCircle,
} from "lucide-react";

import {
    UserSupportConversation,
} from "@/app/types/clientTypes/support.types";

interface Props {
    conversation:
        | UserSupportConversation
        | undefined;
}

export function SupportConversationInfo({
    conversation,
}: Props) {

    if (!conversation) {
        return null;
    }

    const isClosed =
        conversation.status ===
        "closed";

    return (
        <div
            className="
                flex
                items-center
                justify-between
                gap-3
                border-b
                border-gray-100
                bg-gray-50/70
                px-4
                py-3
            "
        >

            <div
                className="
                    flex
                    min-w-0
                    items-center
                    gap-3
                "
            >

                <div
                    className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-gray-600
                        shadow-sm
                    "
                >

                    <MessageCircle
                        size={17}
                    />

                </div>

                <div
                    className="
                        min-w-0
                    "
                >

                    <p
                        className="
                            text-sm
                            font-semibold
                            text-gray-900
                        "
                    >
                        Support conversation
                    </p>

                    <p
                        className="
                            text-xs
                            text-gray-500
                        "
                    >
                        Our support team can assist you
                    </p>

                </div>

            </div>

            <div
                className={`
                    flex
                    shrink-0
                    items-center
                    gap-1.5
                    rounded-full
                    px-2.5
                    py-1
                    text-[11px]
                    font-semibold

                    ${
                        isClosed
                            ? "bg-gray-200 text-gray-600"
                            : "bg-emerald-50 text-emerald-700"
                    }
                `}
            >

                {isClosed ? (
                    <CheckCircle2
                        size={13}
                    />
                ) : (
                    <Clock3
                        size={13}
                    />
                )}

                {isClosed
                    ? "Closed"
                    : "Open"}

            </div>

        </div>
    );
}