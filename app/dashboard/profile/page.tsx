"use client";

import { useEffect, useState } from "react";

import ProfileHeader from "@/app/components/profile/ProfileHeader";
import ProfileStatsCard from "@/app/components/profile/ProfileStatsCard";
import SettingsList from "@/app/components/profile/SettingsList";
import UpgradeBanner from "@/app/components/profile/UpgradeBanner";

import UserGuard from "@/app/guards/UserGuard";

import { useCurrentUser } from "@/app/hooks/clientHooks/userHooks/useCurrentUser";

export default function Profile() {
    const { data: user } = useCurrentUser();

    const [mounted, setMounted] =
        useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <UserGuard>
            <main
                className="
                    min-h-screen
                    overflow-x-hidden
                    bg-slate-50
                    pb-10

                    sm:pb-12
                "
            >
                {/* =========================================
                    PROFILE HERO
                ========================================== */}
                <section
                    className="
                        relative
                        overflow-hidden
                        bg-gradient-to-b
                        from-[#7CC0FF]
                        via-[#4DA8FE]
                        to-[#4DA8FE]
                    "
                >
                    {/* Ambient light */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-20
                            -top-20
                            h-48
                            w-48
                            rounded-full
                            bg-white/15
                            blur-3xl

                            sm:h-60
                            sm:w-60
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -bottom-24
                            -left-20
                            h-48
                            w-48
                            rounded-full
                            bg-white/10
                            blur-3xl
                        "
                    />

                    <div className="relative">
                        <ProfileHeader
                            phone={
                                user?.phone ?? ""
                            }
                            country={
                                user?.country ??
                                ""
                            }
                        />
                    </div>

                    {/* Hero bottom transition */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-x-0
                            bottom-0
                            h-10
                            bg-gradient-to-b
                            from-transparent
                            to-slate-50
                        "
                    />
                </section>

                {/* =========================================
                    PROFILE CONTENT
                ========================================== */}
                <section
                    className="
                        relative
                        z-10
                        -mt-5

                        sm:-mt-6
                    "
                >
                    <div
                        className="
                            flex
                            flex-col
                            gap-4
                            sm:gap-5
                            md:gap-6
                        "
                    >
                        {/* Upgrade */}
                        <UpgradeBanner />

                        <div className="mt-4 flex flex-col gap-3">

                            {/* Wallet */}
                            <ProfileStatsCard />

                            {/* Settings */}
                            <SettingsList />
                        </div>
                    </div>
                </section>
            </main>
        </UserGuard>
    );
}