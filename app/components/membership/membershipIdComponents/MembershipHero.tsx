"use client";

import { ArrowLeft, ChevronRight } from "lucide-react";

import TierBadge from "../TierBadge";
import { MembershipTier } from "@/app/types/clientTypes/membership.types";

interface MembershipHeroProps {
    tier: MembershipTier;
    onBack: () => void;
    isCurrent?: boolean;
}

export default function MembershipHero({
    tier,
    onBack,
    isCurrent = false,
}: MembershipHeroProps) {
    return (
        <section
            className="
                relative
                overflow-hidden
                rounded-b-[30px]
                bg-gradient-to-br
                from-[#66B9FF]
                via-[#2498FF]
                to-[#0A76F6]
                pb-8
                pt-safe
            "
        >
            {/* Background */}

            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/15 blur-3xl" />

            <div className="absolute -left-16 bottom-0 h-36 w-36 rounded-full bg-cyan-300/15 blur-3xl" />

            {/* Navigation */}

            <div className="relative z-20 flex items-center justify-between px-4 pt-4">

                <button
                    onClick={onBack}
                    className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/20
                        bg-white/15
                        backdrop-blur-xl
                        transition
                        active:scale-95
                    "
                >
                    <ArrowLeft
                        size={18}
                        className="text-white"
                    />
                </button>

                <div
                    className="
                        rounded-full
                        border
                        border-white/20
                        bg-white/15
                        px-3
                        py-1.5
                        backdrop-blur-xl
                    "
                >
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                        Membership
                    </span>
                </div>

                <div className="w-10" />

            </div>

            {/* Hero */}

            <div className="relative z-20 px-5 pt-5">

                <div className="flex justify-center">
                    <TierBadge
                         name={tier.name}
                        internship={tier.isInternship}
                    />

                    {isCurrent && (
                        <div className="mt-3 flex justify-center">
                            <span
                                className="
                                    inline-flex
                                    items-center
                                    gap-1.5
                                    rounded-full
                                    border
                                    border-white/25
                                    bg-white/15
                                    px-3
                                    py-1.5
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.14em]
                                    text-white
                                    backdrop-blur-md
                                "
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                Current Membership
                            </span>
                        </div>
                    )}
                </div>

                <h1
                    className="
                        mt-5
                        text-center
                        text-2xl
                        font-bold
                        tracking-tight
                        text-white
                    "
                >
                    {tier.name}
                </h1>

                <p
                    className="
                        mx-auto
                        mt-2
                        max-w-xs
                        text-center
                        text-[13px]
                        leading-6
                        text-white/90
                    "
                >
                    {tier.description}
                </p>

                {/* Premium Card */}

                <div
                    className="
                        mx-auto
                        mt-5
                        flex
                        max-w-xs
                        items-center
                        justify-between
                        rounded-2xl
                        border
                        border-white/20
                        bg-white/15
                        px-4
                        py-3
                        backdrop-blur-xl
                    "
                >
                    <div>

                        <p className="text-[10px] text-white/70">
                            Premium Benefits
                        </p>

                        <p className="mt-1 text-sm font-semibold text-white">
                            Higher earnings & rewards
                        </p>

                    </div>

                    <div
                        className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            bg-white
                        "
                    >
                        <ChevronRight
                            size={15}
                            className="text-[#2498FF]"
                        />
                    </div>

                </div>

            </div>

            {/* Bottom Fade */}

            <div
                className="
                    absolute
                    bottom-0
                    left-0
                    h-16
                    w-full
                    bg-gradient-to-b
                    from-transparent
                    to-white/15
                "
            />

        </section>
    );
}