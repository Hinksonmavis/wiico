"use client";

import {
    Search,
    X,
} from "lucide-react";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function TransactionSearch({
    value,
    onChange,
}: Props) {
    return (
        <div className="w-full">
            <div
                className="
                    group
                    flex
                    h-12
                    w-full
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    shadow-[0_2px_10px_rgba(15,23,42,0.03)]
                    transition-all
                    duration-200
                    focus-within:border-slate-300
                    focus-within:shadow-[0_4px_18px_rgba(15,23,42,0.06)]
                "
            >
                <div
                    className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-slate-100
                        text-slate-500
                        transition-colors
                        group-focus-within:bg-slate-900
                        group-focus-within:text-white
                    "
                >
                    <Search
                        size={16}
                        strokeWidth={2.2}
                    />
                </div>

                <input
                    type="text"
                    value={value}
                    onChange={(event) =>
                        onChange(event.target.value)
                    }
                    placeholder="Search by reference, type or description..."
                    autoComplete="off"
                    className="
                        min-w-0
                        flex-1
                        bg-transparent
                        text-[12px]
                        text-slate-900
                        outline-none
                        placeholder:text-slate-400
                    "
                />

                {value && (
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        aria-label="Clear search"
                        className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            text-slate-400
                            transition
                            hover:bg-slate-100
                            hover:text-slate-700
                            active:scale-90
                        "
                    >
                        <X
                            size={16}
                            strokeWidth={2.2}
                        />
                    </button>
                )}
            </div>
        </div>
    );
}