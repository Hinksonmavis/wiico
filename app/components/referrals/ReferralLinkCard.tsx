"use client";

import {
    useState,
} from "react";

import {
    Check,
    Copy,
    Share2,
    Link2,
} from "lucide-react";

import {
    ReferralLink,
} from "@/app/types/clientTypes/referral.types";

interface ReferralLinkCardProps {
    referral: ReferralLink;
}

export default function ReferralLinkCard({
    referral,
}: ReferralLinkCardProps) {

    const [
        copied,
        setCopied,
    ] = useState(false);

    const copyLink = async () => {

        try {

            await navigator.clipboard.writeText(
                referral.referralLink,
            );

            setCopied(true);

            setTimeout(
                () => setCopied(false),
                2000,
            );

        } catch {
            // Clipboard unavailable.
        }
    };

    const shareLink = async () => {

        if (
            typeof navigator !== "undefined" &&
            navigator.share
        ) {

            try {

                await navigator.share({
                    title:
                        "Join my team",

                    text:
                        "Join me using my referral link.",

                    url:
                        referral.referralLink,
                });

            } catch {
                // User cancelled sharing.
            }

            return;
        }

        await copyLink();
    };

    return (
        <section className="mb-5">

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                <div className="flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                        <Link2 className="h-4 w-4 text-slate-700" />
                    </div>

                    <div className="min-w-0">

                        <h2 className="text-sm font-semibold text-slate-900">
                            Your referral link
                        </h2>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            Share this link with people you want
                            to invite to your team.
                        </p>

                    </div>

                </div>

                <div className="mt-4 rounded-xl bg-slate-50 p-3">

                    <p className="truncate text-xs font-medium text-slate-600">
                        {referral.referralLink}
                    </p>

                </div>

                <div className="mt-3 flex gap-2">

                    <button
                        type="button"
                        onClick={copyLink}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-semibold text-white transition active:scale-[0.98]"
                    >

                        {copied ? (
                            <>
                                <Check className="h-4 w-4" />
                                Copied
                            </>
                        ) : (
                            <>
                                <Copy className="h-4 w-4" />
                                Copy link
                            </>
                        )}

                    </button>

                    <button
                        type="button"
                        onClick={shareLink}
                        className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-xs font-semibold text-slate-700 transition active:scale-[0.98]"
                    >
                        <Share2 className="h-4 w-4" />
                        Share
                    </button>

                </div>

                <div className="mt-3 flex items-center justify-between">

                    <span className="text-xs text-slate-500">
                        Referral code
                    </span>

                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold tracking-wide text-slate-700">
                        {referral.referralCode}
                    </span>

                </div>

            </div>

        </section>
    );
}