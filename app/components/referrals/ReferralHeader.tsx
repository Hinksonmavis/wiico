"use client";

import {
    UsersRound,
    Gift,
} from "lucide-react";

interface ReferralHeaderProps {
    totalTeam: number;
}

export default function ReferralHeader({
    totalTeam,
}: ReferralHeaderProps) {

    return (
        <section className="mb-5">

            <div className="rounded-2xl bg-gradient-to-br from-[#1590FC] to-[#0f6fd1] px-5 py-6 text-white shadow-sm shadow-[#1590FC]/20">

                <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                        <UsersRound
                            className="h-5 w-5"
                        />
                    </div>

                    <div className="min-w-0">

                        <p className="text-sm font-medium text-white/70">
                            My Referrals
                        </p>

                        <h1 className="mt-1 text-xl font-bold tracking-tight">
                            Build your team
                        </h1>

                        <p className="mt-1.5 max-w-md text-sm leading-5 text-white/70">
                            Invite people, grow your network,
                            and earn referral commissions.
                        </p>

                    </div>

                </div>

                <div className="mt-5 flex items-center gap-2 border-t border-white/15 pt-4">

                    <Gift className="h-4 w-4 text-white/60" />

                    <p className="text-xs text-white/70">
                        You currently have{" "}
                        <span className="font-semibold text-white">
                            {totalTeam}
                        </span>{" "}
                        team {totalTeam === 1 ? "member" : "members"}.
                    </p>

                </div>

            </div>

        </section>
    );
}