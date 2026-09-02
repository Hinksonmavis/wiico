"use client";

import { UpgradeRequest } from "@/app/types/adminTypes/upgrade-request.types";

interface Props {
    request: UpgradeRequest;
}

const statusStyles: Record<string, string> = {
    pending:
        "bg-amber-100 text-amber-700",

    under_review:
        "bg-blue-100 text-blue-700",

    approved:
        "bg-green-100 text-green-700",

    rejected:
        "bg-red-100 text-red-700",

    cancelled:
        "bg-slate-100 text-slate-700",
};

export default function UpgradeMembershipCard({
    request,
}: Props) {

    if (
        !request.currentMembership ||
        !request.requestedMembership
    ) {
        return (
            <section className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold">
                    Membership
                </h2>

                <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
                    No membership information.
                </div>
            </section>
        );
    }

    return (
        <section className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                    Membership
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Membership upgrade information.
                </p>
            </div>

            <div className="space-y-5">

                <InfoRow
                    label="Current Membership"
                    value={
                        request.currentMembership?.name ??
                        "Unknown"
                    }
                />

                <InfoRow
                    label="Requested Membership"
                    value={
                        request.requestedMembership?.name ??
                        "Unknown"
                    }
                />

                <InfoRow
                    label="Upgrade Amount"
                    value={`₦${request.amount}`}
                />

                <div className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-b-0">
                    <span className="text-sm text-slate-500">
                        Status
                    </span>

                    <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            statusStyles[
                                request.status
                            ]
                        }`}
                    >
                        {request.status.replaceAll(
                            "_",
                            " ",
                        )}
                    </span>
                </div>

            </div>
        </section>
    );
}

interface InfoRowProps {
    label: string;
    value: string;
}

function InfoRow({
    label,
    value,
}: InfoRowProps) {
    return (
        <div className="flex items-start justify-between gap-6 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
            <span className="text-sm text-slate-500">
                {label}
            </span>

            <span className="max-w-[60%] break-words text-right text-sm font-medium text-slate-900">
                {value}
            </span>
        </div>
    );
}