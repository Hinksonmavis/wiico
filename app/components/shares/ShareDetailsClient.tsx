"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Percent } from "lucide-react";

import { ShareStatus } from "@/app/types/sharedTypes/shareStatus.types";

import BuyShareModal from "./BuyShareModal";

import { useUserShare } from "@/app/hooks/clientHooks/shares/useUserShares";

interface ShareDetailsClientProps {
    shareId: string;
}

export default function ShareDetailsClient({ shareId }: ShareDetailsClientProps) {
    const { data: share, isLoading, isError } = useUserShare(shareId);
    const [showBuyModal, setShowBuyModal] = useState(false);

    if (isLoading) {
        return <div className="h-96 animate-pulse rounded-3xl bg-slate-200" />;
    }

    if (isError || !share) {
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
                We could not find this share.
            </div>
        );
    }

    const canBuy = share.status === ShareStatus.IN_PROGRESS;
    const stockPct = (share as { remainingStockPercentage?: number }).remainingStockPercentage;

    return (
        <>
            <div className="rounded-b-3xl bg-gradient-to-r from-blue-700 to-blue-500 px-4 pb-6 pt-5 text-white sm:px-6">
                <Link
                    href="/dashboard/shares"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    All shares
                </Link>

                <div className="mt-5 flex items-center gap-3">
                    {share.logo ? (
                        <img
                            src={share.logo}
                            alt={`${share.name} logo`}
                            className="h-14 w-14 rounded-2xl bg-white object-cover"
                        />
                    ) : (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold">
                            {share.name.slice(0, 1)}
                        </div>
                    )}
                    <h1 className="truncate text-xl font-bold">{share.name}</h1>
                </div>
            </div>

            <article className="-mt-4 rounded-t-3xl bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-center justify-between rounded-2xl bg-blue-50 px-4 py-3">
                    <span className="text-sm font-medium text-blue-700">Daily Rate Of Return</span>
                    <span className="text-lg font-bold text-blue-700">{share.dailyReturnPercentage}%</span>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                    {share.description || "No description has been provided for this share."}
                </p>

                <h2 className="mt-6 text-sm font-semibold text-slate-900">Basic information</h2>
                <div className="mt-3 divide-y divide-slate-100 rounded-2xl border border-slate-100">
                    <div className="flex items-center justify-between px-4 py-3 text-sm">
                        <span className="flex items-center gap-2 text-slate-500">
                            <CalendarDays className="h-4 w-4 text-blue-500" />
                            Cycle
                        </span>
                        <span className="font-semibold text-slate-900">{share.cycleDays} days</span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3 text-sm">
                        <span className="flex items-center gap-2 text-slate-500">
                            <Percent className="h-4 w-4 text-blue-500" />
                            Daily Return
                        </span>
                        <span className="font-semibold text-slate-900">{share.dailyReturnPercentage}%</span>
                    </div>
                </div>

                {typeof stockPct === "number" && (
                    <div className="mt-6">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Remaining Stock</span>
                            <span className="font-medium text-slate-700">{stockPct}%</span>
                        </div>
                        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
                                style={{ width: `${Math.min(100, Math.max(0, stockPct))}%` }}
                            />
                        </div>
                    </div>
                )}

                <button
                    type="button"
                    disabled={!canBuy}
                    onClick={() => setShowBuyModal(true)}
                    className="mt-7 h-12 w-full rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                    {canBuy ? "Invest Now" : "This share is not available for purchase"}
                </button>
            </article>

            {showBuyModal && <BuyShareModal share={share} onClose={() => setShowBuyModal(false)} />}
        </>
    );
}