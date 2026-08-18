"use client";

import {
    ArrowUpRight,
    Eye,
    EyeOff,
    LockKeyhole,
    Wallet,
} from "lucide-react";
import { useState } from "react";

interface Props {
    availableBalance?: string;
    heldBalance?: string;
}

function money(value?: string) {
    return Number(value ?? 0).toLocaleString(
        "en-NG",
        {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        },
    );
}

export default function WalletBalanceCard({
    availableBalance = "0",
    heldBalance = "0",
}: Props) {
    const [visible, setVisible] = useState(true);

    const available = money(availableBalance);
    const held = money(heldBalance);

    return (
        <section
            aria-label="Wallet balance"
            className="w-full"
        >
            <div
                className="
                    relative
                    overflow-hidden
                    rounded-[28px]
                    bg-[#076DF3]
                    px-5
                    py-5
                    text-white
                    shadow-[0_14px_35px_-15px_rgba(7,109,243,0.45)]
                    sm:px-6
                    sm:py-6
                "
            >
                {/* Subtle brand glow */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-16
                        -top-20
                        h-48
                        w-48
                        rounded-full
                        bg-white/[0.08]
                        blur-3xl
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        -bottom-24
                        -left-20
                        h-52
                        w-52
                        rounded-full
                        bg-blue-950/[0.10]
                        blur-3xl
                    "
                />

                <div className="relative">
                    {/* ================================================= */}
                    {/* HEADER */}
                    {/* ================================================= */}

                    <div className="flex items-center justify-between">
                        <div className="flex min-w-0 items-center gap-3">
                            {/* Wallet icon */}

                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-white/15
                                    text-white
                                    ring-1
                                    ring-white/20
                                    backdrop-blur-md
                                "
                            >
                                <Wallet className="h-5 w-5" />
                            </div>

                            <div className="min-w-0">
                                <p
                                    className="
                                        text-sm
                                        font-semibold
                                        text-white
                                    "
                                >
                                    Wallet Balance
                                </p>

                                <div
                                    className="
                                        mt-1
                                        flex
                                        items-center
                                        gap-1.5
                                    "
                                >
                                    <span
                                        className="
                                            h-1.5
                                            w-1.5
                                            rounded-full
                                            bg-emerald-300
                                            shadow-[0_0_0_3px_rgba(110,231,183,0.12)]
                                        "
                                    />

                                    <span
                                        className="
                                            text-[11px]
                                            font-medium
                                            text-blue-100
                                        "
                                    >
                                        Wallet active
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Balance visibility */}

                        <button
                            type="button"
                            onClick={() =>
                                setVisible(
                                    (current) =>
                                        !current,
                                )
                            }
                            aria-label={
                                visible
                                    ? "Hide wallet balance"
                                    : "Show wallet balance"
                            }
                            className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-white/20
                                bg-white/10
                                text-white
                                backdrop-blur-md
                                transition
                                hover:bg-white/15
                                active:scale-95
                            "
                        >
                            {visible ? (
                                <Eye className="h-[18px] w-[18px]" />
                            ) : (
                                <EyeOff className="h-[18px] w-[18px]" />
                            )}
                        </button>
                    </div>

                    {/* ================================================= */}
                    {/* MAIN BALANCE */}
                    {/* ================================================= */}

                    <div className="mt-8">
                        <p
                            className="
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.14em]
                                text-blue-100
                            "
                        >
                            Available Balance
                        </p>

                        <div
                            className="
                                mt-2
                                flex
                                min-w-0
                                items-baseline
                            "
                        >
                            <span
                                className="
                                    min-w-0
                                    truncate
                                    text-[31px]
                                    font-bold
                                    leading-none
                                    tracking-[-0.04em]
                                    text-white
                                    sm:text-[36px]
                                "
                            >
                                {visible
                                    ? available
                                    : "₦ ••••••"}
                            </span>
                        </div>

                        <p
                            className="
                                mt-2
                                text-[11px]
                                leading-5
                                text-blue-100/90
                            "
                        >
                            Funds available for use
                            and withdrawals
                        </p>
                    </div>

                    {/* ================================================= */}
                    {/* GLASSMORPHISM DETAILS */}
                    {/* ================================================= */}

                    <div
                        className="
                            mt-7
                            overflow-hidden
                            rounded-[20px]
                            border
                            border-white/25
                            bg-white/[0.14]
                            shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]
                            backdrop-blur-xl
                        "
                    >
                        <div
                            className="
                                grid
                                grid-cols-2
                                divide-x
                                divide-white/20
                            "
                        >
                            {/* Held balance */}

                            <div
                                className="
                                    min-w-0
                                    px-4
                                    py-4
                                    sm:px-5
                                "
                            >
                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-1.5
                                    "
                                >
                                    <LockKeyhole
                                        className="
                                            h-3.5
                                            w-3.5
                                            text-blue-100
                                        "
                                    />

                                    <p
                                        className="
                                            text-[10px]
                                            font-semibold
                                            uppercase
                                            tracking-[0.1em]
                                            text-blue-100
                                        "
                                    >
                                        Held Balance
                                    </p>
                                </div>

                                <p
                                    className="
                                        mt-2
                                        truncate
                                        text-sm
                                        font-semibold
                                        text-white
                                    "
                                >
                                    {visible
                                        ? held
                                        : "₦ ••••••"}
                                </p>
                            </div>

                            {/* Currency */}

                            <div
                                className="
                                    min-w-0
                                    px-4
                                    py-4
                                    sm:px-5
                                "
                            >
                                <p
                                    className="
                                        text-[10px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.1em]
                                        text-blue-100
                                    "
                                >
                                    Currency
                                </p>

                                <div
                                    className="
                                        mt-2
                                        flex
                                        items-center
                                        gap-1.5
                                    "
                                >
                                    <span
                                        className="
                                            text-sm
                                            font-semibold
                                            text-white
                                        "
                                    >
                                        NGN
                                    </span>

                                    <ArrowUpRight
                                        className="
                                            h-3.5
                                            w-3.5
                                            text-blue-100
                                        "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}