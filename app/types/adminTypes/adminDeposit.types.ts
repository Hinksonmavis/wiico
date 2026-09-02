export enum DepositStatus {
    PENDING = "pending",
    UNDER_REVIEW = "under_review",
    APPROVED = "approved",
    DECLINED = "declined",
    CANCELLED = "cancelled",
}

export interface AdminDepositMembership {
    id: string;
    name: string;
    slug: string;
}

export interface AdminDepositUser {
    id: string;
    phone: string;
    email: string | null;
    membership: AdminDepositMembership | null;
}

export interface AdminDeposit {
    id: string;
    reference: string;
    walletId: string;
    amount: string;
    accountName: string;
    accountNumber: string;
    bankName: string;
    paymentReceipt: string;
    status: DepositStatus;
    reviewedBy: string | null;
    reviewedAt: string | null;
    adminRemark: string | null;
    metadata: Record<string, unknown> | null;
    createdAt: string;
    updatedAt: string;
    user: AdminDepositUser;
}

export interface ApproveDepositDto {
    adminRemark?: string;
}

export interface RejectDepositDto {
    adminRemark: string;
}