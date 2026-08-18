"use client";

import {
    ArrowDownLeft,
    ArrowUpRight,
    ChevronRight,
    Crown,
    Gift,
    Users,
    Wallet,
} from "lucide-react";

import { Transaction } from "@/app/types/clientTypes/transaction.types";

interface Props {
    transaction: Transaction;

    onClick?: (
        transaction: Transaction,
    ) => void;
}

function formatMoney(value: string) {
    const amount = Number(value ?? 0);

    return amount.toLocaleString("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

function formatTransactionType(type: string) {
    return type
        .replaceAll("_", " ")
        .replace(/\b\w/g, (char) =>
            char.toUpperCase(),
        );
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString(
        "en-NG",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        },
    );
}

function getTransactionConfig(type: string) {
    switch (type.toLowerCase()) {
        case "deposit":
            return {
                icon: ArrowDownLeft,
                iconBg: "bg-emerald-50",
                iconColor: "text-emerald-600",
                label: "Deposit",
            };

        case "withdrawal":
            return {
                icon: ArrowUpRight,
                iconBg: "bg-red-50",
                iconColor: "text-red-600",
                label: "Withdrawal",
            };

        case "reward":
            return {
                icon: Gift,
                iconBg: "bg-amber-50",
                iconColor: "text-amber-600",
                label: "Reward",
            };

        case "referral_bonus":
            return {
                icon: Users,
                iconBg: "bg-blue-50",
                iconColor: "text-[#076DF3]",
                label: "Referral Bonus",
            };

        case "membership":
        case "membership_upgrade":
            return {
                icon: Crown,
                iconBg: "bg-violet-50",
                iconColor: "text-violet-600",
                label: "Membership",
            };

        default:
            return {
                icon: Wallet,
                iconBg: "bg-slate-100",
                iconColor: "text-slate-600",
                label: formatTransactionType(type),
            };
    }
}

export default function TransactionItem({
    transaction,
    onClick,
}: Props) {
    const config = getTransactionConfig(
        transaction.type,
    );

    const Icon = config.icon;

    const transactionType =
        transaction.type.toLowerCase();

    const isDebit =
        transactionType.includes("withdraw");

    const isCredit = !isDebit;

    return (
        <button
            type="button"
            onClick={() =>
                onClick?.(transaction)
            }
            aria-label={`View ${config.label} transaction`}
            className="
                group
                relative
                flex
                w-full
                items-center
                gap-3
                overflow-hidden
                rounded-[20px]
                border
                border-slate-200/80
                bg-white
                px-3.5
                py-3.5
                text-left
                shadow-[0_2px_12px_rgba(15,23,42,0.025)]
                transition-all
                duration-200

                hover:border-slate-300
                hover:shadow-[0_6px_20px_rgba(15,23,42,0.06)]

                active:scale-[0.985]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#076DF3]/30
            "
        >
            {/* =====================================================
                LEFT SIDE
            ====================================================== */}
            <div className="flex min-w-0 flex-1 items-center gap-3">
                {/* Transaction icon */}
                <div
                    className={`
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-[15px]
                        ${config.iconBg}
                    `}
                >
                    <Icon
                        className={`h-[19px] w-[19px] ${config.iconColor}`}
                        strokeWidth={2.2}
                    />
                </div>

                {/* Transaction information */}
                <div className="min-w-0 flex-1">
                    {/* Type + date */}
                    <div className="flex min-w-0 items-center gap-2">
                        <h3
                            className="
                                truncate
                                text-[14px]
                                font-semibold
                                tracking-[-0.01em]
                                text-slate-900
                            "
                        >
                            {config.label}
                        </h3>

                        <span
                            className="
                                h-1
                                w-1
                                shrink-0
                                rounded-full
                                bg-slate-300
                            "
                        />

                        <span
                            className="
                                shrink-0
                                text-[10px]
                                font-medium
                                text-slate-400
                            "
                        >
                            {formatDate(
                                transaction.createdAt,
                            )}
                        </span>
                    </div>

                    {/* Description */}
                    <p
                        className="
                            mt-1
                            truncate
                            text-[11px]
                            leading-4
                            text-slate-500
                        "
                    >
                        {transaction.description ||
                            "Transaction"}
                    </p>

                    {/* Reference */}
                    <p
                        className="
                            mt-1
                            truncate
                            text-[9px]
                            font-medium
                            uppercase
                            tracking-[0.04em]
                            text-slate-300
                        "
                    >
                        {transaction.reference}
                    </p>
                </div>
            </div>

            {/* =====================================================
                RIGHT SIDE
            ====================================================== */}
            <div
                className="
                    flex
                    shrink-0
                    items-center
                    gap-1
                "
            >
                <div className="text-right">
                    <p
                        className={`
                            whitespace-nowrap
                            text-[13px]
                            font-bold
                            tracking-[-0.01em]
                            ${
                                isCredit
                                    ? "text-emerald-600"
                                    : "text-red-600"
                            }
                        `}
                    >
                        {isCredit ? "+" : "-"}
                        {formatMoney(
                            transaction.amount,
                        )}
                    </p>

                    <div className="mt-1 flex justify-end">
                        <span
                            className={`
                                rounded-full
                                px-1.5
                                py-0.5
                                text-[8px]
                                font-semibold
                                uppercase
                                tracking-[0.06em]
                                ${
                                    isCredit
                                        ? "bg-emerald-50 text-emerald-600"
                                        : "bg-red-50 text-red-600"
                                }
                            `}
                        >
                            {isCredit
                                ? "Credit"
                                : "Debit"}
                        </span>
                    </div>
                </div>

                {/* Chevron */}
                <div
                    className="
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        text-slate-300
                        transition
                        group-hover:bg-slate-50
                        group-hover:text-slate-500
                    "
                >
                    <ChevronRight
                        className="h-4 w-4"
                        strokeWidth={2}
                    />
                </div>
            </div>
        </button>
    );
}