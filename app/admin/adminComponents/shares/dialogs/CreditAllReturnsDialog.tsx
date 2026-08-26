"use client";

import { useState } from "react";
import {
    AlertTriangle,
    Banknote,
    CheckCircle2,
    Loader2,
    X,
    XCircle,
} from "lucide-react";

import { useCreditAllShareReturns } from "@/app/hooks/adminHooks/shares/useCreditAllShareReturns";

interface CreditAllReturnsDialogProps {
    open: boolean;
    shareId: string;
    shareName: string;
    onClose: () => void;
}

export default function CreditAllReturnsDialog({
    open,
    shareId,
    shareName,
    onClose,
}: CreditAllReturnsDialogProps) {

    const creditAll =
        useCreditAllShareReturns(shareId);

    const [hasRun, setHasRun] =
        useState(false);

    if (!open) {
        return null;
    }

    const handleConfirm = () => {
        setHasRun(true);
        creditAll.mutate();
    };

    const handleClose = () => {
        setHasRun(false);
        creditAll.reset();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">

            <div
                className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
                role="dialog"
                aria-modal="true"
            >

                {/* Header */}
                <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <Banknote size={19} />
                        </div>

                        <div>
                            <h2 className="text-base font-semibold text-slate-900">
                                Credit All Completed
                            </h2>

                            <p className="mt-0.5 text-xs text-slate-500">
                                Pay every eligible purchaser of {shareName}.
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={creditAll.isPending}
                        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* Content */}
                <div className="px-5 py-5">

                    {!hasRun && (
                        <>
                            <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">

                                <div className="flex gap-3">

                                    <AlertTriangle
                                        size={19}
                                        className="mt-0.5 shrink-0 text-amber-600"
                                    />

                                    <div>
                                        <p className="text-sm font-semibold text-amber-900">
                                            This will scan every purchaser
                                        </p>

                                        <p className="mt-1 text-sm leading-5 text-amber-800">
                                            Every purchaser whose cycle has completed
                                            (and who hasn&apos;t been paid yet) will be
                                            credited their expected return. This runs
                                            one payment at a time and cannot be undone.
                                        </p>
                                    </div>

                                </div>

                            </div>
                        </>
                    )}

                    {hasRun && creditAll.isPending && (
                        <div className="flex flex-col items-center gap-3 py-6 text-center">
                            <Loader2 size={28} className="animate-spin text-emerald-600" />
                            <p className="text-sm font-medium text-slate-600">
                                Crediting purchasers, please wait...
                            </p>
                        </div>
                    )}

                    {hasRun && creditAll.isSuccess && (
                        <div className="space-y-3">

                            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                                <div className="flex gap-3">
                                    <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-emerald-600" />
                                    <div>
                                        <p className="text-sm font-semibold text-emerald-900">
                                            {creditAll.data.succeeded} of {creditAll.data.total} credited
                                        </p>
                                        {creditAll.data.total === 0 && (
                                            <p className="mt-1 text-sm text-emerald-800">
                                                No purchasers were awaiting payment.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {creditAll.data.failed > 0 && (
                                <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                                    <div className="flex gap-3">
                                        <XCircle size={19} className="mt-0.5 shrink-0 text-red-600" />
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-red-900">
                                                {creditAll.data.failed} failed
                                            </p>
                                            <ul className="mt-1 space-y-1 text-xs text-red-800">
                                                {creditAll.data.failures.map((failure) => (
                                                    <li key={failure.purchaseId} className="truncate">
                                                        {failure.purchaseId}: {failure.message}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    )}

                    {hasRun && creditAll.isError && (
                        <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                            Something went wrong while fetching purchasers. Nothing was charged.
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end">

                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={creditAll.isPending}
                        className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                    >
                        {hasRun ? "Done" : "Cancel"}
                    </button>

                    {!hasRun && (
                        <button
                            type="button"
                            onClick={handleConfirm}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700"
                        >
                            <Banknote size={16} />
                            Credit All
                        </button>
                    )}

                </div>

            </div>

        </div>
    );
}