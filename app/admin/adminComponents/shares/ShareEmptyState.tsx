"use client";

import { Layers3, Plus } from "lucide-react";

interface ShareEmptyStateProps {
    hasFilters?: boolean;
    onCreate?: () => void;
}

export default function ShareEmptyState({
    hasFilters = false,
    onCreate,
}: ShareEmptyStateProps) {

    return (
        <div className="flex min-h-[360px] w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12">
            <div className="mx-auto flex max-w-md flex-col items-center text-center">

                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                    <Layers3
                        className="h-8 w-8 text-slate-500"
                        strokeWidth={1.7}
                    />
                </div>

                <h3 className="text-lg font-semibold text-slate-900">
                    {hasFilters
                        ? "No shares found"
                        : "No shares created yet"}
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    {hasFilters
                        ? "No shares match your current search or status filter. Try adjusting your filters."
                        : "Create your first share to make an investment plan available for users."}
                </p>

                {!hasFilters && (
                    <button
                        type="button"
                        onClick={onCreate}
                        className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98]"
                    >
                        <Plus className="h-4 w-4" />
                        Create Share
                    </button>
                )}

            </div>
        </div>
    );
}