"use client";

import { useState } from "react";
import {
    LogOut,
    ChevronRight,
    ShieldCheck,
} from "lucide-react";

import LogoutDialog from "./LogoutDialog";

export default function LogoutCard() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <section className="w-full">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="
                        group
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-[22px]
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-4
                        text-left
                        shadow-[0_4px_18px_rgba(15,23,42,0.04)]
                        transition-all
                        duration-200
                        hover:border-red-200
                        hover:shadow-[0_8px_24px_rgba(15,23,42,0.07)]
                        active:scale-[0.985]
                    "
                >
                    {/* Icon */}
                    <div
                        className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-[15px]
                            bg-red-50
                            ring-1
                            ring-red-100
                        "
                    >
                        <LogOut
                            size={19}
                            strokeWidth={2.2}
                            className="text-red-600"
                        />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                            <h2
                                className="
                                    truncate
                                    text-[15px]
                                    font-semibold
                                    tracking-tight
                                    text-slate-900
                                "
                            >
                                Logout Account
                            </h2>

                            <span
                                className="
                                    hidden
                                    rounded-full
                                    bg-slate-100
                                    px-2
                                    py-0.5
                                    text-[9px]
                                    font-semibold
                                    uppercase
                                    tracking-wide
                                    text-slate-500
                                    sm:inline-flex
                                "
                            >
                                Secure
                            </span>
                        </div>

                        <p
                            className="
                                mt-1
                                text-[12px]
                                leading-5
                                text-slate-500
                            "
                        >
                            Sign out securely from this device.
                        </p>
                    </div>

                    {/* Arrow */}
                    <div
                        className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-slate-50
                            transition-all
                            duration-200
                            group-hover:bg-red-50
                        "
                    >
                        <ChevronRight
                            size={17}
                            className="
                                text-slate-400
                                transition-transform
                                duration-200
                                group-hover:translate-x-0.5
                                group-hover:text-red-500
                            "
                        />
                    </div>
                </button>

                {/* Security hint */}
                <div
                    className="
                        mt-3
                        flex
                        items-center
                        justify-center
                        gap-1.5
                        px-2
                    "
                >
                    <ShieldCheck
                        size={13}
                        className="text-emerald-500"
                    />

                    <p
                        className="
                            text-[10px]
                            font-medium
                            text-slate-400
                        "
                    >
                        Your session will be securely closed
                    </p>
                </div>
            </section>

            <LogoutDialog
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}