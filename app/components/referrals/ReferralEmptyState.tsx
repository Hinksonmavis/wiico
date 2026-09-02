"use client";

import {
    UsersRound,
} from "lucide-react";

interface ReferralEmptyStateProps {
    level: number;
}

export default function ReferralEmptyState({
    level,
}: ReferralEmptyStateProps) {

    return (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1590FC]/10">
                <UsersRound className="h-5 w-5 text-[#1590FC]" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-slate-900">
                No Level {level} referrals yet
            </h3>

            <p className="mx-auto mt-1.5 max-w-xs text-xs leading-5 text-slate-500">
                Share your referral link to start growing
                your team.
            </p>

        </div>
    );
}