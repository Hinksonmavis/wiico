import api from "@/app/lib/axios";

import {
    AdminShare,
    CreateAdminShareDto,
    UpdateAdminShareDto,
    AdminShareListResponse,
    AdminShareAnalytics,
    AdminSharePurchaserListResponse,
    AdminSharePurchaserDetails,
    CreditShareReturnResponse,
} from "@/app/types/adminTypes/share.types";


export class AdminShareService {

    // Get paginated admin shares
    async getShares(
        params?: {
            page?: number;
            limit?: number;
            status?: string;
            search?: string;
        },
    ) {
        const response =
            await api.get<AdminShareListResponse & {
                success: boolean;
            }>(
                "/admin/shares",
                {
                    params,
                },
            );

        return {
            data:
                response.data.data,

            pagination:
                response.data.pagination,
        };
    }


    // Get one share
    async getShare(
        shareId: string,
    ) {
        const response =
            await api.get<{
                success: boolean;
                data: AdminShare;
            }>(
                `/admin/shares/${shareId}`,
            );

        return response.data.data;
    }


    // Create share
    async createShare(
        dto: CreateAdminShareDto,
    ) {
        const response =
            await api.post<{
                success: boolean;
                message: string;
                data: AdminShare;
            }>(
                "/admin/shares",
                dto,
            );

        return response.data.data;
    }


    // Update share
    async updateShare(
        shareId: string,
        dto: UpdateAdminShareDto,
    ) {
        const response =
            await api.patch<{
                success: boolean;
                message: string;
                data: AdminShare;
            }>(
                `/admin/shares/${shareId}`,
                dto,
            );

        return response.data.data;
    }


    // Delete share
    async deleteShare(
        shareId: string,
    ) {
        const response =
            await api.delete<{
                success: boolean;
                message: string;
                data: AdminShare;
            }>(
                `/admin/shares/${shareId}`,
            );

        return response.data.data;
    }


    // Start share
    async startShare(
        shareId: string,
    ) {
        const response =
            await api.post<{
                success: boolean;
                message: string;
                data: AdminShare;
            }>(
                `/admin/shares/${shareId}/start`,
            );

        return response.data.data;
    }


    // Close share
    async closeShare(
        shareId: string,
    ) {
        const response =
            await api.post<{
                success: boolean;
                message: string;
                data: AdminShare;
            }>(
                `/admin/shares/${shareId}/close`,
            );

        return response.data.data;
    }


    // Get share analytics
    async getShareAnalytics(
        shareId: string,
    ) {
        const response =
            await api.get<{
                success: boolean;
                data: AdminShareAnalytics;
            }>(
                `/admin/shares/${shareId}/analytics`,
            );

        return response.data.data;
    }


    // Get share purchasers
    async getSharePurchasers(
        shareId: string,
        params?: {
            page?: number;
            limit?: number;
        },
    ) {
        const response =
            await api.get<AdminSharePurchaserListResponse & {
                success: boolean;
            }>(
                `/admin/shares/${shareId}/purchasers`,
                {
                    params,
                },
            );

        return {
            data:
                response.data.data,

            pagination:
                response.data.pagination,
        };
    }


    // Get purchaser details
    async getSharePurchaserDetails(
        shareId: string,
        purchaseId: string,
    ) {
        const response =
            await api.get<{
                success: boolean;
                data: AdminSharePurchaserDetails;
            }>(
                `/admin/shares/${shareId}/purchasers/${purchaseId}`,
            );

        return response.data.data;
    }


    // Credit share return
    async creditShareReturn(
        shareId: string,
        purchaseId: string,
    ) {
        const response =
            await api.post<{
                success: boolean;
                message: string;
                data: CreditShareReturnResponse["data"];
            }>(
                `/admin/shares/${shareId}/purchasers/${purchaseId}/return`,
            );

        return response.data.data;
    }
}


export const adminShareService =
    new AdminShareService();