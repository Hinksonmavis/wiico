import { useQuery } from "@tanstack/react-query";

import { adminShareService } from "@/app/services/adminServices/adminShare.service";
import { adminShareKeys } from "./adminShare.keys";


export function useAdminShare(
    shareId: string,
) {

    return useQuery({
        queryKey:
            adminShareKeys.detail(
                shareId,
            ),

        queryFn:
            () =>
                adminShareService.getShare(
                    shareId,
                ),

        enabled:
            Boolean(shareId),

        staleTime:
            30 * 1000,
    });
}