import {
CreateUpgradeRequestDto,
UpgradeRequest,
UpgradeValidationResponse,
} from "@/app/types/clientTypes/upgrade.types";

import { api } from "../api";

class UpgradeService {

    // VALIDATE UPGRADE

    async validateUpgrade(
        membershipPlanId: string,
    ): Promise<UpgradeValidationResponse> {

        const response =
            await api.get<{
                success: boolean;
                data: UpgradeValidationResponse;
            }>(
                `/upgrade-requests/validate/${membershipPlanId}`,
            );
        return response.data;
    }

    // CREATE UPGRADE REQUEST

    async createUpgradeRequest(
        payload: CreateUpgradeRequestDto,
    ): Promise<UpgradeRequest> {

        const response =
            await api.post<{
                success: boolean;
                data: UpgradeRequest;
            }>(
                "/upgrade-requests",
                payload,
            );

        return response.data;
    }

    // GET UPGRADE REQUESTS

    async getUpgradeRequests(): Promise<
        UpgradeRequest[]
    > {

        const response =
            await api.get<{
                success: boolean;
                data: UpgradeRequest[];
            }>(
                "/upgrade-requests",
            );

        return response.data;
    }

    // GET SINGLE UPGRADE REQUEST

    async getUpgradeRequest(
        requestId: string,
    ): Promise<UpgradeRequest> {

        const response =
            await api.get<{
                success: boolean;
                data: UpgradeRequest;
            }>(
                `/upgrade-requests/${requestId}`,
            );

        return response.data;
    }

    // CANCEL UPGRADE REQUEST

    async cancelUpgradeRequest(
        requestId: string,
    ): Promise<void> {

        await api.delete(
            `/upgrade-requests/${requestId}`,
        );
    }

}

export const upgradeService = new UpgradeService();