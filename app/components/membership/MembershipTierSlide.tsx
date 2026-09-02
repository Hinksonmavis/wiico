import { CheckCircle2, Lock } from "lucide-react";

import TierQuotaTable from "./TierQuotaTable";
import TierInvitationTable from "./TierInvitationTable";
import TierOrderCommissionTable from "./TierOrderCommissionTable";

import { MembershipTier } from "@/app/types/clientTypes/membership.types";

interface MembershipTierSlideProps {
    tier: MembershipTier;
    isCurrent?: boolean;
    onJoin?: (slug: string) => void;
}

export default function MembershipTierSlide({
    tier,
    isCurrent = false,
    onJoin,
}: MembershipTierSlideProps) {
    const price = Number(tier.upgradePrice);

    const safePrice = Number.isFinite(price)
        ? price
        : 0;

    return (
        <div
            className="
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-xl
                shadow-slate-200/50
                md:p-7
            "
        >
            {/* =====================================================
                HEADER
            ===================================================== */}
            <div className="flex items-start justify-between gap-4">
                {/* Membership Information */}
                <div className="min-w-0">
                    {/* Membership Status */}
                    <span
                        className={`
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            px-3
                            py-1
                            text-[10px]
                            font-semibold
                            md:text-xs
                            ${
                                isCurrent
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-slate-100 text-slate-600"
                            }
                        `}
                    >
                        {isCurrent ? (
                            <>
                                <CheckCircle2
                                    size={12}
                                    strokeWidth={2.5}
                                />

                                Current Membership
                            </>
                        ) : (
                            <>
                                <Lock
                                    size={12}
                                    strokeWidth={2.5}
                                />

                                Locked
                            </>
                        )}
                    </span>

                    {/* Membership Name */}
                    <h2
                        className="
                            mt-2
                            truncate
                            text-[16px]
                            font-bold
                            text-slate-900
                            md:mt-4
                            md:text-2xl
                        "
                    >
                        {tier.name}
                    </h2>
                </div>

                {/* =================================================
                    MEMBERSHIP FEE
                ================================================= */}
                {!isCurrent && (
                    <div className="shrink-0 text-right">
                        <p
                            className="
                                text-[10px]
                                text-slate-500
                                md:text-xs
                            "
                        >
                            Membership Fee
                        </p>

                        <p
                            className="
                                mt-1
                                text-[14px]
                                font-bold
                                text-[#2B84E0]
                                md:text-2xl
                            "
                        >
                            ₦
                            {safePrice.toLocaleString(
                                "en-NG",
                                {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 2,
                                },
                            )}
                        </p>
                    </div>
                )}
            </div>

            {/* =====================================================
                DESCRIPTION
            ===================================================== */}
            <div
                className={`
                    mt-6
                    rounded-2xl
                    p-4
                    md:p-5
                    ${
                        isCurrent
                            ? "border border-blue-100 bg-blue-50"
                            : "bg-slate-50"
                    }
                `}
            >
                {isCurrent && (
                    <div
                        className="
                            mb-3
                            flex
                            items-center
                            gap-2
                        "
                    >
                        <div
                            className="
                                flex
                                h-7
                                w-7
                                items-center
                                justify-center
                                rounded-full
                                bg-blue-100
                                text-[#2B84E0]
                            "
                        >
                            <CheckCircle2
                                size={15}
                                strokeWidth={2.5}
                            />
                        </div>

                        <div>
                            <p className="text-sm font-bold text-[#2B84E0]">
                                Your Current Membership
                            </p>

                            <p className="text-[11px] text-blue-600/70">
                                You are currently enjoying this plan
                            </p>
                        </div>
                    </div>
                )}

                <p
                    className="
                        text-sm
                        leading-7
                        text-slate-700
                    "
                >
                    {tier.description ||
                        "Enjoy the benefits and earning opportunities available with this membership plan."}
                </p>
            </div>

            {/* =====================================================
                UPGRADE BUTTON
            ===================================================== */}
            {!isCurrent && (
                <button
                    type="button"
                    onClick={() => onJoin?.(tier.slug)}
                    disabled={!tier.canUpgradeTo}
                    className={`
                        mt-6
                        w-full
                        rounded-2xl
                        py-3.5
                        text-sm
                        font-semibold
                        transition-all
                        duration-300
                        ${
                            tier.canUpgradeTo
                                ? `
                                    bg-gradient-to-r
                                    from-[#57B4FF]
                                    via-[#349FFF]
                                    to-[#197FEF]
                                    text-white
                                    shadow-lg
                                    shadow-blue-300/30
                                    hover:-translate-y-0.5
                                    hover:shadow-xl
                                    active:scale-[0.98]
                                `
                                : `
                                    cursor-not-allowed
                                    bg-slate-100
                                    text-slate-400
                                `
                        }
                    `}
                >
                    {tier.canUpgradeTo
                        ? "Upgrade Membership"
                        : "Upgrade Unavailable"}
                </button>
            )}

            {/* =====================================================
                MEMBERSHIP DETAILS
            ===================================================== */}
            <div className="mt-7 space-y-6">
                {/* =================================================
                    DAILY QUOTA
                ================================================= */}
                <TierQuotaTable
                    tasksPerDay={tier.tasksPerDay}
                    rewardPerTask={tier.rewardPerTask}
                    dailyRewardLimit={tier.dailyRewardLimit}
                />

                {/* =================================================
                    INVITATION COMMISSIONS
                ================================================= */}
                <TierInvitationTable
                    level1={tier.invitationCommissionLevel1}
                    level2={tier.invitationCommissionLevel2}
                    level3={tier.invitationCommissionLevel3}
                />

                {/* =================================================
                    ORDER COMMISSIONS
                ================================================= */}
                <TierOrderCommissionTable
                    level1={tier.orderCommissionLevel1}
                    level2={tier.orderCommissionLevel2}
                    level3={tier.orderCommissionLevel3}
                />
            </div>
        </div>
    );
}