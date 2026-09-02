"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import {
    Bell,
    Menu,
    ShieldCheck,
} from "lucide-react";

interface AdminHeaderProps {
    onMenuClick: () => void;
}

const PAGE_TITLES: Record<string, string> = {
    "/admin": "Dashboard",

    "/admin/users": "Users",

    "/admin/support": "Support",

    "/admin/upgrade-requests":
        "Upgrade Requests",

    "/admin/withdrawals":
        "Withdrawal Requests",

    "/admin/membership-plans":
        "Membership Plans",

    "/admin/daily-order-configs":
        "Daily Order Config",

    "/admin/advertisements":
        "Advertisements",

    "/admin/transactions":
        "Transactions",

    "/admin/reports":
        "Reports",

    "/admin/settings":
        "Settings",
};

export default function AdminHeader({
    onMenuClick,
}: AdminHeaderProps) {

    const pathname = usePathname();

    const title = useMemo(() => {

        if (PAGE_TITLES[pathname]) {
            return PAGE_TITLES[pathname];
        }

        const matched =
            Object.keys(PAGE_TITLES)
                .find(route =>
                    pathname.startsWith(route)
                );

        return matched
            ? PAGE_TITLES[matched]
            : "Admin";

    }, [pathname]);

    return (
        <header
            className="
                fixed
                top-0
                left-0
                right-0
                z-50
                border-b
                border-gray-200
                bg-white/90
                backdrop-blur-xl
                supports-[backdrop-filter]:bg-white/70
            "
        >

            <div
                className="
                    flex
                    h-16
                    items-center
                    justify-between
                    px-4
                "
            >

                {/* Left */}

                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >

                    <button
                        onClick={onMenuClick}
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            transition
                            hover:bg-gray-100
                            active:scale-95
                        "
                    >
                        <Menu
                            size={22}
                        />
                    </button>

                    <div>

                        <h1
                            className="
                                text-lg
                                font-bold
                                text-gray-900
                            "
                        >
                            {title}
                        </h1>

                        <p
                            className="
                                text-xs
                                text-gray-500
                            "
                        >
                            Admin Portal
                        </p>

                    </div>

                </div>

                {/* Right */}

                <div
                    className="
                        flex
                        items-center
                        gap-2
                    "
                >

                    {/* Notification */}

                    <button
                        className="
                            relative
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            transition
                            hover:bg-gray-100
                            active:scale-95
                        "
                    >

                        <Bell
                            size={20}
                        />

                        {/* Notification Dot */}

                        <span
                            className="
                                absolute
                                right-2
                                top-2
                                h-2
                                w-2
                                rounded-full
                                bg-red-500
                            "
                        />

                    </button>

                    {/* Avatar */}

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            bg-gradient-to-br
                            from-black
                            to-gray-700
                            text-white
                            shadow
                        "
                    >

                        <ShieldCheck
                            size={18}
                        />

                    </div>

                </div>

            </div>

        </header>
    );
}