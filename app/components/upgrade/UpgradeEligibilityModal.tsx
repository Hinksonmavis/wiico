"use client";

import { useEffect, useState } from "react";
import { Loader2, ShieldCheck, X } from "lucide-react";

import {
    FailedUpgradeCheck,
    UpgradeCheck,
} from "@/app/types/clientTypes/upgrade.types";

import UpgradeValidationChecks from "./UpgradeValidationChecks";
import UpgradeValidationResult from "./UpgradeValidationResult";
import UpgradeSuccessModal from "./UpgradeSuccessModal";

interface UpgradeEligibilityModalProps {
    open: boolean;
    loading: boolean;
    canUpgrade: boolean;
    checks: UpgradeCheck[];
    failedChecks: FailedUpgradeCheck[];
    requestSubmitted?: boolean;
    onClose: () => void;
    onConfirm: () => void;
    onViewHistory: () => void;
}

export default function UpgradeEligibilityModal({
    open,
    loading,
    canUpgrade,
    checks,
    failedChecks,
    requestSubmitted = false,
    onClose,
    onConfirm,
    onViewHistory,
}: UpgradeEligibilityModalProps) {
    const [currentStep, setCurrentStep] = useState(-1);
    const [finished, setFinished] = useState(false);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);

    useEffect(() => {
        if (!open) {
            setCurrentStep(-1);
            setCompletedSteps([]);
            setFinished(false);
            return;
        }

        let index = 0;

        setCurrentStep(-1);
        setCompletedSteps([]);
        setFinished(false);

        const interval = setInterval(() => {
            setCurrentStep(index);

            setCompletedSteps((prev) =>
                prev.includes(index)
                    ? prev
                    : [...prev, index],
            );

            index++;

            if (index >= checks.length) {
                clearInterval(interval);

                setTimeout(() => {
                    setFinished(true);
                }, 450);
            }
        }, 700);

        return () => clearInterval(interval);
    }, [open, checks]);

    if (!open) return null;

    if (requestSubmitted) {
        return (
            <UpgradeSuccessModal
                onClose={onClose}
                onViewHistory={onViewHistory}
            />
        );
    }

    return (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm">
            <div
                className="
                    flex h-full w-full flex-col
                    bg-white
                    sm:mx-auto
                    sm:my-6
                    sm:h-[calc(100vh-48px)]
                    sm:max-h-[760px]
                    sm:w-[calc(100%-32px)]
                    sm:max-w-md
                    sm:rounded-[32px]
                    sm:shadow-[0_30px_80px_rgba(15,23,42,0.25)]
                    overflow-hidden
                "
            >
                <header
                    className="
                        relative shrink-0
                        overflow-hidden
                        bg-gradient-to-br
                        from-[#1590FC]
                        via-[#2EA4FF]
                        to-[#5DBEFF]
                        px-5
                        pb-7
                        pt-6
                        text-white
                        sm:px-6
                        sm:pt-7
                    "
                >
                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-16
                            -top-16
                            h-44
                            w-44
                            rounded-full
                            bg-white/15
                            blur-3xl
                        "
                    />

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        aria-label="Close"
                        className="
                            absolute
                            right-4
                            top-4
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            bg-white/15
                            text-white
                            transition
                            active:scale-95
                            hover:bg-white/20
                            disabled:pointer-events-none
                            disabled:opacity-40
                            sm:right-5
                            sm:top-5
                        "
                    >
                        <X size={18} />
                    </button>

                    <div
                        className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-white/15
                            backdrop-blur
                            sm:h-16
                            sm:w-16
                            sm:rounded-3xl
                        "
                    >
                        <ShieldCheck
                            size={28}
                            className="sm:h-8 sm:w-8"
                        />
                    </div>

                    <h2
                        className="
                            mt-5
                            pr-10
                            text-xl
                            font-bold
                            tracking-tight
                            sm:mt-6
                            sm:text-2xl
                        "
                    >
                        Upgrade Eligibility
                    </h2>

                    <p
                        className="
                            mt-2
                            max-w-sm
                            text-xs
                            leading-5
                            text-blue-100
                            sm:text-sm
                            sm:leading-6
                        "
                    >
                        We're securely verifying your
                        membership, wallet balance and
                        upgrade eligibility.
                    </p>
                </header>

                <div
                    className="
                        min-h-0
                        flex-1
                        overflow-y-auto
                        overscroll-contain
                        px-4
                        py-5
                        sm:px-6
                        sm:py-6
                    "
                >
                    <div className="space-y-5">
                        <UpgradeValidationChecks
                            checks={checks}
                            currentStep={currentStep}
                            completedSteps={completedSteps}
                        />

                        {finished && (
                            <UpgradeValidationResult
                                canUpgrade={canUpgrade}
                                failedChecks={failedChecks}
                            />
                        )}
                    </div>
                </div>

                <footer
                    className="
                        shrink-0
                        border-t
                        border-slate-100
                        bg-slate-50
                        px-4
                        pb-[max(1rem,env(safe-area-inset-bottom))]
                        pt-4
                        sm:px-6
                        sm:py-5
                    "
                >
                    {!finished ? (
                        <div
                            className="
                                flex
                                min-h-11
                                items-center
                                justify-center
                                gap-2.5
                                text-center
                            "
                        >
                            <Loader2
                                size={17}
                                className="shrink-0 animate-spin text-[#1590FC]"
                            />

                            <span className="text-xs font-medium text-slate-600 sm:text-sm">
                                Validating your upgrade eligibility...
                            </span>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={loading}
                                className="
                                    order-2
                                    h-12
                                    w-full
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    px-4
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    transition
                                    active:scale-[0.98]
                                    hover:bg-slate-100
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                    sm:order-1
                                    sm:flex-1
                                "
                            >
                                Close
                            </button>

                            {canUpgrade && (
                                <button
                                    type="button"
                                    onClick={onConfirm}
                                    disabled={loading}
                                    className="
                                        order-1
                                        h-12
                                        w-full
                                        rounded-2xl
                                        bg-[#1590FC]
                                        px-4
                                        text-sm
                                        font-semibold
                                        text-white
                                        shadow-lg
                                        shadow-blue-400/25
                                        transition
                                        active:scale-[0.98]
                                        hover:bg-[#0D86EE]
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                        sm:order-2
                                        sm:flex-1
                                    "
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Loader2
                                                size={16}
                                                className="animate-spin"
                                            />
                                            Creating Request...
                                        </span>
                                    ) : (
                                        "Submit Upgrade"
                                    )}
                                </button>
                            )}
                        </div>
                    )}
                </footer>
            </div>
        </div>
    );
}