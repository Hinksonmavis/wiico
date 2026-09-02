export interface MembershipTier {
    id: string;
    slug: string;
    name: string;
    sortOrder: number;

    description: string;
    upgradePrice: string;

    tasksPerDay: number | null;
    rewardPerTask: string | null;
    dailyRewardLimit: string | null;

    invitationCommissionLevel1: string;
    invitationCommissionLevel2: string;
    invitationCommissionLevel3: string;

    orderCommissionLevel1: string;
    orderCommissionLevel2: string;
    orderCommissionLevel3: string;

    isInternship: boolean;
    canUpgradeTo: boolean;
}

export interface CurrentMembership {
    id: string;
    slug: string;
    name: string;
    sortOrder: number;
}