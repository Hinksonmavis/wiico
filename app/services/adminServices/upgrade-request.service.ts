import {
    ApproveUpgradeDto,
    RejectUpgradeDto,
    UpgradeRequestListResponse,
    UpgradeRequestResponse,
} from "@/app/types/adminTypes/upgrade-request.types";
import { api } from "../api";

class UpgradeRequestService {
    /**
     * GET /admin/upgrade-requests
     */
    async getRequests() {
        return api.get<UpgradeRequestListResponse>(
            "/admin/upgrade-requests",
        );
    }

    /**
     * GET /admin/upgrade-requests/:id
     */
    async getRequest(
        id: string,
    ) {
        return api.get<UpgradeRequestResponse>(
            `/admin/upgrade-requests/${id}`,
        );
    }

    /**
     * PATCH /admin/upgrade-requests/:id/under-review
     */
    async reviewRequest(
        id: string,
    ) {
        return api.patch<UpgradeRequestResponse>(
            `/admin/upgrade-requests/${id}/under-review`,
        );
    }

    /**
     * PATCH /admin/upgrade-requests/:id/approve
     */
    async approveRequest(
        id: string,
        data: ApproveUpgradeDto = {},
    ) {
        return api.patch<UpgradeRequestResponse>(
            `/admin/upgrade-requests/${id}/approve`,
            data,
        );
    }

    /**
     * PATCH /admin/upgrade-requests/:id/reject
     */
    async rejectRequest(
        id: string,
        data: RejectUpgradeDto,
    ) {
        return api.patch<UpgradeRequestResponse>(
            `/admin/upgrade-requests/${id}/reject`,
            data,
        );
    }
}

export const upgradeRequestService =
    new UpgradeRequestService();