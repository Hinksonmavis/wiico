"use client";

import { adminCorporateService } from "@/app/services/adminServices/adminCorporate.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminCorporateKeys } from "./adminCorporateKeys";

export function usePublishCorporateAnnouncement() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn:
            adminCorporateService.publish,

        onSuccess: (_, id) => {

            queryClient.invalidateQueries({
                queryKey:
                    adminCorporateKeys.announcements(),
            });

            queryClient.invalidateQueries({
                queryKey:
                    adminCorporateKeys.announcement(
                        id,
                    ),
            });
        },
    });
}