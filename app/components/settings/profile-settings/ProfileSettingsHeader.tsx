"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { ROUTES } from "@/app/constants/routes";

export default function ProfileSettingsHeader() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
            <div className="mx-auto flex h-14 w-full max-w-lg items-center px-4">
                {/* Back */}
                <Link
                    href={ROUTES.SETTINGS}
                    aria-label="Back to settings"
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
                        active:scale-95
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-slate-300
                    "
                >
                    <ChevronLeft
                        className="h-4 w-4"
                        strokeWidth={2}
                    />
                </Link>

                {/* Title */}
                <div className="flex-1 text-center">
                    <h1 className="text-[15px] font-semibold tracking-tight text-slate-900">
                        Profile Settings
                    </h1>
                </div>

                {/* Balancing element */}
                <div className="h-9 w-9 shrink-0" />
            </div>
        </header>
    );
}