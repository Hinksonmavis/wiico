"use client";

import {
    CheckCircle2,
    Loader2,
    XCircle,
} from "lucide-react";

import {
    UpgradeCheck,
} from "@/app/types/clientTypes/upgrade.types";

interface UpgradeValidationChecksProps {
    checks:
        | UpgradeCheck[]
        | undefined
        | null;

    currentStep: number;

    completedSteps: number[];
}

// ============================================================
// STATUS RESOLUTION
// ============================================================

type CheckStatus =
    | "pending"
    | "active"
    | "passed"
    | "failed";

function resolveStatus(
    index: number,
    passed: boolean,
    currentStep: number,
    completedSteps: number[],
): CheckStatus {

    const completed =
        completedSteps.includes(index);

    if (completed) {
        return passed
            ? "passed"
            : "failed";
    }

    if (currentStep === index) {
        return "active";
    }

    return "pending";
}

// ============================================================
// STATUS STYLES
// ============================================================

const STATUS_STYLES: Record<CheckStatus, {
    container: string;
    icon: string;
    title: string;
    badge: string;
    label: string | null;
}> = {
    pending: {
        container: "border-slate-200/70 bg-white/70",
        icon: "border-slate-200 text-slate-300",
        title: "text-slate-900",
        badge: "",
        label: null,
    },
    active: {
        container: "border-blue-200/80 bg-blue-50/60 shadow-sm",
        icon: "border-blue-200 text-[#1590FC]",
        title: "text-slate-900",
        badge: "",
        label: null,
    },
    passed: {
        container: "border-emerald-200/70 bg-emerald-50/70",
        icon: "border-emerald-200 text-emerald-500",
        title: "text-emerald-800",
        badge: "bg-emerald-100/80 text-emerald-600",
        label: "Passed",
    },
    failed: {
        container: "border-red-200/70 bg-red-50/70",
        icon: "border-red-200 text-red-500",
        title: "text-red-800",
        badge: "bg-red-100/80 text-red-600",
        label: "Failed",
    },
};

// ============================================================
// STATUS ICON
// ============================================================

function StatusIcon({
    status,
}: {
    status: CheckStatus;
}) {

    if (status === "active") {
        return (
            <Loader2
                size={19}
                className="animate-spin"
            />
        );
    }

    if (status === "passed") {
        return <CheckCircle2 size={21} />;
    }

    if (status === "failed") {
        return <XCircle size={21} />;
    }

    return (
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
    );
}

// ============================================================
// VALIDATION CHECKS
// ============================================================

export default function UpgradeValidationChecks({
    checks,
    currentStep,
    completedSteps,
}: UpgradeValidationChecksProps) {

    /*
     * The backend should always return an array
     * for `checks`.
     *
     * However, protect the UI against:
     * - undefined
     * - null
     * - malformed API responses
     * - unexpected response shapes
     */
    const safeChecks =
        Array.isArray(checks)
            ? checks
            : [];

    if (safeChecks.length === 0) {
        return (
            <div
                className="
                    rounded-[22px]
                    border
                    border-slate-200/70
                    bg-white/70
                    p-5
                    text-center
                    backdrop-blur-2xl
                "
            >
                <p className="text-sm font-medium text-slate-600">
                    No validation checks available.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">

            {safeChecks.map((check, index) => {

                const status =
                    resolveStatus(
                        index,
                        check.passed,
                        currentStep,
                        completedSteps,
                    );

                const styles =
                    STATUS_STYLES[status];

                return (
                    <div
                        key={check.key}
                        className={`
                            relative
                            overflow-hidden
                            rounded-[22px]
                            border
                            p-4
                            backdrop-blur-2xl
                            transition-all
                            duration-500
                            ${styles.container}
                        `}
                    >

                        {/* Active background effect */}
                        {status === "active" && (
                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    bg-gradient-to-r
                                    from-blue-400/5
                                    via-transparent
                                    to-white/20
                                "
                            />
                        )}

                        <div className="relative flex items-center gap-3.5">

                            {/* =================================================
                                STATUS ICON
                            ================================================== */}

                            <div
                                className={`
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-[16px]
                                    border
                                    bg-white/70
                                    shadow-sm
                                    backdrop-blur-xl
                                    ${styles.icon}
                                `}
                            >
                                <StatusIcon status={status} />
                            </div>

                            {/* =================================================
                                CHECK INFORMATION
                            ================================================== */}

                            <div className="min-w-0 flex-1">

                                <h3
                                    className={`
                                        text-[13px]
                                        font-semibold
                                        tracking-[-0.01em]
                                        ${styles.title}
                                    `}
                                >
                                    {check.title}
                                </h3>

                                <p className="mt-1 text-[11px] leading-[1.45] text-slate-500">
                                    {check.description}
                                </p>

                            </div>

                            {/* =================================================
                                STATUS LABEL
                            ================================================== */}

                            {styles.label && (
                                <div
                                    className={`
                                        hidden
                                        shrink-0
                                        rounded-full
                                        px-2
                                        py-1
                                        text-[9px]
                                        font-bold
                                        uppercase
                                        tracking-wider
                                        sm:block
                                        ${styles.badge}
                                    `}
                                >
                                    {styles.label}
                                </div>
                            )}

                        </div>

                    </div>
                );
            })}

        </div>
    );
}