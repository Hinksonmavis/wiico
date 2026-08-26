"use client";

import { useRef, useState } from "react";
import { CheckCircle2, Download, Share2 } from "lucide-react";
import html2canvas from "html2canvas";

interface PurchaseReceipt {
    purchaseAmount: number;
    dailyReturn: number;
    totalReturn: number;
    cycleDays: number;
    purchaseReference: string;
    expectedReturnAt: string | Date;
}

interface PurchaseSuccessModalProps {
    shareName: string;
    receipt: PurchaseReceipt;
    onClose: () => void;
}

const money = (value: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(value);

const formatDate = (value: string | Date) =>
    new Intl.DateTimeFormat("en-NG", { dateStyle: "medium" }).format(new Date(value));

export default function PurchaseSuccessModal({ shareName, receipt, onClose }: PurchaseSuccessModalProps) {
    const receiptRef = useRef<HTMLDivElement>(null);
    const [busy, setBusy] = useState<"download" | "share" | null>(null);
    const [captureError, setCaptureError] = useState<string | null>(null);

    async function captureReceipt(): Promise<Blob | null> {
        if (!receiptRef.current) return null;

        const canvas = await html2canvas(receiptRef.current, {
            backgroundColor: "#ffffff",
            scale: 2, // sharper output for saving/forwarding
        });

        return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/png", 1));
    }

    async function handleDownload() {
        setCaptureError(null);
        setBusy("download");
        try {
            const blob = await captureReceipt();
            if (!blob) throw new Error("Could not generate image.");

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${receipt.purchaseReference}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch {
            setCaptureError("Couldn't save the receipt. Please try again.");
        } finally {
            setBusy(null);
        }
    }

    async function handleShare() {
        setCaptureError(null);
        setBusy("share");
        try {
            const blob = await captureReceipt();
            if (!blob) throw new Error("Could not generate image.");

            const file = new File([blob], `${receipt.purchaseReference}.png`, { type: "image/png" });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: `${shareName} purchase receipt`,
                    text: `My purchase receipt for ${shareName}`,
                });
            } else {
                // Devices/browsers without native file sharing (e.g. most desktop browsers) fall back to a plain download.
                await handleDownload();
            }
        } catch (caught) {
            // The user cancelling the native share sheet throws an AbortError — not a real failure, so stay quiet.
            if (caught instanceof Error && caught.name !== "AbortError") {
                setCaptureError("Couldn't share the receipt. Please try again.");
            }
        } finally {
            setBusy(null);
        }
    }

    return (
        <div
            className="fixed inset-0 z-100 flex items-end bg-slate-950/45 sm:items-center sm:justify-center sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="purchase-success-title"
        >
            <div className="w-full overflow-hidden rounded-t-3xl bg-white shadow-xl sm:max-w-md sm:rounded-3xl">
                <div ref={receiptRef} className="bg-white p-6 sm:p-8">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                            <CheckCircle2 className="h-9 w-9 text-green-600" />
                        </div>
                        <h2 id="purchase-success-title" className="mt-4 text-lg font-bold text-slate-900">
                            Purchase successful
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">You&apos;ve invested in {shareName}.</p>
                    </div>

                    <div className="mt-6 divide-y divide-slate-100 rounded-2xl border border-slate-100">
                        <div className="flex items-center justify-between px-4 py-3 text-sm">
                            <span className="text-slate-500">Amount invested</span>
                            <span className="font-semibold text-slate-900">{money(receipt.purchaseAmount)}</span>
                        </div>
                        <div className="flex items-center justify-between px-4 py-3 text-sm">
                            <span className="text-slate-500">Daily return</span>
                            <span className="font-semibold text-slate-900">{money(receipt.dailyReturn)}</span>
                        </div>
                        <div className="flex items-center justify-between px-4 py-3 text-sm">
                            <span className="text-slate-500">Total return ({receipt.cycleDays} days)</span>
                            <span className="font-semibold text-blue-600">{money(receipt.totalReturn)}</span>
                        </div>
                        <div className="flex items-center justify-between px-4 py-3 text-sm">
                            <span className="text-slate-500">Expected return date</span>
                            <span className="font-semibold text-slate-900">{formatDate(receipt.expectedReturnAt)}</span>
                        </div>
                        <div className="flex items-center justify-between px-4 py-3 text-sm">
                            <span className="text-slate-500">Reference</span>
                            <span className="font-mono text-xs font-semibold text-slate-700">
                                {receipt.purchaseReference}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                    {captureError && <p className="mb-3 text-sm font-medium text-red-700">{captureError}</p>}

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={handleDownload}
                            disabled={busy !== null}
                            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Download className="h-4 w-4" />
                            {busy === "download" ? "Saving…" : "Save"}
                        </button>
                        <button
                            type="button"
                            onClick={handleShare}
                            disabled={busy !== null}
                            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Share2 className="h-4 w-4" />
                            {busy === "share" ? "Preparing…" : "Forward"}
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}