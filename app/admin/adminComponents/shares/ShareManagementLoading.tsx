"use client";

export default function ShareManagementLoading() {
    return (
        <div className="w-full animate-pulse space-y-4">
            {/* Desktop table loading */}
            <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white md:block">
                <div className="grid grid-cols-6 gap-4 border-b border-slate-200 bg-slate-50 px-6 py-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-4 rounded bg-slate-200"
                        />
                    ))}
                </div>

                {Array.from({ length: 6 }).map((_, rowIndex) => (
                    <div
                        key={rowIndex}
                        className="grid grid-cols-6 items-center gap-4 border-b border-slate-100 px-6 py-5 last:border-0"
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-slate-200" />

                            <div className="space-y-2">
                                <div className="h-4 w-28 rounded bg-slate-200" />
                                <div className="h-3 w-20 rounded bg-slate-100" />
                            </div>
                        </div>

                        <div className="h-4 w-16 rounded bg-slate-200" />

                        <div className="h-4 w-16 rounded bg-slate-200" />

                        <div className="h-6 w-20 rounded-full bg-slate-200" />

                        <div className="h-4 w-24 rounded bg-slate-100" />

                        <div className="flex justify-end gap-2">
                            <div className="h-9 w-9 rounded-lg bg-slate-200" />
                            <div className="h-9 w-9 rounded-lg bg-slate-200" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile cards loading */}
            <div className="grid gap-4 md:hidden">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border border-slate-200 bg-white p-4"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-xl bg-slate-200" />

                                <div className="space-y-2">
                                    <div className="h-4 w-28 rounded bg-slate-200" />
                                    <div className="h-3 w-20 rounded bg-slate-100" />
                                </div>
                            </div>

                            <div className="h-6 w-20 rounded-full bg-slate-200" />
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-3">
                            <div className="h-12 rounded-xl bg-slate-100" />
                            <div className="h-12 rounded-xl bg-slate-100" />
                        </div>

                        <div className="mt-4 h-10 w-full rounded-xl bg-slate-200" />
                    </div>
                ))}
            </div>
        </div>
    );
}