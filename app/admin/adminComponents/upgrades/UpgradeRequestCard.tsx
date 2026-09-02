"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { UpgradeRequest } from "@/app/types/adminTypes/upgrade-request.types";

interface Props {
    request: UpgradeRequest;
}

const statusStyles: Record<string, string> = {
    PENDING:
        "bg-amber-100 text-amber-700",

    UNDER_REVIEW:
        "bg-blue-100 text-blue-700",

    APPROVED:
        "bg-green-100 text-green-700",

    REJECTED:
        "bg-red-100 text-red-700",

    CANCELLED:
        "bg-slate-200 text-slate-700",
};

export default function UpgradeRequestCard({
    request,
}: Props) {
    return (
        <Link
            href={`/admin/upgrade-requests/${request.id}`}
            className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition
                hover:border-slate-300
                hover:shadow-md
                active:scale-[0.98]
            "
        >
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    {/* Email */}
                    <h2 className="truncate text-base font-semibold text-slate-900">
                        {request.user?.email ?? "No email"}
                    </h2>

                    {/* Phone */}
                    <p className="mt-1 text-sm text-slate-500">
                        {request.user?.phone ?? "No phone"}
                    </p>

                    <div className="mt-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-500">
                                Membership
                            </span>

                            <span className="font-medium text-slate-900">
                                {request.requestedMembership?.name ?? "Unknown"}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-slate-500">
                                Amount
                            </span>

                            <span className="font-semibold text-slate-900">
                                ₦{request.amount}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-slate-500">
                                Reference
                            </span>

                            <span className="truncate font-mono text-xs text-slate-700">
                                {request.reference}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-slate-500">
                                Created
                            </span>

                            <span className="text-slate-700">
                                {new Date(
                                    request.createdAt,
                                ).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    <div className="mt-4">
                        <span
                            className={`
                                inline-flex
                                rounded-full
                                px-3
                                py-1
                                text-xs
                                font-semibold
                                ${
                                    statusStyles[
                                        request.status
                                    ]
                                }
                            `}
                        >
                            {request.status.replaceAll(
                                "_",
                                " ",
                            )}
                        </span>
                    </div>
                </div>

                <ChevronRight
                    size={20}
                    className="mt-1 shrink-0 text-slate-400"
                />
            </div>
        </Link>
    );
}