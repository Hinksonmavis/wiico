"use client";

import Link from "next/link";
import {
    ArrowLeft,
    Banknote,
    Mail,
    Phone,
} from "lucide-react";

import { AdminSharePurchaserDetails, SharePurchaseStatus } from "@/app/types/adminTypes/share.types";

interface AdminSharePurchaserDetailsHeaderProps {
    shareId: string;
    purchaser: AdminSharePurchaserDetails;
    onCreditReturn: () => void;
}

function statusClass(status: SharePurchaseStatus) {
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

export default function AdminSharePurchaserDetailsHeader({
    shareId,
    purchaser,
    onCreditReturn,
}: AdminSharePurchaserDetailsHeaderProps) {

    const canCredit =
        purchaser.status === SharePurchaseStatus.COMPLETED;

    return (
        <section className="space-y-5">

            <Link
                href={`/admin/shares/${shareId}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
                <ArrowLeft size={17} />
                Back to {purchaser.share.name}
            </Link>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">

                    <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">
                            <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
                                {purchaser.user.phone}
                            </h1>

                            <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(purchaser.status)}`}>
                                {purchaser.status.replace("_", " ")}
                            </span>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">

                            <span className="flex items-center gap-1.5">
                                <Phone size={14} />
                                {purchaser.user.phone}
                            </span>

                            {purchaser.user.email && (
                                <span className="flex items-center gap-1.5">
                                    <Mail size={14} />
                                    {purchaser.user.email}
                                </span>
                            )}

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onCreditReturn}
                        disabled={!canCredit}
                        title={
                            canCredit
                                ? undefined
                                : purchaser.status === SharePurchaseStatus.RETURN_CREDITED
                                    ? "This purchaser has already been paid."
                                    : "This purchaser's cycle hasn't completed yet."
                        }
                        className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                    >
                        <Banknote size={16} />
                        Credit Return
                    </button>

                </div>

            </div>

        </section>
    );
}