"use client";

import { adminCorporateService } from "@/app/services/adminServices/adminCorporate.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminCorporateKeys } from "./adminCorporateKeys";
import { UpdateCorporateAnnouncementPayload } from "@/app/types/adminTypes/adminCorporate.types";

interface UpdateCorporateAnnouncementVariables {
    id: string;
    data: UpdateCorporateAnnouncementPayload;
}

export function useUpdateCorporateAnnouncement() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: ({
            id,
            data,
        }: UpdateCorporateAnnouncementVariables) =>
            adminCorporateService.update(
                id,
                data,
            ),

        onSuccess: (_, variables) => {

            queryClient.invalidateQueries({
                queryKey:
                    adminCorporateKeys.announcements(),
            });

            queryClient.invalidateQueries({
                queryKey:
                    adminCorporateKeys.announcement(
                        variables.id,
                    ),
            });
        },
    });
}
