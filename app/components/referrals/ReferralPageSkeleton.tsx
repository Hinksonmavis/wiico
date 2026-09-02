"use client";

export default function ReferralPageSkeleton() {

    return (
        <div className="animate-pulse space-y-4">

            <div className="h-40 rounded-2xl bg-slate-200" />

            <div className="grid grid-cols-2 gap-3">

                {Array.from({
                    length: 4,
                }).map((_, index) => (
                    <div
                        key={index}
                        className="h-28 rounded-2xl bg-slate-200"
                    />
                ))}

            </div>

            <div className="h-48 rounded-2xl bg-slate-200" />

            <div className="h-12 rounded-xl bg-slate-200" />

            <div className="space-y-3">

                {Array.from({
                    length: 3,
                }).map((_, index) => (
                    <div
                        key={index}
                        className="h-20 rounded-2xl bg-slate-200"
                    />
                ))}

            </div>

        </div>
    );
}