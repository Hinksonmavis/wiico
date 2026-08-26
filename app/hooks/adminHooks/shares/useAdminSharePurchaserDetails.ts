import { useQuery } from "@tanstack/react-query";

import { adminShareService } from "@/app/services/adminServices/adminShare.service";
import { adminShareKeys } from "./adminShare.keys";


export function useAdminSharePurchaserDetails(
    shareId: string,
    purchaseId: string,
) {

    return useQuery({

        queryKey:
            adminShareKeys.purchaserDetails(
                shareId,
                purchaseId,
            ),

        queryFn:
            () =>
                adminShareService.getSharePurchaserDetails(
                    shareId,
                    purchaseId,
                ),

        enabled:
            Boolean(
                shareId &&
                purchaseId,
            ),

        staleTime:
            30 * 1000,
    });
}