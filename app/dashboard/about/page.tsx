"use client";

import {
    ArrowUpRight,
    ChevronLeft,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

import { sections } from "@/app/constants/about";
import HeroStat from "@/app/components/about/HeroStat";
import AboutHeader from "@/app/components/about/AboutHeader";


export default function AboutCompany() {
    return (
        <main className="min-h-screen overflow-x-hidden bg-[#f7f9fc]">
            
            {/* HEADER */}
            <AboutHeader />

            {/* =====================================================
                CONTENT
            ====================================================== */}
            <div
                className="
                    mx-auto
                    max-w-3xl
                    px-4
                    pb-12
                    pt-5

                    sm:px-5
                    sm:pb-16
                    sm:pt-7

                    lg:px-6
                "
            >
                {/* =================================================
                    HERO
                ================================================== */}
                <section
                    className="
                        relative
                        overflow-hidden
                        rounded-[28px]
                        bg-slate-950
                        px-5
                        py-7
                        shadow-[0_18px_45px_rgba(15,23,42,0.14)]

                        sm:rounded-[32px]
                        sm:px-8
                        sm:py-9
                    "
                >
                    {/* Background glow */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-20
                            -top-20
                            h-56
                            w-56
                            rounded-full
                            bg-[#4DA8FE]/25
                            blur-3xl
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -bottom-24
                            -left-20
                            h-52
                            w-52
                            rounded-full
                            bg-[#7CC0FF]/10
                            blur-3xl
                        "
                    />

                    {/* Grid detail */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            opacity-[0.035]
                            [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
                            [background-size:32px_32px]
                        "
                    />

                    <div className="relative">
                        {/* Badge */}
                        <div
                            className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-full
                                border
                                border-white/10
                                bg-white/[0.07]
                                px-2.5
                                py-1.5
                            "
                        >
                            <Sparkles
                                className="h-3.5 w-3.5 text-[#7CC0FF]"
                                strokeWidth={1.8}
                            />

                            <span
                                className="
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.12em]
                                    text-slate-300
                                "
                            >
                                About WIICO
                            </span>
                        </div>

                        {/* Heading */}
                        <h1
                            className="
                                mt-5
                                max-w-[540px]
                                text-[30px]
                                font-semibold
                                leading-[1.08]
                                tracking-[-0.04em]
                                text-white

                                sm:text-[40px]
                            "
                        >
                            Building the future of
                            <span className="block text-[#7CC0FF]">
                                e-commerce marketing.
                            </span>
                        </h1>

                        <p
                            className="
                                mt-4
                                max-w-[520px]
                                text-[13px]
                                leading-6
                                text-slate-400

                                sm:text-[14px]
                                sm:leading-7
                            "
                        >
                            Helping merchants grow through intelligent
                            digital marketing, global partnerships and
                            an innovative reward ecosystem.
                        </p>

                        {/* Stats */}
                        <div
                            className="
                                mt-7
                                grid
                                grid-cols-3
                                border-t
                                border-white/10
                                pt-5
                            "
                        >
                            <HeroStat
                                value="2025"
                                label="Founded"
                            />

                            <HeroStat
                                value="3+"
                                label="Marketplaces"
                            />

                            <HeroStat
                                value="60%"
                                label="Revenue Shared"
                            />
                        </div>
                    </div>
                </section>

                {/* =================================================
                    INTRODUCTION
                ================================================== */}
                <section className="mt-8 sm:mt-10">
                    <div className="flex items-center gap-2">
                        <span
                            className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-[#4DA8FE]
                            "
                        />

                        <span
                            className="
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.14em]
                                text-[#2B84E0]
                            "
                        >
                            About the company
                        </span>
                    </div>

                    <h2
                        className="
                            mt-2
                            max-w-xl
                            text-[23px]
                            font-semibold
                            leading-tight
                            tracking-tight
                            text-slate-900

                            sm:text-[28px]
                        "
                    >
                        Connecting commerce,
                        <span className="text-slate-400">
                            {" "}
                            technology and opportunity.
                        </span>
                    </h2>
                </section>

                {/* =================================================
                    STORY SECTIONS
                ================================================== */}
                <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-4">
                    {sections.map((section) => {
                        const Icon = section.icon;

                        return (
                            <article
                                key={section.number}
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-[22px]
                                    border
                                    border-slate-200/80
                                    bg-white
                                    p-5
                                    shadow-[0_5px_20px_rgba(15,23,42,0.035)]
                                    transition-all
                                    duration-300
                                    hover:border-[#4DA8FE]/30
                                    hover:shadow-[0_12px_30px_rgba(15,23,42,0.07)]

                                    sm:rounded-[24px]
                                    sm:p-6
                                "
                            >
                                {/* Number */}
                                <span
                                    className="
                                        pointer-events-none
                                        absolute
                                        right-4
                                        top-2
                                        select-none
                                        text-[58px]
                                        font-bold
                                        leading-none
                                        tracking-[-0.06em]
                                        text-slate-100

                                        sm:right-6
                                        sm:text-[68px]
                                    "
                                >
                                    {section.number}
                                </span>

                                <div className="relative">
                                    {/* Section heading */}
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="
                                                flex
                                                h-10
                                                w-10
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-xl
                                                bg-[#4DA8FE]/10
                                                text-[#2B84E0]

                                                sm:h-11
                                                sm:w-11
                                            "
                                        >
                                            <Icon
                                                className="h-[18px] w-[18px]"
                                                strokeWidth={1.8}
                                            />
                                        </div>

                                        <div className="min-w-0">
                                            <p
                                                className="
                                                    text-[9px]
                                                    font-semibold
                                                    uppercase
                                                    tracking-[0.14em]
                                                    text-[#4DA8FE]
                                                "
                                            >
                                                {section.eyebrow}
                                            </p>

                                            <h3
                                                className="
                                                    mt-0.5
                                                    text-[16px]
                                                    font-semibold
                                                    tracking-tight
                                                    text-slate-900

                                                    sm:text-[17px]
                                                "
                                            >
                                                {section.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <p
                                        className="
                                            mt-4
                                            text-[13px]
                                            leading-6
                                            text-slate-500

                                            sm:text-[14px]
                                            sm:leading-7
                                        "
                                    >
                                        {section.content}
                                    </p>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* =================================================
                    MEMBER ECOSYSTEM HIGHLIGHT
                ================================================== */}
                <section
                    className="
                        relative
                        mt-6
                        overflow-hidden
                        rounded-[24px]
                        border
                        border-[#4DA8FE]/15
                        bg-[#edf6ff]
                        p-5

                        sm:mt-7
                        sm:p-6
                    "
                >
                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-10
                            -top-10
                            h-32
                            w-32
                            rounded-full
                            bg-[#4DA8FE]/10
                            blur-2xl
                        "
                    />

                    <div className="relative flex gap-3.5">
                        <div
                            className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-white
                                text-[#2B84E0]
                                shadow-sm
                            "
                        >
                            <ShieldCheck
                                className="h-[19px] w-[19px]"
                                strokeWidth={1.8}
                            />
                        </div>

                        <div>
                            <p
                                className="
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.12em]
                                    text-[#2B84E0]
                                "
                            >
                                Our Ecosystem
                            </p>

                            <h3
                                className="
                                    mt-1
                                    text-[16px]
                                    font-semibold
                                    tracking-tight
                                    text-slate-900
                                "
                            >
                                Built around shared growth
                            </h3>

                            <p
                                className="
                                    mt-2
                                    text-[12px]
                                    leading-5
                                    text-slate-500

                                    sm:text-[13px]
                                    sm:leading-6
                                "
                            >
                                Merchants gain greater visibility and
                                sales performance while members
                                participate in promotional campaigns
                                and receive rewards.
                            </p>
                        </div>
                    </div>
                </section>

                {/* =================================================
                    MISSION
                ================================================== */}
                <section
                    className="
                        relative
                        mt-6
                        overflow-hidden
                        rounded-[26px]
                        bg-slate-900
                        px-5
                        py-7

                        sm:mt-7
                        sm:rounded-[30px]
                        sm:px-7
                        sm:py-8
                    "
                >
                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-12
                            -top-12
                            h-40
                            w-40
                            rounded-full
                            bg-[#4DA8FE]/20
                            blur-3xl
                        "
                    />

                    <div className="relative">
                        <div className="flex items-center gap-2">
                            <span
                                className="
                                    h-1.5
                                    w-1.5
                                    rounded-full
                                    bg-[#7CC0FF]
                                "
                            />

                            <span
                                className="
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.14em]
                                    text-[#7CC0FF]
                                "
                            >
                                Our Mission
                            </span>
                        </div>

                        <h2
                            className="
                                mt-4
                                max-w-lg
                                text-[24px]
                                font-semibold
                                leading-tight
                                tracking-tight
                                text-white

                                sm:text-[30px]
                            "
                        >
                            Making digital commerce
                            <span className="text-[#7CC0FF]">
                                {" "}
                                more accessible.
                            </span>
                        </h2>

                        <p
                            className="
                                mt-4
                                max-w-xl
                                text-[13px]
                                leading-6
                                text-slate-400

                                sm:text-[14px]
                                sm:leading-7
                            "
                        >
                            To empower businesses worldwide with
                            innovative digital marketing solutions
                            while creating meaningful earning
                            opportunities for our growing global
                            community of members.
                        </p>

                        <div
                            className="
                                mt-6
                                inline-flex
                                items-center
                                gap-2
                                text-[11px]
                                font-semibold
                                text-slate-300
                            "
                        >
                            <span>WIICO</span>

                            <ArrowUpRight
                                className="h-3.5 w-3.5 text-[#7CC0FF]"
                                strokeWidth={2}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}