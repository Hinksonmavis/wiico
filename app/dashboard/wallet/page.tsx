"use client";

import WalletHeader from "@/app/components/wallet/WalletHeader";
import WalletBalanceCard from "@/app/components/wallet/WalletBalanceCard";
import WalletStatsGrid from "@/app/components/wallet/WalletStatsGrid";
import WalletQuickActions from "@/app/components/wallet/WalletQuickActions";
import WalletRecentTransactions from "@/app/components/wallet/WalletRecentTransactions";
import WalletInfoCard from "@/app/components/wallet/WalletInfoCard";

import { useWallet } from "@/app/hooks/clientHooks/walletHooks/useWallet";

export default function WalletPage() {
    const {
        data: wallet,
        isLoading,
    } = useWallet();

    return (
        <main
            className="
                min-h-full
                bg-slate-50
            "
        >
            <div
                className="
                    mx-auto
                    w-full
                    max-w-[480px]
                "
            >
                {/* =====================================================
                    HEADER
                ====================================================== */}

                <WalletHeader />

                {/* =====================================================
                    CONTENT
                ====================================================== */}

                {isLoading ? (
                    <WalletPageSkeleton />
                ) : (
                    <div
                        className="
                            px-4
                            pb-28
                            pt-4
                            sm:px-5
                        "
                    >
                        {/* =================================================
                            BALANCE
                        ================================================== */}

                        <section>
                            <WalletBalanceCard
                                availableBalance={
                                    wallet?.availableBalance ??
                                    "0.00"
                                }
                                heldBalance={
                                    wallet?.heldBalance ??
                                    "0.00"
                                }
                            />
                        </section>

                        {/* =================================================
                            WALLET OVERVIEW
                        ================================================== */}

                        <section className="mt-4">
                            <WalletStatsGrid
                                availableBalance={
                                    wallet?.availableBalance ??
                                    "0.00"
                                }
                                totalEarned={
                                    wallet?.totalEarned ??
                                    "0.00"
                                }
                                totalDeposited={
                                    wallet?.totalDeposited ??
                                    "0.00"
                                }
                                totalWithdrawn={
                                    wallet?.totalWithdrawn ??
                                    "0.00"
                                }
                            />
                        </section>

                        {/* =================================================
                            QUICK ACTIONS
                        ================================================== */}

                        <section className="mt-4">
                            <WalletQuickActions />
                        </section>

                        {/* =================================================
                            RECENT TRANSACTIONS
                        ================================================== */}

                        <section className="mt-5">
                            <WalletRecentTransactions />
                        </section>

                        {/* =================================================
                            WALLET INFORMATION
                        ================================================== */}

                        <section className="mt-5">
                            <WalletInfoCard
                                walletId={
                                    wallet?.id ?? ""
                                }
                                createdAt={
                                    wallet?.createdAt ?? ""
                                }
                                updatedAt={
                                    wallet?.updatedAt ?? ""
                                }
                            />
                        </section>

                        {/* =================================================
                            BOTTOM BREATHING ROOM
                        ================================================== */}

                        <div
                            aria-hidden="true"
                            className="h-2"
                        />
                    </div>
                )}
            </div>
        </main>
    );
}

/* ================================================================
   WALLET PAGE SKELETON
================================================================ */

function WalletPageSkeleton() {
    return (
        <div
            className="
                px-4
                pb-28
                pt-4
                sm:px-5
            "
        >
            {/* =========================================================
                BALANCE CARD
            ========================================================== */}

            <div
                className="
                    relative
                    h-[190px]
                    overflow-hidden
                    rounded-[24px]
                    bg-slate-200
                    animate-pulse
                "
            >
                <div
                    className="
                        absolute
                        left-5
                        top-5
                        h-3
                        w-24
                        rounded-full
                        bg-slate-300
                    "
                />

                <div
                    className="
                        absolute
                        left-5
                        top-14
                        h-8
                        w-44
                        rounded-lg
                        bg-slate-300
                    "
                />

                <div
                    className="
                        absolute
                        bottom-5
                        left-5
                        right-5
                        h-12
                        rounded-xl
                        bg-slate-300
                    "
                />
            </div>

            {/* =========================================================
                STATISTICS
            ========================================================== */}

            <div className="mt-4 grid grid-cols-2 gap-3">
                <WalletStatSkeleton />
                <WalletStatSkeleton />
                <WalletStatSkeleton />
                <WalletStatSkeleton />
            </div>

            {/* =========================================================
                QUICK ACTIONS
            ========================================================== */}

            <div
                className="
                    mt-4
                    rounded-[22px]
                    border
                    border-slate-200
                    bg-white
                    p-4
                "
            >
                <div
                    className="
                        mb-4
                        h-3
                        w-28
                        rounded-full
                        bg-slate-200
                        animate-pulse
                    "
                />

                <div className="grid grid-cols-2 gap-3">
                    <div
                        className="
                            h-14
                            rounded-2xl
                            bg-slate-100
                            animate-pulse
                        "
                    />

                    <div
                        className="
                            h-14
                            rounded-2xl
                            bg-slate-100
                            animate-pulse
                        "
                    />
                </div>
            </div>

            {/* =========================================================
                RECENT TRANSACTIONS
            ========================================================== */}

            <div
                className="
                    mt-5
                    overflow-hidden
                    rounded-[22px]
                    border
                    border-slate-200
                    bg-white
                "
            >
                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-slate-100
                        px-4
                        py-4
                    "
                >
                    <div
                        className="
                            h-3
                            w-32
                            rounded-full
                            bg-slate-200
                            animate-pulse
                        "
                    />

                    <div
                        className="
                            h-3
                            w-12
                            rounded-full
                            bg-slate-200
                            animate-pulse
                        "
                    />
                </div>

                <WalletTransactionSkeleton />
                <WalletTransactionSkeleton />
                <WalletTransactionSkeleton />
            </div>

            {/* =========================================================
                WALLET INFORMATION
            ========================================================== */}

            <div
                className="
                    mt-5
                    h-32
                    rounded-[22px]
                    border
                    border-slate-200
                    bg-white
                    animate-pulse
                "
            />
        </div>
    );
}

/* ================================================================
   STAT SKELETON
================================================================ */

function WalletStatSkeleton() {
    return (
        <div
            className="
                h-[92px]
                rounded-[20px]
                border
                border-slate-200
                bg-white
                p-4
            "
        >
            <div
                className="
                    h-3
                    w-16
                    rounded-full
                    bg-slate-200
                    animate-pulse
                "
            />

            <div
                className="
                    mt-4
                    h-5
                    w-24
                    rounded-md
                    bg-slate-200
                    animate-pulse
                "
            />
        </div>
    );
}

/* ================================================================
   TRANSACTION SKELETON
================================================================ */

function WalletTransactionSkeleton() {
    return (
        <div
            className="
                flex
                items-center
                gap-3
                border-b
                border-slate-100
                px-4
                py-4
                last:border-b-0
            "
        >
            <div
                className="
                    h-10
                    w-10
                    shrink-0
                    rounded-xl
                    bg-slate-100
                    animate-pulse
                "
            />

            <div className="min-w-0 flex-1">
                <div
                    className="
                        h-3
                        w-28
                        rounded-full
                        bg-slate-200
                        animate-pulse
                    "
                />

                <div
                    className="
                        mt-2
                        h-2.5
                        w-20
                        rounded-full
                        bg-slate-100
                        animate-pulse
                    "
                />
            </div>

            <div
                className="
                    h-3
                    w-16
                    rounded-full
                    bg-slate-200
                    animate-pulse
                "
            />
        </div>
    );
}