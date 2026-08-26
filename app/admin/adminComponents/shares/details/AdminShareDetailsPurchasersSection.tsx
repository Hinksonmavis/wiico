"use client";

import { useState } from "react";
import { Banknote } from "lucide-react";

import AdminSharePurchasers from "./AdminSharePurchasers";
import CreditAllReturnsDialog from "../dialogs/CreditAllReturnsDialog";

interface AdminShareDetailsPurchasersSectionProps {
    shareId: string;
    shareName: string;   // ← new: pass share.name from the parent page content

    isLoading: boolean;
    isError: boolean;

    data?: any;

    page: number;

    onPageChange: (page: number) => void;
}

export default function AdminShareDetailsPurchasersSection({
    shareId,
    shareName,
    isLoading,
    isError,
    data,
    page,
    onPageChange,
}: AdminShareDetailsPurchasersSectionProps) {

    const [creditAllOpen, setCreditAllOpen] = useState(false);

    if (isLoading) {
        return <div className="h-80 animate-pulse rounded-2xl bg-slate-200" />;
    }

    if (isError || !data) {
        return (
            <section className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
                <p className="text-sm font-semibold text-amber-800">Purchasers unavailable</p>
                <p className="mt-1 text-xs leading-5 text-amber-700">
                    We could not load the purchasers for this share.
                </p>
            </section>
        );
    }

    return (
        <div className="space-y-3">

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={() => setCreditAllOpen(true)}
                    className="inline-flex h-9 items-center gap-2 rounded-xl bg-emerald-600 px-3.5 text-xs font-semibold text-white transition hover:bg-emerald-700"
                >
                    <Banknote size={15} />
                    Credit All Completed
                </button>
            </div>

            <AdminSharePurchasers
                shareId={shareId}
                purchasers={data.data}
                pagination={data.pagination}
                page={page}
                onPageChange={onPageChange}
            />

            <CreditAllReturnsDialog
                open={creditAllOpen}
                shareId={shareId}
                shareName={shareName}
                onClose={() => setCreditAllOpen(false)}
            />

        </div>
    );
}