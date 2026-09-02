"use client";

import { useQuery } from "@tanstack/react-query";

import { transactionService } from "@/app/services/clientServices/transaction.service";

import {
    TransactionType,
} from "@/app/constants/transaction.constants";

export const referralTransactionKeys = {
    all: ["referral-transactions"] as const,

    list: (
        page: number,
        limit: number,
    ) => [
        ...referralTransactionKeys.all,
        page,
        limit,
    ] as const,
};

/**
 * Fetch the authenticated user's transactions
 * and expose only referral commission transactions.
 */
export function useReferralTransactions(
    page: number = 1,
    limit: number = 10,
) {

    return useQuery({
        queryKey:
            referralTransactionKeys.list(
                page,
                limit,
            ),

        queryFn: async () => {

            const response =
                await transactionService.getTransactions(
                    page,
                    limit,
                );

            return {
                ...response,

                data:
                    response.data.filter(
                        (transaction) =>
                            transaction.type ===
                            TransactionType.REFERRAL_COMMISSION,
                    ),
            };
        },

        staleTime: 30 * 1000,
    });
}