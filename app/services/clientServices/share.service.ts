import api from "@/app/lib/axios";
import { ApiEnvelope, PurchaseShareDto, PurchaseShareResponse, UserShare, UserShareListResponse } from "@/app/types/clientTypes/share.types";

export class UserShareService {
    async getShares(params?: { page?: number; limit?: number }) {
        const response = await api.get<ApiEnvelope<UserShare[]> & { pagination: UserShareListResponse["pagination"] }>(
            "/shares",
            { params },
        );

        return { data: response.data.data, pagination: response.data.pagination };
    }

    async getShare(shareId: string) {
        const response = await api.get<ApiEnvelope<UserShare>>(`/shares/${shareId}`);
        return response.data.data;
    }

    async purchaseShare(shareId: string, dto: PurchaseShareDto) {
        const response = await api.post<ApiEnvelope<PurchaseShareResponse>>(
            `/shares/${shareId}/purchase`,
            dto,
        );
        return response.data.data;
    }

    /** Response schema was not supplied: preserve it as unknown at this boundary. */
    async getPurchases(params?: { page?: number; limit?: number }) {
        const response = await api.get<ApiEnvelope<unknown>>("/shares/purchases", { params });
        return response.data.data;
    }

    /** Response schema was not supplied: preserve it as unknown at this boundary. */
    async getPurchase(purchaseId: string) {
        const response = await api.get<ApiEnvelope<unknown>>(`/shares/purchases/${purchaseId}`);
        return response.data.data;
    }
}

export const userShareService = new UserShareService();
