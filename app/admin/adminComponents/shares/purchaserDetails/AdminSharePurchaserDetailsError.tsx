"use client";

import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

interface AdminSharePurchaserDetailsErrorProps {
    shareId: string;
    onRetry: () => void;
}

export default function AdminSharePurchaserDetailsError({
    shareId,
    onRetry,
}: AdminSharePurchaserDetailsErrorProps) {
    return (
        <div className="space-y-4">

            <Link
                href={`/admin/shares/${shareId}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
                <ArrowLeft size={17} />
                Back to share
            </Link>

            <section className="rounded-2xl border border-amber-100 bg-amber-50 p-6 text-center">

                <AlertTriangle size={28} className="mx-auto text-amber-600" />

                <p className="mt-3 text-sm font-semibold text-amber-800">
                    Purchaser not found
                </p>

                <p className="mt-1 text-xs text-amber-700">
                    We could not load this purchaser's details.
                </p>

                <button
                    type="button"
                    onClick={onRetry}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2 text-xs font-semibold text-amber-800 transition hover:bg-amber-100"
                >
                    <RefreshCw size={14} />
                    Try again
                </button>

            </section>

        </div>
    );
}