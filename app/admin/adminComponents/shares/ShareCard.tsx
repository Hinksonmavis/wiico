"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    ArrowUpRight,
    CalendarDays,
    Clock3,
    Percent,
} from "lucide-react";

import {
    AdminShare,
} from "@/app/types/adminTypes/share.types";

import ShareStatusBadge from "./ShareStatusBadge";
import ShareActions from "./ShareActions";

interface ShareCardProps {
    share: AdminShare;

    onView?: () => void;
    onEdit?: () => void;
    onStart?: () => void;
    onClose?: () => void;
    onDelete?: () => void;
}

export default function ShareCard({
    share,
}: ShareCardProps) {

    const router = useRouter();

    const handleOpenDetails = () => {
        router.push(
            `/admin/shares/${share.id}`,
        );
    };

    console.log("Share status:", share.status);

    return (
        <article
            role="link"
            tabIndex={0}
            onClick={handleOpenDetails}
            onKeyDown={(event) => {
                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {
                    event.preventDefault();
                    handleOpenDetails();
                }
            }}
            className="
                group
                cursor-pointer
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                shadow-sm
                transition
                duration-200
                hover:-translate-y-0.5
                hover:border-slate-300
                hover:shadow-md
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500/20
                active:scale-[0.99]
            "
        >

            {/* HEADER */}

            <div className="flex items-start justify-between gap-3">

                <div className="flex min-w-0 items-center gap-3">

                    {/* LOGO */}

                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50">

                        {share.logo ? (
                            <Image
                                src={share.logo}
                                alt={share.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                            />
                        ) : (
                            <span className="text-lg font-bold text-slate-500">
                                {share.name
                                    .charAt(0)
                                    .toUpperCase()}
                            </span>
                        )}

                    </div>


                    {/* NAME */}

                    <div className="min-w-0">

                        <div className="flex items-center gap-1.5">

                            <h3 className="truncate text-sm font-bold text-slate-900">
                                {share.name}
                            </h3>

                            <ArrowUpRight
                                size={15}
                                className="
                                    shrink-0
                                    text-slate-300
                                    transition
                                    group-hover:text-indigo-500
                                "
                            />

                        </div>

                        <p className="mt-0.5 truncate text-xs text-slate-500">
                            {share.description ||
                                "No description"}
                        </p>

                    </div>

                </div>


                {/* STATUS */}

                <div
                    onClick={(event) =>
                        event.stopPropagation()
                    }
                >
                    <ShareStatusBadge
                        status={share.status}
                    />
                </div>

            </div>


            {/* PRIMARY FINANCIAL METRIC */}

            <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50/60 p-3.5">

                <div className="flex items-center justify-between">

                    <div>

                        <div className="flex items-center gap-1.5 text-xs font-medium text-indigo-600">

                            <Percent size={14} />

                            Daily return

                        </div>

                        <p className="mt-1 text-xl font-bold tracking-tight text-slate-900">
                            {share.dailyReturnPercentage}%
                        </p>

                    </div>


                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">

                        <ArrowUpRight
                            size={18}
                        />

                    </div>

                </div>

            </div>


            {/* SHARE TERMS */}

            <div className="mt-3 grid grid-cols-2 gap-3">

                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">

                    <div className="flex items-center gap-1.5 text-xs text-slate-500">

                        <Clock3
                            size={14}
                            className="shrink-0"
                        />

                        Cycle

                    </div>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                        {share.cycleDays} days
                    </p>

                </div>


                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">

                    <div className="flex items-center gap-1.5 text-xs text-slate-500">

                        <CalendarDays
                            size={14}
                            className="shrink-0"
                        />

                        Created

                    </div>

                    <p className="mt-1 truncate text-sm font-bold text-slate-900">
                        {new Date(
                            share.createdAt,
                        ).toLocaleDateString(
                            undefined,
                            {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            },
                        )}
                    </p>

                </div>

            </div>


            {/* ACTIONS */}

            <div
                className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >

                <span className="text-xs font-medium text-slate-400">
                    Share management
                </span>

                <ShareActions
                    shareId={share.id}
                    shareName={share.name}
                    status={share.status}
                />

            </div>

        </article>
    );
}