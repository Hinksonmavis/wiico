"use client";

import {
    Plus,
    Layers3,
} from "lucide-react";

interface ShareManagementHeaderProps {
    onCreate: () => void;
}

export default function ShareManagementHeader({
    onCreate,
}: ShareManagementHeaderProps) {

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Layers3 size={21} />
                </div>

                <div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                        Shares
                    </h1>

                    <p className="mt-0.5 text-sm text-slate-500">
                        Manage investment share plans
                    </p>
                </div>

            </div>

            <button
                type="button"
                onClick={onCreate}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98] sm:w-auto"
            >
                <Plus size={18} />

                Create Share
            </button>

        </div>
    );
}