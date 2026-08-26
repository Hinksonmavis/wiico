"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import DepositStepper from "@/app/components/deposit/DepositStepper";
import PaymentForm from "@/app/components/deposit/payment/PaymentForm";
import PaymentInstructions from "@/app/components/deposit/payment/PaymentInstructions";
import PaymentSummaryCard from "@/app/components/deposit/payment/PaymentSummaryCard";
import PendingDepositDialog from "@/app/components/deposit/PendingDepositDialog";
import DepositSuccessModal from "@/app/components/deposit/DepositSuccessModal";

import { useCreateDeposit } from "@/app/hooks/clientHooks/depositHooks/useCreateDeposit";
import { usePendingDeposit } from "@/app/hooks/clientHooks/depositHooks/usePendingDeposit";
import { useUploadReceipt } from "@/app/hooks/clientHooks/uploadHooks/useUploadReceipt";

const MIN_AMOUNT = 1_000;
const MAX_AMOUNT = 1_000_000;

export default function DepositPaymentPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const amount = useMemo(
        () => Number(searchParams.get("amount") ?? 0),
        [searchParams],
    );

    const [receipt, setReceipt] = useState<File | null>(null);

    const [successDeposit, setSuccessDeposit] = useState<any>(null);

    const {
        data: pendingDeposit,
        isLoading: isCheckingPending,
    } = usePendingDeposit();

    const createDeposit = useCreateDeposit();
    const uploadReceipt = useUploadReceipt();

    const isSubmitting =
        createDeposit.isPending ||
        uploadReceipt.isPending;

    useEffect(() => {
        if (
            !Number.isFinite(amount) ||
            amount < MIN_AMOUNT ||
            amount > MAX_AMOUNT
        ) {
            router.replace(
                "/dashboard/wallet/deposit",
            );
        }
    }, [amount, router]);

    async function handleSubmit(data: {
        senderAccountName: string;
        senderAccountNumber: string;
        senderBankName: string;
    }) {
        if (isSubmitting) {
            return;
        }

        if (!receipt) {
            toast.error(
                "Please upload your payment receipt.",
            );

            return;
        }

        if (
            !Number.isFinite(amount) ||
            amount < MIN_AMOUNT ||
            amount > MAX_AMOUNT
        ) {
            toast.error(
                "Invalid deposit amount.",
            );

            router.replace(
                "/dashboard/wallet/deposit",
            );

            return;
        }

        try {
            const receiptUrl =
                await uploadReceipt.mutateAsync(
                    receipt,
                );

            const deposit =
                await createDeposit.mutateAsync({
                    amount,
                    senderAccountName:
                        data.senderAccountName,
                    senderAccountNumber:
                        data.senderAccountNumber,
                    senderBankName:
                        data.senderBankName,
                    paymentReceipt:
                        receiptUrl,
                });

            toast.success(
                "Deposit submitted successfully.",
            );

            setSuccessDeposit(deposit);
        } catch (error: any) {
            console.error(error);

            toast.error(
                error?.message ??
                "Unable to submit your deposit.",
            );
        }
    }

    /**
     * Wait until we've checked
     * whether the user already
     * has a pending deposit.
     */
    if (isCheckingPending) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

                    <p className="mt-4 text-sm text-slate-500">
                        Checking your deposit status...
                    </p>
                </div>
            </div>
        );
    }

    /**
     * User already has
     * a pending deposit.
     */
    if (pendingDeposit?.hasPending) {
        return (
            <PendingDepositDialog
                open
                reference={
                    pendingDeposit.deposit.reference
                }
                status={
                    pendingDeposit.deposit.status
                }
            />
        );
    }

    /**
     * Normal payment page.
     */
    return (
        <div className="mx-auto max-w-5xl space-y-8 p-6">
            <DepositStepper currentStep={2} />

            <PaymentSummaryCard
                amount={amount}
            />

            <PaymentForm
                receipt={receipt}
                onReceiptChange={setReceipt}
                loading={isSubmitting}
                onSubmit={handleSubmit}
            />

            <PaymentInstructions />

            <DepositSuccessModal
                open={!!successDeposit}
                deposit={successDeposit}
                onClose={() => {
                    setSuccessDeposit(null);
                }}
            />
        </div>
    );
}