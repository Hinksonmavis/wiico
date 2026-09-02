export type UpgradeStatus =
    | "pending"
    | "under_review"
    | "approved"
    | "rejected"
    | "cancelled";

export interface UpgradeUser {
    id: string;
    email: string | null;
    phone: string;
    referralCode: string | null;
}

export interface MembershipSummary {
    id: string;
    name: string;
    slug: string;
}

export interface UpgradeRequest {
    id: string;

    user: UpgradeUser | null;

    currentMembership: MembershipSummary | null;

    requestedMembership: MembershipSummary | null;

    amount: string;

    paymentMethod: string;

    paymentProof: string | null;

    reference: string;

    status: UpgradeStatus;

    metadata: Record<string, unknown> | null;

    transactionId: string | null;

    reviewedBy: string | null;

    reviewedAt: string | null;

    rejectedReason: string | null;

    adminNote: string | null;

    createdAt: string;

    updatedAt: string;
}

export interface UpgradeRequestListResponse {
    success: boolean;
    data: UpgradeRequest[];
}

export interface UpgradeRequestResponse {
    success: boolean;
    data: UpgradeRequest;
}

export interface ApproveUpgradeDto {
    adminNote?: string;
}

export interface RejectUpgradeDto {
    rejectedReason: string;
    adminNote?: string;
}