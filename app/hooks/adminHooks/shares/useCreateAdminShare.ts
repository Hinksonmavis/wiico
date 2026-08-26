import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { adminShareService } from "@/app/services/adminServices/adminShare.service";
import { adminShareKeys } from "./adminShare.keys";

import {
    CreateAdminShareDto,
} from "@/app/types/adminTypes/share.types";


export function useCreateAdminShare() {

    const queryClient =
        useQueryClient();


    return useMutation({

        mutationFn:
            (
                dto: CreateAdminShareDto,
            ) =>
                adminShareService.createShare(
                    dto,
                ),

        onSuccess:
            async () => {

                await queryClient.invalidateQueries({
                    queryKey:
                        adminShareKeys.lists(),
                });

            },
    });
}