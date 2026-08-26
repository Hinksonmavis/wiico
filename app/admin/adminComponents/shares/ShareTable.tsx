"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    CalendarDays,
} from "lucide-react";

import {
    AdminShare,
} from "@/app/types/adminTypes/share.types";

import ShareStatusBadge from "./ShareStatusBadge";
import ShareActions from "./ShareActions";

interface ShareTableProps {
    shares: AdminShare[];

    onView?: (share: AdminShare) => void;
    onEdit?: (share: AdminShare) => void;
    onStart?: (share: AdminShare) => void;
    onClose?: (share: AdminShare) => void;
    onDelete?: (share: AdminShare) => void;
}

export default function ShareTable({
    shares,
}: ShareTableProps) {

    const router = useRouter();

    const handleRowClick = (
        shareId: string,
    ) => {
        router.push(
            `/admin/shares/${shareId}`,
        );
    };

    return (
        <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">

            <div className="overflow-x-auto">

                <table className="w-full min-w-[900px]">

                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/70">

                            <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Share
                            </th>

                            <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Return
                            </th>

                            <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Cycle
                            </th>

                            <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Status
                            </th>

                            <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Created
                            </th>

                            <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Actions
                            </th>

                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">

                        {shares.map((share) => (

                            <tr
                                key={share.id}
                                onClick={() =>
                                    handleRowClick(
                                        share.id,
                                    )
                                }
                                className="cursor-pointer transition hover:bg-slate-50/60"
                            >

                                {/* SHARE */}

                                <td className="px-5 py-4">

                                    <div className="flex items-center gap-3">

                                        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100">

                                            {share.logo ? (
                                                <Image
                                                    src={share.logo}
                                                    alt={share.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <span className="font-bold text-slate-500">
                                                    {share.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </span>
                                            )}

                                        </div>

                                        <div className="min-w-0">

                                            <p className="font-semibold text-slate-900">
                                                {share.name}
                                            </p>

                                            <p className="max-w-[260px] truncate text-xs text-slate-500">
                                                {share.description ||
                                                    "No description"}
                                            </p>

                                        </div>

                                    </div>

                                </td>


                                {/* RETURN */}

                                <td className="px-5 py-4">

                                    <span className="font-semibold text-slate-900">
                                        {share.dailyReturnPercentage}%
                                    </span>

                                    <span className="ml-1 text-xs text-slate-500">
                                        daily
                                    </span>

                                </td>


                                {/* CYCLE */}

                                <td className="px-5 py-4 text-sm font-medium text-slate-700">
                                    {share.cycleDays} days
                                </td>


                                {/* STATUS */}

                                <td className="px-5 py-4">

                                    <ShareStatusBadge
                                        status={share.status}
                                    />

                                </td>


                                {/* CREATED */}

                                <td className="px-5 py-4">

                                    <div className="flex items-center gap-1.5 text-sm text-slate-600">

                                        <CalendarDays
                                            size={15}
                                        />

                                        {new Date(
                                            share.createdAt,
                                        ).toLocaleDateString()}

                                    </div>

                                </td>


                                {/* ACTIONS */}

                                <td
                                    className="px-5 py-4"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                    }}
                                >

                                    <div className="flex justify-end">

                                        <ShareActions
                                            shareId={share.id}
                                            shareName={share.name}
                                            status={share.status}
                                        />

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}