"use client";

import {
    Search,
    X,
} from "lucide-react";

interface ShareSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export default function ShareSearch({
    value,
    onChange,
}: ShareSearchProps) {

    return (
        <div className="relative w-full">

            <Search
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
                type="text"
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                placeholder="Search shares..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            {value && (
                <button
                    type="button"
                    onClick={() => onChange("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                    aria-label="Clear search"
                >
                    <X size={16} />
                </button>
            )}

        </div>
    );
}