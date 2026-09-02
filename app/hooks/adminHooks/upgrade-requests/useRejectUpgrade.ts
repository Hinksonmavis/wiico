"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { upgradeRequestService } from "@/app/services/adminServices/upgrade-request.service";
import { RejectUpgradeDto } from "@/app/types/adminTypes/upgrade-request.types";

interface Variables {
    id: string;
    data: RejectUpgradeDto;
}

export function useRejectUpgrade() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: Variables) =>
            upgradeRequestService.rejectRequest(
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