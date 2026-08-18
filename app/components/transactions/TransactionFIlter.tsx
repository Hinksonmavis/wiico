"use client";

const filters = [
    "All",
    "Deposits",
    "Withdrawals",
    "Rewards",
    "Referral",
    "Membership",
];

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function TransactionFilter({
    value,
    onChange,
}: Props) {
    return (
        <div className="w-full">
            <div
                className="
                    flex
                    w-full
                    gap-2
                    overflow-x-auto
                    overscroll-x-contain
                    pb-1
                    [-ms-overflow-style:none]
                    [scrollbar-width:none]
                    [&::-webkit-scrollbar]:hidden
                "
            >
                {filters.map((filter) => {
                    const active = filter === value;

                    return (
                        <button
                            key={filter}
                            type="button"
                            onClick={() => onChange(filter)}
                            className={`
                                shrink-0
                                rounded-xl
                                px-4
                                py-2.5
                                text-[13px]
                                font-semibold
                                whitespace-nowrap
                                transition-all
                                duration-200
                                active:scale-[0.96]

                                ${
                                    active
                                        ? `
                                            bg-slate-900
                                            text-white
                                            shadow-[0_3px_10px_rgba(15,23,42,0.14)]
                                        `
                                        : `
                                            border
                                            border-slate-200
                                            bg-white
                                            text-slate-600
                                            hover:border-slate-300
                                            hover:bg-slate-50
                                            hover:text-slate-900
                                        `
                                }
                            `}
                        >
                            {filter}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}