import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { adminShareService } from "@/app/services/adminServices/adminShare.service";
import { adminShareKeys } from "./adminShare.keys";

import {
    UpdateAdminShareDto,
} from "@/app/types/adminTypes/share.types";


interface UpdateAdminShareVariables {
    shareId: string;
    dto: UpdateAdminShareDto;
}


export function useUpdateAdminShare() {

    const queryClient =
        useQueryClient();


    return useMutation({

        mutationFn:
            ({
                shareId,
                dto,
            }: UpdateAdminShareVariables) =>
                adminShareService.updateShare(
                    shareId,
                    dto,
                ),

        onSuccess:
            async (
                updatedShare,
                variables,
            ) => {

                await Promise.all([

                    queryClient.invalidateQueries({
                        queryKey:
                            adminShareKeys.lists(),
                    }),

                    queryClient.invalidateQueries({
                        queryKey:
                            adminShareKeys.detail(
                                variables.shareId,
                            ),
                    }),

                ]);

            },
    });
}