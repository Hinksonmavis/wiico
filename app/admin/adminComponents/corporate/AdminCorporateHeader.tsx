"use client";

import {
    Megaphone,
    Plus,
} from "lucide-react";

interface Props {
    total: number;
    onCreate: () => void;
}

export function AdminCorporateHeader({
    total,
    onCreate,
}: Props) {

    return (
        <section
            className="
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-sm
            "
        >

            <div
                className="
                    flex
                    flex-col
                    gap-5
                    p-5
                    sm:p-6
                    md:flex-row
                    md:items-center
                    md:justify-between
                "
            >

                <div className="flex items-center gap-4">

                    <div
                        className="
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            bg-black
                            text-white
                        "
                    >
                        <Megaphone size={22} />
                    </div>

                    <div>

                        <h1
                            className="
                                text-xl
                                font-bold
                                tracking-tight
                                text-gray-900
                                sm:text-2xl
                            "
                        >
                            Corporate
                        </h1>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-gray-500
                            "
                        >
                            Manage announcements and
                            important platform updates.
                        </p>

                    </div>

                </div>

                <button
                    type="button"
                    onClick={onCreate}
                    className="
                        flex
                        h-11
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-black
                        px-5
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-gray-800
                        active:scale-[0.98]
                        md:w-auto
                    "
                >

                    <Plus size={18} />

                    New Announcement

                </button>

            </div>

            <div
                className="
                    border-t
                    border-gray-100
                    px-5
                    py-3
                    text-xs
                    text-gray-500
                    sm:px-6
                "
            >
                {total} announcement
                {total === 1 ? "" : "s"} total
            </div>

        </section>
    );
}