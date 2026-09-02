"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApproveUpgradeDto } from "@/app/types/adminTypes/upgrade-request.types";
import { upgradeRequestService } from "@/app/services/adminServices/upgrade-request.service";

interface Variables {
    id: string;
    data?: ApproveUpgradeDto;
}

export function useApproveUpgrade() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: Variables) =>
            upgradeRequestService.approveRequest(
                id,
                data,
            ),

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