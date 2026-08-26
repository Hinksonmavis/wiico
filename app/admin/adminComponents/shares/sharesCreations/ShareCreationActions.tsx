"use client";

import {
    ArrowLeft,
    CheckCircle2,
    Loader2,
    Save,
} from "lucide-react";

interface ShareCreationActionsProps {
    isPending: boolean;

    isSuccess: boolean;

    onCancel: () => void;
}

export default function ShareCreationActions({
    isPending,
    isSuccess,
    onCancel,
}: ShareCreationActionsProps) {

    const disabled =
        isPending ||
        isSuccess;

    return (
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
                type="button"
                onClick={onCancel}
                disabled={disabled}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />

                Cancel
            </button>

            <button
                type="submit"
                disabled={disabled}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >

                {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                        Creating Share...
                    </>
                ) : isSuccess ? (
                    <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />

                        Created
                    </>
                ) : (
                    <>
                        <Save className="mr-2 h-4 w-4" />

                        Create Share
                    </>
                )}

            </button>

        </div>
    );
}