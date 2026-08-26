"use client";

import {
    AlertTriangle,
    Banknote,
    Loader2,
    X,
} from "lucide-react";

import { useCreditShareReturn } from "@/app/hooks/adminHooks/shares/useCreditShareReturn";
import { AdminSharePurchaserDetails } from "@/app/types/adminTypes/share.types";

interface CreditPurchaserReturnDialogProps {
    open: boolean;
    shareId: string;
    purchaseId: string;
    purchaser: AdminSharePurchaserDetails;
    onClose: () => void;
}

function formatAmount(value: string) {
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

function getMutationErrorMessage(
    error: unknown,
    fallback: string,
): string {

    if (
        error &&
        typeof error === "object"
    ) {

        const axiosError =
            error as {
                response?: {
                    data?: {
                        message?: string;
                    };
                };
                message?: string;
            };

        return (
            axiosError.response?.data?.message ??
            axiosError.message ??
            fallback
        );
    }

    return fallback;
}

export default function CreditPurchaserReturnDialog({
    open,
    shareId,
    purchaseId,
    purchaser,
    onClose,
}: CreditPurchaserReturnDialogProps) {

    const creditReturn =
        useCreditShareReturn();

    if (!open) {
        return null;
    }

    const handleConfirm = () => {

        creditReturn.mutate(
            {
                shareId,
                purchaseId,
            },
            {
                onSuccess: () => {
                    onClose();
                },
            },
        );
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
                                Credit Return
                            </h2>

                            <p className="mt-0.5 text-xs text-slate-500">
                                Pay out this user&apos;s expected return.
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={creditReturn.isPending}
                        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* Content */}
                <div className="px-5 py-5">

                    <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">

                        <div className="flex gap-3">

                            <AlertTriangle
                                size={19}
                                className="mt-0.5 shrink-0 text-emerald-600"
                            />

                            <div>
                                <p className="text-sm font-semibold text-emerald-900">
                                    Credit {purchaser.user.phone}?
                                </p>

                                <p className="mt-1 text-sm leading-5 text-emerald-800">
                                    ₦{formatAmount(purchaser.totalReturn)} will be
                                    paid into this user&apos;s wallet. This cannot be undone.
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">

                        <div>
                            <p className="text-xs text-slate-400">Investment</p>
                            <p className="mt-0.5 font-semibold text-slate-900">
                                ₦{formatAmount(purchaser.purchaseAmount)}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-400">Total return</p>
                            <p className="mt-0.5 font-semibold text-slate-900">
                                ₦{formatAmount(purchaser.totalReturn)}
                            </p>
                        </div>

                    </div>

                    {creditReturn.isError && (
                        <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {getMutationErrorMessage(
                                creditReturn.error,
                                "Unable to credit this purchaser.",
                            )}
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end">

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={creditReturn.isPending}
                        className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={creditReturn.isPending}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {creditReturn.isPending ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Crediting...
                            </>
                        ) : (
                            <>
                                <Banknote size={16} />
                                Credit Return
                            </>
                        )}
                    </button>

                </div>

            </div>

        </div>
    );
}