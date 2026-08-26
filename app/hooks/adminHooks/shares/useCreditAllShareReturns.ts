import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { adminShareService } from "@/app/services/adminServices/adminShare.service";
import { adminShareKeys } from "./adminShare.keys";
import { SharePurchaseStatus } from "@/app/types/adminTypes/share.types";


interface CreditAllFailure {
    purchaseId: string;
    message: string;
}

export interface CreditAllResult {
    total: number;
    succeeded: number;
    failed: number;
    failures: CreditAllFailure[];
}

// Safety cap so a pagination bug can never spin this into an infinite loop.
const MAX_PAGES = 200;

function getErrorMessage(
    error: unknown,
): string {

    if (
        error &&
        typeof error === "object"
    ) {
        const axiosError =
            error as {
                response?: {
                    data?: {
                        message?: string;
                    };
                };
                message?: string;
            };

        return (
            axiosError.response?.data?.message ??
            axiosError.message ??
            "Unable to credit this purchaser."
        );
    }

    return "Unable to credit this purchaser.";
}

// Walk every page of purchasers for this share and collect
// the ones sitting at COMPLETED (cycle finished, not yet paid).
async function fetchAllCompletedPurchasers(
    shareId: string,
) {

    const eligible: string[] = [];
    let page = 1;

    for (let i = 0; i < MAX_PAGES; i++) {

        const { data, pagination } =
            await adminShareService.getSharePurchasers(
                shareId,
                {
                    page,
                    limit: 50,
                },
            );

        data.forEach((purchaser) => {
            if (
                purchaser.status ===
                SharePurchaseStatus.COMPLETED
            ) {
                eligible.push(
                    purchaser.purchaseId,
                );
            }
        });

        if (!pagination.hasNextPage) {
            break;
        }

        page += 1;
    }

    return eligible;
}

export function useCreditAllShareReturns(
    shareId: string,
) {

    const queryClient =
        useQueryClient();


    return useMutation<CreditAllResult, unknown, void>({

        mutationFn:
            async () => {

                const eligiblePurchaseIds =
                    await fetchAllCompletedPurchasers(
                        shareId,
                    );

                const result: CreditAllResult = {
                    total: eligiblePurchaseIds.length,
                    succeeded: 0,
                    failed: 0,
                    failures: [],
                };

                // Sequential on purpose: avoids hammering the
                // wallet/admin-wallet row locks with concurrent writes.
                for (const purchaseId of eligiblePurchaseIds) {

                    try {
                        await adminShareService.creditShareReturn(
                            shareId,
                            purchaseId,
                        );

                        result.succeeded += 1;

                    } catch (error) {

                        result.failed += 1;

                        result.failures.push({
                            purchaseId,
                            message: getErrorMessage(error),
                        });
                    }
                }

                return result;
            },

        onSuccess:
            async () => {

                await Promise.all([

                    queryClient.invalidateQueries({
                        queryKey:
                            [
                                ...adminShareKeys.all,
                                "purchasers",
                                shareId,
                            ],
                    }),

                    queryClient.invalidateQueries({
                        queryKey:
                            adminShareKeys.analytics(
                                shareId,
                            ),
                    }),

                ]);

            },
    });
}