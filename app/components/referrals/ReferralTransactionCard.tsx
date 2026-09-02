"use client";

import {
    ArrowDownLeft,
    CheckCircle2,
    Clock3,
    XCircle,
} from "lucide-react";

import {
    Transaction,
} from "@/app/types/clientTypes/transaction.types";

import {
    getReferralLevel,
    getReferralSource,
} from "@/app/utils/referralTransaction.utils";

interface ReferralTransactionCardProps {
    transaction: Transaction;
}

function formatAmount(
    amount: string,
): string {

    const value =
        Number(amount);

    if (!Number.isFinite(value)) {
        return "₦0.00";
    }

    return `₦${value.toLocaleString(
        "en-NG",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        },
    )}`;
}

function formatDate(
    value: string,
): string {

    const date =
        new Date(value);

    if (
        Number.isNaN(
            date.getTime(),
        )
    ) {
        return "Recently";
    }

    return new Intl.DateTimeFormat(
        "en-NG",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        },
    ).format(date);
}

export default function ReferralTransactionCard({
    transaction,
}: ReferralTransactionCardProps) {

    const level =
        getReferralLevel(transaction);

    const source =
        getReferralSource(transaction);

    const amount =
        formatAmount(transaction.amount);

    const status =
        transaction.status;

    const isCompleted =
        status === "completed";

    const isPending =
        status === "pending";

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

            <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                    <ArrowDownLeft className="h-4 w-4 text-emerald-600" />
                </div>

                <div className="min-w-0 flex-1">

                    <p className="text-sm font-semibold text-slate-900">
                        Referral Commission
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">

                        {level !== null && (
                            <>
                                <span>
                                    Level {level}
                                </span>

                                <span>•</span>
                            </>
                        )}

                        <span>
                            {source}
                        </span>

                    </div>

                </div>

                <div className="shrink-0 text-right">

                    <p className="text-sm font-bold text-emerald-600">
                        + {amount}
                    </p>

                    <div className="mt-1 flex items-center justify-end gap-1">

                        {isCompleted ? (
                            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        ) : isPending ? (
                            <Clock3 className="h-3 w-3 text-amber-500" />
                        ) : (
                            <XCircle className="h-3 w-3 text-red-500" />
                        )}

                        <span
                            className={[
                                "text-[10px] font-semibold uppercase",
                                isCompleted
                                    ? "text-emerald-600"
                                    : isPending
                                        ? "text-amber-600"
                                        : "text-red-600",
                            ].join(" ")}
                        >
                            {status}
                        </span>

                    </div>

                </div>

            </div>

            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">

                <span className="text-[11px] text-slate-400">
                    {formatDate(transaction.createdAt)}
                </span>

                <span className="max-w-[55%] truncate text-[11px] font-medium text-slate-400">
                    {transaction.reference}
                </span>

            </div>

        </div>
    );
}