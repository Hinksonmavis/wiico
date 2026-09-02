"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useAdminDeposits } from "@/app/hooks/adminHooks/deposits/useAdminDeposits";
import {
    AdminDeposit,
    DepositStatus,
} from "@/app/types/adminTypes/adminDeposit.types";

import DepositFilters from "../adminComponents/deposits/DepositFilters";
import { DepositSummaryCards } from "../adminComponents/deposits/DepositSummaryCards";
import { DepositTable } from "../adminComponents/deposits/DepositTable";

export type DepositTab =
    | "pending"
    | "approved"
    | "declined"
    | "cancelled"
    | "all";

function matchesTab(
    deposit: AdminDeposit,
    tab: DepositTab,
): boolean {
    switch (tab) {
        case "pending":
            return (
                deposit.status === DepositStatus.PENDING ||
                deposit.status === DepositStatus.UNDER_REVIEW
            );

        case "approved":
            return (
                deposit.status === DepositStatus.APPROVED
            );

        case "declined":
            return (
                deposit.status === DepositStatus.DECLINED
            );

        case "cancelled":
            return (
                deposit.status === DepositStatus.CANCELLED
            );

        case "all":
            return true;

        default:
            return true;
    }
}

export default function AdminDepositsPage() {
    const router = useRouter();

    const [activeTab, setActiveTab] =
        useState<DepositTab>("pending");

    const [search, setSearch] =
        useState("");

    const {
        data: deposits = [],
        isLoading,
        isError,
        error,
    } = useAdminDeposits();

    const filteredDeposits = useMemo(() => {
        const keyword =
            search.trim().toLowerCase();

        return deposits
            .filter((deposit) =>
                matchesTab(
                    deposit,
                    activeTab,
                ),
            )
            .filter((deposit) => {
                if (!keyword) {
                    return true;
                }

                return (
                    deposit.reference
                        .toLowerCase()
                        .includes(keyword) ||

                    deposit.accountName
                        .toLowerCase()
                        .includes(keyword) ||

                    deposit.accountNumber
                        .toLowerCase()
                        .includes(keyword) ||

                    deposit.bankName
                        .toLowerCase()
                        .includes(keyword) ||

                    deposit.user.phone
                        .toLowerCase()
                        .includes(keyword) ||

                    (
                        deposit.user.email ?? ""
                    )
                        .toLowerCase()
                        .includes(keyword) ||

                    (
                        deposit.user.membership?.name ??
                        ""
                    )
                        .toLowerCase()
                        .includes(keyword)
                );
            });
    }, [
        deposits,
        activeTab,
        search,
    ]);

    const summary = useMemo(
        () => ({
            total: deposits.length,

            pending: deposits.filter(
                (deposit) =>
                    deposit.status ===
                        DepositStatus.PENDING ||
                    deposit.status ===
                        DepositStatus.UNDER_REVIEW,
            ).length,

            approved: deposits.filter(
                (deposit) =>
                    deposit.status ===
                    DepositStatus.APPROVED,
            ).length,

            declined: deposits.filter(
                (deposit) =>
                    deposit.status ===
                    DepositStatus.DECLINED,
            ).length,
        }),
        [deposits],
    );

    const handleOpen = (
        deposit: AdminDeposit,
    ) => {
        router.push(
            `/admin/deposits/${deposit.id}`,
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-10">

            {/* Header */}

            <header
                className="
                    sticky
                    top-0
                    z-10
                    border-b
                    border-slate-100
                    bg-white/85
                    px-4
                    pb-3
                    pt-[max(16px,env(safe-area-inset-top))]
                    backdrop-blur-xl
                "
            >
                <h1
                    className="
                        text-[22px]
                        font-bold
                        tracking-tight
                        text-slate-900
                    "
                >
                    Deposits
                </h1>

                <p
                    className="
                        mt-0.5
                        text-[13px]
                        text-slate-500
                    "
                >
                    Review and manage customer
                    deposit requests
                </p>
            </header>

            <div className="flex flex-col gap-4 px-4 pt-4">

                {/* Summary */}

                <DepositSummaryCards
                    total={summary.total}
                    pending={summary.pending}
                    approved={summary.approved}
                    declined={summary.declined}
                />

                {/* Filters */}

                <DepositFilters
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    search={search}
                    onSearchChange={setSearch}
                />

                {/* Error */}

                {isError && (
                    <div
                        className="
                            rounded-2xl
                            border
                            border-red-100
                            bg-red-50
                            px-4
                            py-4
                            text-sm
                            text-red-700
                        "
                    >
                        Failed to load deposits.

                        {error instanceof Error &&
                            error.message && (
                                <p className="mt-1 text-xs text-red-500">
                                    {error.message}
                                </p>
                            )}
                    </div>
                )}

                {/* Table */}

                {!isError && (
                    <DepositTable
                        deposits={filteredDeposits}
                        loading={isLoading}
                        onOpen={handleOpen}
                    />
                )}

            </div>
        </div>
    );
}