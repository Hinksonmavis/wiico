"use client";

interface ReferralTransactionPaginationProps {
    page: number;

    hasNextPage: boolean;

    hasPreviousPage: boolean;

    onPrevious: () => void;

    onNext: () => void;

    loading?: boolean;
}

export default function ReferralTransactionPagination({
    page,
    hasNextPage,
    hasPreviousPage,
    onPrevious,
    onNext,
    loading = false,
}: ReferralTransactionPaginationProps) {

    if (
        !hasNextPage &&
        !hasPreviousPage
    ) {
        return null;
    }

    return (
        <div className="mt-4 flex items-center justify-between">

            <button
                type="button"
                disabled={
                    !hasPreviousPage ||
                    loading
                }
                onClick={onPrevious}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-[#1590FC] hover:text-[#1590FC] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-700"
            >
                Previous
            </button>

            <span className="text-xs font-medium text-slate-400">
                Page {page}
            </span>

            <button
                type="button"
                disabled={
                    !hasNextPage ||
                    loading
                }
                onClick={onNext}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-[#1590FC] hover:text-[#1590FC] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-700"
            >
                Next
            </button>

        </div>
    );
}