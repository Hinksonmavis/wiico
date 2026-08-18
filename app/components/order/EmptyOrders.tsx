"use client";

import {
    CheckCircle2,
    Inbox,
    Sparkles,
    Clock3,
} from "lucide-react";

import { TodayOrderState } from "@/app/types/clientTypes/order.types";

interface EmptyOrdersProps {
    state: TodayOrderState;
}

export default function EmptyOrders({
    state,
}: EmptyOrdersProps) {
    const isCompleted = state === "COMPLETED";

    return (
        <section
            className="
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-slate-200/80
                bg-white
                px-5
                py-10
                shadow-[0_8px_30px_rgba(15,23,42,0.04)]
                sm:px-8
                sm:py-12
            "
        >
            {/* Soft decorative background */}

            <div
                className={`
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    h-40
                    w-40
                    rounded-full
                    blur-3xl
                    ${
                        isCompleted
                            ? "bg-emerald-100/70"
                            : "bg-slate-100"
                    }
                `}
            />

            <div
                className={`
                    pointer-events-none
                    absolute
                    -bottom-20
                    -left-16
                    h-40
                    w-40
                    rounded-full
                    blur-3xl
                    ${
                        isCompleted
                            ? "bg-teal-50"
                            : "bg-slate-50"
                    }
                `}
            />

            <div className="relative flex flex-col items-center text-center">

                {/* Status icon */}

                <div
                    className={`
                        relative
                        flex
                        h-[76px]
                        w-[76px]
                        items-center
                        justify-center
                        rounded-[24px]
                        ${
                            isCompleted
                                ? "bg-emerald-50"
                                : "bg-slate-50"
                        }
                    `}
                >
                    <div
                        className={`
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-[18px]
                            ${
                                isCompleted
                                    ? "bg-emerald-100"
                                    : "bg-slate-100"
                            }
                        `}
                    >
                        {isCompleted ? (
                            <CheckCircle2
                                className="
                                    h-7
                                    w-7
                                    text-emerald-600
                                "
                                strokeWidth={2.2}
                            />
                        ) : (
                            <Inbox
                                className="
                                    h-7
                                    w-7
                                    text-slate-500
                                "
                                strokeWidth={2}
                            />
                        )}
                    </div>

                    {/* Small status indicator */}

                    {isCompleted && (
                        <span
                            className="
                                absolute
                                -right-1
                                -top-1
                                flex
                                h-6
                                w-6
                                items-center
                                justify-center
                                rounded-full
                                border-[3px]
                                border-white
                                bg-emerald-500
                            "
                        >
                            <CheckCircle2
                                className="h-3 w-3 text-white"
                                strokeWidth={3}
                            />
                        </span>
                    )}
                </div>

                {/* Eyebrow */}

                <div
                    className={`
                        mt-6
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        px-3
                        py-1.5
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        ${
                            isCompleted
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-slate-100 text-slate-500"
                        }
                    `}
                >
                    {isCompleted ? (
                        <>
                            <Sparkles className="h-3.5 w-3.5" />
                            Day complete
                        </>
                    ) : (
                        <>
                            <Clock3 className="h-3.5 w-3.5" />
                            Waiting for tasks
                        </>
                    )}
                </div>

                {/* Heading */}

                <h2
                    className="
                        mt-4
                        max-w-sm
                        text-[21px]
                        font-bold
                        leading-tight
                        tracking-[-0.02em]
                        text-slate-900
                        sm:text-2xl
                    "
                >
                    {isCompleted
                        ? "Nice work — you're done for today!"
                        : "Nothing to work on right now"}
                </h2>

                {/* Description */}

                <p
                    className="
                        mt-3
                        max-w-sm
                        text-[13px]
                        leading-6
                        text-slate-500
                        sm:text-sm
                    "
                >
                    {isCompleted
                        ? "You've completed all the tasks assigned to you today. Your rewards have been processed, and a fresh batch will be available when your next daily cycle begins."
                        : "There aren't any advertisements available for you right now. No action is needed — check back later for new tasks."}
                </p>

                {/* Bottom information */}

                <div
                    className={`
                        mt-7
                        flex
                        w-full
                        max-w-sm
                        items-center
                        gap-3
                        rounded-2xl
                        border
                        px-4
                        py-3.5
                        text-left
                        ${
                            isCompleted
                                ? "border-emerald-100 bg-emerald-50/70"
                                : "border-slate-100 bg-slate-50/80"
                        }
                    `}
                >
                    <div
                        className={`
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            ${
                                isCompleted
                                    ? "bg-white text-emerald-600"
                                    : "bg-white text-slate-500"
                            }
                        `}
                    >
                        {isCompleted ? (
                            <CheckCircle2
                                className="h-4.5 w-4.5"
                                strokeWidth={2.2}
                            />
                        ) : (
                            <Clock3
                                className="h-4.5 w-4.5"
                                strokeWidth={2}
                            />
                        )}
                    </div>

                    <div className="min-w-0">
                        <p
                            className={`
                                text-xs
                                font-semibold
                                ${
                                    isCompleted
                                        ? "text-emerald-800"
                                        : "text-slate-700"
                                }
                            `}
                        >
                            {isCompleted
                                ? "Your daily quota is complete"
                                : "We'll let you know when tasks are available"}
                        </p>

                        <p
                            className={`
                                mt-0.5
                                text-[11px]
                                leading-5
                                ${
                                    isCompleted
                                        ? "text-emerald-700/80"
                                        : "text-slate-500"
                                }
                            `}
                        >
                            {isCompleted
                                ? "Come back during your next daily cycle."
                                : "You can safely check again later."}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}