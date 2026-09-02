"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import MembershipTierSlider from "@/app/components/membership/MembershipTierSlider";

import { ROUTES } from "@/app/constants/routes";

import { useMemberships } from "@/app/hooks/clientHooks/membershipHooks/useMemberships";
import { useCurrentMembership } from "@/app/hooks/clientHooks/membershipHooks/useCurrentMembership";

export default function MembershipPage() {
    const router = useRouter();

    const {
        data: tiers = [],
        isLoading: membershipsLoading,
        isError: membershipsError,
    } = useMemberships();

    const {
        data: currentMembership,
        isLoading: currentMembershipLoading,
        isError: currentMembershipError,
    } = useCurrentMembership();

    const isLoading =
        membershipsLoading ||
        currentMembershipLoading;

    const isError =
        membershipsError ||
        currentMembershipError;

    if (isLoading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
                <div className="w-full max-w-sm text-center">
                    <div className="mx-auto h-12 w-12 animate-pulse rounded-2xl bg-slate-200" />

                    <p className="mt-4 text-sm font-medium text-slate-500">
                        Loading memberships...
                    </p>
                </div>
            </main>
        );
    }

    if (isError) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
                <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900">
                        Unable to load memberships
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        We couldn't retrieve your membership
                        information. Please try again.
                    </p>

                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="
                            mt-6
                            rounded-2xl
                            bg-[#1592FF]
                            px-5
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            transition
                            active:scale-95
                        "
                    >
                        Try Again
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="overflow-x-hidden bg-slate-50">
            {/* Hero */}
            <section
                className="
                    relative
                    overflow-hidden
                    bg-gradient-to-br
                    from-[#8CCEFF]
                    via-[#4DA8FE]
                    to-[#0E8FFF]
                    px-4
                    pb-24
                    pt-8
                    sm:px-6
                    sm:pb-32
                    sm:pt-10
                "
            >
                {/* Top Glow */}
                <div
                    className="
                        absolute
                        -right-20
                        -top-20
                        h-20
                        w-20
                        rounded-full
                        bg-white/20
                        blur-[90px]
                    "
                />

                {/* Left Glow */}
                <div
                    className="
                        absolute
                        -bottom-10
                        -left-20
                        h-12
                        w-12
                        rounded-full
                        bg-white/15
                        blur-[90px]
                    "
                />

                {/* Floating Light */}
                <div
                    className="
                        absolute
                        right-10
                        top-24
                        h-8
                        w-8
                        rounded-full
                        bg-white/10
                        blur-2xl
                    "
                />

                <div className="relative z-10">
                    {/* Back Button */}
                    <button
                        type="button"
                        onClick={() => router.back()}
                        aria-label="Go back"
                        className="
                            absolute
                            left-0
                            top-0
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/20
                            bg-white/15
                            text-white
                            backdrop-blur-xl
                            transition-all
                            duration-200
                            hover:bg-white/20
                            active:scale-95
                        "
                    >
                        <ArrowLeft
                            size={20}
                            strokeWidth={2.2}
                        />
                    </button>

                    <div className="flex flex-col items-center text-center">
                        <span
                            className="
                                inline-flex
                                rounded-full
                                border
                                border-white/20
                                bg-white/20
                                px-4
                                py-2
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.18em]
                                text-white
                                backdrop-blur-xl
                            "
                        >
                            Membership Center
                        </span>

                        <h1 className="mt-5 text-3xl font-bold tracking-tight text-white">
                            Your Membership
                        </h1>

                        <p
                            className="
                                mt-3
                                max-w-sm
                                text-sm
                                leading-6
                                text-blue-50/95
                            "
                        >
                            View your current membership and
                            explore higher plans with greater
                            earning opportunities.
                        </p>

                        {/* Current Membership Summary */}
                        {currentMembership && (
                            <div
                                className="
                                    mt-5
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-white/20
                                    bg-white/15
                                    px-4
                                    py-2.5
                                    backdrop-blur-xl
                                "
                            >
                                <span className="h-2 w-2 rounded-full bg-white" />

                                <span className="text-xs font-medium text-white/80">
                                    Current Plan:
                                </span>

                                <span className="text-xs font-bold text-white">
                                    {currentMembership.name}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Fog */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        -bottom-28
                        left-1/2
                        h-56
                        w-[160%]
                        -translate-x-1/2
                        rounded-full
                        bg-white
                        opacity-95
                        blur-[80px]
                    "
                />

                {/* Extra Fade */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        bottom-0
                        left-0
                        h-14
                        w-full
                        bg-gradient-to-b
                        from-transparent
                        via-white/25
                        to-white
                    "
                />
            </section>

            {/* Membership Slider */}
            <section className="-mt-16 px-4 pb-10">
                <MembershipTierSlider
                    tiers={tiers}
                    currentMembershipId={
                        currentMembership?.id
                    }
                    onJoin={(slug) =>
                        router.push(
                            `${ROUTES.MEMBERS}/${slug}`,
                        )
                    }
                />
            </section>
        </main>
    );
}