"use client";

import { useEffect } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

export type WithdrawalResultStatus = "success" | "error";

interface WithdrawalResultModalProps {
    open: boolean;
    status: WithdrawalResultStatus;
    amount?: number;
    message?: string;
    onClose: () => void;
}

const DEFAULT_MESSAGES: Record<WithdrawalResultStatus, string> = {
    success: "Your withdrawal request has been submitted and is pending review.",
    error: "We couldn't process your withdrawal request. Please try again.",
};

export default function WithdrawalResultModal({
    open,
    status,
    amount,
    message,
    onClose,
}: WithdrawalResultModalProps) {
    // Close on Escape
    useEffect(() => {
        if (!open) return;

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }

        window.addEventListener("keydown", handleKeyDown);
        return () =>
            window.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    const isSuccess = status === "success";

    return (
        <div
            className="
                fixed inset-0 z-100
                flex items-center justify-center
                bg-slate-900/50
                p-4
                backdrop-blur-sm
            "
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="
                    relative
                    w-full max-w-sm
                    overflow-hidden
                    rounded-3xl
                    bg-white
                    shadow-xl
                "
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="
                        absolute right-4 top-4
                        rounded-full
                        p-1.5
                        text-slate-400
                        transition
                        hover:bg-slate-100
                        hover:text-slate-600
                    "
                >
                    <X size={18} />
                </button>

                <div className="flex flex-col items-center p-8 text-center">

                    <div
                        className={`
                            mb-5 flex h-16 w-16 items-center justify-center
                            rounded-2xl
                            ${
                                isSuccess
                                    ? "bg-emerald-100 text-emerald-600"
                                    : "bg-red-100 text-red-600"
                            }
                        `}
                    >
                        {isSuccess ? (
                            <CheckCircle2 size={32} />
                        ) : (
                            <XCircle size={32} />
                        )}
                    </div>

                    <h2 className="text-xl font-bold text-slate-900">
                        {isSuccess
                            ? "Withdrawal Submitted"
                            : "Withdrawal Failed"}
                    </h2>

                    {typeof amount === "number" && (
                        <p className="mt-1 text-2xl font-bold text-slate-800">
                            ₦{amount.toLocaleString()}
                        </p>
                    )}

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        {message ?? DEFAULT_MESSAGES[status]}
                    </p>

                    <button
                        onClick={onClose}
                        className={`
                            mt-7
                            h-12
                            w-full
                            rounded-2xl
                            text-sm
                            font-semibold
                            text-white
                            transition
                            ${
                                isSuccess
                                    ? "bg-emerald-600 hover:bg-emerald-700"
                                    : "bg-red-600 hover:bg-red-700"
                            }
                        `}
                    >
                        {isSuccess ? "Done" : "Try Again"}
                    </button>

                </div>

            </div>

        </div>
    );
}