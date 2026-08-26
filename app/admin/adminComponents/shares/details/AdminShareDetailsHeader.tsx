"use client";

import Link from "next/link";
import {
    ArrowLeft,
    CalendarDays,
    Clock3,
} from "lucide-react";
import { format } from "date-fns";

import { AdminShare } from "@/app/types/adminTypes/share.types";

import ShareStatusBadge from "../ShareStatusBadge";

interface AdminShareDetailsHeaderProps {
    share: AdminShare;
}

/**
 * =========================================================
 * SHORT DESCRIPTION
 * =========================================================
 *
 * Keeps the description very short.
 *
 * Example:
 *
 * "Earn daily returns on your investment..."
 */

function getShortDescription(
    description?: string | null,
    maxLength = 55,
): string {
    if (!description) {
        return "";
    }

    const trimmed =
        description.trim();

    if (!trimmed) {
        return "";
    }

    if (
        trimmed.length <= maxLength
    ) {
        return trimmed;
    }

    return `${trimmed
        .slice(0, maxLength)
        .trim()}...`;
}

export default function AdminShareDetailsHeader({
    share,
}: AdminShareDetailsHeaderProps) {

    const shortDescription =
        getShortDescription(
            share.description,
        );

    return (
        <section className="space-y-5">

            {/* =====================================================
                BACK
            ===================================================== */}

            <Link
                href="/admin/shares"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
                <ArrowLeft size={17} />

                Back to shares
            </Link>

            {/* =====================================================
                HEADER CARD
            ===================================================== */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                <div className="flex flex-col gap-5">

                    {/* =================================================
                        IDENTITY
                    ================================================= */}

                    <div className="flex min-w-0 items-start gap-4">

                        {/* LOGO */}

                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

                            {share.logo ? (
                                <img
                                    src={share.logo}
                                    alt={share.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="text-xl font-bold text-slate-400">
                                    {share.name
                                        .charAt(0)
                                        .toUpperCase()}
                                </span>
                            )}

                        </div>

                        {/* NAME + STATUS + DESCRIPTION */}

                        <div className="min-w-0 flex-1">

                            <div className="flex flex-wrap items-center gap-2">

                                <h1 className="truncate text-xl font-bold text-slate-900 sm:text-2xl">
                                    {share.name}
                                </h1>

                                <ShareStatusBadge
                                    status={
                                        share.status
                                    }
                                />

                            </div>

                            {shortDescription && (
                                <p
                                    title={
                                        share.description ??
                                        undefined
                                    }
                                    className="mt-1 max-w-xl truncate text-sm leading-6 text-slate-500"
                                >
                                    {shortDescription}
                                </p>
                            )}

                        </div>
                    </div>

                    {/* =================================================
                        SUMMARY
                    ================================================= */}

                    <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-3">

                        {/* DAILY RETURN */}

                        <div>
                            <p className="text-xs font-medium text-slate-400">
                                Daily return
                            </p>

                            <p className="mt-1 text-lg font-bold text-slate-900">
                                {share.dailyReturnPercentage}%
                            </p>
                        </div>

                        {/* CYCLE */}

                        <div>
                            <p className="text-xs font-medium text-slate-400">
                                Cycle
                            </p>

                            <p className="mt-1 flex items-center gap-1.5 text-lg font-bold text-slate-900">
                                <Clock3
                                    size={16}
                                />

                                {share.cycleDays} days
                            </p>
                        </div>

                        {/* CREATED */}

                        <div className="col-span-2 sm:col-span-1">

                            <p className="text-xs font-medium text-slate-400">
                                Created
                            </p>

                            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                                <CalendarDays
                                    size={15}
                                />

                                {format(
                                    new Date(
                                        share.createdAt,
                                    ),
                                    "MMM d, yyyy",
                                )}
                            </p>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}