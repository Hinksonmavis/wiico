export const adminShareKeys = {

    // All admin share queries
    all: ["admin-shares"] as const,

    // Share lists
    lists: () =>
        [...adminShareKeys.all, "list"] as const,

    list: (
        params?: {
            page?: number;
            limit?: number;
            status?: string;
            search?: string;
        },
    ) =>
        [
            ...adminShareKeys.lists(),
            params ?? {},
        ] as const,

    // Individual share
    details: () =>
        [...adminShareKeys.all, "detail"] as const,

    detail: (
        shareId: string,
    ) =>
        [
            ...adminShareKeys.details(),
            shareId,
        ] as const,

    // Analytics
    analytics: (
        shareId: string,
    ) =>
        [
            ...adminShareKeys.all,
            "analytics",
            shareId,
        ] as const,

    // Purchasers
    purchasers: (
        shareId: string,
        params?: {
            page?: number;
            limit?: number;
        },
    ) =>
        [
            ...adminShareKeys.all,
            "purchasers",
            shareId,
            params ?? {},
        ] as const,

    // Purchaser details
    purchaserDetails: (
        shareId: string,
        purchaseId: string,
    ) =>
        [
            ...adminShareKeys.all,
            "purchaser-details",
            shareId,
            purchaseId,
        ] as const,
};