export interface Membership {
    id: string;
    name: string;
    slug: string;

    isActive: boolean;
    isInternship: boolean;
    canUpgradeTo: boolean;

    sortOrder: number;
    description: string | null;

    upgradePrice: string;

    invitationCommissionLevel1: string;
    invitationCommissionLevel2: string;
    invitationCommissionLevel3: string;

    orderCommissionLevel1: string;
    orderCommissionLevel2: string;
    orderCommissionLevel3: string;

    tasksPerDay: number | null;
    rewardPerTask: string | null;
    dailyRewardLimit: string | null;
}

export interface User {
    id: string;
    phone: string;
    email: string | null;
    role: "admin" | "user";
    country: string;
    referralCode: string;
    referredBy: string | null;
    isVerified: boolean;
    isActive: boolean;
    membership: Membership | null;
    createdAt: string;
}

export interface LoginRequest {
    phone: string;
    password: string;
}

export interface AdminLoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    phone: string;
    password: string;
    confirmPassword: string;
    referral?: string;
    country?: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;

    data: {
        user: User;
        accessToken: string;
        refreshToken: string;
    };
}

export interface LoginResponse {
    success: boolean;
    message: string;
}

export interface RefreshResponse {
    success: boolean;
    message: string;

    data: {
        accessToken: string;
        refreshToken: string;
    };
}