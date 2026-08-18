"use client";

import {
    ArrowDownLeft,
    ArrowUpRight,
    Gift,
    Users,
    Crown,
    Wallet,
    Copy,
    Check,
    CalendarDays,
    CircleDollarSign,
    FileText,
    Hash,
    ShieldCheck,
} from "lucide-react";

import { useState } from "react";

import { Transaction } from "@/app/types/clientTypes/transaction.types";

interface Props {
    transaction: Transaction;
}

function formatMoney(value: string) {
    return Number(value).toLocaleString("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
    });
}

function getIcon(type: string) {
    switch (type.toLowerCase()) {
        case "deposit":
            return {
                icon: ArrowDownLeft,
                iconBg: "bg-emerald-50",
                iconColor: "text-emerald-600",
                accent: "bg-emerald-500",
                amountColor: "text-emerald-600",
                label: "Deposit",
            };

        case "withdrawal":
            return {
                icon: ArrowUpRight,
                iconBg: "bg-red-50",
                iconColor: "text-red-600",
                accent: "bg-red-500",
                amountColor: "text-red-600",
                label: "Withdrawal",
            };

        case "reward":
            return {
                icon: Gift,
                iconBg: "bg-amber-50",
                iconColor: "text-amber-600",
                accent: "bg-amber-500",
                amountColor: "text-emerald-600",
                label: "Reward",
            };

        case "referral_bonus":
            return {
                icon: Users,
                iconBg: "bg-indigo-50",
                iconColor: "text-indigo-600",
                accent: "bg-indigo-500",
                amountColor: "text-emerald-600",
                label: "Referral Bonus",
            };

        case "membership":
            return {
                icon: Crown,
                iconBg: "bg-purple-50",
                iconColor: "text-purple-600",
                accent: "bg-purple-500",
                amountColor: "text-emerald-600",
                label: "Membership",
            };

        default:
            return {
                icon: Wallet,
                iconBg: "bg-slate-100",
                iconColor: "text-slate-600",
                accent: "bg-slate-500",
                amountColor: "text-emerald-600",
                label: type.replaceAll("_", " "),
            };
    }
}

function formatTransactionType(type: string) {
    return type
        .replaceAll("_", " ")
        .replace(/\b\w/g, (letter) =>
            letter.toUpperCase(),
        );
}

function formatDate(date: string) {
    return new Date(date).toLocaleString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
}

function getStatusConfig(status: string) {
    switch (status.toLowerCase()) {
        case "completed":
            return {
                label: "Completed",
                className:
                    "bg-emerald-50 text-emerald-700 border-emerald-100",
                dot: "bg-emerald-500",
            };

        case "pending":
            return {
                label: "Pending",
                className:
                    "bg-amber-50 text-amber-700 border-amber-100",
                dot: "bg-amber-500",
            };

        case "failed":
            return {
                label: "Failed",
                className:
                    "bg-red-50 text-red-700 border-red-100",
                dot: "bg-red-500",
            };

        case "cancelled":
        case "canceled":
            return {
                label: "Cancelled",
                className:
                    "bg-slate-100 text-slate-600 border-slate-200",
                dot: "bg-slate-400",
            };

        default:
            return {
                label: formatTransactionType(status),
                className:
                    "bg-slate-100 text-slate-600 border-slate-200",
                dot: "bg-slate-400",
            };
    }
}

