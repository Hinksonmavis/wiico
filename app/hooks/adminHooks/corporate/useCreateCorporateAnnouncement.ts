"use client";

import { adminCorporateService } from "@/app/services/adminServices/adminCorporate.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminCorporateKeys } from "./adminCorporateKeys";

export function useCreateCorporateAnnouncement() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn:
            adminCorporateService.create,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey:
                    adminCorporateKeys.announcements(),
            });
        },
    });
}