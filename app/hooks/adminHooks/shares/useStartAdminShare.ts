import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { adminShareService } from "@/app/services/adminServices/adminShare.service";
import { adminShareKeys } from "./adminShare.keys";


export function useStartAdminShare() {

    const queryClient =
        useQueryClient();


    return useMutation({

        mutationFn:
            (
                shareId: string,
            ) =>
                adminShareService.startShare(
                    shareId,
                ),

        onSuccess:
            async (
                startedShare,
            ) => {

                await Promise.all([

                    queryClient.invalidateQueries({
                        queryKey:
                            adminShareKeys.lists(),
                    }),

                    queryClient.invalidateQueries({
                        queryKey:
                            adminShareKeys.detail(
                                startedShare.id,
                            ),
                    }),

                ]);

            },
    });
}