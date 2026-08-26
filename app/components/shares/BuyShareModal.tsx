"use client";

import { FormEvent, useMemo, useState } from "react";
import { Loader2, X } from "lucide-react";
import { usePurchaseShare } from "@/app/hooks/clientHooks/shares/useUserShares";
import { UserShare } from "@/app/types/clientTypes/share.types";
import { useWallet } from "@/app/hooks/clientHooks/walletHooks/useWallet";
import PurchaseSuccessModal from "./PurchaseSuccessModal";

interface BuyShareModalProps {
    share: UserShare;
    onClose: () => void;
    onPurchased?: () => void;
}

interface PurchaseReceipt {
    purchaseAmount: number;
    dailyReturn: number;
    totalReturn: number;
    cycleDays: number;
    purchaseReference: string;
    expectedReturnAt: string | Date;
}

const money = (value: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(value);

export default function BuyShareModal({ share, onClose, onPurchased }: BuyShareModalProps) {
    const [amountText, setAmountText] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [receipt, setReceipt] = useState<PurchaseReceipt | null>(null);
    const purchase = usePurchaseShare();
    const { data: wallet, isLoading: walletLoading, isError: walletError } = useWallet();

    const availableBalance =
        wallet?.availableBalance != null ? Number(wallet.availableBalance) : undefined;
    const amount = Number(amountText);
    const hasValidAmount = Number.isFinite(amount) && amount > 0;
    const balanceKnown = typeof availableBalance === "number" && Number.isFinite(availableBalance);
    const sufficient = balanceKnown && hasValidAmount && amount <= availableBalance;
    const canSubmit = sufficient && !purchase.isPending && !walletLoading;

    const estimatedEarnings = useMemo(
        () => (hasValidAmount ? (amount * Number(share.dailyReturnPercentage)) / 100 : 0),
        [amount, hasValidAmount, share.dailyReturnPercentage],
    );

    async function submit(event: FormEvent) {
        event.preventDefault();
        if (!canSubmit) return;
        setError(null);
        try {
            const result = await purchase.mutateAsync({ shareId: share.id, dto: { amount } });
            setReceipt(result.purchase);
            onPurchased?.();
        } catch (caught) {
            setError(caught instanceof Error ? caught.message : "Unable to complete this purchase.");
        }
    }

    if (receipt) {
        return <PurchaseSuccessModal shareName={share.name} receipt={receipt} onClose={onClose} />;
    }

    return (
        <div
            className="fixed inset-0 z-100 flex items-end bg-slate-950/45 sm:items-center sm:justify-center sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="buy-share-title"
        >
            <form
                onSubmit={submit}
                className="w-full overflow-hidden rounded-t-3xl bg-white shadow-xl sm:max-w-md sm:rounded-3xl"
            >
                <div className="flex items-center justify-between bg-gradient-to-r from-blue-700 to-blue-500 px-5 py-4 text-white">
                    <h2 id="buy-share-title" className="text-base font-semibold">
                        {share.name}
                    </h2>
                    <button type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 hover:bg-white/10">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-5 sm:p-6">
                    <label className="block text-xs font-medium uppercase tracking-wide text-slate-400">
                        Enter amount
                    </label>
                    <div className="mt-2 flex items-center gap-2 border-b-2 border-blue-500 pb-2">
                        <span className="text-lg font-semibold text-slate-400">₦</span>
                        <input
                            autoFocus
                            inputMode="decimal"
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={amountText}
                            onChange={(event) => setAmountText(event.target.value)}
                            placeholder="0.00"
                            className="h-10 w-full border-0 bg-transparent text-2xl font-semibold text-slate-900 outline-none placeholder:text-slate-300"
                        />
                    </div>

                    <div className="mt-5 divide-y divide-slate-100 rounded-2xl border border-slate-100">
                        <div className="flex items-center justify-between px-4 py-3 text-sm">
                            <span className="text-slate-500">Product name</span>
                            <span className="font-semibold text-slate-900">{share.name}</span>
                        </div>
                        <div className="flex items-center justify-between px-4 py-3 text-sm">
                            <span className="text-slate-500">Account balance</span>
                            <span className="font-semibold text-slate-900">
                                {walletLoading ? "Loading…" : balanceKnown ? money(availableBalance) : "Unavailable"}
                            </span>
                        </div>
                        <div className="flex items-center justify-between px-4 py-3 text-sm">
                            <span className="text-slate-500">Expected earnings</span>
                            <span className="font-semibold text-blue-600">
                                {hasValidAmount ? `≈ ${money(estimatedEarnings)}` : "≈ ₦0.00"}
                            </span>
                        </div>
                    </div>

                    {balanceKnown && hasValidAmount && !sufficient && (
                        <p className="mt-3 text-sm font-medium text-red-700">
                            Insufficient balance. You need {money(amount - availableBalance)} more.
                        </p>
                    )}
                    {walletError && (
                        <p className="mt-3 text-sm text-amber-700">
                            Couldn&apos;t load your wallet balance. Please try again.
                        </p>
                    )}
                    {error && <p className="mt-3 text-sm font-medium text-red-700">{error}</p>}

                    <button
                        type="submit"
                        disabled={!canSubmit}
                        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                        {purchase.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {purchase.isPending ? "Processing purchase…" : "Pay"}
                    </button>
                </div>
            </form>
        </div>
    );
}