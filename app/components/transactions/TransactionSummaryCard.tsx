"use client";

import {
    ArrowDownLeft,
    ArrowUpRight,
    ReceiptText,
    TrendingUp,
    TrendingDown,
} from "lucide-react";

interface Props {
    totalTransactions?: number;
    totalCredits?: number;
    totalDebits?: number;
}

function formatMoney(amount: number) {
    return amount.toLocaleString("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

export default function TransactionSummaryCard({
    totalTransactions = 0,
    totalCredits = 0,
    totalDebits = 0,
}: Props) {
    return (
        <section
            className="
                overflow-hidden
                rounded-[28px]
                border
                border-slate-200/80
                bg-white
                shadow-[0_8px_30px_rgba(15,23,42,0.045)]
            "
        >
            {/* =====================================================
                HEADER
            ====================================================== */}

            <div className="px-5 pb-5 pt-5 sm:px-6">

                <div className="flex items-center justify-between gap-4">

                    <div className="min-w-0">

                        <div className="flex items-center gap-2">

                            <span
                                className="
                                    h-1.5
                                    w-1.5
                                    rounded-full
                                    bg-sky-500
                                "
                            />

                            <p
                                className="
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.16em]
                                    text-slate-400
                                "
                            >
                                Wallet activity
                            </p>

                        </div>

                        <h2
                            className="
                                mt-1.5
                                text-xl
                                font-bold
                                tracking-tight
                                text-slate-900
                            "
                        >
                            Financial Summary
                        </h2>

                    </div>

                    <div
                        className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            bg-slate-50
                            text-slate-600
                        "
                    >
                        <ReceiptText
                            className="h-5 w-5"
                            strokeWidth={2}
                        />
                    </div>

                </div>

            </div>

            {/* =====================================================
                TOTAL TRANSACTIONS
            ====================================================== */}

            <div className="px-5 sm:px-6">

                <div
                    className="
                        relative
                        overflow-hidden
                        rounded-[22px]
                        bg-slate-50
                        px-5
                        py-5
                    "
                >

                    {/* Decorative element */}

                    <div
                        className="
                            absolute
                            -right-8
                            -top-8
                            h-24
                            w-24
                            rounded-full
                            bg-sky-100/70
                        "
                    />

                    <div className="relative">

                        <div className="flex items-center gap-2">

                            <p
                                className="
                                    text-xs
                                    font-medium
                                    text-slate-500
                                "
                            >
                                Total Transactions
                            </p>

                            <span
                                className="
                                    rounded-full
                                    bg-white
                                    px-2
                                    py-0.5
                                    text-[9px]
                                    font-semibold
                                    text-slate-400
                                "
                            >
                                ALL TIME
                            </span>

                        </div>

                        <div
                            className="
                                mt-2
                                flex
                                items-end
                                justify-between
                                gap-4
                            "
                        >

                            <p
                                className="
                                    text-[40px]
                                    font-bold
                                    leading-none
                                    tracking-[-0.04em]
                                    text-slate-900
                                "
                            >
                                {totalTransactions.toLocaleString(
                                    "en-NG",
                                )}
                            </p>

                            <div
                                className="
                                    mb-1
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-white
                                    text-sky-600
                                    shadow-sm
                                "
                            >
                                <TrendingUp
                                    className="h-4 w-4"
                                />
                            </div>

                        </div>

                        <p
                            className="
                                mt-2
                                text-[11px]
                                leading-5
                                text-slate-400
                            "
                        >
                            Total recorded activity across
                            your wallet
                        </p>

                    </div>

                </div>

            </div>

            {/* =====================================================
                CREDIT / DEBIT SUMMARY
            ====================================================== */}

            <div className="p-5 pt-4 sm:px-6 sm:pb-6">

                <div className="grid grid-cols-2 gap-3">

                    {/* =================================================
                        CREDITS
                    ================================================== */}

                    <div
                        className="
                            min-w-0
                            rounded-[20px]
                            border
                            border-emerald-100
                            bg-emerald-50/60
                            p-4
                        "
                    >

                        <div className="flex items-center justify-between">

                            <div
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-white
                                    text-emerald-600
                                    shadow-sm
                                "
                            >
                                <ArrowDownLeft
                                    className="h-4 w-4"
                                    strokeWidth={2.5}
                                />
                            </div>

                            <TrendingUp
                                className="
                                    h-4
                                    w-4
                                    text-emerald-500/70
                                "
                            />

                        </div>

                        <p
                            className="
                                mt-4
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.12em]
                                text-emerald-700/60
                            "
                        >
                            Credits
                        </p>

                        <p
                            className="
                                mt-1
                                truncate
                                text-[15px]
                                font-bold
                                tracking-tight
                                text-slate-900
                                sm:text-base
                            "
                            title={formatMoney(totalCredits)}
                        >
                            {formatMoney(totalCredits)}
                        </p>

                        <p
                            className="
                                mt-1
                                text-[10px]
                                text-emerald-700/60
                            "
                        >
                            Money received
                        </p>

                    </div>

                    {/* =================================================
                        DEBITS
                    ================================================== */}

                    <div
                        className="
                            min-w-0
                            rounded-[20px]
                            border
                            border-red-100
                            bg-red-50/60
                            p-4
                        "
                    >

                        <div className="flex items-center justify-between">

                            <div
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-white
                                    text-red-600
                                    shadow-sm
                                "
                            >
                                <ArrowUpRight
                                    className="h-4 w-4"
                                    strokeWidth={2.5}
                                />
                            </div>

                            <TrendingDown
                                className="
                                    h-4
                                    w-4
                                    text-red-500/70
                                "
                            />

                        </div>

                        <p
                            className="
                                mt-4
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.12em]
                                text-red-700/60
                            "
                        >
                            Debits
                        </p>

                        <p
                            className="
                                mt-1
                                truncate
                                text-[15px]
                                font-bold
                                tracking-tight
                                text-slate-900
                                sm:text-base
                            "
                            title={formatMoney(totalDebits)}
                        >
                            {formatMoney(totalDebits)}
                        </p>

                        <p
                            className="
                                mt-1
                                text-[10px]
                                text-red-700/60
                            "
                        >
                            Money spent
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}