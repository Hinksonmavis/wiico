"use client";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import {
    SharePagination as SharePaginationType,
} from "@/app/types/adminTypes/share.types";

interface SharePaginationProps {
    pagination: SharePaginationType;
    onPageChange: (page: number) => void;
}

export default function SharePagination({
    pagination,
    onPageChange,
}: SharePaginationProps) {

    if (pagination.totalPages <= 1) {
        return null;
    }

    return (
        <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-xs text-slate-500 sm:text-sm">
                Page{" "}
                <span className="font-semibold text-slate-700">
                    {pagination.page}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-700">
                    {pagination.totalPages}
                </span>
            </p>

            <div className="flex items-center gap-2">

                <button
                    type="button"
                    disabled={
                        !pagination.hasPreviousPage
                    }
                    onClick={() =>
                        onPageChange(
                            pagination.page - 1,
                        )
                    }
                    className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <ChevronLeft size={16} />
                    Previous
                </button>

                <button
                    type="button"
                    disabled={
                        !pagination.hasNextPage
                    }
                    onClick={() =>
                        onPageChange(
                            pagination.page + 1,
                        )
                    }
                    className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Next
                    <ChevronRight size={16} />
                </button>

            </div>

        </div>
    );
}