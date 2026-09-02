"use client";

import {
    Settings,
} from "lucide-react";

import Link from "next/link";

import NotifyBar from "@/app/components/dashboard/NotifyBar";
import BalanceCard from "@/app/components/dashboard/BalanceCard";

import { ROUTES } from "@/app/constants/routes";

import {
    useCurrentUser,
} from "@/app/hooks/clientHooks/userHooks/useCurrentUser";

interface HeroProps {
    name?: string;
}

// ============================================================
// MEMBERSHIP DISPLAY NAME
// ============================================================

function getMembershipName(
    membershipPlanName?: string | null,
): string {

    if (!membershipPlanName) {
        return "Internship Member";
    }

    const normalized =
        membershipPlanName
            .trim()
            .toLowerCase();

    switch (normalized) {

        case "internship":
        case "internship member":
            return "Internship Member";

        case "1-star":
        case "1 star":
        case "1star":
        case "1-star member":
            return "1-Star Member";

        case "2-star":
        case "2 star":
        case "2star":
        case "2-star member":
            return "2-Star Member";

        case "3-star":
        case "3 star":
        case "3star":
        case "3-star member":
            return "3-Star Member";

        case "4-star":
        case "4 star":
        case "4star":
        case "4-star member":
            return "4-Star Member";

        default:
            return `${membershipPlanName} Member`;
    }
}

// ============================================================
// HERO
// ============================================================

export default function Hero({
    name,
}: HeroProps) {

    const {
        data: user,
    } = useCurrentUser();

    // ========================================================
    // CURRENT MEMBERSHIP
    // ========================================================

    const membershipName =
        getMembershipName(
            user?.membership?.name,
        );

    // ========================================================
    // USER DISPLAY NAME
    // ========================================================
    //
    // The current User interface does not contain a `name`
    // field, so we use the Hero `name` prop.
    //
    // Example:
    //
    // <Hero name="John" />
    //
    // This will display:
    //
    // Welcome back
    // Internship Member
    //
    // Hi, John
    //
    // After upgrading:
    //
    // Welcome back
    // 1-Star Member
    //
    // Hi, John
    // ========================================================

    const displayName =
        name?.trim() || "User";

    return (
        <div
            className="
                relative
                overflow-hidden
                rounded-b-[40px]
                bg-[#FEC013]
                px-4
                pb-8
                pt-4
            "
        >

            {/* =================================================
                BACKGROUND
            ================================================== */}

            <div
                className="
                    absolute
                    inset-0
                    bg-[url('/images/background_3.jpg')]
                    bg-cover
                    bg-center
                "
                aria-hidden="true"
            />

            {/* =================================================
                DECORATIVE WAVE
            ================================================== */}

            <svg
                className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    h-32
                    w-full
                    opacity-25
                "
                viewBox="0 0 400 150"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path
                    d="M0,90 C100,30 300,150 400,70"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                />
            </svg>

            {/* =================================================
                CONTENT
            ================================================== */}

            <div
                className="
                    relative
                    z-10
                    flex
                    flex-col
                    gap-5
                    px-3
                "
            >

                {/* =================================================
                    TOP BAR
                ================================================== */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                    "
                >

                    {/* =================================================
                        MEMBERSHIP
                    ================================================== */}

                    <div className="min-w-0">

                        <p
                            className="
                                text-[11px]
                                font-semibold
                                uppercase
                                tracking-[0.16em]
                                text-white/75
                            "
                        >
                            Welcome back
                        </p>

                        <p
                            className="
                                mt-0.5
                                truncate
                                text-sm
                                font-semibold
                                text-white
                            "
                        >
                            {membershipName}
                        </p>

                    </div>

                    {/* =================================================
                        SETTINGS
                    ================================================== */}

                    <Link
                        href={ROUTES.SETTINGS}
                        aria-label="Open settings"
                        className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/20
                            bg-white/10
                            text-white
                            shadow-sm
                            backdrop-blur-md
                            transition-all
                            duration-200
                            hover:bg-white/20
                            active:scale-95
                        "
                    >
                        <Settings
                            size={19}
                            strokeWidth={2}
                        />
                    </Link>

                </div>

                {/* =================================================
                    NOTIFICATION BAR
                ================================================== */}

                <NotifyBar />

                {/* =================================================
                    GREETING
                ================================================== */}

                <div>

                    <h1
                        className="
                            text-5xl
                            font-semibold
                            leading-[1.1]
                            text-white
                        "
                    >
                        Hi, {membershipName}
                    </h1>

                    <p
                        className="
                            mt-4
                            text-[20px]
                            font-medium
                            text-white/90
                        "
                    >
                        Welcome to{" "}
                        <span className="font-bold">
                            WIICO
                        </span>
                        , Start your work journey!
                    </p>

                </div>

                {/* =================================================
                    BALANCE
                ================================================== */}

                <BalanceCard />

            </div>

        </div>
    );
}