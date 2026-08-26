"use client";

export default function AdminShareDetailsSkeleton() {
    return (
        <div className="mx-auto max-w-7xl space-y-5 animate-pulse">

            {/* BACK / BREADCRUMB */}
            <div className="h-5 w-28 rounded bg-slate-200" />

            {/* HEADER */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">

                <div className="flex gap-4">

                    <div className="h-16 w-16 rounded-2xl bg-slate-200" />

                    <div className="flex-1 space-y-3">

                        <div className="h-6 w-48 rounded bg-slate-200" />

                        <div className="h-4 w-72 rounded bg-slate-200" />

                    </div>

                </div>

            </div>

            {/* ACTIONS */}
            <div className="h-20 rounded-2xl bg-slate-200" />

            {/* INFORMATION + FINANCIAL TERMS */}
            <div className="grid gap-5 lg:grid-cols-2">

                <div className="h-52 rounded-2xl bg-slate-200" />

                <div className="h-52 rounded-2xl bg-slate-200" />

            </div>

            {/* LIFECYCLE */}
            <div className="h-64 rounded-2xl bg-slate-200" />

            {/* ANALYTICS */}
            <div className="h-72 rounded-2xl bg-slate-200" />

            {/* PURCHASERS */}
            <div className="h-80 rounded-2xl bg-slate-200" />

        </div>
    );
}