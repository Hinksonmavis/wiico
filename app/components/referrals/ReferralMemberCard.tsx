"use client";

import {
    UserRound,
    CheckCircle2,
    Clock3,
} from "lucide-react";

import {
    ReferralUser,
} from "@/app/types/clientTypes/referral.types";

interface ReferralMemberCardProps {
    member: ReferralUser;
}

function maskPhone(
    phone: string,
): string {

    if (phone.length <= 6) {
        return phone;
    }

    return `${phone.slice(0, 4)}••••${phone.slice(-3)}`;
}

function formatDate(
    value: string,
): string {

    const date =
        new Date(value);

    if (
        Number.isNaN(
            date.getTime(),
        )
    ) {
        return "Recently";
    }

    return new Intl.DateTimeFormat(
        "en-NG",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        },
    ).format(date);
}

export default function ReferralMemberCard({
    member,
}: ReferralMemberCardProps) {

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

            <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1590FC]/10">
                    <UserRound className="h-4 w-4 text-[#1590FC]" />
                </div>

                <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-semibold text-slate-900">
                        {maskPhone(member.phone)}
                    </p>

                    <div className="mt-1 flex items-center gap-1.5">

                        {member.isActive ? (
                            <>
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />

                                <span className="text-xs font-medium text-emerald-600">
                                    Active
                                </span>
                            </>
                        ) : (
                            <>
                                <Clock3 className="h-3.5 w-3.5 text-slate-400" />

                                <span className="text-xs font-medium text-slate-500">
                                    Inactive
                                </span>
                            </>
                        )}

                    </div>

                </div>

                <div className="text-right">

                    <p className="text-[11px] font-medium text-slate-400">
                        Joined
                    </p>

                    <p className="mt-0.5 text-xs font-medium text-slate-600">
                        {formatDate(member.createdAt)}
                    </p>

                </div>

            </div>

        </div>
    );
}