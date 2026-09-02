"use client";

import { useEffect, useState } from "react";

import { Check, Copy, ExternalLink, Link2, RefreshCw, UsersRound } from "lucide-react";

import DashboardPendingRequests from "./adminComponents/dashboard/DashboardPendingRequests";
import DashboardRecentActivity from "./adminComponents/dashboard/DashboardRecentActivity";
import DashboardRevenueChart from "./adminComponents/dashboard/DashboardRevenueChart";
import DashboardStats from "./adminComponents/dashboard/DashboardStats";
import DashboardQuickActions from "./adminComponents/dashboard/DashboardQuickActions";
import DashboardUserGrowthChart from "./adminComponents/dashboard/DashboardUserGrowthChart";

import { useDashboard } from "../hooks/adminHooks/useDashboard";
import { authService } from "@/app/services/clientServices/auth.service";

export default function AdminDashboardPage() {

    const { data, isLoading } = useDashboard();
    const dashboard = data;
    const [ referralCode, setReferralCode ] = useState("");
    const [ referralLoading, setReferralLoading ] = useState(true);
    const [ referralError, setReferralError ] = useState("");

    const [ copied, setCopied ] = useState<
        "code" | "link" | null
    >(null);

    // Load admin referral information
    useEffect(() => {
        let mounted = true;

        async function loadReferral() {
            try {
                setReferralLoading(true);
                setReferralError("");

                const response = await authService.me();

                if (!mounted) {
                    return;
                }

                setReferralCode(
                    response.data.referralCode ?? "",
                );
            } catch (error) {
                if (!mounted) {
                    return;
                }

                setReferralError(
                    error instanceof Error
                        ? error.message
                        : "Unable to load referral information.",
                );
            } finally {
                if (mounted) {
                    setReferralLoading(false);
                }

            }
        }
        loadReferral();

        return () => {
            mounted = false;
        };
    }, []);

    // Referral link
    // The admin dashboard is served from the application, so use the production referral destination here.
    // If your getReferralLink() utility already reads this from configuration, you can replace this with that utility.

    const referralLink = referralCode
        ? `https://www.wiico.org/register?ref=${encodeURIComponent(
            referralCode,
        )}`
        : "";

    // Copy helper
    const copyReferralCode = async () => {
        if (!referralCode) {
            return;
        }

        try {
            await navigator.clipboard.writeText(
                referralCode,
            );

            setCopied("code");

            window.setTimeout(() => {
                setCopied(null);
            }, 2000);
        } catch {
            // Clipboard unavailable.
        }
    };

    const copyReferralLink = async () => {
        if (!referralLink) {
            return;
        }

        try {
            await navigator.clipboard.writeText(
                referralLink,
            );

            setCopied("link");

            window.setTimeout(() => {
                setCopied(null);
            }, 2000);

        } catch {
            // Clipboard unavailable.
        }
    };

    return (
        <main
            className="
                min-h-screen
                bg-slate-50
                pb-24
            "
        >
            <div
                className="
                    mx-auto
                    flex
                    w-full
                    max-w-md
                    flex-col
                    gap-6
                    px-4
                    py-5
                "
            >
                {/* DASHBOARD STATISTICS */}
                <DashboardStats
                    statistics={
                        dashboard?.statistics
                    }
                    loading={
                        isLoading
                    }
                />

                {/* REFERRAL CARD */}
                <section
                    className="
                        relative
                        overflow-hidden
                        rounded-3xl
                        bg-slate-950
                        shadow-lg
                    "
                >

                    {/* Decorative background */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-16
                            -top-20
                            h-48
                            w-48
                            rounded-full
                            bg-white/[0.06]
                            blur-2xl
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -bottom-20
                            -left-16
                            h-44
                            w-44
                            rounded-full
                            bg-white/[0.04]
                            blur-2xl
                        "
                    />

                    <div
                        className="
                            relative
                            p-5
                        "
                    >
                        {/* Header */}
                        <div
                            className="
                                flex
                                items-start
                                justify-between
                                gap-4
                            "
                        >
                            <div
                                className="
                                    flex
                                    min-w-0
                                    items-center
                                    gap-3
                                "
                            >
                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-white/10
                                        ring-1
                                        ring-white/10
                                    "
                                >
                                    <UsersRound
                                        className="
                                            h-5
                                            w-5
                                            text-white
                                        "
                                    />
                                </div>

                                <div className="min-w-0">

                                    <p
                                        className="
                                            text-[10px]
                                            font-semibold
                                            uppercase
                                            tracking-[0.16em]
                                            text-slate-400
                                        "
                                    >
                                        Admin referral
                                    </p>

                                    <h2
                                        className="
                                            mt-0.5
                                            text-base
                                            font-bold
                                            text-white
                                        "
                                    >
                                        Grow your network
                                    </h2>

                                </div>

                            </div>

                            <Link2
                                className="
                                    h-5
                                    w-5
                                    shrink-0
                                    text-slate-500
                                "
                            />

                        </div>

                        {/* Description */}
                        <p
                            className="
                                mt-4
                                text-xs
                                leading-5
                                text-slate-400
                            "
                        >
                            Share your referral code and invite
                            new users to join Wiico.
                        </p>

                        {/* Referral Code */}
                        <div className="mt-5">

                            <p
                                className="
                                    mb-2
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.14em]
                                    text-slate-500
                                "
                            >
                                Referral code
                            </p>

                            {referralLoading ? (

                                <div
                                    className="
                                        h-14
                                        animate-pulse
                                        rounded-2xl
                                        bg-white/10
                                    "
                                />

                            ) : referralError ? (

                                <div
                                    className="
                                        rounded-2xl
                                        border
                                        border-red-400/20
                                        bg-red-400/10
                                        px-4
                                        py-3
                                    "
                                >

                                    <p
                                        className="
                                            text-xs
                                            text-red-300
                                        "
                                    >
                                        {referralError}
                                    </p>

                                </div>

                            ) : (

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        rounded-2xl
                                        border
                                        border-white/10
                                        bg-white/[0.06]
                                        p-2
                                    "
                                >

                                    <div
                                        className="
                                            min-w-0
                                            flex-1
                                            px-3
                                        "
                                    >

                                        <p
                                            className="
                                                truncate
                                                font-mono
                                                text-lg
                                                font-bold
                                                tracking-wider
                                                text-white
                                            "
                                        >
                                            {referralCode}
                                        </p>

                                    </div>

                                    <button
                                        type="button"
                                        onClick={
                                            copyReferralCode
                                        }
                                        disabled={
                                            !referralCode
                                        }
                                        className="
                                            flex
                                            h-10
                                            shrink-0
                                            items-center
                                            gap-2
                                            rounded-xl
                                            bg-white
                                            px-3
                                            text-xs
                                            font-semibold
                                            text-slate-900
                                            transition
                                            hover:bg-slate-100
                                            active:scale-95
                                            disabled:opacity-50
                                        "
                                    >

                                        {copied === "code" ? (
                                            <Check
                                                className="
                                                    h-4
                                                    w-4
                                                "
                                            />
                                        ) : (
                                            <Copy
                                                className="
                                                    h-4
                                                    w-4
                                                "
                                            />
                                        )}

                                        <span className="hidden sm:inline">
                                            {copied === "code"
                                                ? "Copied"
                                                : "Copy"}
                                        </span>

                                    </button>

                                </div>

                            )}

                        </div>

                        {/* Referral Link */}
                        {!referralLoading &&
                            !referralError &&
                            referralLink && (

                                <div className="mt-4">

                                    <p
                                        className="
                                            mb-2
                                            text-[10px]
                                            font-semibold
                                            uppercase
                                            tracking-[0.14em]
                                            text-slate-500
                                        "
                                    >
                                        Referral link
                                    </p>

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            rounded-2xl
                                            border
                                            border-white/10
                                            bg-black/20
                                            p-2
                                        "
                                    >

                                        <div
                                            className="
                                                min-w-0
                                                flex-1
                                                px-3
                                            "
                                        >

                                            <p
                                                className="
                                                    truncate
                                                    text-xs
                                                    text-slate-300
                                                "
                                                title={
                                                    referralLink
                                                }
                                            >
                                                {referralLink}
                                            </p>

                                        </div>

                                        <button
                                            type="button"
                                            onClick={
                                                copyReferralLink
                                            }
                                            className="
                                                flex
                                                h-10
                                                shrink-0
                                                items-center
                                                gap-2
                                                rounded-xl
                                                bg-white/10
                                                px-3
                                                text-xs
                                                font-semibold
                                                text-white
                                                transition
                                                hover:bg-white/15
                                                active:scale-95
                                            "
                                        >

                                            {copied === "link" ? (
                                                <Check
                                                    className="
                                                        h-4
                                                        w-4
                                                    "
                                                />
                                            ) : (
                                                <Copy
                                                    className="
                                                        h-4
                                                        w-4
                                                    "
                                                />
                                            )}

                                            <span className="hidden sm:inline">
                                                {copied === "link"
                                                    ? "Copied"
                                                    : "Copy"}
                                            </span>

                                        </button>

                                    </div>

                                </div>

                            )}

                        {/* Actions */}

                        {!referralLoading &&
                            !referralError &&
                            referralLink && (

                                <div
                                    className="
                                        mt-4
                                        flex
                                        gap-2
                                    "
                                >

                                    <a
                                        href={
                                            referralLink
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            flex
                                            flex-1
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-xl
                                            border
                                            border-white/10
                                            bg-white/5
                                            px-4
                                            py-3
                                            text-xs
                                            font-semibold
                                            text-slate-200
                                            transition
                                            hover:bg-white/10
                                        "
                                    >

                                        <ExternalLink
                                            className="
                                                h-4
                                                w-4
                                            "
                                        />

                                        Open registration

                                    </a>

                                </div>

                            )}

                    </div>

                </section>

                {/* ===================================== */}
                {/* QUICK ACTIONS */}
                {/* ===================================== */}

                <DashboardQuickActions />

                {/* ===================================== */}
                {/* PENDING REQUESTS */}
                {/* ===================================== */}

                <DashboardPendingRequests
                    upgrades={
                        dashboard?.pendingUpgradeRequests
                    }
                    withdrawals={
                        dashboard?.pendingWithdrawals
                    }
                />

                {/* ===================================== */}
                {/* REVENUE */}
                {/* ===================================== */}

                <DashboardRevenueChart
                    data={
                        dashboard?.revenue ?? []
                    }
                />

                {/* ===================================== */}
                {/* USER GROWTH */}
                {/* ===================================== */}

                <DashboardUserGrowthChart
                    data={
                        dashboard?.userGrowth ?? []
                    }
                />

                {/* ===================================== */}
                {/* RECENT ACTIVITY */}
                {/* ===================================== */}

                <DashboardRecentActivity
                    activities={
                        dashboard?.recentActivities ?? []
                    }
                />

            </div>

        </main>
    );
}