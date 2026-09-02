"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import MembershipHero from "@/app/components/membership/membershipIdComponents/MembershipHero";
import MembershipPriceCard from "@/app/components/membership/membershipIdComponents/MembershipPriceCard";
import MembershipBenefits from "@/app/components/membership/membershipIdComponents/MembershipBenefits";
import MembershipRequirements from "@/app/components/membership/membershipIdComponents/MembershipRequirements";

import UpgradeActionCard from "@/app/components/upgrade/UpgradeActionCard";
import UpgradeEligibilityModal from "@/app/components/upgrade/UpgradeEligibilityModal";

import { ROUTES } from "@/app/constants/routes";
import { PaymentMethod } from "@/app/types/clientTypes/upgrade.types";

import { useMembership } from "@/app/hooks/clientHooks/membershipHooks/useMembership";
import { useValidateUpgrade } from "@/app/hooks/clientHooks/upgradeHooks/useValidateUpgrade";
import { useCreateUpgradeRequest } from "@/app/hooks/clientHooks/upgradeHooks/useCreateUpgradeRequest";
import { useCurrentMembership } from "@/app/hooks/clientHooks/membershipHooks/useCurrentMembership";

export default function MembershipDetailsPage() {
    const router = useRouter();
    const params = useParams();

    const slug = useMemo(() => {
        const value = params.membershipId;
        return Array.isArray(value)
            ? value[0] ?? ""
            : value ?? "";
    }, [params]);

    const { data: tier, isLoading } = useMembership(slug);

    const {
        data: currentMembership,
        isLoading: currentMembershipLoading,
    } = useCurrentMembership();

    const [open, setOpen] = useState(false);
    const [requestSubmitted, setRequestSubmitted] =
        useState(false);

    const {
        data: validation,
        refetch: validateUpgrade,
    } = useValidateUpgrade(tier?.id ?? "");

    const isCurrentMembership = 
        tier?.id === currentMembership?.id;

    const createUpgrade = useCreateUpgradeRequest();

    async function handleStartUpgrade() {
        if (!tier || isCurrentMembership) return;

        setRequestSubmitted(false);
        setOpen(true);

        const result = await validateUpgrade();

        if (result.isError) {
            toast.error(
                "Unable to verify your upgrade eligibility. Please try again.",
            );
        }
    }

    async function handleUpgrade() {
        if (!tier || !validation?.canUpgrade) return;

        try {
            await createUpgrade.mutateAsync({
                requestedMembershipPlanId: tier.id,
                paymentMethod: PaymentMethod.WALLET,
            });

            setRequestSubmitted(true);
        } catch (error) {
            console.error(
                "UPGRADE REQUEST ERROR:",
                error,
            );

            toast.error(
                "We couldn't submit your upgrade request. Please try again.",
            );
        }
    }

    function handleCloseModal() {
        if (createUpgrade.isPending) return;

        setOpen(false);
        setRequestSubmitted(false);
    }

    function handleViewHistory() {
        setOpen(false);
        setRequestSubmitted(false);
        router.push(ROUTES.UPGRADE_HISTORY);
    }

    if (isLoading || currentMembershipLoading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50">
                <p className="text-sm text-slate-500">
                    Loading membership...
                </p>
            </main>
        );
    }

    if (!tier) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
                <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Membership unavailable
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        The membership you are trying to view
                        could not be found.
                    </p>

                    <Link
                        href={ROUTES.MEMBERS}
                        className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#1592FF] px-5 text-sm font-semibold text-white"
                    >
                        <ArrowLeft size={16} />
                        Back to Memberships
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <>
            <main className="min-h-screen bg-slate-50">
                <MembershipHero
                    tier={tier}
                    isCurrent={isCurrentMembership}
                    onBack={() => router.back()}
                />

                <section className="-mt-8 mx-auto flex w-full max-w-md flex-col gap-4 px-4 pb-24">
                    <MembershipPriceCard
                        price={Number(tier.upgradePrice)}
                    />

                    <MembershipBenefits tier={tier} />

                    <MembershipRequirements tier={tier} />

                    {!isCurrentMembership && (
                        <UpgradeActionCard
                            loading={createUpgrade.isPending}
                            disabled={!tier.canUpgradeTo}
                            onUpgrade={handleStartUpgrade}
                        />
                    )}
                </section>
            </main>

            {open && validation && (
                <UpgradeEligibilityModal
                    open={open}
                    checks={validation.checks}
                    failedChecks={validation.failedChecks}
                    canUpgrade={validation.canUpgrade}
                    loading={createUpgrade.isPending}
                    requestSubmitted={requestSubmitted}
                    onClose={handleCloseModal}
                    onConfirm={handleUpgrade}
                    onViewHistory={handleViewHistory}
                />
            )}
        </>
    );
}