import {
    TransactionType,
} from "@/app/constants/transaction.constants";

import {
    Transaction,
} from "@/app/types/clientTypes/transaction.types";


/**
 * Determines whether a transaction is a referral commission.
 */
export function isReferralTransaction(
    transaction: Transaction,
): boolean {

    return (
        transaction.type ===
        TransactionType.REFERRAL_COMMISSION
    );
}


/**
 * Gets the referral level from transaction metadata.
 *
 * Expected metadata:
 *
 * {
 *     referralLevel: 1 | 2 | 3
 * }
 */
export function getReferralLevel(
    transaction: Transaction,
): number | null {

    const level =
        transaction.metadata?.referralLevel;

    if (
        typeof level === "number"
    ) {
        return Number.isFinite(level)
            ? level
            : null;
    }

    if (
        typeof level === "string"
    ) {
        const parsed =
            Number(level);

        return Number.isFinite(parsed)
            ? parsed
            : null;
    }

    return null;
}


/**
 * Gets the referral commission source.
 */
export function getReferralSource(
    transaction: Transaction,
): string {

    const source =
        transaction.metadata?.source;

    if (
        typeof source === "string" &&
        source.trim().length > 0
    ) {
        return source;
    }

    return "Referral";
}


/**
 * Referral commissions are wallet credits
 * for the receiving user.
 */
export function getTransactionDirection(
    transaction: Transaction,
): "credit" | "debit" {

    if (
        transaction.type ===
        TransactionType.REFERRAL_COMMISSION
    ) {
        return "credit";
    }

    return "debit";
}