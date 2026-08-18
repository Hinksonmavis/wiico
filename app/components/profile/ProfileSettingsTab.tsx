"use client";

import Link from "next/link";
import {
    ChevronRight,
    UserRound,
} from "lucide-react";

import { ROUTES } from "@/app/constants/routes";

export default function ProfileSettingsTab() {
    return (
        <Link
            href={ROUTES.PROFILE_SETTINGS}
            className="
                group
                flex
                items-center
                gap-4
                rounded-2xl
                border
                border-slate-200/80
                bg-white
                px-4
                py-4
                shadow-[0_4px_18px_rgba(15,23,42,0.04)]
                transition-all
                duration-200
                hover:border-slate-300
                hover:shadow-[0_8px_24px_rgba(15,23,42,0.07)]
                active:scale-[0.985]
            "
        >
            {/* Icon */}
            <div
                className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-slate-100
                    text-slate-700
                    transition-colors
                    group-hover:bg-slate-900
                    group-hover:text-white
                "
            >
                <UserRound
                    className="h-[19px] w-[19px]"
                    strokeWidth={1.8}
                />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
                <p
                    className="
                        text-[14px]
                        font-semibold
                        tracking-tight
                        text-slate-900
                    "
                >
                    Profile Settings
                </p>

                <p
                    className="
                        mt-0.5
                        text-[11px]
                        leading-5
                        text-slate-400
                    "
                >
                    Manage your profile information
                </p>
            </div>

            {/* Arrow */}
            <ChevronRight
                className="
                    h-4
                    w-4
                    shrink-0
                    text-slate-300
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.5
                    group-hover:text-slate-500
                "
                strokeWidth={2}
            />
        </Link>
    );
}