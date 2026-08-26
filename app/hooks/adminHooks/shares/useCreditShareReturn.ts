import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { adminShareService } from "@/app/services/adminServices/adminShare.service";
import { adminShareKeys } from "./adminShare.keys";


interface CreditShareReturnVariables {
    shareId: string;
    purchaseId: string;
}


export function useCreditShareReturn() {

    const queryClient =
        useQueryClient();


    return useMutation({

        mutationFn:
            ({
                shareId,
                purchaseId,
            }: CreditShareReturnVariables) =>
                adminShareService.creditShareReturn(
                    shareId,
                    purchaseId,
                ),

        onSuccess:
            async (
                result,
                variables,
            ) => {

                await Promise.all([

                    // Refresh purchaser list
                    queryClient.invalidateQueries({
                        queryKey:
                            [
                                ...adminShareKeys.all,
                                "purchasers",
                                variables.shareId,
                            ],
                    }),

                    // Refresh purchaser details
                    queryClient.invalidateQueries({
                        queryKey:
                            adminShareKeys.purchaserDetails(
                                variables.shareId,
                                variables.purchaseId,
                            ),
                    }),

                    // Refresh analytics
                    queryClient.invalidateQueries({
                        queryKey:
                            adminShareKeys.analytics(
                                variables.shareId,
                            ),
                    }),

                ]);

            },
    });
}