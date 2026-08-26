"use client";

import { useEffect } from "react";
import {
    AlertTriangle,
    Loader2,
    Play,
    X,
} from "lucide-react";

import { useStartAdminShare } from "@/app/hooks/adminHooks/shares/useStartAdminShare";

interface StartShareDialogProps {
    open: boolean;
    shareId: string;
    shareName: string;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function StartShareDialog({
    open,
    shareId,
    shareName,
    onClose,
    onSuccess,
}: StartShareDialogProps) {

    const startShare =
        useStartAdminShare();

    useEffect(() => {
        if (!open) {
            startShare.reset();
        }
    }, [open]);

    if (!open) {
        return null;
    }

    const handleConfirm = () => {

        startShare.mutate(
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
                aria-labelledby="start-share-title"
            >

                {/* Header */}
                <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <Play size={19} />
                        </div>

                        <div>
                            <h2
                                id="start-share-title"
                                className="text-base font-semibold text-slate-900"
                            >
                                Start Share
                            </h2>

                            <p className="mt-0.5 text-xs text-slate-500">
                                Make this share available for investment.
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={startShare.isPending}
                        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* Content */}
                <div className="px-5 py-5">

                    <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">

                        <div className="flex gap-3">

                            <AlertTriangle
                                size={19}
                                className="mt-0.5 shrink-0 text-amber-600"
                            />

                            <div>
                                <p className="text-sm font-semibold text-amber-900">
                                    Start this share?
                                </p>

                                <p className="mt-1 text-sm leading-5 text-amber-800">
                                    You are about to start{" "}
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
                            Once started, the share will change from:
                        </p>

                        <div className="mt-3 flex items-center gap-2 text-xs font-semibold">

                            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-amber-700">
                                STARTED
                            </span>

                            <span className="text-slate-400">
                                →
                            </span>

                            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">
                                IN_PROGRESS
                            </span>

                        </div>

                        <p className="mt-3">
                            The share will then become available for users to invest in.
                        </p>

                    </div>

                    {startShare.isError && (
                        <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {getMutationErrorMessage(
                                startShare.error,
                                "Unable to start share.",
                            )}
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end">

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={startShare.isPending}
                        className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={startShare.isPending}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {startShare.isPending ? (
                            <>
                                <Loader2
                                    size={16}
                                    className="animate-spin"
                                />

                                Starting...
                            </>
                        ) : (
                            <>
                                <Play size={16} />

                                Start Share
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