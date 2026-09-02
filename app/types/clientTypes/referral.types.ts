export interface ReferralUser {
    id: string;
    phone: string;
    email: string | null;
    referralCode: string;
    membershipPlanId: string | null;
    isActive: boolean;
    createdAt: string;
}

// export interface ReferralTreeNode {
//     user: ReferralUser;
//     children: ReferralTreeNode[];
// }

export interface ReferralData {
    direct: ReferralUser[];
    level1: ReferralUser[];
    level2: ReferralUser[];
    level3: ReferralUser[];
}

export interface ReferralStats {
    directReferrals: number;
    level1: number;
    level2: number;
    level3: number;
    totalTeam: number;
}

export interface ReferralLink {
    referralCode: string;
    referralLink: string;
}

export interface ReferralResponse {
    success: boolean;
    data: ReferralData;
}

export interface ReferralStatsResponse {
    success: boolean;
    data: ReferralStats;
}

export interface ReferralLinkResponse {
    success: boolean;
    data: ReferralLink;
}