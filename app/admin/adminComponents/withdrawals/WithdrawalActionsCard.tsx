"use client";

import { useState } from "react";
import {
    CheckCircle2,
    XCircle,
    CreditCard,
    Loader2,
    ShieldCheck,
} from "lucide-react";

import { Withdrawal } from "@/app/types/adminTypes/withdrawal.types";

import { useApproveWithdrawal } from "@/app/hooks/adminHooks/withdrawals/useApproveWithdrawal";
import { useRejectWithdrawal } from "@/app/hooks/adminHooks/withdrawals/useRejectWithdrawal";
import { useMarkPaidWithdrawal } from "@/app/hooks/adminHooks/withdrawals/useMarkPaidWithdrawal";

interface Props {
    withdrawal: Withdrawal;
}

export default function WithdrawalActionsCard({
    withdrawal,
}: Props) {
    const [adminRemark, setAdminRemark] =
        useState("");

    const approveMutation =
        useApproveWithdrawal(
            withdrawal.id,
        );

    const rejectMutation =
        useRejectWithdrawal(
            withdrawal.id,
        );

    const markPaidMutation =
        useMarkPaidWithdrawal(
            withdrawal.id,
        );

    const isPending =
        withdrawal.status === "pending";

    const isApproved =
        withdrawal.status === "approved";

    const isProcessing =
        approveMutation.isPending ||
        rejectMutation.isPending ||
        markPaidMutation.isPending;

    const handleApprove = () => {
        approveMutation.mutate({
            adminRemark:
                adminRemark.trim() || undefined,
        });
    };

    const handleReject = () => {
        if (!adminRemark.trim()) {
            return;
        }

        rejectMutation.mutate({
            adminRemark:
                adminRemark.trim(),
        });
    };

    const handleMarkPaid = () => {
        markPaidMutation.mutate();
    };

    /*
     * Only pending and approved withdrawals
     * require an admin action.
     */
    if (!isPending && !isApproved) {
        return null;
    }

    return (
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            {/* Header */}
            <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
                <div className="flex items-start gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100">
                        <ShieldCheck
                            size={21}
                            className="text-slate-700"
                        />
                    </div>

                    <div className="min-w-0">
                        <h2 className="text-base font-bold text-slate-900">
                            Withdrawal Actions
                        </h2>

                        <p className="mt-1 text-sm leading-5 text-slate-500">
                            {isPending
                                ? "Review this request before approving or rejecting it."
                                : "Confirm that the approved withdrawal has been paid."
                            }
                        </p>
                    </div>

                </div>
            </div>

            {/* Pending Actions */}
            {isPending && (
                <div className="space-y-5 p-5 sm:p-6">

                    {/* Remark */}
                    <div>
                        <label
                            htmlFor="admin-remark"
                            className="mb-2 block text-sm font-semibold text-slate-800"
                        >
                            Admin Remark
                            <span className="ml-1 font-normal text-slate-400">
                                {isPending
                                    ? "(required for rejection)"
                                    : ""
                                }
                            </span>
                        </label>

                        <textarea
                            id="admin-remark"
                            rows={4}
                            value={adminRemark}
                            onChange={(event) =>
                                setAdminRemark(
                                    event.target.value,
                                )
                            }
                            disabled={isProcessing}
                            placeholder="Add a note about this withdrawal..."
                            className="
                                w-full
                                resize-none
                                rounded-2xl
                                border
                                border-slate-200
                                bg-slate-50
                                px-4
                                py-3
                                text-sm
                                text-slate-900
                                outline-none
                                transition
                                placeholder:text-slate-400
                                focus:border-slate-400
                                focus:bg-white
                                focus:ring-2
                                focus:ring-slate-100
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        />

                        <p className="mt-2 text-xs text-slate-400">
                            A remark helps maintain a clear
                            administrative record.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                        {/* Approve */}
                        <button
                            type="button"
                            onClick={handleApprove}
                            disabled={isProcessing}
                            className="
                                flex
                                min-h-12
                                items-center
                                justify-center
                                gap-2
                                rounded-2xl
                                bg-emerald-600
                                px-4
                                py-3
                                text-sm
                                font-bold
                                text-white
                                shadow-sm
                                transition
                                hover:bg-emerald-700
                                active:scale-[0.98]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            {approveMutation.isPending ? (
                                <>
                                    <Loader2
                                        size={18}
                                        className="animate-spin"
                                    />
                                    Approving...
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 size={18} />
                                    Approve
                                </>
                            )}
                        </button>

                        {/* Reject */}
                        <button
                            type="button"
                            onClick={handleReject}
                            disabled={
                                isProcessing ||
                                !adminRemark.trim()
                            }
                            className="
                                flex
                                min-h-12
                                items-center
                                justify-center
                                gap-2
                                rounded-2xl
                                border
                                border-red-200
                                bg-red-50
                                px-4
                                py-3
                                text-sm
                                font-bold
                                text-red-700
                                transition
                                hover:bg-red-100
                                active:scale-[0.98]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            {rejectMutation.isPending ? (
                                <>
                                    <Loader2
                                        size={18}
                                        className="animate-spin"
                                    />
                                    Rejecting...
                                </>
                            ) : (
                                <>
                                    <XCircle size={18} />
                                    Reject
                                </>
                            )}
                        </button>

                    </div>

                </div>
            )}

            {/* Approved Action */}
            {isApproved && (
                <div className="p-5 sm:p-6">

                    <div className="mb-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                        <div className="flex gap-3">

                            <CreditCard
                                size={20}
                                className="mt-0.5 shrink-0 text-blue-600"
                            />

                            <div>
                                <p className="text-sm font-bold text-blue-900">
                                    Withdrawal approved
                                </p>

                                <p className="mt-1 text-xs leading-5 text-blue-700">
                                    Confirm payment only after
                                    the user&apos;s bank transfer
                                    has been completed successfully.
                                </p>
                            </div>

                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleMarkPaid}
                        disabled={
                            markPaidMutation.isPending
                        }
                        className="
                            flex
                            min-h-12
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-2xl
                            bg-blue-600
                            px-4
                            py-3
                            text-sm
                            font-bold
                            text-white
                            shadow-sm
                            transition
                            hover:bg-blue-700
                            active:scale-[0.98]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {markPaidMutation.isPending ? (
                            <>
                                <Loader2
                                    size={18}
                                    className="animate-spin"
                                />
                                Marking as Paid...
                            </>
                        ) : (
                            <>
                                <CreditCard size={18} />
                                Mark as Paid
                            </>
                        )}
                    </button>

                </div>
            )}

        </section>
    );
}