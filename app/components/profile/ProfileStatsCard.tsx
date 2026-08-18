"use client";

import Link from "next/link";
import {
    ArrowDownToLine,
    ArrowUpFromLine,
} from "lucide-react";

import { ROUTES } from "@/app/constants/routes";
import { useWalletStore } from "@/app/store/wallet.store";

export default function ProfileStatsCard() {
    const wallet = useWalletStore(
        (state) => state.wallet,
    );

    const formatCurrency = (
        value?: string,
    ) =>
        Number(value ?? 0).toLocaleString(
            "en-NG",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            },
        );

    return (
        <section
            className="
                relative
                z-20
                mx-3
                -mt-5
                overflow-hidden
                rounded-[22px]
                border
                border-white/70
                bg-white/90
                p-3.5
                shadow-[0_12px_32px_rgba(15,23,42,0.08)]
                backdrop-blur-xl

                sm:mx-4
                sm:rounded-[24px]
                sm:p-4

                md:p-5
                lg:rounded-[26px]
            "
        >
            {/* Soft glass highlight */}
            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-white/70
                    via-white/20
                    to-transparent
                "
            />

            {/* Subtle ambient light */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    h-32
                    w-32
                    rounded-full
                    bg-slate-100/70
                    blur-3xl
                "
            />

            <div className="relative">
                {/* Primary Stats */}
                <div
                    className="
                        grid
                        grid-cols-2
                        gap-2.5

                        sm:gap-3
                        md:gap-4
                    "
                >
                    {/* Balance */}
                    <div
                        className="
                            min-w-0
                            rounded-[17px]
                            border
                            border-slate-100
                            bg-slate-50/90
                            p-3

                            sm:rounded-[18px]
                            sm:p-4
                        "
                    >
                        <div className="flex items-center justify-between gap-2">
                            <p
                                className="
                                    truncate
                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-[0.06em]
                                    text-slate-400

                                    sm:text-[11px]
                                "
                            >
                                Account Balance
                            </p>

                            <div
                                className="
                                    hidden
                                    h-7
                                    w-7
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-white
                                    text-slate-500
                                    shadow-sm

                                    sm:flex
                                "
                            >
                                <ArrowDownToLine
                                    className="h-3.5 w-3.5"
                                />
                            </div>
                        </div>

                        <h2
                            className="
                                mt-1.5
                                truncate
                                text-[16px]
                                font-bold
                                tracking-tight
                                text-slate-900

                                sm:mt-2
                                sm:text-xl

                                md:text-2xl
                            "
                        >
                            ₦
                            {formatCurrency(
                                wallet?.availableBalance,
                            )}
                        </h2>

                        <Link
                            href={ROUTES.DEPOSIT}
                            className="
                                mt-3
                                flex
                                min-h-[38px]
                                w-full
                                items-center
                                justify-center
                                rounded-xl
                                bg-[#4DA8FE]
                                px-3
                                py-2
                                text-[12px]
                                font-semibold
                                text-white
                                shadow-sm
                                shadow-blue-500/10
                                transition
                                hover:bg-[#2B84E0]
                                active:scale-[0.98]

                                sm:mt-4
                                sm:min-h-[40px]
                                sm:text-sm
                            "
                        >
                            Deposit
                        </Link>
                    </div>

                    {/* Total Income */}
                    <div
                        className="
                            min-w-0
                            rounded-[17px]
                            border
                            border-slate-100
                            bg-slate-50/90
                            p-3

                            sm:rounded-[18px]
                            sm:p-4
                        "
                    >
                        <div className="flex items-center justify-between gap-2">
                            <p
                                className="
                                    truncate
                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-[0.06em]
                                    text-slate-400

                                    sm:text-[11px]
                                "
                            >
                                Total Income
                            </p>

                            <div
                                className="
                                    hidden
                                    h-7
                                    w-7
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-white
                                    text-slate-500
                                    shadow-sm

                                    sm:flex
                                "
                            >
                                <ArrowUpFromLine
                                    className="h-3.5 w-3.5"
                                />
                            </div>
                        </div>

                        <h2
                            className="
                                mt-1.5
                                truncate
                                text-[16px]
                                font-bold
                                tracking-tight
                                text-slate-900

                                sm:mt-2
                                sm:text-xl

                                md:text-2xl
                            "
                        >
                            ₦
                            {formatCurrency(
                                wallet?.totalEarned,
                            )}
                        </h2>

                        <Link
                            href={ROUTES.WITHDRAWAL}
                            className="
                                mt-3
                                flex
                                min-h-[38px]
                                w-full
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-slate-200
                                bg-white
                                px-3
                                py-2
                                text-[12px]
                                font-semibold
                                text-slate-700
                                shadow-sm
                                transition
                                hover:bg-slate-50
                                hover:border-slate-300
                                active:scale-[0.98]

                                sm:mt-4
                                sm:min-h-[40px]
                                sm:text-sm
                            "
                        >
                            Withdraw
                        </Link>
                    </div>
                </div>

                {/* Secondary Stats */}
                <div
                    className="
                        mt-3
                        grid
                        grid-cols-4
                        gap-1.5

                        sm:mt-4
                        sm:gap-2

                        md:mt-5
                    "
                >
                    <MiniStat
                        label="Withdrawals"
                        value={`₦${formatCurrency(
                            wallet?.totalWithdrawn,
                        )}`}
                    />

                    <MiniStat
                        label="Deposited"
                        value={`₦${formatCurrency(
                            wallet?.totalDeposited,
                        )}`}
                    />

                    <MiniStat
                        label="Held"
                        value={`₦${formatCurrency(
                            wallet?.heldBalance,
                        )}`}
                    />

                    <MiniStat
                        label="Earned"
                        value={`₦${formatCurrency(
                            wallet?.totalEarned,
                        )}`}
                    />
                </div>
            </div>
        </section>
    );
}

function MiniStat({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div
            className="
                min-w-0
                rounded-xl
                border
                border-slate-100
                bg-slate-50/80
                px-1.5
                py-2.5
                text-center
                transition-colors
                hover:bg-slate-100

                sm:rounded-[14px]
                sm:px-2
                sm:py-3
            "
        >
            <p
                className="
                    truncate
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.04em]
                    text-slate-400

                    sm:text-[9px]
                    md:text-[10px]
                "
            >
                {label}
            </p>

            <p
                className="
                    mt-1
                    truncate
                    text-[10px]
                    font-semibold
                    tracking-tight
                    text-slate-900

                    sm:text-[12px]
                    md:text-[14px]
                    lg:text-[15px]
                "
            >
                {value}
            </p>
        </div>
    );
}