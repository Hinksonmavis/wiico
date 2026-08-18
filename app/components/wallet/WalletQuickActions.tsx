"use client";

import { useRouter } from "next/navigation";
import {
    ArrowDownLeft,
    ArrowUpRight,
    ReceiptText,
    Clock3,
    ChevronRight,
    type LucideIcon,
} from "lucide-react";

interface Action {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
    iconBg: string;
    iconColor: string;
    accent: string;
}

export default function WalletQuickActions() {
    const router = useRouter();

    const actions: Action[] = [
        {
            title: "Deposit",
            description: "Add money to wallet",
            icon: ArrowDownLeft,
            href: "/dashboard/wallet/deposit",
            iconBg: "bg-sky-50",
            iconColor: "text-sky-600",
            accent: "bg-sky-500",
        },
        {
            title: "Withdraw",
            description: "Move money out",
            icon: ArrowUpRight,
            href: "/dashboard/wallet/withdrawal",
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600",
            accent: "bg-emerald-500",
        },
        {
            title: "Transactions",
            description: "View wallet activity",
            icon: ReceiptText,
            href: "/dashboard/transactions",
            iconBg: "bg-violet-50",
            iconColor: "text-violet-600",
            accent: "bg-violet-500",
        },
        {
            title: "Pending",
            description: "Track pending requests",
            icon: Clock3,
            href: "/dashboard/wallet/withdrawals",
            iconBg: "bg-amber-50",
            iconColor: "text-amber-600",
            accent: "bg-amber-500",
        },
    ];

    return (
        <section className="space-y-4">
            {/* Section heading */}

            <div className="px-1">
                <h2
                    className="
                        text-[17px]
                        font-bold
                        tracking-tight
                        text-slate-900
                    "
                >
                    Quick Actions
                </h2>

                <p
                    className="
                        mt-1
                        text-[13px]
                        font-medium
                        text-slate-400
                    "
                >
                    Manage your wallet in seconds.
                </p>
            </div>

            {/* Actions */}

            <div
                className="
                    grid
                    grid-cols-2
                    gap-3
                    sm:gap-4
                "
            >
                {actions.map((action) => {
                    const Icon = action.icon;

                    return (
                        <button
                            key={action.title}
                            type="button"
                            onClick={() => router.push(action.href)}
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
                                text-left
                                shadow-[0_4px_18px_rgba(15,23,42,0.035)]
                                transition-all
                                duration-200
                                hover:-translate-y-0.5
                                hover:border-slate-300
                                hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]
                                active:scale-[0.975]
                                sm:rounded-[24px]
                                sm:p-5
                            "
                        >
                            {/* Accent */}

                            <div
                                className={`
                                    absolute
                                    left-0
                                    top-0
                                    h-1
                                    w-9
                                    rounded-br-full
                                    ${action.accent}
                                `}
                            />

                            {/* Top row */}

                            <div
                                className="
                                    flex
                                    items-start
                                    justify-between
                                    gap-2
                                "
                            >
                                <div
                                    className={`
                                        flex
                                        h-10
                                        w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        ${action.iconBg}
                                        sm:h-11
                                        sm:w-11
                                        sm:rounded-[14px]
                                    `}
                                >
                                    <Icon
                                        size={19}
                                        strokeWidth={2.2}
                                        className={action.iconColor}
                                    />
                                </div>

                                <div
                                    className="
                                        flex
                                        h-7
                                        w-7
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-slate-50
                                        text-slate-300
                                        transition-all
                                        duration-200
                                        group-hover:bg-slate-100
                                        group-hover:text-slate-600
                                    "
                                >
                                    <ChevronRight
                                        size={15}
                                        strokeWidth={2.2}
                                    />
                                </div>
                            </div>

                            {/* Content */}

                            <div className="mt-4 min-w-0 sm:mt-5">
                                <h3
                                    className="
                                        truncate
                                        text-[14px]
                                        font-bold
                                        tracking-tight
                                        text-slate-900
                                        sm:text-[15px]
                                    "
                                >
                                    {action.title}
                                </h3>

                                <p
                                    className="
                                        mt-1
                                        truncate
                                        text-[11px]
                                        font-medium
                                        leading-4
                                        text-slate-400
                                        sm:text-xs
                                    "
                                >
                                    {action.description}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}