"use client";

import {
    CheckCircle2,
    Circle,
} from "lucide-react";

import { ShareStatus } from "@/app/types/sharedTypes/shareStatus.types";

interface AdminShareLifecycleProps {
    status: ShareStatus;
}

export default function AdminShareLifecycle({
    status,
}: AdminShareLifecycleProps) {
    const steps = [
        {
            status: ShareStatus.STARTED,
            label: "Started",
            description:
                "Share created and waiting to be activated.",
        },
        {
            status: ShareStatus.IN_PROGRESS,
            label: "In Progress",
            description:
                "Share is active and available for investment.",
        },
        {
            status: ShareStatus.CLOSED,
            label: "Closed",
            description:
                "Share is no longer available for new investments.",
        },
    ];

    const currentIndex =
        steps.findIndex(
            (step) =>
                step.status === status,
        );

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="mb-6">
                <h2 className="text-base font-bold text-slate-900">
                    Lifecycle Status
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Track the current state of this share.
                </p>
            </div>

            <div className="space-y-5">

                {steps.map(
                    (
                        step,
                        index,
                    ) => {
                        const completed =
                            index <= currentIndex;

                        const active =
                            index === currentIndex;

                        return (
                            <div
                                key={step.status}
                                className="flex items-start gap-3"
                            >
                                <div className="relative flex shrink-0 items-center justify-center">

                                    {completed ? (
                                        <CheckCircle2
                                            size={22}
                                            className={
                                                active
                                                    ? "text-indigo-600"
                                                    : "text-emerald-500"
                                            }
                                        />
                                    ) : (
                                        <Circle
                                            size={22}
                                            className="text-slate-300"
                                        />
                                    )}

                                    {index <
                                        steps.length -
                                            1 && (
                                        <span
                                            className={`absolute left-1/2 top-6 h-7 w-px -translate-x-1/2 ${
                                                index <
                                                currentIndex
                                                    ? "bg-emerald-300"
                                                    : "bg-slate-200"
                                            }`}
                                        />
                                    )}
                                </div>

                                <div>
                                    <p
                                        className={`text-sm font-semibold ${
                                            active
                                                ? "text-indigo-700"
                                                : completed
                                                ? "text-slate-800"
                                                : "text-slate-400"
                                        }`}
                                    >
                                        {step.label}
                                    </p>

                                    <p className="mt-0.5 text-xs leading-5 text-slate-500">
                                        {
                                            step.description
                                        }
                                    </p>
                                </div>
                            </div>
                        );
                    },
                )}
            </div>
        </section>
    );
}