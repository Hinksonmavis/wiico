import { useQuery } from "@tanstack/react-query";

import { adminShareService } from "@/app/services/adminServices/adminShare.service";
import { adminShareKeys } from "./adminShare.keys";


export function useAdminSharePurchasers(
    shareId: string,
    params?: {
        page?: number;
        limit?: number;
    },
) {

    return useQuery({

        queryKey:
            adminShareKeys.purchasers(
                shareId,
                params,
            ),

        queryFn:
            () =>
                adminShareService.getSharePurchasers(
                    shareId,
                    params,
                ),

        enabled:
            Boolean(shareId),

        staleTime:
            30 * 1000,
    });
}