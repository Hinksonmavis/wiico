import { useQuery } from "@tanstack/react-query";

import { adminShareService } from "@/app/services/adminServices/adminShare.service";
import { adminShareKeys } from "./adminShare.keys";


export function useAdminShares(
    params?: {
        page?: number;
        limit?: number;
        status?: string;
        search?: string;
    },
) {

    return useQuery({
        queryKey:
            adminShareKeys.list(
                params,
            ),

        queryFn:
            () =>
                adminShareService.getShares(
                    params,
                ),

        staleTime:
            30 * 1000,
    });
}