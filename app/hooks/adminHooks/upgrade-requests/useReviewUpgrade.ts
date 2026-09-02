"use client"; 

import { useMutation, useQueryClient, } from "@tanstack/react-query"; 
import { upgradeRequestService } from "@/app/services/adminServices/upgrade-request.service"; 

interface Variables { 
    id: string; 
}

export function useReviewUpgrade() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
        }: Variables) =>
            upgradeRequestService.reviewRequest(id),

            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({
                    queryKey: [
                        "admin-upgrade-request",
                        variables.id,
                    ],
                });

                queryClient.invalidateQueries({
                    queryKey: [
                        "admin-upgrade-requests",
                    ],
                });
            },
    });
}