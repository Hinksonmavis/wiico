"use client";

import { corporateService } from "@/app/services/clientServices/corporate.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { corporateKeys } from "./corporateKeys";

export function useMarkCorporateAsRead() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn:
            corporateService.markAsRead,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey:
                    corporateKeys.announcements(),
            });
        },
    });
}