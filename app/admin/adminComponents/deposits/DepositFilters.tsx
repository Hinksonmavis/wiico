"use client";

import { Search, X } from "lucide-react";

import type { DepositTab } from "../../deposits/page";

interface DepositFiltersProps {
    activeTab: DepositTab;
    onTabChange: (
        tab: DepositTab,
    ) => void;

    search: string;

    onSearchChange: (
        value: string,
    ) => void;
}

const TABS: {
    value: DepositTab;
    label: string;
}[] = [
    {
        value: "pending",
        label: "Pending",
    },
    {
        value: "approved",
        label: "Approved",
    },
    {
        value: "declined",
        label: "Declined",
    },
    {
        value: "cancelled",
        label: "Cancelled",
    },
    {
        value: "all",
        label: "All",
    },
];

export default function DepositFilters({
    activeTab,
    onTabChange,
    search,
    onSearchChange,
}: DepositFiltersProps) {
    return (
        <div className="flex flex-col gap-3">

            {/* Search */}

            <div className="relative">

                <Search
                    size={16}
                    strokeWidth={2.25}
                    className="
                        pointer-events-none
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                    "
                />

                <input
                    type="text"
                    inputMode="search"
                    value={search}
                    onChange={(event) =>
                        onSearchChange(
                            event.target.value,
                        )
                    }
                    placeholder="Search reference, name, bank"
                    className="
                        h-10
                        w-full
                        rounded-[10px]
                        border-none
                        bg-slate-100
                        pl-9
                        pr-9
                        text-[15px]
                        text-slate-900
                        outline-none
                        placeholder:text-slate-400
                        focus:bg-white
                        focus:ring-2
                        focus:ring-blue-500/40
                    "
                />

                {search && (
                    <button
                        type="button"
                        onClick={() =>
                            onSearchChange("")
                        }
                        className="
                            absolute
                            right-2.5
                            top-1/2
                            flex
                            h-5
                            w-5
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            bg-slate-300
                            text-white
                            active:scale-90
                        "
                        aria-label="Clear search"
                    >
                        <X
                            size={11}
                            strokeWidth={3}
                        />
                    </button>
                )}

            </div>

            {/* Tabs */}

            <div className="-mx-4 overflow-x-auto px-4">
                <div
                    className="
                        flex
                        w-max
                        gap-1
                        rounded-[10px]
                        bg-slate-100
                        p-1
                    "
                >
                    {TABS.map((tab) => (
                        <button
                            key={tab.value}
                            type="button"
                            onClick={() =>
                                onTabChange(
                                    tab.value,
                                )
                            }
                            className={`
                                min-w-[82px]
                                rounded-[8px]
                                px-3
                                py-1.5
                                text-[13px]
                                font-semibold
                                transition-all
                                active:scale-[0.97]

                                ${
                                    activeTab ===
                                    tab.value
                                        ? "bg-white text-slate-900 shadow-sm"
                                        : "text-slate-500"
                                }
                            `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
}