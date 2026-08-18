"use client";

import {
    Settings,
    Pencil,
    Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProfileHeaderProps {
    phone: string;
    avatarUrl?: string;
    country: string;
}

export default function ProfileHeader({
    phone,
    avatarUrl,
    country,
}: ProfileHeaderProps) {
    const profileSettingsRoute = "/dashboard/settings";

    return (
        <header
            className="
                px-4
                pb-7
                pt-4

                sm:px-5
                sm:pb-8
                sm:pt-5

                md:px-6
                md:pb-9
            "
        >
            {/* =====================================================
                TOP ACTIONS
            ====================================================== */}
            <div className="flex items-center justify-between">
                {/* Settings */}
                <Link
                    href={profileSettingsRoute}
                    aria-label="Profile settings"
                    className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/20
                        bg-white/10
                        text-slate-700
                        backdrop-blur-md
                        transition-all
                        duration-200
                        hover:bg-white/20
                        hover:text-slate-900
                        active:scale-95
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-slate-400

                        sm:h-10
                        sm:w-10
                        sm:rounded-[13px]
                    "
                >
                    <Settings
                        className="
                            h-[18px]
                            w-[18px]

                            sm:h-[19px]
                            sm:w-[19px]
                        "
                        strokeWidth={1.8}
                    />
                </Link>

                {/* Wallet */}
                <Link
                    href="/dashboard/wallet"
                    aria-label="Wallet"
                    className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/20
                        bg-white/10
                        text-slate-700
                        backdrop-blur-md
                        transition-all
                        duration-200
                        hover:bg-white/20
                        hover:text-slate-900
                        active:scale-95
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-slate-400

                        sm:h-10
                        sm:w-10
                        sm:rounded-[13px]
                    "
                >
                    <Wallet
                        className="
                            h-[18px]
                            w-[18px]

                            sm:h-[19px]
                            sm:w-[19px]
                        "
                        strokeWidth={1.8}
                    />
                </Link>
            </div>

            {/* =====================================================
                PROFILE IDENTITY
            ====================================================== */}
            <div
                className="
                    mt-6
                    flex
                    items-center
                    gap-3.5

                    sm:mt-7
                    sm:gap-4
                "
            >
                {/* =================================================
                    PROFILE AVATAR
                    Entire avatar + pencil is clickable
                ================================================== */}
                <Link
                    href={profileSettingsRoute}
                    aria-label="Open profile settings"
                    className="
                        group
                        relative
                        block
                        h-14
                        w-14
                        shrink-0

                        sm:h-16
                        sm:w-16
                    "
                >
                    {/* Avatar */}
                    <div
                        className="
                            relative
                            h-full
                            w-full
                            overflow-hidden
                            rounded-full
                            border-2
                            border-white/80
                            bg-white
                            shadow-[0_6px_18px_rgba(15,23,42,0.10)]
                            transition-all
                            duration-200
                            group-hover:shadow-[0_8px_22px_rgba(15,23,42,0.16)]
                            group-active:scale-95
                        "
                    >
                        {avatarUrl ? (
                            <Image
                                src={avatarUrl}
                                alt={`${phone} profile`}
                                fill
                                className="
                                    object-cover
                                    transition-transform
                                    duration-300
                                    group-hover:scale-105
                                "
                                sizes="64px"
                            />
                        ) : (
                            <div
                                className="
                                    flex
                                    h-full
                                    w-full
                                    items-center
                                    justify-center
                                    bg-slate-100
                                    text-lg
                                    font-semibold
                                    text-slate-500

                                    sm:text-xl
                                "
                            >
                                {phone
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>
                        )}
                    </div>

                    {/* =================================================
                        EDIT PROFILE INDICATOR
                        Also part of the Link
                    ================================================== */}
                    <span
                        className="
                            absolute
                            bottom-0
                            right-0
                            flex
                            h-6
                            w-6
                            items-center
                            justify-center
                            rounded-full
                            border-2
                            border-white
                            bg-slate-800
                            text-white
                            shadow-sm
                            transition-all
                            duration-200
                            group-hover:bg-slate-700
                            group-hover:scale-105

                            sm:h-7
                            sm:w-7
                        "
                    >
                        <Pencil
                            className="
                                h-[10px]
                                w-[10px]

                                sm:h-[11px]
                                sm:w-[11px]
                            "
                            strokeWidth={2.2}
                        />
                    </span>
                </Link>

                {/* =================================================
                    USER INFORMATION
                ================================================== */}
                <Link
                    href={profileSettingsRoute}
                    className="
                        min-w-0
                        flex-1
                        rounded-xl
                        py-1
                        transition
                        active:opacity-70
                    "
                >
                    <p
                        className="
                            truncate
                            text-[17px]
                            font-semibold
                            tracking-tight
                            text-slate-900

                            sm:text-[19px]
                        "
                    >
                        {phone}
                    </p>

                    <div
                        className="
                            mt-1
                            flex
                            items-center
                            gap-1.5
                        "
                    >
                        <span
                            className="
                                h-1.5
                                w-1.5
                                shrink-0
                                rounded-full
                                bg-emerald-500
                            "
                        />

                        <p
                            className="
                                truncate
                                text-[12px]
                                font-medium
                                text-slate-500

                                sm:text-[13px]
                            "
                        >
                            {country}
                        </p>
                    </div>
                </Link>
            </div>
        </header>
    );
}