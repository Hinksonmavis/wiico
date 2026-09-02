"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ChevronLeft,
    CheckCircle2,
    XCircle,
    Clock3,
} from "lucide-react";

import { useAdminDeposit } from "@/app/hooks/adminHooks/deposits/useAdminDeposit";
import { DepositStatus } from "@/app/types/adminTypes/adminDeposit.types";

import { LoadingDeposits } from "../../adminComponents/deposits/LoadingDeposits";
import { DepositReceiptPreview } from "../../adminComponents/deposits/DepositReceiptPreview";
import { DepositDetailsCard } from "../../adminComponents/deposits/detailsComponents/DepositDetailsCard";
import { DepositUserCard } from "../../adminComponents/deposits/detailsComponents/DepositUserCard";

import ApproveDepositDialog from "../../adminComponents/deposits/detailsComponents/ApproveDepositDialog";
import RejectDepositDialog from "../../adminComponents/deposits/detailsComponents/RejectDepositDialog";

export default function DepositDetailsPage() {
    const router = useRouter();

    const { depositId } = useParams<{
        depositId: string;
    }>();

    const {
        data: deposit,
        isLoading,
    } = useAdminDeposit(depositId);

    const [approveOpen, setApproveOpen] = useState(false);
    const [rejectOpen, setRejectOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 px-4 pt-[max(16px,env(safe-area-inset-top))]">
                <LoadingDeposits />
            </div>
        );
    }

    if (!deposit) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
                <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <p className="font-medium text-slate-900">
                        Deposit not found.
                    </p>

                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="mt-4 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const isPending =
        deposit.status === DepositStatus.PENDING ||
        deposit.status === DepositStatus.UNDER_REVIEW;

    const isApproved =
        deposit.status === DepositStatus.APPROVED;

    const isDeclined =
        deposit.status === DepositStatus.DECLINED;

    return (
        <>
            <div className="flex min-h-screen flex-col bg-slate-50">

                {/* Header */}
                <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
                    <div className="relative flex h-14 items-center justify-center px-4">

                        <button
                            type="button"
                            onClick={() => router.back()}
                            aria-label="Go back"
                            className="
                                absolute
                                left-3
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                text-slate-700
                                transition
                                hover:bg-slate-100
                                active:scale-95
                            "
                        >
                            <ChevronLeft size={23} />
                        </button>

                        <div className="text-center">
                            <h1 className="text-[17px] font-bold text-slate-900">
                                Deposit Details
                            </h1>

                            <p className="mt-0.5 text-[11px] text-slate-500">
                                {deposit.reference}
                            </p>
                        </div>

                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 space-y-4 px-4 py-4 pb-32">

                    <DepositDetailsCard
                        deposit={deposit}
                    />

                    <DepositUserCard
                        user={deposit.user}
                    />

                    {/* Payment Receipt */}
                    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                        <div className="mb-3 flex items-center justify-between">
                            <p className="text-sm font-semibold text-slate-900">
                                Payment Receipt
                            </p>

                            <span className="text-[11px] font-medium text-slate-400">
                                Uploaded receipt
                            </span>
                        </div>

                        <DepositReceiptPreview
                            receipt={deposit.paymentReceipt}
                        />

                    </section>

                    {/* Review Information */}
                    {(isApproved || isDeclined) && (
                        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                            <div className="flex items-start gap-3">

                                {isApproved ? (
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                                        <CheckCircle2
                                            size={21}
                                            className="text-emerald-600"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50">
                                        <XCircle
                                            size={21}
                                            className="text-red-600"
                                        />
                                    </div>
                                )}

                                <div className="min-w-0 flex-1">

                                    <p className="text-sm font-semibold text-slate-900">
                                        {isApproved
                                            ? "Deposit Approved"
                                            : "Deposit Declined"}
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        {isApproved
                                            ? "This deposit has already been approved and credited to the user's wallet."
                                            : "This deposit request has already been declined."}
                                    </p>

                                    {deposit.adminRemark && (
                                        <div className="mt-3 rounded-xl bg-slate-50 p-3">
                                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                                Admin Remark
                                            </p>

                                            <p className="mt-1 text-sm leading-5 text-slate-700">
                                                {deposit.adminRemark}
                                            </p>
                                        </div>
                                    )}

                                </div>
                            </div>

                        </section>
                    )}

                </main>

                {/* Bottom Action Bar */}
                <footer className="sticky bottom-0 z-20 border-t border-slate-200 bg-white/95 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur-xl">

                    {isPending ? (
                        <div className="grid grid-cols-2 gap-3">

                            {/* Reject */}
                            <button
                                type="button"
                                onClick={() => setRejectOpen(true)}
                                className="
                                    flex
                                    min-h-[48px]
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-red-200
                                    bg-red-50
                                    px-4
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-red-600
                                    transition
                                    hover:bg-red-100
                                    active:scale-[0.98]
                                "
                            >
                                <XCircle size={18} />
                                Reject
                            </button>

                            {/* Approve */}
                            <button
                                type="button"
                                onClick={() => setApproveOpen(true)}
                                className="
                                    flex
                                    min-h-[48px]
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    bg-emerald-600
                                    px-4
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-white
                                    shadow-sm
                                    transition
                                    hover:bg-emerald-700
                                    active:scale-[0.98]
                                "
                            >
                                <CheckCircle2 size={18} />
                                Approve
                            </button>

                        </div>
                    ) : isApproved ? (

                        /* Already Approved */
                        <div className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-3">
                            <CheckCircle2
                                size={19}
                                className="text-emerald-600"
                            />

                            <span className="text-sm font-semibold text-emerald-700">
                                Deposit Approved
                            </span>
                        </div>

                    ) : isDeclined ? (

                        /* Already Declined */
                        <div className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3">
                            <XCircle
                                size={19}
                                className="text-red-600"
                            />

                            <span className="text-sm font-semibold text-red-700">
                                Deposit Declined
                            </span>
                        </div>

                    ) : (

                        /* Fallback */
                        <div className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3">
                            <Clock3
                                size={18}
                                className="text-slate-500"
                            />

                            <span className="text-sm font-medium text-slate-600">
                                Deposit status: {deposit.status}
                            </span>
                        </div>

                    )}

                </footer>

            </div>

            {/* Dialogs only exist for actionable deposits */}
            {isPending && (
                <>
                    <ApproveDepositDialog
                        open={approveOpen}
                        depositId={deposit.id}
                        onClose={() => setApproveOpen(false)}
                    />

                    <RejectDepositDialog
                        open={rejectOpen}
                        depositId={deposit.id}
                        onClose={() => setRejectOpen(false)}
                    />
                </>
            )}
        </>
    );
}
