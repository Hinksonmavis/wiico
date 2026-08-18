"use client";

import {
    ArrowDownLeft,
    ArrowUpRight,
    Wallet,
    TrendingUp,
    type LucideIcon,
} from "lucide-react";

interface Props {
    availableBalance?: string;
    totalEarned?: string;
    totalDeposited?: string;
    totalWithdrawn?: string;
}

function money(value?: string) {
    return Number(value ?? 0).toLocaleString("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
    });
}

interface Stat {
    title: string;
    value: string;
    subtitle: string;
    icon: LucideIcon;
    iconBg: string;
    iconColor: string;
    accent: string;
}

export default function WalletStatsGrid({
    availableBalance = "0",
    totalEarned = "0",
    totalDeposited = "0",
    totalWithdrawn = "0",
}: Props) {
    const stats: Stat[] = [
        {
            title: "Available",
            value: money(availableBalance),
            subtitle: "Current balance",
            icon: Wallet,
            iconBg: "bg-sky-50",
            iconColor: "text-sky-600",
            accent: "bg-sky-500",
        },
        {
            title: "Earned",
            value: money(totalEarned),
            subtitle: "Lifetime earnings",
            icon: TrendingUp,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600",
            accent: "bg-emerald-500",
        },
        {
            title: "Deposited",
            value: money(totalDeposited),
            subtitle: "Funds added",
            icon: ArrowDownLeft,
            iconBg: "bg-violet-50",
            iconColor: "text-violet-600",
            accent: "bg-violet-500",
        },
        {
            title: "Withdrawn",
            value: money(totalWithdrawn),
            subtitle: "Funds withdrawn",
            icon: ArrowUpRight,
            iconBg: "bg-rose-50",
            iconColor: "text-rose-600",
            accent: "bg-rose-500",
        },
    ];

    return (
        <section
            aria-label="Wallet statistics"
            className="grid grid-cols-2 gap-3 sm:gap-4"
        >
            {stats.map((item) => {
                const Icon = item.icon;

                return (
                    <article
                        key={item.title}
                        className="
                            group
                            relative
                            min-w-0
                            overflow-hidden
                            rounded-[22px]
                            border
                            border-slate-200/80
                            bg-white
                            p-4
                            shadow-[0_4px_18px_rgba(15,23,42,0.035)]
                            transition-all
                            duration-200
                            hover:-translate-y-0.5
                            hover:border-slate-300
                            hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]
                            active:scale-[0.985]
                            sm:rounded-[24px]
                            sm:p-5
                        "
                    >
                        {/* Small accent line */}

                        <div
                            className={`
                                absolute
                                left-0
                                top-0
                                h-1
                                w-10
                                rounded-br-full
                                ${item.accent}
                            `}
                        />

                        {/* Icon */}

                        <div className="flex items-center justify-between">
                            <div
                                className={`
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    ${item.iconBg}
                                    sm:h-11
                                    sm:w-11
                                    sm:rounded-[14px]
                                `}
                            >
                                <Icon
                                    size={19}
                                    strokeWidth={2.2}
                                    className={item.iconColor}
                                />
                            </div>
                        </div>

                        {/* Label */}

                        <div className="mt-4 min-w-0 sm:mt-5">
                            <p
                                className="
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.12em]
                                    text-slate-400
                                    sm:text-[11px]
                                "
                            >
                                {item.title}
                            </p>

                            {/* Amount */}

                            <p
                                className="
                                    mt-1.5
                                    truncate
                                    text-[15px]
                                    font-bold
                                    leading-tight
                                    tracking-tight
                                    text-slate-900
                                    sm:text-lg
                                "
                                title={item.value}
                            >
                                {item.value}
                            </p>

                            {/* Description */}

                            <p
                                className="
                                    mt-1.5
                                    truncate
                                    text-[10px]
                                    font-medium
                                    leading-4
                                    text-slate-400
                                    sm:text-xs
                                "
                            >
                                {item.subtitle}
                            </p>
                        </div>
                    </article>
                );
            })}
        </section>
    );
}