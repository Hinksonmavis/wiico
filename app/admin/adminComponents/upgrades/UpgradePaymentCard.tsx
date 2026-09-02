"use client";

import { UpgradeRequest } from "@/app/types/adminTypes/upgrade-request.types";

interface Props {
    request: UpgradeRequest;
}

export default function UpgradePaymentCard({
    request,
}: Props) {

    if (
        !request.amount &&
        !request.paymentMethod &&
        !request.reference
    ) {
        return (
            <section className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold">
                    Payment
                </h2>

                <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
                    No payment information.
                </div>
            </section>
        );
    }

    return (
        <section className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                    Payment Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Payment information and review details.
                </p>
            </div>

            <div className="space-y-5">

                <InfoRow
                    label="Amount"
                    value={`₦${request.amount}`}
                />

                <InfoRow
                    label="Payment Method"
                    value={formatPaymentMethod(
                        request.paymentMethod,
                    )}
                />

                <InfoRow
                    label="Reference"
                    value={request.reference}
                    mono
                />

                <InfoRow
                    label="Reviewed By"
                    value={
                        request.reviewedBy ??
                        "Not reviewed"
                    }
                />

                <InfoRow
                    label="Reviewed At"
                    value={
                        request.reviewedAt
                            ? new Date(
                                  request.reviewedAt,
                              ).toLocaleString()
                            : "Not reviewed"
                    }
                />

            </div>
        </section>
    );
}

interface InfoRowProps {
    label: string;
    value: string;
    mono?: boolean;
}

function InfoRow({
    label,
    value,
    mono = false,
}: InfoRowProps) {
    return (
        <div className="flex items-start justify-between gap-6 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
            <span className="text-sm text-slate-500">
                {label}
            </span>

            <span
                className={`
                    max-w-[60%]
                    break-words
                    text-right
                    text-sm
                    font-medium
                    text-slate-900
                    ${
                        mono
                            ? "font-mono text-xs"
                            : ""
                    }
                `}
            >
                {value}
            </span>
        </div>
    );
}

function formatPaymentMethod(
    method: string,
) {
    return method
        .toLowerCase()
        .split("_")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1),
        )
        .join(" ");
}