"use client";

import { UserRound } from "lucide-react";

import { useCurrentUser } from "@/app/hooks/clientHooks/userHooks/useCurrentUser";

import ProfileSettingsHeader from "@/app/components/settings/profile-settings/ProfileSettingsHeader";
import ProfileIdentityCard from "@/app/components/settings/profile-settings/ProfileIdentityCard";
import ProfileField from "@/app/components/settings/profile-settings/ProfileField";
import ReferralCodeField from "@/app/components/settings/profile-settings/ReferralCodeField";
import ProfileSecurityNotice from "@/app/components/settings/profile-settings/ProfileSecurityNotice";
import EditableEmailField from "@/app/components/settings/profile-settings/EditableEmailField";

export default function ProfileSettingsPage() {

    const {
        data: user,
        isLoading,
        isError,
        refetch,
    } = useCurrentUser();

    // ============================================================
    // LOADING STATE
    // ============================================================

    if (isLoading) {

        return (
            <div className="min-h-full bg-slate-50">

                <ProfileSettingsHeader />

                <main
                    className="
                        mx-auto
                        w-full
                        max-w-lg
                        px-4
                        pb-12
                        pt-5
                    "
                >
                    <ProfileSettingsSkeleton />
                </main>

            </div>
        );
    }

    // ============================================================
    // ERROR / NO USER STATE
    // ============================================================

    if (isError || !user) {

        return (
            <div className="min-h-full bg-slate-50">

                <ProfileSettingsHeader />

                <main
                    className="
                        mx-auto
                        flex
                        w-full
                        max-w-lg
                        flex-col
                        items-center
                        justify-center
                        px-4
                        py-16
                        text-center
                    "
                >

                    <div
                        className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-slate-100
                            text-slate-400
                        "
                    >
                        <UserRound className="h-6 w-6" />
                    </div>

                    <h2
                        className="
                            mt-4
                            text-base
                            font-semibold
                            text-slate-900
                        "
                    >
                        Unable to load profile
                    </h2>

                    <p
                        className="
                            mt-1
                            max-w-xs
                            text-sm
                            leading-6
                            text-slate-500
                        "
                    >
                        We couldn't load your profile
                        information. Please try again.
                    </p>

                    <button
                        type="button"
                        onClick={() => refetch()}
                        className="
                            mt-5
                            rounded-xl
                            bg-slate-900
                            px-5
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-slate-800
                            active:scale-[0.98]
                        "
                    >
                        Try Again
                    </button>

                </main>

            </div>
        );
    }

    // ============================================================
    // MEMBERSHIP / REFERRAL LOGIC
    // ============================================================

    // Referral codes are only shown after the internship
    // membership.
    const showReferralCode =
        user.membership?.slug !== "internship";

    // ============================================================
    // PAGE
    // ============================================================

    return (
        <div className="min-h-full bg-slate-50">

            <ProfileSettingsHeader />

            <main
                className="
                    mx-auto
                    w-full
                    max-w-lg
                    px-4
                    pb-12
                    pt-5
                "
            >

                {/* ==================================================
                    PROFILE IDENTITY
                ================================================== */}

                <ProfileIdentityCard
                    phone={user.phone}
                    country={user.country}
                />

                {/* ==================================================
                    PERSONAL INFORMATION
                ================================================== */}

                <section className="mt-7">

                    <div className="mb-3 px-1">

                        <p
                            className="
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.14em]
                                text-slate-400
                            "
                        >
                            Personal Information
                        </p>

                    </div>

                    <div
                        className="
                            overflow-hidden
                            rounded-[22px]
                            border
                            border-slate-200/80
                            bg-white
                            shadow-[0_5px_20px_rgba(15,23,42,0.035)]
                        "
                    >

                        {/* ==================================================
                            PHONE
                        ================================================== */}

                        <ProfileField
                            label="Phone Number"
                            value={
                                user.phone ||
                                "Not available"
                            }
                            icon={
                                <UserRound className="h-4 w-4" />
                            }
                        />

                        {/* ==================================================
                            EMAIL
                        ================================================== */}

                        <EditableEmailField
                            email={user.email}
                            onUpdated={async () => {
                                await refetch();
                            }}
                        />

                        {/* ==================================================
                            COUNTRY
                        ================================================== */}

                        <ProfileField
                            label="Country"
                            value={
                                user.country ||
                                "Not available"
                            }
                            last={!showReferralCode}
                        />

                        {/* ==================================================
                            REFERRAL CODE
                        ================================================== */}

                        {showReferralCode && (
                            <ReferralCodeField
                                referralCode={
                                    user.referralCode
                                }
                            />
                        )}

                    </div>

                </section>

                {/* ==================================================
                    SECURITY
                ================================================== */}

                <div className="mt-5">

                    <ProfileSecurityNotice />

                </div>

            </main>

        </div>
    );
}

// ============================================================
// PROFILE SETTINGS SKELETON
// ============================================================

function ProfileSettingsSkeleton() {

    return (
        <div className="animate-pulse">

            {/* Identity card */}

            <div
                className="
                    h-[105px]
                    rounded-[24px]
                    bg-white
                "
            />

            {/* Personal information */}

            <div className="mt-7">

                <div
                    className="
                        mb-3
                        h-3
                        w-32
                        rounded
                        bg-slate-200
                    "
                />

                <div
                    className="
                        overflow-hidden
                        rounded-[22px]
                        border
                        border-slate-200
                        bg-white
                    "
                >

                    <div
                        className="
                            h-16
                            border-b
                            border-slate-100
                            bg-slate-50/50
                        "
                    />

                    <div
                        className="
                            h-20
                            border-b
                            border-slate-100
                            bg-slate-50/50
                        "
                    />

                    <div
                        className="
                            h-16
                            bg-slate-50/50
                        "
                    />

                </div>

            </div>

        </div>
    );
}