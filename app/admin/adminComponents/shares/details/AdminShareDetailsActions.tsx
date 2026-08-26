"use client";

import {
    Settings2,
} from "lucide-react";

interface AdminShareDetailsActionsProps {
    onManage: () => void;
}

export default function AdminShareDetailsActions({
    onManage,
}: AdminShareDetailsActionsProps) {

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

            <div className="flex items-center justify-between gap-4">

                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <div className="min-w-0">

                    <h2 className="text-sm font-semibold text-slate-900">
                        Share Actions
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                        Manage the lifecycle of this share.
                    </p>

                </div>


                {/* =================================================
                    MANAGE BUTTON
                ================================================= */}

                <button
                    type="button"
                    onClick={onManage}
                    className="
                        inline-flex
                        h-10
                        shrink-0
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-slate-900
                        px-4
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-slate-800
                        active:scale-[0.98]
                    "
                >

                    <Settings2 size={16} />

                    <span className="hidden sm:inline">
                        Manage Share
                    </span>

                    <span className="sm:hidden">
                        Manage
                    </span>

                </button>

            </div>

        </section>
    );
}