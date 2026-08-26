import { useQuery } from "@tanstack/react-query";

import { adminShareService } from "@/app/services/adminServices/adminShare.service";
import { adminShareKeys } from "./adminShare.keys";


export function useAdminShareAnalytics(
    shareId: string,
) {

    return useQuery({

        queryKey:
            adminShareKeys.analytics(
                shareId,
            ),

        queryFn:
            () =>
                adminShareService.getShareAnalytics(
                    shareId,
                ),

        enabled:
            Boolean(shareId),

        staleTime:
            30 * 1000,
    });
}