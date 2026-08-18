"use client";

import {
    UserRound,
    ShieldCheck,
} from "lucide-react";

interface ProfileIdentityCardProps {
    phone?: string;
    country?: string;
}

export default function ProfileIdentityCard({
    phone,
    country,
}: ProfileIdentityCardProps) {
    const initial = phone?.charAt(0).toUpperCase() ?? "U";

    return (
        <section
            className="
                overflow-hidden
                rounded-[24px]
                border
                border-slate-200/80
                bg-white
                shadow-[0_8px_30px_rgba(15,23,42,0.05)]
            "
        >
            <div className="relative px-5 py-5">
                {/* Subtle background accent */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-slate-100/80 blur-2xl" />

                <div className="relative flex items-center gap-4">
                    {/* Avatar */}
                    <div
                        className="
                            flex
                            h-14
                            w-14
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-slate-200
                            bg-slate-100
                            text-slate-500
                            shadow-inner
                        "
                    >
                        {phone ? (
                            <span className="text-lg font-semibold">
                                {initial}
                            </span>
                        ) : (
                            <UserRound
                                className="h-6 w-6"
                                strokeWidth={1.7}
                            />
                        )}
                    </div>

                    {/* Identity */}
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-[16px] font-semibold tracking-tight text-slate-900">
                            {phone || "Your profile"}
                        </p>

                        <div className="mt-1.5 flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                            <p className="truncate text-[12px] font-medium text-slate-500">
                                {country || "Nigeria"}
                            </p>
                        </div>
                    </div>

                    {/* Account status */}
                    <div
                        className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-emerald-50
                            text-emerald-600
                        "
                    >
                        <ShieldCheck
                            className="h-4 w-4"
                            strokeWidth={1.8}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}