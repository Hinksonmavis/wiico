"use client";

import { ROUTES } from "@/app/constants/routes";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function AboutHeader() {
    return (
        <header
            className="
                sticky
                top-0
                z-50
                border-b
                border-slate-200/70
                bg-white/90
                backdrop-blur-xl
            "
        >
            <div
                className="
                    mx-auto
                    flex
                    h-14
                    max-w-3xl
                    items-center
                    px-4

                    sm:h-16
                    sm:px-5
                "
            >
                <Link
                    href={ROUTES.DASHBOARD}
                    aria-label="Back to dashboard"
                    className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        text-slate-600
                        transition
                        hover:bg-slate-100
                        hover:text-slate-900
                        active:scale-95
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[#4DA8FE]
                    "
                >
                    <ChevronLeft
                        className="h-4 w-4"
                        strokeWidth={2}
                    />
                </Link>

                <div className="min-w-0 flex-1 px-3 text-center">
                    <p
                        className="
                            truncate
                            text-[14px]
                            font-semibold
                            tracking-tight
                            text-slate-900

                            sm:text-[15px]
                        "
                    >
                        Company Profile
                    </p>
                </div>

                {/* Keeps title perfectly centered */}
                <div className="h-9 w-9 shrink-0" />
            </div>
        </header>
    )
}