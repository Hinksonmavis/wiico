"use client";

import {
    ShieldCheck,
    CalendarDays,
    Wallet,
    BadgeCheck,
    Copy,
    Check,
    type LucideIcon,
} from "lucide-react";

import { useState } from "react";

interface Props {
    walletId?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface InfoItem {
    icon: LucideIcon;
    label: string;
    value: string;
    mono?: boolean;
}

function formatDate(value?: string) {
    if (!value) return "--";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "--";
    }

    return date.toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function shorten(value?: string) {
    if (!value) return "--";

    if (value.length <= 18) {
        return value;
    }

    return `${value.slice(0, 8)}••••${value.slice(-6)}`;
}

export default function WalletInfoCard({
    walletId,
    createdAt,
    updatedAt,
}: Props) {
    const [copied, setCopied] = useState(false);

    const items: InfoItem[] = [
        {
            icon: Wallet,
            label: "Wallet ID",
            value: shorten(walletId),
            mono: true,
        },
        {
            icon: ShieldCheck,
            label: "Currency",
            value: "Nigerian Naira (NGN)",
        },
        {
            icon: CalendarDays,
            label: "Created",
            value: formatDate(createdAt),
        },
        {
            icon: CalendarDays,
            label: "Last Updated",
            value: formatDate(updatedAt),
        },
    ];

    async function handleCopyWalletId() {
        if (!walletId) return;

        try {
            await navigator.clipboard.writeText(walletId);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 1800);
        } catch {
            // Clipboard access may be unavailable in some browsers.
        }
    }

    return (
        <section className="space-y-4">
            {/* Section heading */}

            <div className="px-1">
                <h2
                    className="
                        text-[17px]
                        font-bold
                        tracking-tight
                        text-slate-900
                    "
                >
                    Wallet Information
                </h2>

                <p
                    className="
                        mt-1
                        text-[13px]
                        font-medium
                        text-slate-400
                    "
                >
                    Your wallet details and account status.
                </p>
            </div>

            {/* Main information card */}

            <div
                className="
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-slate-200/80
                    bg-white
                    shadow-[0_4px_18px_rgba(15,23,42,0.035)]
                "
            >
                {/* Wallet status header */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-4
                        border-b
                        border-slate-100
                        px-4
                        py-4
                        sm:px-5
                    "
                >
                    <div className="flex min-w-0 items-center gap-3">
                        <div
                            className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-emerald-50
                            "
                        >
                            <BadgeCheck
                                size={19}
                                strokeWidth={2.2}
                                className="text-emerald-600"
                            />
                        </div>

                        <div className="min-w-0">
                            <p
                                className="
                                    text-[13px]
                                    font-bold
                                    text-slate-900
                                "
                            >
                                Wallet Status
                            </p>

                            <p
                                className="
                                    mt-0.5
                                    text-[11px]
                                    font-medium
                                    text-slate-400
                                "
                            >
                                Your wallet is ready to use
                            </p>
                        </div>
                    </div>

                    <div
                        className="
                            inline-flex
                            shrink-0
                            items-center
                            gap-1.5
                            rounded-full
                            bg-emerald-50
                            px-2.5
                            py-1.5
                        "
                    >
                        <span
                            className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-emerald-500
                            "
                        />

                        <span
                            className="
                                text-[10px]
                                font-bold
                                text-emerald-700
                            "
                        >
                            Active
                        </span>
                    </div>
                </div>

                {/* Information rows */}

                <div>
                    {items.map((item, index) => {
                        const Icon = item.icon;
                        const isWalletId = item.label === "Wallet ID";

                        return (
                            <div
                                key={item.label}
                                className={`
                                    flex
                                    min-w-0
                                    items-center
                                    gap-3
                                    px-4
                                    py-4
                                    sm:px-5
                                    ${
                                        index !== items.length - 1
                                            ? "border-b border-slate-100"
                                            : ""
                                    }
                                `}
                            >
                                {/* Icon */}

                                <div
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-slate-50
                                        text-slate-500
                                    "
                                >
                                    <Icon
                                        size={17}
                                        strokeWidth={2}
                                    />
                                </div>

                                {/* Content */}

                                <div className="min-w-0 flex-1">
                                    <p
                                        className="
                                            text-[10px]
                                            font-bold
                                            uppercase
                                            tracking-[0.1em]
                                            text-slate-400
                                        "
                                    >
                                        {item.label}
                                    </p>

                                    <p
                                        className={`
                                            mt-1
                                            truncate
                                            text-[13px]
                                            font-semibold
                                            text-slate-900
                                            ${
                                                item.mono
                                                    ? "font-mono text-[12px]"
                                                    : ""
                                            }
                                        `}
                                    >
                                        {item.value}
                                    </p>
                                </div>

                                {/* Copy wallet ID */}

                                {isWalletId && walletId && (
                                    <button
                                        type="button"
                                        onClick={handleCopyWalletId}
                                        aria-label={
                                            copied
                                                ? "Wallet ID copied"
                                                : "Copy wallet ID"
                                        }
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-slate-50
                                            text-slate-400
                                            transition-all
                                            hover:bg-slate-100
                                            hover:text-slate-700
                                            active:scale-90
                                        "
                                    >
                                        {copied ? (
                                            <Check
                                                size={16}
                                                className="text-emerald-600"
                                            />
                                        ) : (
                                            <Copy
                                                size={16}
                                            />
                                        )}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Security notice */}

            <div
                className="
                    relative
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-sky-100
                    bg-gradient-to-br
                    from-sky-50
                    via-white
                    to-blue-50
                    p-4
                    sm:p-5
                "
            >
                {/* Decorative element */}

                <div
                    className="
                        absolute
                        -right-8
                        -top-8
                        h-24
                        w-24
                        rounded-full
                        bg-sky-100/60
                    "
                />

                <div className="relative flex gap-3.5">
                    {/* Security icon */}

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-sky-100
                        "
                    >
                        <ShieldCheck
                            size={19}
                            strokeWidth={2.2}
                            className="text-sky-600"
                        />
                    </div>

                    {/* Security content */}

                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <h3
                                className="
                                    text-[13px]
                                    font-bold
                                    text-sky-950
                                "
                            >
                                Wallet secured
                            </h3>

                            <span
                                className="
                                    rounded-full
                                    bg-sky-100
                                    px-2
                                    py-0.5
                                    text-[9px]
                                    font-bold
                                    uppercase
                                    tracking-wide
                                    text-sky-700
                                "
                            >
                                Protected
                            </span>
                        </div>

                        <p
                            className="
                                mt-1.5
                                text-[11px]
                                leading-5
                                text-sky-700/80
                            "
                        >
                            Your wallet activity is securely recorded.
                            Keep your password and authentication details
                            private.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}