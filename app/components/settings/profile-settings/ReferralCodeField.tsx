"use client";

import {
    Check,
    Copy,
    Gift,
} from "lucide-react";
import { toast } from "sonner";

interface ReferralCodeFieldProps {
    referralCode?: string | null;
}

export default function ReferralCodeField({
    referralCode,
}: ReferralCodeFieldProps) {
    if (!referralCode) {
        return null;
    }

    const copyReferralCode = async () => {
        try {
            await navigator.clipboard.writeText(
                referralCode,
            );

            toast.success(
                "Referral code copied.",
            );
        } catch {
            toast.error(
                "Unable to copy referral code.",
            );
        }
    };

    return (
        <div className="px-5 py-4">
            <div className="flex items-center gap-3">
                <div
                    className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-amber-50
                        text-amber-600
                    "
                >
                    <Gift className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-medium text-slate-400">
                        Referral Code
                    </p>

                    <p className="mt-0.5 truncate text-[13px] font-bold tracking-wide text-slate-800">
                        {referralCode}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={copyReferralCode}
                    aria-label="Copy referral code"
                    className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-slate-50
                        text-slate-500
                        transition
                        hover:bg-slate-100
                        active:scale-95
                    "
                >
                    <Copy className="h-3.5 w-3.5" />
                </button>
            </div>
        </div>
    );
}