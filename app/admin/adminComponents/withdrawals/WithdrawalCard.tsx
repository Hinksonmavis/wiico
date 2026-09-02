"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Withdrawal, WithdrawalStatus } from "@/app/types/adminTypes/withdrawal.types";

interface Props {
    withdrawal: Withdrawal;
}

const statusStyles: Record<WithdrawalStatus, string> = {
    pending:
        "bg-amber-100 text-amber-700",

    approved:
        "bg-blue-100 text-blue-700",

    rejected:
        "bg-red-100 text-red-700",

    paid:
        "bg-green-100 text-green-700",
};

export default function WithdrawalCard({
    withdrawal,
}: Props) {
    return (
        <Link
            href={`/admin/withdrawals/${withdrawal.id}`}
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
                        {withdrawal.user?.email ??
                            "No email"}
                    </h2>

                    {/* Phone */}
                    <p className="mt-1 text-sm text-slate-500">
                        {withdrawal.user?.phone ??
                            "No phone"}
                    </p>

                    <div className="mt-4 space-y-2 text-sm">

                        <div className="flex justify-between">
                            <span className="text-slate-500">
                                Amount
                            </span>

                            <span className="font-semibold text-slate-900">
                                ₦{withdrawal.amount}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-slate-500">
                                Bank
                            </span>

                            <span className="font-medium text-slate-900">
                                {withdrawal.bankName}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-slate-500">
                                Account
                            </span>

                            <span className="font-medium text-slate-900">
                                {withdrawal.accountNumber}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-slate-500">
                                Created
                            </span>

                            <span className="text-slate-700">
                                {new Date(
                                    withdrawal.createdAt,
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
                                        withdrawal.status
                                    ]
                                }
                            `}
                        >
                            {withdrawal.status}
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