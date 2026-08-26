import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { adminShareService } from "@/app/services/adminServices/adminShare.service";
import { adminShareKeys } from "./adminShare.keys";


export function useDeleteAdminShare() {

    const queryClient =
        useQueryClient();


    return useMutation({

        mutationFn:
            (
                shareId: string,
            ) =>
                adminShareService.deleteShare(
                    shareId,
                ),

        onSuccess:
            async (
                deletedShare,
            ) => {

                await Promise.all([

                    queryClient.invalidateQueries({
                        queryKey:
                            adminShareKeys.lists(),
                    }),

                    queryClient.removeQueries({
                        queryKey:
                            adminShareKeys.detail(
                                deletedShare.id,
                            ),
                    }),

                ]);

            },
    });
}