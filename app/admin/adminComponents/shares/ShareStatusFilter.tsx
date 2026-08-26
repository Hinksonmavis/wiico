"use client";

import { ShareStatus } from "@/app/types/sharedTypes/shareStatus.types";

interface ShareStatusFilterProps {
    value: ShareStatus | "ALL";
    onChange: (
        value: ShareStatus | "ALL",
    ) => void;
}

export default function ShareStatusFilter({
    value,
    onChange,
}: ShareStatusFilterProps) {

    return (
        <select
            value={value}
            onChange={(event) => {
                const selectedValue =
                    event.target.value;

                onChange(
                    selectedValue === "ALL"
                        ? "ALL"
                        : selectedValue as ShareStatus,
                );
            }}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-44"
        >
            <option value="ALL">
                All statuses
            </option>

            <option value={ShareStatus.STARTED}>
                Started
            </option>

            <option value={ShareStatus.IN_PROGRESS}>
                In Progress
            </option>

            <option value={ShareStatus.CLOSED}>
                Closed
            </option>
        </select>
    );
}