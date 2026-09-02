"use client";

import { useEffect, useState } from "react";

import {
    Check,
    Copy,
    ExternalLink,
    Link2,
    UsersRound,
    Wallet,
} from "lucide-react";

import DashboardPendingRequests from "./adminComponents/dashboard/DashboardPendingRequests";
import DashboardRevenueChart from "./adminComponents/dashboard/DashboardRevenueChart";
import DashboardStats from "./adminComponents/dashboard/DashboardStats";
import DashboardQuickActions from "./adminComponents/dashboard/DashboardQuickActions";
import DashboardUserGrowthChart from "./adminComponents/dashboard/DashboardUserGrowthChart";

import { useDashboard } from "../hooks/adminHooks/useDashboard";
import { authService } from "@/app/services/clientServices/auth.service";

export default function AdminDashboardPage() {

    const {
        data: dashboard,
        isLoading,
    } = useDashboard();

    const [
        referralCode,
        setReferralCode,
    ] = useState("");

    const [
        referralLoading,
        setReferralLoading,
    ] = useState(true);

    const [
        referralError,
        setReferralError,
    ] = useState("");

    const [
        copied,
        setCopied,
    ] = useState<
        "code" | "link" | null
    >(null);

    /*
     * ============================================================
     * LOAD ADMIN REFERRAL INFORMATION
     * ============================================================
     */

    useEffect(() => {

        let mounted = true;

        async function loadReferral() {

            try {

                setReferralLoading(true);
                setReferralError("");

                const response =
                    await authService.me();

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

    /*
     * ============================================================
     * REFERRAL LINK
     * ============================================================
     */

    const referralLink =
        referralCode
            ? `https://www.wiico.org/register?ref=${encodeURIComponent(
                  referralCode,
              )}`
            : "";

    /*
     * ============================================================
     * COPY REFERRAL CODE
     * ============================================================
     */

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

    /*
     * ============================================================
     * COPY REFERRAL LINK
     * ============================================================
     */

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
                    w-full
                    max-w-7xl
                    px-4
                    py-5
                    sm:px-6
                    lg:px-8
                "
            >

                {/* =====================================================
                    DASHBOARD HEADER
                ====================================================== */}

                <header
                    className="
                        mb-6
                        flex
                        flex-col
                        gap-4
                        border-b
                        border-slate-200
                        pb-6
                        sm:flex-row
                        sm:items-end
                        sm:justify-between
                        sm:gap-1
                    "
                >

                    <div>

                        <p
                            className="
                                text-[11px]
                                font-bold
                                uppercase
                                tracking-[0.16em]
                                text-[#1590FC]
                            "
                        >
                            Admin Dashboard
                        </p>

                        <h1
                            className="
                                mt-1
                                text-2xl
                                font-bold
                                tracking-tight
                                text-slate-950
                                sm:text-3xl
                            "
                        >
                            Platform Overview
                        </h1>

                        <p
                            className="
                                mt-1
                                max-w-xl
                                text-sm
                                leading-5
                                text-slate-500
                            "
                        >
                            Monitor users, wallet activity, upgrades,
                            withdrawals and platform performance.
                        </p>

                    </div>

                    {/* =================================================
                        ADMIN WALLET SUMMARY
                    ================================================== */}

                    {isLoading ? (

                        <div
                            className="
                                hidden
                                h-[60px]
                                w-52
                                animate-pulse
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                sm:block
                            "
                        />

                    ) : dashboard?.statistics && (

                        <div
                            className="
                                hidden
                                items-center
                                gap-3
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                px-4
                                py-3
                                shadow-sm
                                sm:flex
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-emerald-50
                                    text-emerald-600
                                "
                            >
                                <Wallet size={18} />
                            </div>

                            <div>

                                <p
                                    className="
                                        text-[10px]
                                        font-semibold
                                        uppercase
                                        tracking-wider
                                        text-slate-400
                                    "
                                >
                                    Admin Revenue
                                </p>

                                <p
                                    className="
                                        text-sm
                                        font-bold
                                        text-slate-900
                                    "
                                >
                                    ₦{Number(
                                        dashboard.statistics.totalRevenue ?? 0,
                                    ).toLocaleString("en-NG", {
                                        maximumFractionDigits: 2,
                                    })}
                                </p>

                            </div>

                        </div>

                    )}

                </header>

                {/* =====================================================
                    STATISTICS
                ====================================================== */}

                <section className="mb-6">
                    <DashboardStats
                        // statistics={dashboard?.statistics}
                        loading={isLoading}
                    />
                </section>

                {/* =====================================================
                    QUICK ACTIONS
                ====================================================== */}

                <section className="mb-6">
                    <DashboardQuickActions />
                </section>

                {/* =====================================================
                    MAIN DASHBOARD GRID
                ====================================================== */}

                <div
                    className="
                        grid
                        grid-cols-1
                        gap-6
                        lg:grid-cols-3
                    "
                >

                    {/* =================================================
                        LEFT / MAIN COLUMN
                    ================================================== */}

                    <div
                        className="
                            flex
                            min-w-0
                            flex-col
                            gap-6
                            lg:col-span-2
                        "
                    >

                        <DashboardRevenueChart
                            data={dashboard?.revenue ?? []}
                        />

                        <DashboardUserGrowthChart
                            data={dashboard?.userGrowth ?? []}
                        />

                    </div>

                    {/* =================================================
                        RIGHT / SIDEBAR COLUMN
                    ================================================== */}

                    <div className="flex min-w-0 flex-col gap-6">

                        <DashboardPendingRequests
                            upgrades={dashboard?.pendingUpgradeRequests}
                            withdrawals={dashboard?.pendingWithdrawals}
                        />

                        {/* =============================================
                            REFERRAL CARD
                        ============================================== */}

                        <section
                            className="
                                relative
                                overflow-hidden
                                rounded-[28px]
                                bg-slate-950
                                shadow-sm
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
                                    bg-[#1590FC]/10
                                    blur-3xl
                                "
                            />

                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    -bottom-20
                                    -left-16
                                    h-48
                                    w-48
                                    rounded-full
                                    bg-emerald-400/5
                                    blur-3xl
                                "
                            />

                            <div className="relative p-5">

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
                                            <UsersRound className="h-5 w-5 text-white" />
                                        </div>

                                        <div className="min-w-0">

                                            <p
                                                className="
                                                    text-[10px]
                                                    font-semibold
                                                    uppercase
                                                    tracking-[0.16em]
                                                    text-slate-500
                                                "
                                            >
                                                Admin Referral
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

                                    <Link2 className="h-5 w-5 shrink-0 text-slate-600" />

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
                                    new users to join WIICO.
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
                                            <p className="text-xs text-red-300">
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

                                            <div className="min-w-0 flex-1 px-3">

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
                                                    {referralCode || "—"}
                                                </p>

                                            </div>

                                            <button
                                                type="button"
                                                onClick={copyReferralCode}
                                                disabled={!referralCode}
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
                                                    disabled:cursor-not-allowed
                                                    disabled:opacity-50
                                                "
                                            >

                                                {copied === "code" ? (
                                                    <Check className="h-4 w-4" />
                                                ) : (
                                                    <Copy className="h-4 w-4" />
                                                )}

                                                <span>
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

                                                <div className="min-w-0 flex-1 px-3">

                                                    <p
                                                        className="
                                                            truncate
                                                            text-xs
                                                            text-slate-300
                                                        "
                                                        title={referralLink}
                                                    >
                                                        {referralLink}
                                                    </p>

                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={copyReferralLink}
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
                                                        <Check className="h-4 w-4" />
                                                    ) : (
                                                        <Copy className="h-4 w-4" />
                                                    )}

                                                    <span>
                                                        {copied === "link"
                                                            ? "Copied"
                                                            : "Copy"}
                                                    </span>

                                                </button>

                                            </div>

                                        </div>

                                    )}

                                {/* Open Registration */}

                                {!referralLoading &&
                                    !referralError &&
                                    referralLink && (

                                        <div className="mt-4">

                                            <a
                                                href={referralLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="
                                                    flex
                                                    w-full
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
                                                    active:scale-[0.99]
                                                "
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                                Open registration
                                            </a>

                                        </div>

                                    )}

                            </div>

                        </section>

                    </div>

                </div>

            </div>

        </main>
    );
}