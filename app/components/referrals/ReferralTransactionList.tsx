"use client";

import {
    Transaction,
} from "@/app/types/clientTypes/transaction.types";

import ReferralTransactionCard from "./ReferralTransactionCard";

interface ReferralTransactionListProps {
    transactions: Transaction[];
}

export default function ReferralTransactionList({
    transactions,
}: ReferralTransactionListProps) {

    if (!transactions.length) {

        return (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-9 text-center">

                <p className="text-sm font-semibold text-slate-800">
                    No referral earnings yet
                </p>

                <p className="mt-1.5 text-xs leading-5 text-slate-500">
                    Your referral commissions will appear here
                    when your team generates eligible rewards.
                </p>

            </div>
        );
    }

    return (
        <div className="space-y-2.5">

            {transactions.map((transaction) => (
                <ReferralTransactionCard
                    key={transaction.id}
                    transaction={transaction}
                />
            ))}

        </div>
    );
}