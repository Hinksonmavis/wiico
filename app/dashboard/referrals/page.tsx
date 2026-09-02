"use client";

import {
    useMemo,
    useState,
} from "react";

import {
    ArrowLeft,
    RefreshCw,
} from "lucide-react";

import {
    useRouter,
} from "next/navigation";

import {
    TransactionType,
} from "@/app/constants/transaction.constants";


import ReferralHeader from "@/app/components/referrals/ReferralHeader";

import ReferralStats from "@/app/components/referrals/ReferralStats";

import ReferralLinkCard from "@/app/components/referrals/ReferralLinkCard";

import ReferralLevelTabs from "@/app/components/referrals/ReferralLevelTabs";

import ReferralMembersList from "@/app/components/referrals/ReferralMembersList";

import ReferralTransactionList from "@/app/components/referrals/ReferralTransactionList";

import ReferralTransactionPagination from "@/app/components/referrals/ReferralTransactionPagination";

import ReferralPageSkeleton from "@/app/components/referrals/ReferralPageSkeleton";
import { useReferral } from "@/app/hooks/clientHooks/referralHooks/useReferral";
import { useReferralLink } from "@/app/hooks/clientHooks/referralHooks/useReferralLink";
import { useReferralTransactions } from "@/app/hooks/clientHooks/referralHooks/useReferralTransactions";

