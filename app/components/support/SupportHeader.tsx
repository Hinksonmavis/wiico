"use client";

import {
    ArrowLeft,
    Headphones,
} from "lucide-react";

import {
    useRouter,
} from "next/navigation";

export function SupportHeader() {

    const router =
        useRouter();

    return (
        <header
            className="
                relative
                z-20
                shrink-0
                border-b
                border-gray-200
                bg-white
            "
        >

            <div
                className="
                    mx-auto
                    flex
                    h-16
                    w-full
                    max-w-3xl
                    items-center
                    gap-3
                    px-4
                "
            >

                <button
                    type="button"
                    onClick={() =>
                        router.back()
                    }
                    className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        text-gray-600
                        transition
                        hover:bg-gray-100
                        active:scale-95
                    "
                    aria-label="Go back"
                >

                    <ArrowLeft
                        size={21}
                    />

                </button>

                <div
                    className="
                        flex
                        min-w-0
                        flex-1
                        items-center
                        gap-3
                    "
                >

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-black
                            text-white
                        "
                    >

                        <Headphones
                            size={19}
                        />

                    </div>

                    <div className="min-w-0">

                        <h1
                            className="
                                truncate
                                text-base
                                font-bold
                                text-gray-900
                            "
                        >
                            Support
                        </h1>

                        <p
                            className="
                                text-xs
                                text-gray-500
                            "
                        >
                            We're here to help
                        </p>

                    </div>

                </div>

            </div>

        </header>
    );
}