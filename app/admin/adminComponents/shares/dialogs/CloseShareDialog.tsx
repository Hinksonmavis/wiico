"use client";

import {
    AlertTriangle,
    Loader2,
    Lock,
    X,
} from "lucide-react";

import { useCloseAdminShare } from "@/app/hooks/adminHooks/shares/useCloseAdminShare";

interface CloseShareDialogProps {
    open: boolean;
    shareId: string;
    shareName: string;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function CloseShareDialog({
    open,
    shareId,
    shareName,
    onClose,
    onSuccess,
}: CloseShareDialogProps) {

    const closeShare =
        useCloseAdminShare();

    if (!open) {
        return null;
    }

    const handleConfirm = () => {

        closeShare.mutate(
            shareId,
            {
                onSuccess: () => {
                    onSuccess?.();
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

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                            <Lock size={19} />
                        </div>

                        <div>
                            <h2 className="text-base font-semibold text-slate-900">
                                Close Share
                            </h2>

                            <p className="mt-0.5 text-xs text-slate-500">
                                Stop new investments in this share.
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={closeShare.isPending}
                        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* Content */}
                <div className="px-5 py-5">

                    <div className="rounded-xl border border-red-100 bg-red-50 p-4">

                        <div className="flex gap-3">

                            <AlertTriangle
                                size={19}
                                className="mt-0.5 shrink-0 text-red-600"
                            />

                            <div>
                                <p className="text-sm font-semibold text-red-900">
                                    Close this share?
                                </p>

                                <p className="mt-1 text-sm leading-5 text-red-800">
                                    You are about to close{" "}
                                    <strong>
                                        {shareName}
                                    </strong>
                                    .
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className="mt-4 text-sm text-slate-600">

                        <p>
                            The share will change from:
                        </p>

                        <div className="mt-3 flex items-center gap-2 text-xs font-semibold">

                            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">
                                IN_PROGRESS
                            </span>

                            <span className="text-slate-400">
                                →
                            </span>

                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">
                                CLOSED
                            </span>

                        </div>

                        <p className="mt-3">
                            New investments will no longer be allowed.
                            Historical share and purchase data will remain available.
                        </p>

                    </div>

                    {closeShare.isError && (
                        <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {getMutationErrorMessage(
                                closeShare.error,
                                "Unable to close share.",
                            )}
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end">

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={closeShare.isPending}
                        className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={closeShare.isPending}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {closeShare.isPending ? (
                            <>
                                <Loader2
                                    size={16}
                                    className="animate-spin"
                                />

                                Closing...
                            </>
                        ) : (
                            <>
                                <Lock size={16} />

                                Close Share
                            </>
                        )}
                    </button>

                </div>

            </div>

        </div>
    );
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