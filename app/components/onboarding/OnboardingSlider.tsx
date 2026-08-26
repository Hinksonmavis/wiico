"use client";

import { ComponentType, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/app/constants/routes";
import SavingsJarScene from "../ilustrations/SavingsJarScene";
import PaymentScene from "../ilustrations/PaymentScene";
import GrowthScene from "../ilustrations/GrowthScene";
import { HamburgerIcon, Menu } from "lucide-react";
import WiicoLogo from "./WiicoLogo";

interface Slide {
    illustration: ComponentType;
    title: string[];
    body: string;
}

const SLIDES: Slide[] = [
    {
        illustration: SavingsJarScene,
        title: ["World International Intervention Corporative Organization (WIICO)"],

        body: "We are the world’s first Interactive Conflict to Development Investment Trust, operating in direct collaboration with the UN. You buy shares in post war reconstruction. You receive a guaranteed base dividend every single week.",
    },
    {
        illustration: PaymentScene,
        title: ["This is where we shatter every investment model"],

        body: "Your daily engagement determines how much extra you earn on top of that.We believe your attention is an asset. Your voice is capital. Your daily choices can literally move markets and move mountains of aid. Passive income is good. Active income is better. But purpose-driven active income? That is WIICO.",
    },
];

export default function OnboardingSlider() {
    const router = useRouter();

    const [index, setIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);

    const isLast = index === SLIDES.length - 1;

    const goTo = (i: number) => {
        setIndex(Math.max(0, Math.min(SLIDES.length - 1, i)));
    };

    const handleNext = () => {
        if (isLast) {
            router.push(ROUTES.REGISTER);
        } else {
            goTo(index + 1);
        }
    };

    const handleSkip = () => {
        router.push(ROUTES.REGISTER);
    };

    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;

        const delta =
            e.changedTouches[0].clientX -
            touchStartX.current;

        if (delta > 50) {
            goTo(index - 1);
        } else if (delta < -50) {
            goTo(index + 1);
        }

        touchStartX.current = null;
    };

    return (
        <div
            className="relative flex h-full flex-col overflow-hidden bg-white"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            {/* Background Glow */}
            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    -z-20
                    overflow-hidden
                "
            >
                <div
                    className="
                        absolute
                        -top-24
                        left-1/2
                        h-[420px]
                        w-[420px]
                        -translate-x-1/2
                        rounded-full
                        bg-sky-200/30
                        blur-[110px]
                    "
                />

                <div
                    className="
                        absolute
                        right-[-120px]
                        top-20
                        h-72
                        w-72
                        rounded-full
                        bg-blue-200/30
                        blur-[120px]
                    "
                />
            </div>

            {/* Skip */}
            {!isLast && (
                <button
                    type="button"
                    onClick={handleSkip}
                    className="
                        absolute
                        right-6
                        top-6
                        z-30
                        rounded-full
                        border
                        border-white/70
                        bg-white/85
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-slate-700
                        shadow-lg
                        backdrop-blur-xl
                        transition-all
                        duration-300
                        hover:bg-white
                        active:scale-95
                    "
                >
                    Skip
                </button>
            )}

            {/* Illustration */}
            <div className="relative flex-1 overflow-hidden">

                <div
                    className="flex h-full transition-transform duration-500 ease-out"
                    // style={{
                    //     transform: `translateX(-${index * 100}%)`,
                    // }}
                >
                    <WiicoLogo />
                </div>
            </div>

            {/* Bottom Panel */}
            <div
                className="
                    relative
                    overflow-hidden
                    rounded-t-[52px]
                    bg-gradient-to-br
                    from-[#39ACFF]
                    via-[#1491FF]
                    to-[#0877EA]
                    px-7
                    pt-10
                    pb-8
                    shadow-[0_-15px_40px_rgba(20,145,255,0.15)]
                "
            >
                {/* Top Shine */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        left-0
                        top-0
                        h-28
                        w-full
                        bg-gradient-to-b
                        from-white/20
                        to-transparent
                    "
                />

                {/* Decorative Glow */}
                <div
                    className="
                        absolute
                        -right-20
                        -top-20
                        h-56
                        w-56
                        rounded-full
                        bg-white/10
                        blur-[90px]
                    "
                />

                <div
                    className="
                        absolute
                        -left-20
                        bottom-0
                        h-48
                        w-48
                        rounded-full
                        bg-cyan-300/20
                        blur-[90px]
                    "
                />

                {/* Content */}
                <div className="relative z-10 overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{
                            transform: `translateX(-${index * 100}%)`,
                        }}
                    >
                        {SLIDES.map((slide, i) => (
                            <div
                                key={i}
                                className="w-full shrink-0"
                            >
                                <h2
                                    className="
                                        text-[28px]
                                        font-extrabold
                                        leading-[1.05]
                                        tracking-[-0.04em]
                                        text-white
                                    "
                                >
                                    {slide.title.map(
                                        (line, j) => (
                                            <span
                                                key={j}
                                                className="block"
                                            >
                                                {line}
                                            </span>
                                        ),
                                    )}
                                </h2>

                                <p
                                    className="
                                        mt-5
                                        max-w-[320px]
                                        text-[15px]
                                        leading-7
                                        text-blue-50
                                    "
                                >
                                    {slide.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Controls */}
                <div className="relative z-10 mt-9 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        {SLIDES.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => goTo(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`
                                    h-2.5
                                    rounded-full
                                    transition-all
                                    duration-300
                                    ${
                                        i === index
                                            ? "w-8 bg-white"
                                            : "w-2.5 bg-white/40"
                                    }
                                `}
                            />
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={handleNext}
                        className="
                            rounded-full
                            bg-gradient-to-r
                            from-slate-900
                            to-slate-800
                            px-9
                            py-4
                            text-[15px]
                            font-semibold
                            tracking-wide
                            text-white
                            shadow-[0_16px_32px_rgba(0,0,0,0.35)]
                            transition-all
                            duration-300
                            hover:scale-[1.02]
                            active:scale-95
                        "
                    >
                        {isLast
                            ? "Get Started"
                            : "Next"}
                    </button>
                </div>
            </div>
        </div>
    );
}