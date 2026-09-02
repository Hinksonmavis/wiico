"use client";

import {
    CheckCircle2,
    ClipboardCheck,
    Clock3,
    XCircle,
} from "lucide-react";

import { UpgradeRequest } from "@/app/types/adminTypes/upgrade-request.types";

import { useReviewUpgrade } from "@/app/hooks/adminHooks/upgrade-requests/useReviewUpgrade";
import { useApproveUpgrade } from "@/app/hooks/adminHooks/upgrade-requests/useApproveUpgrade";
import { useRejectUpgrade } from "@/app/hooks/adminHooks/upgrade-requests/useRejectUpgrade";

interface Props {
    request: UpgradeRequest;
}

export default function UpgradeActionsCard({
    request,
}: Props) {
    const reviewMutation = useReviewUpgrade();
    const approveMutation = useApproveUpgrade();
    const rejectMutation = useRejectUpgrade();

    const isProcessing =
        reviewMutation.isPending ||
        approveMutation.isPending ||
        rejectMutation.isPending;

    const handleReview = () => {
        if (isProcessing) return;

        reviewMutation.mutate({
            id: request.id,
        });
    };

    const handleApprove = () => {
        if (isProcessing) return;

        approveMutation.mutate({
            id: request.id,
        });
    };

    const handleReject = () => {
        if (isProcessing) return;

        rejectMutation.mutate({
            id: request.id,
            data: {
                rejectedReason:
                    "Rejected by administrator",
            },
        });
    };

    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            {/* Header */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                    Admin Actions
                </h2>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                    Review and process this membership upgrade request.
                </p>
            </div>

            {/* DEBUG - REMOVE AFTER CONFIRMING */}
            <div className="mb-4 rounded-xl bg-slate-900 px-4 py-3">
                <p className="text-xs font-medium text-white">
                    Current status:{" "}
                    <span className="font-bold">
                        {request.status}
                    </span>
                </p>
            </div>

            {/* PENDING */}
            {request.status === "pending" && (
                <div className="space-y-4">

                    <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
                        <div className="flex items-start gap-3">

                            <Clock3
                                size={19}
                                className="mt-0.5 shrink-0 text-amber-600"
                            />

                            <div>
                                <p className="text-sm font-semibold text-amber-900">
                                    Pending Review
                                </p>

                                <p className="mt-1 text-xs leading-5 text-amber-700">
                                    Review the payment details and
                                    payment proof before proceeding.
                                </p>
                            </div>

                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleReview}
                        disabled={isProcessing}
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
                            font-semibold
                            text-white
                            transition
                            hover:bg-blue-700
                            active:scale-[0.98]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        <ClipboardCheck size={18} />

                        {reviewMutation.isPending
                            ? "Starting Review..."
                            : "Start Review"}
                    </button>

                </div>
            )}

            {/* UNDER REVIEW */}
            {request.status === "under_review" && (
                <div className="space-y-4">

                    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                        <div className="flex items-start gap-3">

                            <ClipboardCheck
                                size={19}
                                className="mt-0.5 shrink-0 text-blue-600"
                            />

                            <div>
                                <p className="text-sm font-semibold text-blue-900">
                                    Request Under Review
                                </p>

                                <p className="mt-1 text-xs leading-5 text-blue-700">
                                    Verify the payment proof and
                                    membership details before making
                                    a final decision.
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">

                        {/* APPROVE */}
                        <button
                            type="button"
                            onClick={handleApprove}
                            disabled={isProcessing}
                            className="
                                flex
                                min-h-12
                                flex-1
                                items-center
                                justify-center
                                gap-2
                                rounded-2xl
                                bg-green-600
                                px-4
                                py-3
                                text-sm
                                font-semibold
                                text-white
                                transition
                                hover:bg-green-700
                                active:scale-[0.98]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            <CheckCircle2 size={18} />

                            {approveMutation.isPending
                                ? "Approving..."
                                : "Approve Upgrade"}
                        </button>

                        {/* REJECT */}
                        <button
                            type="button"
                            onClick={handleReject}
                            disabled={isProcessing}
                            className="
                                flex
                                min-h-12
                                flex-1
                                items-center
                                justify-center
                                gap-2
                                rounded-2xl
                                bg-red-600
                                px-4
                                py-3
                                text-sm
                                font-semibold
                                text-white
                                transition
                                hover:bg-red-700
                                active:scale-[0.98]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            <XCircle size={18} />

                            {rejectMutation.isPending
                                ? "Rejecting..."
                                : "Reject Upgrade"}
                        </button>

                    </div>

                </div>
            )}

            {/* APPROVED */}
            {request.status === "approved" && (
                <div className="rounded-2xl border border-green-100 bg-green-50 p-4">

                    <div className="flex items-start gap-3">

                        <CheckCircle2
                            size={20}
                            className="mt-0.5 shrink-0 text-green-600"
                        />

                        <div>
                            <p className="text-sm font-semibold text-green-900">
                                Upgrade Approved
                            </p>

                            <p className="mt-1 text-xs leading-5 text-green-700">
                                This membership upgrade has already
                                been approved. No further action is
                                required.
                            </p>
                        </div>

                    </div>

                </div>
            )}

            {/* REJECTED */}
            {request.status === "rejected" && (
                <div className="rounded-2xl border border-red-100 bg-red-50 p-4">

                    <div className="flex items-start gap-3">

                        <XCircle
                            size={20}
                            className="mt-0.5 shrink-0 text-red-600"
                        />

                        <div>
                            <p className="text-sm font-semibold text-red-900">
                                Upgrade Rejected
                            </p>

                            <p className="mt-1 text-xs leading-5 text-red-700">
                                This upgrade request has already
                                been rejected. No further action is
                                available.
                            </p>
                        </div>

                    </div>

                </div>
            )}

            {/* CANCELLED */}
            {request.status === "cancelled" && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

                    <div className="flex items-start gap-3">

                        <XCircle
                            size={20}
                            className="mt-0.5 shrink-0 text-slate-500"
                        />

                        <div>
                            <p className="text-sm font-semibold text-slate-800">
                                Request Cancelled
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                This upgrade request has been
                                cancelled and can no longer be
                                processed.
                            </p>
                        </div>

                    </div>

                </div>
            )}

        </section>
    );
}