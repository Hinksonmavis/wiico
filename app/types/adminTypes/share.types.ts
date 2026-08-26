import { ShareStatus } from "../sharedTypes/shareStatus.types";

// SHARE PURCHASE STATUS
// Mirrors the backend sharePurchaseStatus enum:
// ACTIVE
// COMPLETED
// RETURN_CREDITED
export enum SharePurchaseStatus {
    ACTIVE = "active",
    COMPLETED = "completed",
    RETURN_CREDITED = "return_credited",
}

// PAGINATION
// Mirrors backend pagination metadata.
export interface SharePagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

// ADMIN SHARE
// Represents a share returned by the admin share API.
export interface AdminShare {
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

// CREATE ADMIN SHARE DTO
// Mirrors the backend CreateAdminShareDto.
export interface CreateAdminShareDto {
    name: string;
    logo?: string | null;
    logoPublicId?: string | null;
    description?: string | null;
    dailyReturnPercentage: number;
    cycleDays: number;
}

// UPDATE ADMIN SHARE DTO
// Mirrors the backend UpdateAdminShareDto.
// All fields are optional because the backend supports partial updates.
export interface UpdateAdminShareDto {
    name?: string;
    logo?: string | null;
    logoPublicId?: string | null;
    description?: string | null;
    dailyReturnPercentage?: number;
    cycleDays?: number;
}

// ADMIN SHARE LIST RESPONSE
export interface AdminShareListResponse {
    data: AdminShare[];
    pagination: SharePagination;
}

// ADMIN SHARE ANALYTICS
// Mirrors AdminShareAnalyticsDto.
export interface AdminShareAnalytics {
    share: {
        id: string;
        name: string;
        logo: string | null;
        logoPublicId?: string | null;
        description: string | null;
        dailyReturnPercentage: string;
        cycleDays: number;
        status: ShareStatus;
        createdAt: string;
        updatedAt: string;
    };

    totalPurchasers: number;
    totalPurchaseAmount: string;
    totalExpectedReturns: string;
    totalReturnsCredited: string;
    remainingLiability: string;
}

// ADMIN SHARE PURCHASER USER
export interface AdminSharePurchaserUser {
    id: string;
    phone: string;
    email: string | null;
}

// ADMIN SHARE PURCHASER
// Mirrors AdminSharePurchaserListItemDto.
export interface AdminSharePurchaser {
    purchaseId: string;
    user: AdminSharePurchaserUser;
    purchaseAmount: string;
    dailyReturn: string;
    totalReturn: string;
    status: SharePurchaseStatus;
    purchasedAt: string;
    expectedReturnAt: string;
    expiresAt: string;
}

// ADMIN SHARE PURCHASER LIST RESPONSE
export interface AdminSharePurchaserListResponse {
    data: AdminSharePurchaser[];
    pagination: SharePagination;
}

// ADMIN SHARE PURCHASER DETAILS USER
export interface AdminSharePurchaserDetailsUser {
    id: string;
    phone: string;
    email: string | null;
}

// ADMIN SHARE PURCHASER DETAILS SHARE
export interface AdminSharePurchaserDetailsShare {
    id: string;
    name: string;
    logo: string | null;
    logoPublicId?: string | null;
    description: string | null;
    dailyReturnPercentage: string;
    cycleDays: number;
    status: ShareStatus;
}

// ADMIN SHARE PURCHASER DETAILS
// Mirrors AdminSharePurchaserDetailsDto.
export interface AdminSharePurchaserDetails {
    purchaseId: string;
    share: AdminSharePurchaserDetailsShare;
    user: AdminSharePurchaserDetailsUser;
    purchaseAmount: string;
    dailyReturn: string;
    totalReturn: string;
    dailyReturnPercentage: string;
    cycleDays: number;
    status: SharePurchaseStatus;
    purchasedAt: string;
    expectedReturnAt: string;
    expiresAt: string;
    returnedAt: string | null;
    returnAmount: string | null;
    returnReference: string | null;
}

// ADMIN SHARE PURCHASER DETAILS RESPONSE
export interface AdminSharePurchaserDetailsResponse {
    data: AdminSharePurchaserDetails;
}

// CREDIT RETURN
// The exact response shape should mirror the finalized backend credit-return controller/service DTO.
// Keep the purchase information here so the frontend can immediately update the receipt/details UI after a successful credit.
export interface CreditShareReturnResponse {
    success: boolean;
    message: string;

    data: {
        purchaseId: string;
        status: SharePurchaseStatus;
        returnAmount: string;
        returnReference: string;
        returnedAt: string;
    };
}

// ADMIN SHARE API RESPONSE
// generic response types for the service layer.
export interface AdminShareResponse {
    success: boolean;
    message?: string;
    data: AdminShare;
}

// ADMIN SHARE ANALYTICS API RESPONSE
export interface AdminShareAnalyticsResponse {
    success: boolean;
    data: AdminShareAnalytics;
}

// ADMIN SHARE PURCHASERS API RESPONSE
export interface AdminSharePurchasersResponse {
    success: boolean;
    data: AdminSharePurchaser[];
    pagination: SharePagination;
}

// SHARE LOGO UPLOAD RESPONSE
export interface ShareLogoUploadResponse {
    success: boolean;
    message: string;
    data: {
        publicId: string;
        url: string;
        originalName: string;
        mimeType: string;
        size: number;
        format: string;
        width?: number;
        height?: number;
        folder: string;
    };
}