"use client";

import {
    Users,
    UserPlus,
    Network,
    Layers3,
} from "lucide-react";

import {
    ReferralStats as ReferralStatsType,
} from "@/app/types/clientTypes/referral.types";

interface ReferralStatsProps {
    stats: ReferralStatsType;
}

export default function ReferralStats({
    stats,
}: ReferralStatsProps) {

    const items = [
        {
            label: "Total Team",
            value: stats.totalTeam,
            icon: Users,
        },
        {
            label: "Direct",
            value: stats.directReferrals,
            icon: UserPlus,
        },
        {
            label: "Level 2",
            value: stats.level2,
            icon: Network,
        },
        {
            label: "Level 3",
            value: stats.level3,
            icon: Layers3,
        },
    ];

    return (
        <section className="mb-5">

            <div className="grid grid-cols-2 gap-3">

                {items.map((item) => {

                    const Icon = item.icon;

                    return (
                        <div
                            key={item.label}
                            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                        >

                            <div className="flex items-center justify-between">

                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1590FC]/10">
                                    <Icon className="h-4 w-4 text-[#1590FC]" />
                                </div>

                                <span className="text-2xl font-bold text-slate-900">
                                    {item.value}
                                </span>

                            </div>

                            <p className="mt-3 text-xs font-medium text-slate-500">
                                {item.label}
                            </p>

                        </div>
                    );
                })}

            </div>

        </section>
    );
}