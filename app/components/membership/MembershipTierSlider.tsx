"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import TierBadge from "./TierBadge";
import MembershipTierSlide from "./MembershipTierSlide";

import { MembershipTier } from "@/app/types/clientTypes/membership.types";

interface MembershipTierSliderProps {
    tiers: MembershipTier[];
    currentMembershipId?: string;
    onJoin?: (slug: string) => void;
}

export default function MembershipTierSlider({
    tiers,
    currentMembershipId,
    onJoin,
}: MembershipTierSliderProps) {
    const scrollRef =
        useRef<HTMLDivElement>(null);

    const [index, setIndex] = useState(0);

    const currentIndex = currentMembershipId
        ? tiers.findIndex(
              (tier) =>
                  tier.id === currentMembershipId,
          )
        : -1;

    function scrollToCard(i: number) {
        if (!scrollRef.current) return;

        const container = scrollRef.current;

        const clamped = Math.max(
            0,
            Math.min(tiers.length - 1, i),
        );

        const cardWidth =
            container.clientWidth + 20;

        container.scrollTo({
            left: clamped * cardWidth,
            behavior: "smooth",
        });

        setIndex(clamped);
    }

    function handleScroll() {
        if (!scrollRef.current) return;

        const container = scrollRef.current;

        const cardWidth =
            container.clientWidth + 20;

        const current = Math.round(
            container.scrollLeft / cardWidth,
        );

        if (current !== index) {
            setIndex(current);
        }
    }

    useEffect(() => {
        if (tiers.length === 0) return;

        const startingIndex =
            currentIndex >= 0
                ? currentIndex
                : 0;

        // Wait until the slider has been rendered.
        requestAnimationFrame(() => {
            if (!scrollRef.current) return;

            const container =
                scrollRef.current;

            const cardWidth =
                container.clientWidth + 20;

            container.scrollTo({
                left:
                    startingIndex *
                    cardWidth,
                behavior: "auto",
            });

            setIndex(startingIndex);
        });
    }, [
        tiers.length,
        currentMembershipId,
        currentIndex,
    ]);

    if (tiers.length === 0) {
        return null;
    }

    return (
        <div className="w-full">
            {/* Cards */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="
                    flex
                    snap-x
                    snap-mandatory
                    gap-5
                    overflow-x-auto
                    scroll-smooth
                    scrollbar-none
                    px-1
                    pb-6
                "
            >
                {tiers.map((tier) => {
                    const isCurrent =
                        tier.id ===
                        currentMembershipId;

                    return (
                        <div
                            key={tier.id}
                            className="
                                w-full
                                shrink-0
                                snap-center
                            "
                        >
                            {/* Blue Header */}
                            <div
                                className="
                                    relative
                                    z-0
                                    overflow-hidden
                                    rounded-[34px]
                                    bg-gradient-to-br
                                    from-[#8ED1FF]
                                    via-[#4DA8FE]
                                    to-[#148EFF]
                                    px-6
                                    pb-20
                                    pt-8
                                    shadow-xl
                                "
                            >
                                {/* Top Glow */}
                                <div
                                    className="
                                        pointer-events-none
                                        absolute
                                        -right-10
                                        -top-10
                                        h-32
                                        w-32
                                        rounded-full
                                        bg-white/15
                                        blur-2xl
                                    "
                                />

                                {/* Bottom Glow */}
                                <div
                                    className="
                                        pointer-events-none
                                        absolute
                                        -bottom-5
                                        -left-10
                                        h-24
                                        w-24
                                        rounded-full
                                        bg-white/10
                                        blur-xl
                                    "
                                />

                                {/* Header */}
                                <div
                                    className="
                                        relative
                                        z-10
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >
                                    {/* Previous */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            scrollToCard(
                                                index - 1,
                                            )
                                        }
                                        disabled={
                                            index === 0
                                        }
                                        aria-label="Previous membership"
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-white/15
                                            text-white
                                            backdrop-blur-md
                                            transition-all
                                            hover:bg-white/25
                                            active:scale-95
                                            disabled:opacity-30
                                        "
                                    >
                                        <ChevronLeft
                                            size={22}
                                            strokeWidth={2.5}
                                        />
                                    </button>

                                    <TierBadge
                                        name={tier.name}
                                        internship={
                                            tier.isInternship
                                        }
                                    />

                                    {/* Next */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            scrollToCard(
                                                index + 1,
                                            )
                                        }
                                        disabled={
                                            index ===
                                            tiers.length - 1
                                        }
                                        aria-label="Next membership"
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-white/15
                                            text-white
                                            backdrop-blur-md
                                            transition-all
                                            hover:bg-white/25
                                            active:scale-95
                                            disabled:opacity-30
                                        "
                                    >
                                        <ChevronRight
                                            size={22}
                                            strokeWidth={2.5}
                                        />
                                    </button>
                                </div>

                                <h3
                                    className="
                                        relative
                                        z-10
                                        mt-5
                                        text-center
                                        text-xl
                                        font-bold
                                        text-white
                                        md:text-2xl
                                    "
                                >
                                    {tier.name}
                                </h3>

                                {/* Current Plan Label */}
                                {isCurrent && (
                                    <div className="relative z-10 mt-3 flex justify-center">
                                        <span
                                            className="
                                                inline-flex
                                                items-center
                                                gap-1.5
                                                rounded-full
                                                border
                                                border-white/30
                                                bg-white/20
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
                                            Your Current Plan
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div
                                className="
                                    relative
                                    z-20
                                    -mt-14
                                    mx-1
                                    rounded-[32px]
                                    bg-white
                                    shadow-[0_20px_50px_rgba(15,23,42,0.12)]
                                "
                            >
                                <MembershipTierSlide
                                    tier={tier}
                                    isCurrent={isCurrent}
                                    onJoin={onJoin}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Indicators */}
            {tiers.length > 1 && (
                <div className="mt-4 flex justify-center gap-2">
                    {tiers.map((tier, i) => (
                        <button
                            key={tier.id}
                            type="button"
                            onClick={() =>
                                scrollToCard(i)
                            }
                            aria-label={`Go to membership ${i + 1}`}
                            className={`
                                rounded-full
                                transition-all
                                duration-300
                                ${
                                    index === i
                                        ? "h-2 w-8 bg-[#2B84E0]"
                                        : "h-2 w-2 bg-slate-300"
                                }
                            `}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}