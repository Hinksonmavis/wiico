"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    ShoppingBag,
    Users,
    User,
    MessageCircle,
} from "lucide-react";

import { ROUTES } from "@/app/constants/routes";

const tabs = [
    {
        label: "Home",
        href: ROUTES.HOME,
        icon: Home,
    },
    {
        label: "Chat",
        href: ROUTES.CHAT,
        icon: MessageCircle,
    },
    {
        label: "Supply",
        href: ROUTES.ORDERS,
        icon: ShoppingBag,
        center: true,
    },
    {
        label: "Members",
        href: ROUTES.MEMBERS,
        icon: Users,
    },
    {
        label: "Profile",
        href: ROUTES.PROFILE,
        icon: User,
    },
];

export default function AppFooter() {
    const pathname = usePathname();

    return (
        <footer
            className="
                fixed
                inset-x-0
                bottom-0
                z-50
                px-3
                pb-[max(8px,env(safe-area-inset-bottom))]
                pointer-events-none
            "
        >
            <nav
                className="
                    relative
                    mx-auto
                    w-full
                    max-w-md
                    pointer-events-auto
                    rounded-[28px]
                    border
                    border-slate-200/80
                    bg-white/95
                    px-2
                    shadow-[0_12px_45px_rgba(15,23,42,0.14)]
                    backdrop-blur-xl
                "
            >
                <div
                    className="
                        relative
                        flex
                        h-[70px]
                        items-center
                    "
                >
                    {tabs.map((tab) => {
                        const active =
                            tab.href === ROUTES.HOME
                                ? pathname === ROUTES.HOME
                                : pathname.startsWith(tab.href);

                        const Icon = tab.icon;

                        // Center Orders action
                        if (tab.center) {
                            return (
                                <Link
                                    key={tab.href}
                                    href={tab.href}
                                    aria-label={tab.label}
                                    className="
                                        relative
                                        flex
                                        h-full
                                        flex-1
                                        flex-col
                                        items-center
                                        justify-end
                                        pb-2
                                    "
                                >
                                    <div
                                        className={`
                                            absolute
                                            -top-8
                                            flex
                                            h-[62px]
                                            w-[62px]
                                            items-center
                                            justify-center
                                            rounded-full
                                            border-[5px]
                                            border-white
                                            bg-[#4DA8FE]
                                            shadow-[0_10px_28px_rgba(77,168,254,0.35)]
                                            transition-all
                                            duration-200
                                            ease-out
                                            active:scale-95
                                            ${
                                                active
                                                    ? "scale-105 shadow-[0_12px_32px_rgba(77,168,254,0.5)]"
                                                    : ""
                                            }
                                        `}
                                    >
                                        <Icon
                                            size={25}
                                            strokeWidth={2.2}
                                            className="
                                                text-white
                                            "
                                        />
                                    </div>

                                    <span
                                        className={`
                                            mt-1
                                            text-[10px]
                                            font-semibold
                                            tracking-tight
                                            transition-colors
                                            ${
                                                active
                                                    ? "text-[#4DA8FE]"
                                                    : "text-slate-500"
                                            }
                                        `}
                                    >
                                        {tab.label}
                                    </span>
                                </Link>
                            );
                        }

                        return (
                            <Link
                                key={tab.href}
                                href={tab.href}
                                aria-current={
                                    active
                                        ? "page"
                                        : undefined
                                }
                                className="
                                    relative
                                    flex
                                    h-full
                                    flex-1
                                    flex-col
                                    items-center
                                    justify-center
                                    gap-1
                                    rounded-2xl
                                    transition-transform
                                    duration-200
                                    active:scale-95
                                "
                            >
                                {/* Active indicator */}
                                <span
                                    className={`
                                        absolute
                                        top-1
                                        h-1
                                        w-5
                                        rounded-full
                                        bg-[#4DA8FE]
                                        transition-all
                                        duration-200
                                        ${
                                            active
                                                ? "scale-100 opacity-100"
                                                : "scale-50 opacity-0"
                                        }
                                    `}
                                />

                                {/* Icon container */}
                                <div
                                    className={`
                                        flex
                                        h-9
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-xl
                                        transition-all
                                        duration-200
                                        ${
                                            active
                                                ? "bg-[#4DA8FE]/10"
                                                : "bg-transparent"
                                        }
                                    `}
                                >
                                    <Icon
                                        size={21}
                                        strokeWidth={
                                            active
                                                ? 2.4
                                                : 2
                                        }
                                        className={`
                                            transition-colors
                                            duration-200
                                            ${
                                                active
                                                    ? "text-[#4DA8FE]"
                                                    : "text-slate-400"
                                            }
                                        `}
                                    />
                                </div>

                                <span
                                    className={`
                                        text-[10px]
                                        font-semibold
                                        tracking-tight
                                        transition-colors
                                        duration-200
                                        ${
                                            active
                                                ? "text-[#4DA8FE]"
                                                : "text-slate-500"
                                        }
                                    `}
                                >
                                    {tab.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </footer>
    );
}