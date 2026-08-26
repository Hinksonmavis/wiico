import { ShareStatus } from "@/app/types/sharedTypes/shareStatus.types";

const config: Record<ShareStatus, { label: string; className: string }> = {
    [ShareStatus.STARTED]: {
        label: "Started",
        className: "bg-slate-100 text-slate-600 ring-slate-200",
    },
    [ShareStatus.IN_PROGRESS]: {
        label: "Available",
        className: "bg-blue-50 text-blue-700 ring-blue-200",
    },
    [ShareStatus.CLOSED]: {
        label: "Closed",
        className: "bg-slate-100 text-slate-600 ring-slate-200",
    },
};

export default function ShareStatusBadge({ status }: { status: ShareStatus }) {
    const item = config[status];
    return (
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${item.className}`}>
            {item.label}
        </span>
    );
}