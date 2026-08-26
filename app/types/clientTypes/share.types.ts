import { ShareStatus } from "@/app/types/sharedTypes/shareStatus.types";

export enum SharePurchaseStatus {
    ACTIVE = "active",
    COMPLETED = "completed",
    RETURN_CREDITED = "return_credited",
}

export interface SharePagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

/** Public share fields supplied by the share API/admin contract. */
export interface UserShare {
    id: string;
    name: string;
    logo: string | null;
    logoPublicId: string | null;
    description: string | null;
    dailyReturnPercentage: string;
    cycleDays: number;
    status: ShareStatus;
    createdAt: string;
    updatedAt: string;
}

export interface UserShareListResponse {
    data: UserShare[];
    pagination: SharePagination;
}

/** The only supplied purchase request field. */
export interface PurchaseShareDto {
    amount: number;
}

/** Exact receipt fields supplied by the purchase service. */
export interface SharePurchaseReceipt {
    id: string;
    shareId: string;
    shareName: string;
    logo: string | null;
    description: string | null;
    percentage: number;
    cycleDays: number;
    purchaseAmount: number;
    dailyReturn: number;
    totalReturn: number;
    status: SharePurchaseStatus;
    purchaseReference: string;
    purchasedAt: string;
    expectedReturnAt: string;
    expiresAt: string;
}

export interface PurchaseShareResponse {
    purchase: SharePurchaseReceipt;
    /** Transaction DTO was not supplied; do not model or display assumed fields. */
    transaction: unknown;
}

export interface ApiEnvelope<T> {
    success: boolean;
    message?: string;
    data: T;
}
