"use client";

import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Hash,
    Receipt,
    Wallet,
    X,
} from "lucide-react";
import { format } from "date-fns";

interface DepositSuccessModalProps {
    open: boolean;

    deposit: {
        id: string;
        reference: string;
        amount: string | number;
        createdAt: string | Date;
    } | null;

    onClose: () => void;
}

export default function DepositSuccessModal({
    open,
    deposit,
    onClose,
}: DepositSuccessModalProps) {
    const router = useRouter();

    if (!open || !deposit) return null;

    const amount = Number(deposit.amount);

    return (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/50 backdrop-blur-sm">

            <div className="mx-auto min-h-screen w-full max-w-md bg-[#F8F9FB]">

                {/* Header */}

                <div className="flex items-center justify-between px-5 pt-[max(env(safe-area-inset-top),20px)] pb-4">

                    <button
                        onClick={() => {
                            onClose();
                            router.back();
                        }}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm transition active:scale-95"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <button
                        onClick={onClose}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm transition active:scale-95"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Success */}

                <div className="px-6">

                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">

                        <CheckCircle2
                            size={50}
                            className="text-emerald-600"
                        />

                    </div>

                    <h1 className="mt-6 text-center text-3xl font-bold text-slate-900">
                        Deposit Submitted
                    </h1>

                    <p className="mx-auto mt-3 max-w-sm text-center text-sm leading-7 text-slate-500">
                        Your deposit request has been received successfully.

                        Once verified by our finance team your wallet balance
                        will be updated automatically.
                    </p>

                    <div className="mt-6 flex justify-center">

                        <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold text-amber-700">
                            Pending Verification
                        </span>

                    </div>

                </div>

                {/* Details */}

                <div className="mt-8 px-5">

                    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

                        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">

                            <div className="flex items-center gap-3">

                                <Wallet
                                    size={20}
                                    className="text-blue-600"
                                />

                                <span className="text-sm text-slate-500">
                                    Deposit Amount
                                </span>

                            </div>

                            <span className="text-lg font-bold text-slate-900">
                                ₦
                                {amount.toLocaleString("en-NG", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>

                        </div>

                        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-5">

                            <div className="flex items-center gap-3">

                                <Receipt
                                    size={20}
                                    className="text-slate-600"
                                />

                                <span className="text-sm text-slate-500">
                                    Deposit ID
                                </span>

                            </div>

                            <span className="max-w-[170px] break-all text-right text-sm font-semibold text-slate-900">
                                {deposit.id}
                            </span>

                        </div>

                        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-5">

                            <div className="flex items-center gap-3">

                                <Hash
                                    size={20}
                                    className="text-slate-600"
                                />

                                <span className="text-sm text-slate-500">
                                    Reference
                                </span>

                            </div>

                            <span className="max-w-[170px] break-all text-right text-sm font-semibold text-slate-900">
                                {deposit.reference}
                            </span>

                        </div>

                        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">

                            <div className="flex items-center gap-3">

                                <CalendarDays
                                    size={20}
                                    className="text-slate-600"
                                />

                                <span className="text-sm text-slate-500">
                                    Date
                                </span>

                            </div>

                            <span className="text-sm font-semibold text-slate-900">
                                {format(
                                    new Date(deposit.createdAt),
                                    "dd MMM yyyy"
                                )}
                            </span>

                        </div>

                        <div className="flex items-center justify-between px-5 py-5">

                            <div className="flex items-center gap-3">

                                <Clock3
                                    size={20}
                                    className="text-slate-600"
                                />

                                <span className="text-sm text-slate-500">
                                    Time
                                </span>

                            </div>

                            <span className="text-sm font-semibold text-slate-900">
                                {format(
                                    new Date(deposit.createdAt),
                                    "hh:mm a"
                                )}
                            </span>

                        </div>

                    </div>

                </div>

                {/* Information */}

                <div className="mt-6 px-5">

                    <div className="rounded-3xl bg-blue-50 p-5">

                        <h3 className="font-semibold text-blue-900">
                            What happens next?
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-blue-700">
                            • Our finance team will review your payment.

                            <br /><br />

                            • Once confirmed, your wallet will be credited automatically.

                            <br /><br />

                            • You can monitor the status anytime from your transaction history.
                        </p>

                    </div>

                </div>

                {/* Actions */}

                <div className="mt-8 px-5 space-y-3">

                    <button
                        onClick={() =>
                            router.push(
                                "/dashboard/transactions"
                            )
                        }
                        className="h-14 w-full rounded-2xl bg-blue-600 text-base font-semibold text-white shadow-lg transition hover:bg-blue-700"
                    >
                        View Transaction History
                    </button>

                    <button
                        onClick={() => {
                            onClose();
                            router.push("/dashboard");
                        }}
                        className="h-14 w-full rounded-2xl border border-slate-300 bg-white text-base font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        Back to Dashboard
                    </button>

                </div>

                {/* Bottom Space */}

                <div className="h-10" />

            </div>

        </div>
    );
}