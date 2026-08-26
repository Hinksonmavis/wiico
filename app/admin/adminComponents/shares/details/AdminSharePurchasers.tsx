"use client";

import Link from "next/link";
import {
    ChevronRight,
    Mail,
    Phone,
    Users,
} from "lucide-react";
import { format } from "date-fns";

import { AdminSharePurchaser } from "@/app/types/adminTypes/share.types";
import { SharePurchaseStatus } from "@/app/types/adminTypes/share.types";

interface AdminSharePurchasersProps {
    shareId: string;
    purchasers: AdminSharePurchaser[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
    page: number;
    onPageChange: (page: number) => void;
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

function statusClass(
    status: SharePurchaseStatus,
) {
    switch (status) {
        case SharePurchaseStatus.ACTIVE:
            return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";

        case SharePurchaseStatus.COMPLETED:
            return "bg-blue-50 text-blue-700 ring-1 ring-blue-200";

        case SharePurchaseStatus.RETURN_CREDITED:
            return "bg-slate-100 text-slate-600 ring-1 ring-slate-200";

        default:
            return "bg-slate-100 text-slate-600";
    }
}

export default function AdminSharePurchasers({
    shareId,
    purchasers,
    pagination,
    page,
    onPageChange,
}: AdminSharePurchasersProps) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex flex-col gap-2 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                    <h2 className="text-base font-bold text-slate-900">
                        Purchasers
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Users who purchased this share.
                    </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Users size={16} />
                    {pagination.total.toLocaleString()} total
                </div>
            </div>

            {purchasers.length === 0 ? (
                <div className="px-5 py-12 text-center">
                    <Users
                        size={30}
                        className="mx-auto text-slate-300"
                    />

                    <p className="mt-3 text-sm font-semibold text-slate-700">
                        No purchasers yet
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                        Purchases will appear here once users invest in this share.
                    </p>
                </div>
            ) : (
                <>
                    {/* Desktop */}
                    <div className="hidden overflow-x-auto md:block">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50">
                                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        User
                                    </th>

                                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        Amount
                                    </th>

                                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        Return
                                    </th>

                                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        Status
                                    </th>

                                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        Purchased
                                    </th>

                                    <th />
                                </tr>
                            </thead>

                            <tbody>
                                {purchasers.map(
                                    (purchaser) => (
                                        <tr
                                            key={
                                                purchaser.purchaseId
                                            }
                                            className="border-b border-slate-50 last:border-0"
                                        >
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-900">
                                                        {
                                                            purchaser
                                                                .user
                                                                .phone
                                                        }
                                                    </p>

                                                    {purchaser
                                                        .user
                                                        .email && (
                                                        <p className="mt-0.5 text-xs text-slate-400">
                                                            {
                                                                purchaser
                                                                    .user
                                                                    .email
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                                                {formatAmount(
                                                    purchaser.purchaseAmount,
                                                )}
                                            </td>

                                            <td className="px-6 py-4">
                                                <p className="text-sm font-semibold text-slate-900">
                                                    {formatAmount(
                                                        purchaser.totalReturn,
                                                    )}
                                                </p>

                                                <p className="mt-0.5 text-xs text-slate-400">
                                                    {formatAmount(
                                                        purchaser.dailyReturn,
                                                    )}
                                                    /day
                                                </p>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(
                                                        purchaser.status,
                                                    )}`}
                                                >
                                                    {purchaser.status.replace(
                                                        "_",
                                                        " ",
                                                    )}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                {format(
                                                    new Date(
                                                        purchaser.purchasedAt,
                                                    ),
                                                    "MMM d, yyyy",
                                                )}
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={`/admin/shares/${shareId}/purchasers/${purchaser.purchaseId}`}
                                                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                                    aria-label="View purchaser"
                                                >
                                                    <ChevronRight
                                                        size={17}
                                                    />
                                                </Link>
                                            </td>
                                        </tr>
                                    ),
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile */}
                    <div className="divide-y divide-slate-100 md:hidden">
                        {purchasers.map(
                            (purchaser) => (
                                <Link
                                    key={
                                        purchaser.purchaseId
                                    }
                                    href={`/admin/shares/${shareId}/purchasers/${purchaser.purchaseId}`}
                                    className="block p-4 transition hover:bg-slate-50"
                                >
                                    <div className="flex items-start justify-between gap-3">

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-slate-900">
                                                {
                                                    purchaser
                                                        .user
                                                        .phone
                                                }
                                            </p>

                                            <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                                                {purchaser.user.email && (
                                                    <>
                                                        <Mail
                                                            size={12}
                                                        />
                                                        <span className="truncate">
                                                            {
                                                                purchaser
                                                                    .user
                                                                    .email
                                                            }
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <ChevronRight
                                            size={18}
                                            className="shrink-0 text-slate-300"
                                        />
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-3">

                                        <div>
                                            <p className="text-[11px] text-slate-400">
                                                Investment
                                            </p>

                                            <p className="mt-0.5 text-sm font-semibold text-slate-900">
                                                {formatAmount(
                                                    purchaser.purchaseAmount,
                                                )}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-[11px] text-slate-400">
                                                Total return
                                            </p>

                                            <p className="mt-0.5 text-sm font-semibold text-slate-900">
                                                {formatAmount(
                                                    purchaser.totalReturn,
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(
                                                purchaser.status,
                                            )}`}
                                        >
                                            {purchaser.status.replace(
                                                "_",
                                                " ",
                                            )}
                                        </span>

                                        <span className="text-xs text-slate-400">
                                            {format(
                                                new Date(
                                                    purchaser.purchasedAt,
                                                ),
                                                "MMM d, yyyy",
                                            )}
                                        </span>
                                    </div>
                                </Link>
                            ),
                        )}
                    </div>
                </>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-slate-100 px-4 py-4 sm:px-6">
                    <button
                        type="button"
                        disabled={
                            !pagination.hasPreviousPage
                        }
                        onClick={() =>
                            onPageChange(
                                page - 1,
                            )
                        }
                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Previous
                    </button>

                    <span className="text-xs font-medium text-slate-500">
                        Page {pagination.page} of{" "}
                        {pagination.totalPages}
                    </span>

                    <button
                        type="button"
                        disabled={
                            !pagination.hasNextPage
                        }
                        onClick={() =>
                            onPageChange(
                                page + 1,
                            )
                        }
                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            )}
        </section>
    );
}