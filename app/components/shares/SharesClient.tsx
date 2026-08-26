"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    Search,
    TrendingUp,
} from "lucide-react";

import { useUserShares } from "@/app/hooks/clientHooks/shares/useUserShares";
import { useRouter } from "next/navigation";
import type { UserShare } from "@/app/types/clientTypes/share.types";
import { formatPercent } from "@/app/utils/format";

export default function SharesClient() {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const handleBack = () => {
        router.back();
    };

    const { data, isLoading, isError } = useUserShares({
        page: 1,
        limit: 24,
    });

    const shares = data?.data ?? [];

    const visibleShares = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return shares;
        return shares.filter((share) => share.name.toLowerCase().includes(query));
    }, [search, shares]);

    if (isLoading) {
        return (
            <div className="space-y-3 px-4 sm:px-6">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="h-36 animate-pulse rounded-2xl bg-slate-200" />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="mx-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:mx-6">
                Unable to load shares. Please try again.
            </div>
        );
    }

    return (
        <div>
            {/* Header bar */}
            <section className="flex items-center gap-10 rounded-3xl bg-gradient-to-r from-blue-700 to-blue-500 px-4 pb-10 pt-5 text-white sm:px-6">
                <button onClick={handleBack} className="text-white/80 transition hover:text-white">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-center text-lg font-semibold">Financial products</h1>
            </section>

            {/* Search, overlapping the header */}
            <div className="relative -mt-6 px-4 sm:px-6">
                <div className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search"
                        className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-blue-100"
                    />
                </div>
            </div>

            {/* Cards */}
            <div className="mt-4 space-y-3 px-4 sm:px-6">
                {!visibleShares.length ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
                        <h2 className="font-semibold text-slate-900">No shares found</h2>
                        <p className="mt-2 text-sm text-slate-500">Try another search or check back later.</p>
                    </div>
                ) : (
                    visibleShares.map((share) => <ShareCard key={share.id} share={share} />)
                )}
            </div>
        </div>
    );
}

function ShareCard({ share }: { share: UserShare }) {
    const stockPct = (share as { remainingStockPercentage?: number }).remainingStockPercentage;

    return (
        <Link
            href={`/dashboard/shares/${share.id}`}
            className="group block rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:border-blue-200 hover:shadow-md"
        >
            <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                    {share.logo ? (
                        <img
                            src={share.logo}
                            alt={`${share.name} logo`}
                            className="h-12 w-12 shrink-0 rounded-xl object-cover ring-1 ring-slate-100"
                        />
                    ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-700 ring-1 ring-slate-100">
                            {share.name.slice(0, 1)}
                        </div>
                    )}

                    <div className="min-w-52">
                        <div className="w-full flex items-center justify-between">
                            <h2 className="truncate text-[15px] font-semibold text-slate-900">{share.name}</h2>

                            <span className="text-base font-bold tabular-nums text-blue-600">
                                {formatPercent(share.dailyReturnPercentage)}
                            </span>
                        </div>

                        <span className="mt-1 inline-flex items-center gap-1.5 text-xs text-slate-500">
                            <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                            Cycle of {share.cycleDays} Day{share.cycleDays === 1 ? "" : "s"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <TrendingUp className="h-3.5 w-3.5 text-blue-500" />
                    Daily Rate Of Return
                </span>

                <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-blue-400" />
            </div>

            {typeof stockPct === "number" && (
                <div className="mt-4 border-t border-slate-100 pt-4">
                    <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-500">Remaining Stock</span>
                        <span className="font-semibold tabular-nums text-slate-700">{formatPercent(stockPct)}</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-[width]"
                            style={{ width: `${Math.min(100, Math.max(0, stockPct))}%` }}
                        />
                    </div>
                </div>
            )}
        </Link>
    );
}