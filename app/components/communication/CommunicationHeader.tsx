"use client";

import {
    useRouter,
} from "next/navigation";

import {
    ArrowLeft,
    MessageCircle,
} from "lucide-react";

interface CommunicationHeaderProps {
    showBackButton?: boolean;
    onBack?: () => void;
}

export function CommunicationHeader({
    showBackButton = true,
    onBack,
}: CommunicationHeaderProps) {

    const router = useRouter();

    return (
        <div
            className="
                mb-5
                flex
                items-center
                gap-3
                sm:mb-6
            "
        >

            {showBackButton && (
                <button
                    type="button"
                    aria-label="Go back"
                    onClick={onBack ?? (() => router.back())}
                    className="
                        -ml-2
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        text-slate-600
                        transition-colors
                        hover:bg-slate-100
                        active:bg-slate-200
                        focus-visible:outline
                        focus-visible:outline-2
                        focus-visible:outline-offset-2
                        focus-visible:outline-slate-400
                    "
                >
                    <ArrowLeft size={20} />
                </button>
            )}

            <div
                className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-slate-950
                    text-white
                    sm:h-11
                    sm:w-11
                    sm:rounded-2xl
                "
            >
                <MessageCircle
                    size={20}
                    strokeWidth={2.25}
                />
            </div>

            <div className="min-w-0">

                <h1
                    className="
                        truncate
                        text-lg
                        font-bold
                        tracking-tight
                        text-slate-950
                        sm:text-xl
                    "
                >
                    Communication Center
                </h1>

                <p
                    className="
                        mt-0.5
                        truncate
                        text-xs
                        leading-snug
                        text-slate-500
                    "
                >
                    Stay connected with everything happening in your account.
                </p>

            </div>

        </div>
    );
}