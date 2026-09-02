export type WithdrawalStatus =
    | "pending"
    | "approved"
    | "rejected"
    | "paid";

export interface WithdrawalUser {
    id: string;
    email: string | null;
    phone: string | null;
    referralCode: string | null;
}

export interface Withdrawal {
    id: string;

    userId: string;
    walletId: string;

    amount: string;

    accountName: string;
    accountNumber: string;
    bankName: string;

    status: WithdrawalStatus;

    adminRemark: string | null;

    reviewedBy: string | null;
    reviewedAt: string | null;

    createdAt: string;
    updatedAt: string;

    user: WithdrawalUser | null;
}

export interface WithdrawalListResponse {
    success: boolean;
    data: Withdrawal[];
}

export interface WithdrawalResponse {
    success: boolean;
    data: Withdrawal;
}

export interface ApproveWithdrawalDto {
    adminRemark?: string;
}

export interface RejectWithdrawalDto {
    adminRemark: string;
}