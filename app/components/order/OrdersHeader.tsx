"use client";

import {
    ChevronLeft,
    ClipboardList,
} from "lucide-react";

import { useRouter } from "next/navigation";

export default function OrdersHeader() {

    const router =
        useRouter();

    return (

        <header
            className="
                relative
                isolate
                h-60
                overflow-visible
                bg-[#0A74F3]
                px-5
                pt-6
                pb-20
            "
        >

            <div
                className="
                    absolute
                    -right-24
                    -top-24
                    h-full
                    w-72
                    rounded-full
                    bg-white/15
                    blur-3xl
                "
            />

            <div
                className="
                    absolute
                    -left-20
                    top-24
                    h-full
                    w-60
                    rounded-full
                    bg-cyan-300/20
                    blur-[120px]
                "
            />

            <div
                className="
                    absolute
                    right-10
                    top-20
                    h-50
                    w-20
                    rounded-full
                    border
                    border-white/15
                "
            />

            <div className="relative z-20">

                <div className="flex items-center justify-between">

                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-full
                            bg-white/20
                            text-white
                            backdrop-blur-xl
                            active:scale-95
                        "
                    >
                        <ChevronLeft
                            size={22}
                            strokeWidth={2.5}
                        />
                    </button>

                    <span
                        className="
                            inline-flex
                            rounded-full
                            bg-white/20
                            px-4
                            py-1.5
                            text-xs
                            font-semibold
                            tracking-wide
                            text-white
                            backdrop-blur-xl
                        "
                    >
                        SUPPLY STORE
                    </span>

                    <div
                        className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-full
                            bg-white/20
                            backdrop-blur-xl
                        "
                    >
                        <ClipboardList
                            size={20}
                            className="text-white"
                        />
                    </div>

                </div>

                {/* <div className="mt-8">

                    <h1
                        className="
                            text-3xl
                            font-bold
                            text-white
                        "
                    >
                        Daily Orders
                    </h1>

                    <p
                        className="
                            mt-2
                            max-w-sm
                            text-sm
                            text-white/80
                        "
                    >
                        Complete every assigned advertisement to receive today's reward.
                    </p>

                </div> */}

            </div>

            <div
                className="
                    pointer-events-none
                    absolute
                    -bottom-24
                    left-1/2
                    h-56
                    w-[140%]
                    -translate-x-1/2
                    rounded-full
                    bg-[#67B7FF]/45
                    blur-[120px]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    bottom-[-120px]
                    left-0
                    h-40
                    w-full
                    bg-white
                    blur-[100px]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    bottom-0
                    left-0
                    h-32
                    w-full
                    bg-gradient-to-b
                    from-transparent
                    via-white/30
                    to-white
                "
            />

        </header>

    );

}