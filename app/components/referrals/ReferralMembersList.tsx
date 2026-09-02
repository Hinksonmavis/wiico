"use client";

import {
    ReferralUser,
} from "@/app/types/clientTypes/referral.types";

import ReferralMemberCard from "./ReferralMemberCard";
import ReferralEmptyState from "./ReferralEmptyState";

interface ReferralMembersListProps {
    members: ReferralUser[];

    level: 1 | 2 | 3;
}

export default function ReferralMembersList({
    members,
    level,
}: ReferralMembersListProps) {

    if (!members.length) {
        return (
            <ReferralEmptyState
                level={level}
            />
        );
    }

    return (
        <div className="space-y-2.5">

            {members.map((member) => (
                <ReferralMemberCard
                    key={member.id}
                    member={member}
                />
            ))}

        </div>
    );
}