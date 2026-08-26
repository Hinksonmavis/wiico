"use client";

import { useEffect, useRef, useState } from "react";
import {
    ArrowRight,
    Building2,
    HandHeart,
    TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/app/constants/routes";

interface Slide {
    badge: string;
    title: string;
    subtitle: string;
    eyebrow: string;
    icon: typeof Building2;
    iconLabel: string;
}

const SLIDES: Slide[] = [
    {
        badge: "Purpose-Led Investing",
        eyebrow: "BUILDING TOMORROW",
        title: "Invest in\nRebuilding Futures",
        subtitle:
            "Take part in post-conflict reconstruction opportunities designed to create lasting economic impact.",
        icon: Building2,
        iconLabel: "Community development",
    },
    {
        badge: "Daily Impact",
        eyebrow: "MAKE IT COUNT",
        title: "Your Actions\nCreate Value",
        subtitle:
            "Complete daily activities, grow your community and unlock added reward opportunities.",
        icon: HandHeart,
        iconLabel: "Positive impact",
    },
    {
        badge: "Investor Rewards",
        eyebrow: "GROW WITH PURPOSE",
        title: "Earn With\nPurpose",
        subtitle:
            "Build toward weekly rewards while supporting projects that help communities recover and grow.",
        icon: TrendingUp,
        iconLabel: "Investment growth",
    },
];

const AUTOPLAY = 5000;
const SWIPE_THRESHOLD = 50;

export default function PromoCarousel() {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const touchStart = useRef<number | null>(null);

    useEffect(() => {
        if (paused) return;

        const timer = window.setInterval(() => {
            setIndex((current) => (current + 1) % SLIDES.length);
        }, AUTOPLAY);

        return () => window.clearInterval(timer);
    }, [paused]);

    function goTo(nextIndex: number) {
        setIndex((nextIndex + SLIDES.length) % SLIDES.length);
    }

    function onTouchStart(event: React.TouchEvent) {
        touchStart.current = event.touches[0].clientX;
        setPaused(true);
    }

    function onTouchEnd(event: React.TouchEvent) {
        if (touchStart.current === null) return;

        const distance =
            event.changedTouches[0].clientX - touchStart.current;

        if (distance > SWIPE_THRESHOLD) goTo(index - 1);
        if (distance < -SWIPE_THRESHOLD) goTo(index + 1);

        touchStart.current = null;
        setPaused(false);
    }

    return (
        <section
            className="w-full"
            aria-roledescription="carousel"
            aria-label="WIICO highlights"
        >
            <div
                className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[#f7fbff] shadow-[0_20px_50px_rgba(15,23,42,0.10)]"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            >
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-200/55 blur-3xl" />
                    <div className="absolute -bottom-32 left-[35%] h-64 w-64 rounded-full bg-cyan-100 blur-3xl" />
                    <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,.52)_50%,transparent_100%)]" />
                </div>

                <div
                    className="flex transition-transform duration-700 ease-out"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {SLIDES.map((slide, slideIndex) => {
                        const Icon = slide.icon;

                        return (
                            <article
                                key={slide.badge}
                                className="relative grid min-w-full items-center gap-8 px-6 py-7 sm:px-9 sm:py-9 md:grid-cols-[1.15fr_.85fr] md:px-12 md:py-11"
                                aria-hidden={slideIndex !== index}
                            >
                                <div className="relative z-10 max-w-xl">
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex rounded-full border border-blue-200 bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-700">
                                            {slide.badge}
                                        </span>

                                        <span className="text-[10px] font-bold tracking-[0.14em] text-slate-500">
                                            {slide.eyebrow}
                                        </span>
                                    </div>

                                    <h2 className="mt-5 whitespace-pre-line text-3xl font-bold leading-[1.08] tracking-[-0.04em] text-slate-950 sm:text-4xl">
                                        {slide.title}
                                    </h2>

                                    <p className="mt-4 max-w-md text-sm leading-6 text-slate-600 sm:text-[15px]">
                                        {slide.subtitle}
                                    </p>

                                    <Link
                                        href={ROUTES.SHARES}
                                        type="button"
                                        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
                                    >
                                        Explore WIICO
                                        <ArrowRight size={16} aria-hidden="true" />
                                    </Link>
                                </div>

                                <div className="relative z-10 hidden justify-end md:flex">
                                    <div className="relative flex h-52 w-52 items-center justify-center rounded-[2rem] border border-white/70 bg-white/55 shadow-[0_24px_50px_rgba(37,99,235,.16)] backdrop-blur-sm">
                                        <div className="absolute inset-5 rounded-[1.4rem] bg-gradient-to-br from-blue-600 to-cyan-400 opacity-95" />
                                        <Icon
                                            size={72}
                                            strokeWidth={1.35}
                                            className="relative text-white"
                                            aria-label={slide.iconLabel}
                                        />
                                        <div className="absolute -bottom-3 -left-3 rounded-xl border border-white/80 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-lg">
                                            WIICO Impact
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2">
                {SLIDES.map((slide, slideIndex) => (
                    <button
                        key={slide.badge}
                        type="button"
                        onClick={() => goTo(slideIndex)}
                        aria-label={`Show slide ${slideIndex + 1}: ${slide.badge}`}
                        aria-current={slideIndex === index}
                        className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                            slideIndex === index
                                ? "w-8 bg-blue-600"
                                : "w-2 bg-slate-300 hover:bg-slate-400"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}