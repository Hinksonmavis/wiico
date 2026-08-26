import { ShareStatus } from "@/app/types/sharedTypes/shareStatus.types";

interface ShareStatusBadgeProps {
    status: ShareStatus;
}

const STATUS_CONFIG: Record<
    ShareStatus,
    {
        label: string;
        className: string;
    }
> = {
    [ShareStatus.STARTED]: {
        label: "Started",
        className:
            "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    },

    [ShareStatus.IN_PROGRESS]: {
        label: "In Progress",
        className:
            "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    },

    [ShareStatus.CLOSED]: {
        label: "Closed",
        className:
            "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
    },
};

export default function ShareStatusBadge({
    status,
}: ShareStatusBadgeProps) {
    const normalizedStatus =
        typeof status === "string"
            ? status.trim().toLowerCase()
            : status;

    const config =
        STATUS_CONFIG[
            normalizedStatus as ShareStatus
        ];

    if (!config) {
        console.error(
            "Unknown share status:",
            JSON.stringify(status),
        );

        return (
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
                Unknown
            </span>
        );
    }

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${config.className}`}
        >
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
            {config.label}
        </span>
    );
}