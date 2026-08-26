"use client";

import {
    AlertTriangle,
    Loader2,
    Trash2,
    X,
} from "lucide-react";

import { useDeleteAdminShare } from "@/app/hooks/adminHooks/shares/useDeleteAdminShare";

import { ShareStatus } from "@/app/types/sharedTypes/shareStatus.types";

interface DeleteShareDialogProps {
    open: boolean;
    shareId: string;
    shareName: string;
    status: ShareStatus;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function DeleteShareDialog({
    open,
    shareId,
    shareName,
    status,
    onClose,
    onSuccess,
}: DeleteShareDialogProps) {

    const deleteShare =
        useDeleteAdminShare();

    if (!open) {
        return null;
    }

    const canDelete =
        status === "STARTED";

    const handleConfirm = () => {

        if (!canDelete) {
            return;
        }

        deleteShare.mutate(
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

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                            <Trash2 size={19} />
                        </div>

                        <div>
                            <h2 className="text-base font-semibold text-slate-900">
                                Delete Share
                            </h2>

                            <p className="mt-0.5 text-xs text-slate-500">
                                Permanently remove this share.
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={deleteShare.isPending}
                        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* Content */}
                <div className="px-5 py-5">

                    {!canDelete ? (

                        <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">

                            <div className="flex gap-3">

                                <AlertTriangle
                                    size={19}
                                    className="mt-0.5 shrink-0 text-amber-600"
                                />

                                <div>
                                    <p className="text-sm font-semibold text-amber-900">
                                        This share cannot be deleted.
                                    </p>

                                    <p className="mt-1 text-sm leading-5 text-amber-800">
                                        Only shares in the STARTED state can be deleted.
                                        Shares that have entered the investment lifecycle
                                        must remain available for historical records.
                                    </p>
                                </div>

                            </div>

                        </div>

                    ) : (

                        <>
                            <div className="rounded-xl border border-red-100 bg-red-50 p-4">

                                <div className="flex gap-3">

                                    <AlertTriangle
                                        size={19}
                                        className="mt-0.5 shrink-0 text-red-600"
                                    />

                                    <div>

                                        <p className="text-sm font-semibold text-red-900">
                                            Delete this share?
                                        </p>

                                        <p className="mt-1 text-sm leading-5 text-red-800">
                                            You are about to permanently delete{" "}
                                            <strong>
                                                {shareName}
                                            </strong>
                                            .
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <p className="mt-4 text-sm leading-5 text-slate-600">
                                This operation is only allowed if the share has no
                                purchase history. Once purchase history exists,
                                the backend will prevent deletion.
                            </p>
                        </>
                    )}

                    {deleteShare.isError && (
                        <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3">

                            <p className="text-sm font-semibold text-red-800">
                                Unable to delete share.
                            </p>

                            <p className="mt-1 text-sm text-red-700">
                                {getMutationErrorMessage(
                                    deleteShare.error,
                                    "This share already has purchase history.",
                                )}
                            </p>

                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end">

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={deleteShare.isPending}
                        className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    {canDelete && (
                        <button
                            type="button"
                            onClick={handleConfirm}
                            disabled={deleteShare.isPending}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {deleteShare.isPending ? (
                                <>
                                    <Loader2
                                        size={16}
                                        className="animate-spin"
                                    />

                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 size={16} />

                                    Delete Share
                                </>
                            )}
                        </button>
                    )}

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

        const message =
            axiosError.response?.data?.message ??
            axiosError.message;

        if (message) {
            return message;
        }
    }

    return fallback;
}