export default function TransactionDetails({
    transaction,
}: Props) {
    const [copied, setCopied] = useState(false);

    const config = getIcon(transaction.type);
    const Icon = config.icon;

    const isDebit = transaction.type
        .toLowerCase()
        .includes("withdraw");

    const status = getStatusConfig(
        transaction.status,
    );

    async function copyReference() {
        try {
            await navigator.clipboard.writeText(
                transaction.reference,
            );

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 1800);
        } catch {
            // Clipboard may be unavailable on some browsers.
        }
    }

    return (
        <div className="w-full space-y-4 pb-6">

            {/* =====================================================
                TRANSACTION HERO
            ====================================================== */}

            <section
                className="
                    relative
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-slate-200/80
                    bg-white
                    shadow-[0_8px_30px_rgba(15,23,42,0.05)]
                "
            >
                {/* Accent line */}

                <div
                    className={`
                        absolute
                        inset-x-0
                        top-0
                        h-1
                        ${config.accent}
                    `}
                />

                <div className="relative px-5 pb-6 pt-7 sm:px-6">

                    {/* Transaction icon */}

                    <div className="flex justify-center">
                        <div
                            className={`
                                flex
                                h-[72px]
                                w-[72px]
                                items-center
                                justify-center
                                rounded-[24px]
                                ${config.iconBg}
                            `}
                        >
                            <Icon
                                className={`
                                    h-8
                                    w-8
                                    ${config.iconColor}
                                `}
                                strokeWidth={2}
                            />
                        </div>
                    </div>

                    {/* Type */}

                    <div className="mt-5 text-center">

                        <p
                            className="
                                text-[11px]
                                font-semibold
                                uppercase
                                tracking-[0.16em]
                                text-slate-400
                            "
                        >
                            Transaction
                        </p>

                        <h1
                            className="
                                mt-1.5
                                text-lg
                                font-semibold
                                tracking-tight
                                text-slate-900
                            "
                        >
                            {config.label}
                        </h1>

                    </div>

                    {/* Amount */}

                    <div className="mt-5 text-center">

                        <p
                            className={`
                                text-[34px]
                                font-bold
                                leading-none
                                tracking-[-0.03em]
                                sm:text-[38px]
                                ${config.amountColor}
                            `}
                        >
                            {isDebit ? "-" : "+"}
                            {formatMoney(
                                transaction.amount,
                            )}
                        </p>

                        <div className="mt-4 flex justify-center">

                            <div
                                className={`
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    px-3
                                    py-1.5
                                    text-xs
                                    font-semibold
                                    ${status.className}
                                `}
                            >
                                <span
                                    className={`
                                        h-1.5
                                        w-1.5
                                        rounded-full
                                        ${status.dot}
                                    `}
                                />

                                {status.label}
                            </div>

                        </div>
                    </div>

                </div>
            </section>

            {/* =====================================================
                TRANSACTION REFERENCE
            ====================================================== */}

            <section
                className="
                    rounded-[24px]
                    border
                    border-slate-200/80
                    bg-white
                    p-4
                    shadow-[0_6px_24px_rgba(15,23,42,0.035)]
                "
            >
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
                            bg-slate-50
                            text-slate-500
                        "
                    >
                        <Hash className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">

                        <p
                            className="
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.12em]
                                text-slate-400
                            "
                        >
                            Reference
                        </p>

                        <p
                            className="
                                mt-1
                                truncate
                                text-xs
                                font-semibold
                                text-slate-700
                            "
                            title={transaction.reference}
                        >
                            {transaction.reference}
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={copyReference}
                        aria-label="Copy transaction reference"
                        className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            text-slate-500
                            transition
                            active:scale-95
                            hover:bg-slate-50
                        "
                    >
                        {copied ? (
                            <Check
                                className="
                                    h-4
                                    w-4
                                    text-emerald-600
                                "
                            />
                        ) : (
                            <Copy className="h-4 w-4" />
                        )}
                    </button>

                </div>

                {copied && (
                    <p
                        className="
                            mt-2
                            pl-[52px]
                            text-[11px]
                            font-medium
                            text-emerald-600
                        "
                    >
                        Reference copied
                    </p>
                )}
            </section>

            {/* =====================================================
                TRANSACTION INFORMATION
            ====================================================== */}

            <section
                className="
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-slate-200/80
                    bg-white
                    shadow-[0_6px_24px_rgba(15,23,42,0.035)]
                "
            >

                <div className="px-5 pb-3 pt-5">

                    <div className="flex items-center gap-2">

                        <div
                            className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-lg
                                bg-sky-50
                                text-sky-600
                            "
                        >
                            <FileText className="h-4 w-4" />
                        </div>

                        <div>
                            <h2
                                className="
                                    text-sm
                                    font-semibold
                                    text-slate-900
                                "
                            >
                                Transaction details
                            </h2>

                            <p
                                className="
                                    mt-0.5
                                    text-[11px]
                                    text-slate-400
                                "
                            >
                                Complete transaction information
                            </p>
                        </div>

                    </div>

                </div>

                <div
                    className="
                        divide-y
                        divide-slate-100
                        border-t
                        border-slate-100
                    "
                >

                    <Detail
                        icon={
                            <CircleDollarSign className="h-4 w-4" />
                        }
                        label="Transaction type"
                        value={formatTransactionType(
                            transaction.type,
                        )}
                    />

                    <Detail
                        icon={
                            <ShieldCheck className="h-4 w-4" />
                        }
                        label="Status"
                        value={status.label}
                        valueClassName={
                            status.label === "Completed"
                                ? "text-emerald-600"
                                : undefined
                        }
                    />

                    <Detail
                        icon={
                            <Wallet className="h-4 w-4" />
                        }
                        label="Balance before"
                        value={formatMoney(
                            transaction.balanceBefore,
                        )}
                    />

                    <Detail
                        icon={
                            <Wallet className="h-4 w-4" />
                        }
                        label="Balance after"
                        value={formatMoney(
                            transaction.balanceAfter,
                        )}
                    />

                    <Detail
                        icon={
                            <CalendarDays className="h-4 w-4" />
                        }
                        label="Date"
                        value={formatDate(
                            transaction.createdAt,
                        )}
                    />

                    {transaction.description && (
                        <Detail
                            icon={
                                <FileText className="h-4 w-4" />
                            }
                            label="Description"
                            value={
                                transaction.description
                            }
                        />
                    )}

                </div>

            </section>

            {/* =====================================================
                SECURITY FOOTER
            ====================================================== */}

            <div
                className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    px-4
                    py-2
                    text-center
                "
            >
                <ShieldCheck
                    className="
                        h-3.5
                        w-3.5
                        shrink-0
                        text-emerald-500
                    "
                />

                <p
                    className="
                        text-[10px]
                        font-medium
                        leading-4
                        text-slate-400
                    "
                >
                    This transaction is securely recorded
                    in your wallet history.
                </p>

            </div>

        </div>
    );
}

function Detail({
    icon,
    label,
    value,
    valueClassName,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    valueClassName?: string;
}) {
    return (
        <div
            className="
                flex
                items-center
                gap-3
                px-5
                py-4
            "
        >

            <div
                className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-slate-50
                    text-slate-400
                "
            >
                {icon}
            </div>

            <div className="min-w-0 flex-1">

                <p
                    className="
                        text-[11px]
                        font-medium
                        text-slate-400
                    "
                >
                    {label}
                </p>

                <p
                    className={`
                        mt-0.5
                        break-words
                        text-sm
                        font-semibold
                        text-slate-800
                        ${valueClassName ?? ""}
                    `}
                >
                    {value}
                </p>

            </div>

        </div>
    );
}