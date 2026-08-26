"use client";

import {
    CalendarClock,
    Percent,
    TrendingUp,
} from "lucide-react";

import { AdminShare } from "@/app/types/adminTypes/share.types";

interface AdminShareFinancialTermsProps {
    share: AdminShare;
}

export default function AdminShareFinancialTerms({
    share,
}: AdminShareFinancialTermsProps) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="mb-5">
                <h2 className="text-base font-bold text-slate-900">
                    Financial Terms
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Investment terms configured for this share.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <Percent
                        size={19}
                        className="text-indigo-500"
                    />

                    <p className="mt-3 text-xs font-medium text-slate-400">
                        Daily return
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-900">
                        {share.dailyReturnPercentage}%
                    </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <CalendarClock
                        size={19}
                        className="text-indigo-500"
                    />

                    <p className="mt-3 text-xs font-medium text-slate-400">
                        Investment cycle
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-900">
                        {share.cycleDays}
                        <span className="ml-1 text-sm font-medium text-slate-500">
                            days
                        </span>
                    </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <TrendingUp
                        size={19}
                        className="text-indigo-500"
                    />

                    <p className="mt-3 text-xs font-medium text-slate-400">
                        Lifecycle
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                        {share.status === "started"
                            ? "Not yet investable"
                            : share.status ===
                              "in_progress"
                            ? "Investable"
                            : "Closed"}
                    </p>
                </div>
            </div>
        </section>
    );
}