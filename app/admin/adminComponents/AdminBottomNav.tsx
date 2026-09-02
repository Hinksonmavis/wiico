"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    LayoutDashboard,
    Users,
    ClipboardList,
    Menu,
    Wallet,
    MessageCircle,
} from "lucide-react";

interface AdminBottomNavProps {
    onMoreClick: () => void;
}

interface NavItem {
    label: string;
    href?: string;
    icon: React.ElementType;
    badge?: number;
}

const NAV_ITEMS: NavItem[] = [
    {
        label: "Home",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        label: "Users",
        href: "/admin/users",
        icon: Users,
    },
    {
        label: "Wallet",
        href: "/admin/wallet",
        icon: Wallet,
    },
    {
        label: "Support",
        href: "/admin/support",
        icon: MessageCircle,
    },
    {
        label: "Requests",
        href: "/admin/upgrade-requests",
        icon: ClipboardList,
        badge: 0,
    },
];

export default function AdminBottomNav({
    onMoreClick,
}: AdminBottomNavProps) {

    const pathname = usePathname();

    function isActive(href: string) {

        if (href === "/admin") {
            return pathname === "/admin";
        }

        return pathname.startsWith(href);
    }

    return (

        <nav
            className="
                fixed
                bottom-0
                left-0
                right-0
                z-50
                border-t
                border-gray-200
                bg-white/95
                backdrop-blur-xl
                supports-[backdrop-filter]:bg-white/80
                pb-[env(safe-area-inset-bottom)]
            "
        >

            <div
                className="
                    mx-auto
                    flex
                    h-16
                    max-w-lg
                    items-center
                    justify-around
                "
            >

                {NAV_ITEMS.map((item) => {

                    const Icon = item.icon;

                    const active =
                        item.href
                            ? isActive(item.href)
                            : false;

                    return (

                        <Link
                            key={item.label}
                            href={item.href!}
                            className="
                                relative
                                flex
                                flex-1
                                flex-col
                                items-center
                                justify-center
                                gap-1
                                transition-all
                            "
                        >

                            <div
                                className={`
                                    relative
                                    rounded-full
                                    p-2
                                    transition-all

                                    ${
                                        active
                                            ? "bg-black text-white"
                                            : "text-gray-500"
                                    }
                                `}
                            >

                                <Icon size={20} />

                                {!!item.badge && (
                                    <span
                                        className="
                                            absolute
                                            -right-1
                                            -top-1
                                            flex
                                            h-5
                                            min-w-[20px]
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-red-600
                                            px-1
                                            text-[10px]
                                            font-bold
                                            text-white
                                        "
                                    >
                                        {item.badge}
                                    </span>
                                )}

                            </div>

                            <span
                                className={`
                                    text-[11px]
                                    font-medium

                                    ${
                                        active
                                            ? "text-black"
                                            : "text-gray-500"
                                    }
                                `}
                            >
                                {item.label}
                            </span>

                        </Link>

                    );

                })}

                {/* MORE */}

                <button
                    onClick={onMoreClick}
                    className="
                        flex
                        flex-1
                        flex-col
                        items-center
                        justify-center
                        gap-1
                        transition
                        active:scale-95
                    "
                >

                    <div
                        className="
                            rounded-full
                            p-2
                            text-gray-500
                        "
                    >

                        <Menu size={20} />

                    </div>

                    <span
                        className="
                            text-[11px]
                            font-medium
                            text-gray-500
                        "
                    >
                        More
                    </span>

                </button>

            </div>

        </nav>
    );
}