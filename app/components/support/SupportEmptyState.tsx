import {
    MessageCircle,
} from "lucide-react";

export function SupportEmptyState() {

    return (
        <div
            className="
                flex
                flex-1
                items-center
                justify-center
                px-6
                py-12
            "
        >

            <div
                className="
                    max-w-xs
                    text-center
                "
            >

                <div
                    className="
                        mx-auto
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-full
                        bg-gray-100
                        text-gray-500
                    "
                >

                    <MessageCircle
                        size={28}
                    />

                </div>

                <h2
                    className="
                        mt-5
                        text-base
                        font-bold
                        text-gray-900
                    "
                >
                    Start a conversation
                </h2>

                <p
                    className="
                        mt-2
                        text-sm
                        leading-6
                        text-gray-500
                    "
                >
                    Send us a message and our
                    support team will get back
                    to you as soon as possible.
                </p>

            </div>

        </div>
    );
}