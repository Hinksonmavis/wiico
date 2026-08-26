"use client";

import { CalendarDays, Clock3 } from "lucide-react";
import { format } from "date-fns";

import { AdminSharePurchaserDetails } from "@/app/types/adminTypes/share.types";

interface AdminSharePurchaserDetailsInfoProps {
    purchaser: AdminSharePurchaserDetails;
}

function formatAmount(value: string) {
    const amount = Number(value);
    if (!Number.isFinite(amount)) return value;
    return new Intl.NumberFormat("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

function formatDate(value?: string | null) {
    if (!value) return "—";
    return format(new Date(value), "MMM d, yyyy");
}

export default function AdminSharePurchaserDetailsInfo({
    purchaser,
}: AdminSharePurchaserDetailsInfoProps) {

    return (
        <div className="grid gap-5 sm:grid-cols-2">

            {/* Financial terms */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                <h2 className="text-sm font-bold text-slate-900">Financials</h2>

                <div className="mt-4 space-y-4">

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500">Investment</p>
                        <p className="text-sm font-semibold text-slate-900">
                            ₦{formatAmount(purchaser.purchaseAmount)}
                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500">Daily return</p>
                        <p className="text-sm font-semibold text-slate-900">
                            ₦{formatAmount(purchaser.dailyReturn)} ({purchaser.dailyReturnPercentage}%)
                        </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                        <p className="text-sm font-semibold text-slate-700">Total return</p>
                        <p className="text-base font-bold text-slate-900">
                            ₦{formatAmount(purchaser.totalReturn)}
                        </p>
                    </div>

                    {purchaser.returnAmount && (
                        <div className="flex items-center justify-between rounded-xl bg-emerald-50 px-3 py-2">
                            <p className="text-sm font-medium text-emerald-800">Amount paid</p>
                            <p className="text-sm font-bold text-emerald-900">
                                ₦{formatAmount(purchaser.returnAmount)}
                            </p>
                        </div>
                    )}

                </div>

            </section>

            {/* Timeline */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                <h2 className="text-sm font-bold text-slate-900">Timeline</h2>

                <div className="mt-4 space-y-4">

                    <div className="flex items-center justify-between">
                        <p className="flex items-center gap-1.5 text-sm text-slate-500">
                            <CalendarDays size={14} /> Purchased
                        </p>
                        <p className="text-sm font-semibold text-slate-900">
                            {formatDate(purchaser.purchasedAt)}
                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="flex items-center gap-1.5 text-sm text-slate-500">
                            <Clock3 size={14} /> Cycle length
                        </p>
                        <p className="text-sm font-semibold text-slate-900">
                            {purchaser.cycleDays} days
                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500">Expected return date</p>
                        <p className="text-sm font-semibold text-slate-900">
                            {formatDate(purchaser.expectedReturnAt)}
                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500">Expires</p>
                        <p className="text-sm font-semibold text-slate-900">
                            {formatDate(purchaser.expiresAt)}
                        </p>
                    </div>

                    {purchaser.returnedAt && (
                        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                            <p className="text-sm font-medium text-slate-700">Paid on</p>
                            <p className="text-sm font-semibold text-slate-900">
                                {formatDate(purchaser.returnedAt)}
                            </p>
                        </div>
                    )}

                    {purchaser.returnReference && (
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500">Reference</p>
                            <p className="truncate text-xs font-mono text-slate-500">
                                {purchaser.returnReference}
                            </p>
                        </div>
                    )}

                </div>

            </section>

        </div>
    );
}