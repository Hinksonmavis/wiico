import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { adminShareService } from "@/app/services/adminServices/adminShare.service";
import { adminShareKeys } from "./adminShare.keys";


export function useCloseAdminShare() {

    const queryClient =
        useQueryClient();


    return useMutation({

        mutationFn:
            (
                shareId: string,
            ) =>
                adminShareService.closeShare(
                    shareId,
                ),

        onSuccess:
            async (
                closedShare,
            ) => {

                await Promise.all([

                    queryClient.invalidateQueries({
                        queryKey:
                            adminShareKeys.lists(),
                    }),

                    queryClient.invalidateQueries({
                        queryKey:
                            adminShareKeys.detail(
                                closedShare.id,
                            ),
                    }),

                ]);

            },
    });
}