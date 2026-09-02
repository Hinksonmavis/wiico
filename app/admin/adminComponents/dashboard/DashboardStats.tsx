"use client";

import {
    Users,
    Wallet,
    ArrowDownToLine,
    ArrowUpCircle,
    Clock3,
    TrendingUp,
    CreditCard,
} from "lucide-react";

interface DashboardStatistics {
    totalUsers: number;
    activeUsers: number;

    pendingUpgradeRequests: number;
    pendingWithdrawals: number;

    /**
     * Money credited into the admin wallet.
     */
    totalRevenue: number;

    /**
     * Money debited from the admin wallet
     * and transferred to users.
     */
    totalAdminDebits: number;

    totalTransactions: number;
}

interface DashboardStatsProps {
    statistics?: DashboardStatistics;
    loading?: boolean;
}

function formatCurrency(
    value: number,
) {
    return `₦${Number(value ?? 0).toLocaleString(
        "en-NG",
        {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        },
    )}`;
}

export default function DashboardStats({
    statistics,
    loading = false,
}: DashboardStatsProps) {

    const cards = [
        {
            title: "Total Users",
            value:
                statistics?.totalUsers ?? 0,
            icon: Users,
            description:
                "Registered users",
            iconClass:
                "bg-blue-50 text-blue-600",
        },

        {
            title: "Active Users",
            value:
                statistics?.activeUsers ?? 0,
            icon: TrendingUp,
            description:
                "Currently active",
            iconClass:
                "bg-emerald-50 text-emerald-600",
        },

        {
            title: "Revenue",
            value: formatCurrency(
                statistics?.totalRevenue ?? 0,
            ),
            icon: Wallet,
            description:
                "Admin wallet credits",
            iconClass:
                "bg-green-50 text-green-600",
        },

        {
            title: "Admin Debits",
            value: formatCurrency(
                statistics?.totalAdminDebits ?? 0,
            ),
            icon: ArrowDownToLine,
            description:
                "Sent to users",
            iconClass:
                "bg-amber-50 text-amber-600",
        },

        {
            title: "Transactions",
            value:
                statistics?.totalTransactions ?? 0,
            icon: CreditCard,
            description:
                "Completed transactions",
            iconClass:
                "bg-purple-50 text-purple-600",
        },

        {
            title: "Pending Upgrades",
            value:
                statistics
                    ?.pendingUpgradeRequests ??
                0,
            icon: ArrowUpCircle,
            description:
                "Awaiting approval",
            iconClass:
                "bg-orange-50 text-orange-600",
        },

        {
            title: "Pending Withdrawals",
            value:
                statistics
                    ?.pendingWithdrawals ??
                0,
            icon: Clock3,
            description:
                "Awaiting processing",
            iconClass:
                "bg-red-50 text-red-600",
        },
    ];

    return (
        <section className="space-y-5">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                    Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Monitor your platform performance and wallet activity.
                </p>
            </div>

            {/* =====================================================
                STAT CARDS
            ===================================================== */}

            <div
                className="
                    grid
                    grid-cols-2
                    gap-3
                    sm:grid-cols-3
                    lg:grid-cols-4
                "
            >

                {cards.map((card) => {

                    const Icon =
                        card.icon;

                    return (
                        <div
                            key={card.title}
                            className="
                                group
                                rounded-3xl
                                border
                                border-slate-200
                                bg-white
                                p-4
                                shadow-sm
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:shadow-md
                            "
                        >

                            {loading ? (
                                <div
                                    className="
                                        animate-pulse
                                        space-y-4
                                    "
                                >
                                    <div
                                        className="
                                            h-11
                                            w-11
                                            rounded-2xl
                                            bg-slate-200
                                        "
                                    />

                                    <div
                                        className="
                                            h-7
                                            w-24
                                            rounded-lg
                                            bg-slate-200
                                        "
                                    />

                                    <div
                                        className="
                                            h-3
                                            w-20
                                            rounded
                                            bg-slate-100
                                        "
                                    />
                                </div>
                            ) : (
                                <>
                                    {/* ICON */}

                                    <div
                                        className={`
                                            flex
                                            h-11
                                            w-11
                                            items-center
                                            justify-center
                                            rounded-2xl
                                            ${card.iconClass}
                                        `}
                                    >
                                        <Icon
                                            size={21}
                                            strokeWidth={2}
                                        />
                                    </div>

                                    {/* VALUE */}

                                    <h3
                                        className="
                                            mt-4
                                            break-words
                                            text-xl
                                            font-bold
                                            tracking-tight
                                            text-slate-900
                                            sm:text-2xl
                                        "
                                    >
                                        {card.value}
                                    </h3>

                                    {/* TITLE */}

                                    <p
                                        className="
                                            mt-1
                                            text-xs
                                            font-semibold
                                            text-slate-700
                                        "
                                    >
                                        {card.title}
                                    </p>

                                    {/* DESCRIPTION */}

                                    <p
                                        className="
                                            mt-0.5
                                            text-[11px]
                                            text-slate-400
                                        "
                                    >
                                        {card.description}
                                    </p>
                                </>
                            )}

                        </div>
                    );
                })}

            </div>

        </section>
    );
}