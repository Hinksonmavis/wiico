"use client";

import {
    CircleDollarSign,
    HandCoins,
    PiggyBank,
    Users,
} from "lucide-react";

import { AdminShareAnalytics as Analytics } from "@/app/types/adminTypes/share.types";

interface AdminShareAnalyticsProps {
    analytics: Analytics;
}

function formatAmount(
    value: string,
) {
    const amount = Number(value);

    if (!Number.isFinite(amount)) {
        return value;
    }

    return new Intl.NumberFormat(
        "en-NG",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        },
    ).format(amount);
}

export default function AdminShareAnalytics({
    analytics,
}: AdminShareAnalyticsProps) {
    const cards = [
        {
            label: "Total purchasers",
            value:
                analytics.totalPurchasers.toLocaleString(),
            icon: Users,
        },
        {
            label: "Purchase amount",
            value: formatAmount(
                analytics.totalPurchaseAmount,
            ),
            icon: CircleDollarSign,
        },
        {
            label: "Expected returns",
            value: formatAmount(
                analytics.totalExpectedReturns,
            ),
            icon: PiggyBank,
        },
        {
            label: "Returns credited",
            value: formatAmount(
                analytics.totalReturnsCredited,
            ),
            icon: HandCoins,
        },
    ];

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="mb-5">
                <h2 className="text-base font-bold text-slate-900">
                    Analytics
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Financial and participation overview.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

                {cards.map(
                    ({
                        label,
                        value,
                        icon: Icon,
                    }) => (
                        <div
                            key={label}
                            className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                        >
                            <Icon
                                size={19}
                                className="text-indigo-500"
                            />

                            <p className="mt-3 text-xs font-medium text-slate-400">
                                {label}
                            </p>

                            <p className="mt-1 truncate text-lg font-bold text-slate-900">
                                {value}
                            </p>
                        </div>
                    ),
                )}
            </div>

            <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 p-4">
                <p className="text-xs font-medium text-amber-700">
                    Remaining liability
                </p>

                <p className="mt-1 text-xl font-bold text-amber-900">
                    {formatAmount(
                        analytics.remainingLiability,
                    )}
                </p>
            </div>
        </section>
    );
}