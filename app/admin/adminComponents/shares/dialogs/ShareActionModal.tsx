"use client";

import {
    Play,
    Lock,
    Trash2,
    X,
} from "lucide-react";

import { ShareStatus } from "@/app/types/sharedTypes/shareStatus.types";

interface ShareActionModalProps {
    open: boolean;
    status: ShareStatus;

    onStart: () => void;
    onClose: () => void;
    onDelete: () => void;
    onDismiss: () => void;
}

export default function ShareActionModal({
    open,
    status,
    onStart,
    onClose,
    onDelete,
    onDismiss,
}: ShareActionModalProps) {

    if (!open) {
        return null;
    }

    const canStart =
        status === ShareStatus.STARTED ||
        status === ShareStatus.CLOSED;

    const canClose =
        status === ShareStatus.IN_PROGRESS;

    const canDelete =
        status === ShareStatus.STARTED;

    const startLabel =
        status === ShareStatus.CLOSED
            ? "Restart Share"
            : "Start Share";

    const startDescription =
        status === ShareStatus.CLOSED
            ? "Restart this share and allow new investments."
            : "Move this share into the investment period.";

    return (
        <div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-black/30 px-3 pb-3 backdrop-blur-[2px] sm:items-center sm:px-4 sm:pb-0"
            onMouseDown={(event) => {
                if (
                    event.target ===
                    event.currentTarget
                ) {
                    onDismiss();
                }
            }}
        >
            <div
                className="w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
                role="dialog"
                aria-modal="true"
                aria-labelledby="share-action-title"
            >

                {/* HEADER */}

                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5">

                    <div>
                        <h2
                            id="share-action-title"
                            className="text-sm font-semibold text-slate-900"
                        >
                            Share Actions
                        </h2>

                        <p className="mt-0.5 text-xs text-slate-500">
                            Manage the lifecycle of this share.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onDismiss}
                        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        aria-label="Close actions"
                    >
                        <X size={18} />
                    </button>

                </div>


                {/* ACTIONS */}

                <div className="p-4">

                    <div className="grid gap-2">

                        {/* START / RESTART */}

                        <button
                            type="button"
                            onClick={onStart}
                            disabled={!canStart}
                            className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-emerald-200 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                <Play size={17} />
                            </span>

                            <span className="min-w-0">

                                <span className="block text-sm font-semibold text-slate-900">
                                    {startLabel}
                                </span>

                                <span className="block text-xs text-slate-500">
                                    {startDescription}
                                </span>

                            </span>
                        </button>


                        {/* CLOSE */}

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={!canClose}
                            className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                                <Lock size={17} />
                            </span>

                            <span className="min-w-0">

                                <span className="block text-sm font-semibold text-slate-900">
                                    Close Share
                                </span>

                                <span className="block text-xs text-slate-500">
                                    Stop new investments in this share.
                                </span>

                            </span>
                        </button>


                        {/* DELETE */}

                        <button
                            type="button"
                            onClick={onDelete}
                            disabled={!canDelete}
                            className="flex w-full items-center gap-3 rounded-xl border border-red-100 bg-red-50/40 px-4 py-3 text-left transition hover:border-red-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                                <Trash2 size={17} />
                            </span>

                            <span className="min-w-0">

                                <span className="block text-sm font-semibold text-red-700">
                                    Delete Share
                                </span>

                                <span className="block text-xs text-red-600/70">
                                    Permanently remove this share.
                                </span>

                            </span>
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
}