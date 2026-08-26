import Link from "next/link";
import {
    LucideIcon,
    Award,
    ShieldCheck,
    FileSignature,
    FileText,
    ChevronRight,
    Wallet,
    History,
} from "lucide-react";

import { ROUTES } from "@/app/constants/routes";

interface SettingsItem {
    icon: LucideIcon;
    label: string;
    href: string;
}

const ITEMS: SettingsItem[] = [
    {
        icon: Wallet,
        label: "Transaction History",
        href: ROUTES.TRANSACTIONS,
    },
    {
        icon: History,
        label: "Upgrade History",
        href: ROUTES.UPGRADE_HISTORY,
    },
    {
        icon: Award,
        label: "Registration Certificate",
        href: "/registration-certificate",
    },
    {
        icon: ShieldCheck,
        label: "Account Security",
        href: "/security",
    },
    {
        icon: FileSignature,
        label: "Privacy Policy",
        href: ROUTES.PRIVACY_POLICY,
    },
    {
        icon: FileText,
        label: "Electronic Contract",
        href: "/electronic-contract",
    },
];

export default function SettingsList() {
    return (
        <section
            aria-label="Account settings"
            className="
                mx-3
                overflow-hidden
                rounded-[20px]
                border
                border-slate-200/80
                bg-white
                shadow-[0_8px_24px_rgba(15,23,42,0.05)]

                sm:mx-4
                sm:mt-5
                sm:rounded-[22px]

                md:rounded-[24px]
            "
        >
            {/* Section Header */}
            <div
                className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-slate-100
                    px-4
                    py-3.5

                    sm:px-5
                    sm:py-4
                "
            >
                <div>
                    <h2
                        className="
                            text-[14px]
                            font-semibold
                            tracking-tight
                            text-slate-900

                            sm:text-[15px]
                        "
                    >
                        Account & Settings
                    </h2>

                    <p
                        className="
                            mt-0.5
                            text-[11px]
                            text-slate-400

                            sm:text-xs
                        "
                    >
                        Manage your account and preferences
                    </p>
                </div>
            </div>

            {/* Settings Items */}
            <div>
                {ITEMS.map((item, index) => {
                    const Icon = item.icon;
                    const isLast =
                        index === ITEMS.length - 1;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                                group
                                relative
                                flex
                                min-h-[64px]
                                w-full
                                items-center
                                gap-3
                                px-4
                                py-2.5
                                outline-none
                                transition-colors
                                duration-200
                                hover:bg-slate-50
                                active:bg-slate-100
                                focus-visible:bg-slate-50
                                focus-visible:ring-2
                                focus-visible:ring-inset
                                focus-visible:ring-slate-300

                                sm:min-h-[68px]
                                sm:gap-3.5
                                sm:px-5
                                sm:py-3

                                ${!isLast ? "border-b border-slate-100" : ""}
                            `}
                        >
                            {/* Icon */}
                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-slate-100
                                    bg-slate-50
                                    text-slate-600
                                    transition-colors
                                    duration-200
                                    group-hover:bg-white
                                    group-hover:text-slate-800
                                    group-active:bg-white

                                    sm:h-11
                                    sm:w-11
                                    sm:rounded-[13px]
                                "
                            >
                                <Icon
                                    className="
                                        h-[18px]
                                        w-[18px]

                                        sm:h-[19px]
                                        sm:w-[19px]
                                    "
                                    strokeWidth={1.8}
                                />
                            </div>

                            {/* Label */}
                            <div className="min-w-0 flex-1">
                                <p
                                    className="
                                        truncate
                                        text-[13px]
                                        font-medium
                                        tracking-tight
                                        text-slate-800

                                        sm:text-[14px]
                                        md:text-[15px]
                                    "
                                >
                                    {item.label}
                                </p>
                            </div>

                            {/* Chevron */}
                            <div
                                className="
                                    flex
                                    h-7
                                    w-7
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    text-slate-300
                                    transition-all
                                    duration-200
                                    group-hover:bg-slate-100
                                    group-hover:text-slate-500
                                    group-active:bg-slate-200

                                    sm:h-8
                                    sm:w-8
                                "
                            >
                                <ChevronRight
                                    className="
                                        h-4
                                        w-4
                                        transition-transform
                                        duration-200
                                        group-hover:translate-x-0.5
                                    "
                                    strokeWidth={2}
                                />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}