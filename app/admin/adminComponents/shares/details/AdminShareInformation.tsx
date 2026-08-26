"use client";

import {
    FileText,
    Image as ImageIcon,
    Tag,
} from "lucide-react";

import { AdminShare } from "@/app/types/adminTypes/share.types";

interface AdminShareInformationProps {
    share: AdminShare;
}

export default function AdminShareInformation({
    share,
}: AdminShareInformationProps) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="mb-5">
                <h2 className="text-base font-bold text-slate-900">
                    Share Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Basic information about this share.
                </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">

                <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <Tag size={17} />
                    </div>

                    <div>
                        <p className="text-xs font-medium text-slate-400">
                            Name
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-900">
                            {share.name}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <ImageIcon size={17} />
                    </div>

                    <div>
                        <p className="text-xs font-medium text-slate-400">
                            Logo
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-900">
                            {share.logo
                                ? "Uploaded"
                                : "No logo"}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3 sm:col-span-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <FileText size={17} />
                    </div>

                    <div>
                        <p className="text-xs font-medium text-slate-400">
                            Description
                        </p>

                        <p className="mt-1 text-sm leading-6 text-slate-700">
                            {share.description ||
                                "No description provided."}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}