export default function ReferralsPage() {

    const router =
        useRouter();

    const [
        activeLevel,
        setActiveLevel,
    ] = useState<1 | 2 | 3>(1);

    const [
        transactionPage,
        setTransactionPage,
    ] = useState(1);

    /*
     * -----------------------------------------
     * Referral network
     * -----------------------------------------
     */

    const referralQuery =
        useReferral();

    /*
     * -----------------------------------------
     * Referral link
     * -----------------------------------------
     */

    const referralLinkQuery =
        useReferralLink();

    /*
     * -----------------------------------------
     * Referral transactions
     * -----------------------------------------
     */

    const transactionsQuery =
        useReferralTransactions(
            transactionPage,
            10,
        );

    /*
     * -----------------------------------------
     * Extract data
     * -----------------------------------------
     */

    const referrals =
        referralQuery.data;

    const referralLink =
        referralLinkQuery.data;

    /*
     * -----------------------------------------
     * Referral transactions
     *
     * The hook already filters referral
     * transactions, but we keep the enum
     * check here as an additional safety
     * boundary.
     * -----------------------------------------
     */

    const referralTransactions =
        useMemo(() => {

            const transactions =
                transactionsQuery.data?.data ?? [];

            return transactions.filter(
                (transaction) =>
                    transaction.type ===
                    TransactionType.REFERRAL_COMMISSION,
            );

        }, [
            transactionsQuery.data,
        ]);

    /*
     * -----------------------------------------
     * Active team members
     * -----------------------------------------
     */

    const members =
        useMemo(() => {

            if (!referrals) {
                return [];
            }

            switch (activeLevel) {

                case 1:
                    return referrals.level1;

                case 2:
                    return referrals.level2;

                case 3:
                    return referrals.level3;

                default:
                    return [];

            }

        }, [
            referrals,
            activeLevel,
        ]);

    /*
     * -----------------------------------------
     * Loading state
     * -----------------------------------------
     */

    const isLoading =
        referralQuery.isLoading ||
        referralLinkQuery.isLoading;

    /*
     * -----------------------------------------
     * Error state
     * -----------------------------------------
     */

    const hasError =
        referralQuery.isError ||
        referralLinkQuery.isError;

    /*
     * -----------------------------------------
     * Refresh everything
     * -----------------------------------------
     */

    const refresh = async () => {

        await Promise.all([
            referralQuery.refetch(),

            referralLinkQuery.refetch(),

            transactionsQuery.refetch(),
        ]);
    };

    /*
     * -----------------------------------------
     * Back button (shared across states)
     * -----------------------------------------
     */

    const BackButton = () => (
        <button
            type="button"
            aria-label="Go back"
            onClick={() =>
                router.back()
            }
            className="mb-4 -ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 active:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
        >
            <ArrowLeft size={20} />
        </button>
    );

    /*
     * -----------------------------------------
     * Initial loading
     * -----------------------------------------
     */

    if (isLoading) {

        return (
            <main className="mx-auto w-full max-w-2xl px-4 pb-28 pt-4">

                <BackButton />

                <ReferralPageSkeleton />

            </main>
        );
    }

    /*
     * -----------------------------------------
     * Error state
     * -----------------------------------------
     */

    if (
        hasError ||
        !referrals ||
        !referralLink
    ) {

        return (
            <main className="mx-auto w-full max-w-2xl px-4 pt-4">

                <BackButton />

                <div className="flex min-h-[60vh] w-full items-center">

                    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">

                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">

                            <RefreshCw
                                className="h-5 w-5 text-slate-500"
                            />

                        </div>

                        <h2 className="mt-4 text-sm font-semibold text-slate-900">
                            Unable to load referrals
                        </h2>

                        <p className="mx-auto mt-1.5 max-w-sm text-xs leading-5 text-slate-500">
                            We couldn't load your referral
                            information right now. Please try again.
                        </p>

                        <button
                            type="button"
                            onClick={refresh}
                            disabled={
                                referralQuery.isFetching ||
                                referralLinkQuery.isFetching
                            }
                            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-xs font-semibold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            <RefreshCw
                                className={[
                                    "h-4 w-4",
                                    (
                                        referralQuery.isFetching ||
                                        referralLinkQuery.isFetching
                                    )
                                        ? "animate-spin"
                                        : "",
                                ].join(" ")}
                            />

                            Try again

                        </button>

                    </div>

                </div>

            </main>
        );
    }

    /*
     * -----------------------------------------
     * Main page
     * -----------------------------------------
     */

    return (
        <main className="mx-auto w-full max-w-2xl px-4 pb-28 pt-4">

            <BackButton />

            {/* ===================================== */}
            {/* PAGE HEADER */}
            {/* ===================================== */}

            <ReferralHeader
                totalTeam={
                    referrals.level1.length +
                    referrals.level2.length +
                    referrals.level3.length
                }
            />

            {/* ===================================== */}
            {/* REFERRAL STATISTICS */}
            {/* ===================================== */}

            <ReferralStats
                stats={{
                    directReferrals:
                        referrals.direct.length,

                    level1:
                        referrals.level1.length,

                    level2:
                        referrals.level2.length,

                    level3:
                        referrals.level3.length,

                    totalTeam:
                        referrals.level1.length +
                        referrals.level2.length +
                        referrals.level3.length,
                }}
            />

            {/* ===================================== */}
            {/* REFERRAL LINK */}
            {/* ===================================== */}

            <ReferralLinkCard
                referral={
                    referralLink
                }
            />

            {/* ===================================== */}
            {/* TEAM */}
            {/* ===================================== */}

            <section className="mb-8">

                <div className="mb-4">

                    <h2 className="text-base font-bold tracking-tight text-slate-900">
                        Your team
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                        Track the people in your three-level
                        referral network.
                    </p>

                </div>

                <ReferralLevelTabs
                    activeLevel={
                        activeLevel
                    }
                    onChange={
                        setActiveLevel
                    }
                    counts={{
                        level1:
                            referrals.level1.length,

                        level2:
                            referrals.level2.length,

                        level3:
                            referrals.level3.length,
                    }}
                />

                <ReferralMembersList
                    level={
                        activeLevel
                    }
                    members={
                        members
                    }
                />

            </section>

            {/* ===================================== */}
            {/* REFERRAL EARNINGS */}
            {/* ===================================== */}

            <section>

                <div className="mb-4">

                    <div className="flex items-center justify-between gap-3">

                        <div>

                            <h2 className="text-base font-bold tracking-tight text-slate-900">
                                Referral earnings
                            </h2>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                Commissions credited to your wallet
                                from your referral network.
                            </p>

                        </div>

                        {transactionsQuery.isFetching && (
                            <RefreshCw
                                className="h-4 w-4 shrink-0 animate-spin text-slate-400"
                            />
                        )}

                    </div>

                </div>

                <ReferralTransactionList
                    transactions={
                        referralTransactions
                    }
                />

                {/* ================================= */}
                {/* TRANSACTION PAGINATION */}
                {/* ================================= */}

                {transactionsQuery.data && (
                    <ReferralTransactionPagination
                        page={
                            transactionPage
                        }

                        hasNextPage={
                            transactionsQuery.data.pagination
                                .hasNextPage
                        }

                        hasPreviousPage={
                            transactionsQuery.data.pagination
                                .hasPreviousPage
                        }

                        loading={
                            transactionsQuery.isFetching
                        }

                        onPrevious={() => {

                            setTransactionPage(
                                (current) =>
                                    Math.max(
                                        1,
                                        current - 1,
                                    ),
                            );

                        }}

                        onNext={() => {

                            setTransactionPage(
                                (current) =>
                                    current + 1,
                            );

                        }}
                    />
                )}

            </section>

        </main>
    );
}