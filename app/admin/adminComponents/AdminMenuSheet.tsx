"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    ChevronRight,
    LogOut,
    ShieldCheck,
    X,
} from "lucide-react";
import { useState } from "react";

import {
    AdminMenuSheetProps,
} from "@/app/types/adminTypes/adminMenu.types";

import {
    BUSINESS,
    MANAGEMENT,
} from "@/app/constants/adminMenu.constants";

import {
    useAdminLogout,
} from "@/app/hooks/adminHooks/admin-logout/useAdminLogout";

import AdminLogoutModal from "./logout/AdminLogoutModal";

export default function AdminMenuSheet({
    open,
    onClose,
}: AdminMenuSheetProps) {
    const pathname = usePathname();

    const [logoutOpen, setLogoutOpen] =
        useState(false);

    const { logout } = useAdminLogout();

    if (!open) {
        return null;
    }

    const handleLogoutClick = () => {
        setLogoutOpen(true);
    };

    const handleLogoutClose = () => {
        setLogoutOpen(false);
    };

    const handleLogoutConfirm = async () => {
        await logout();
    };

    return (
        <>
            {/* =========================================================
                BACKDROP
            ========================================================== */}

            <div
                aria-hidden="true"
                onClick={onClose}
                className="
                    fixed
                    inset-0
                    z-[90]
                    bg-slate-950/45
                    backdrop-blur-[3px]
                    animate-in
                    fade-in
                    duration-200
                "
            />

            {/* =========================================================
                MOBILE SHEET
            ========================================================== */}

            <section
                role="dialog"
                aria-modal="true"
                aria-label="Admin menu"
                className="
                    fixed
                    inset-x-0
                    bottom-0
                    z-[100]

                    flex
                    max-h-[92dvh]
                    flex-col

                    overflow-hidden

                    rounded-t-[30px]

                    border
                    border-slate-200

                    bg-white

                    shadow-[0_-20px_60px_rgba(15,23,42,0.18)]

                    animate-in
                    slide-in-from-bottom
                    duration-300

                    pb-[env(safe-area-inset-bottom)]
                "
            >
                {/* =====================================================
                    SHEET HANDLE
                ====================================================== */}

                <div className="flex shrink-0 justify-center pt-3 pb-2">
                    <div
                        className="
                            h-1.5
                            w-12
                            rounded-full
                            bg-slate-200
                        "
                    />
                </div>

                {/* =====================================================
                    HEADER
                ====================================================== */}

                <header
                    className="
                        flex
                        shrink-0
                        items-center
                        justify-between
                        border-b
                        border-slate-100
                        px-5
                        pb-4
                        pt-2
                    "
                >
                    <div className="flex min-w-0 items-center gap-3">
                        {/* Admin icon */}
                        <div
                            className="
                                flex
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-2xl
                                bg-slate-950
                                text-white
                                shadow-sm
                            "
                        >
                            <ShieldCheck
                                className="h-5 w-5"
                                strokeWidth={2.2}
                            />
                        </div>

                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <h2
                                    className="
                                        truncate
                                        text-base
                                        font-semibold
                                        tracking-tight
                                        text-slate-950
                                    "
                                >
                                    Admin Menu
                                </h2>

                                <span
                                    className="
                                        rounded-full
                                        bg-slate-100
                                        px-2
                                        py-0.5
                                        text-[9px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.08em]
                                        text-slate-500
                                    "
                                >
                                    Panel
                                </span>
                            </div>

                            <p
                                className="
                                    mt-0.5
                                    text-xs
                                    text-slate-400
                                "
                            >
                                Manage your platform
                            </p>
                        </div>
                    </div>

                    {/* Close */}
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close admin menu"
                        className="
                            ml-3
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-slate-200
                            bg-white
                            text-slate-500
                            transition
                            hover:bg-slate-50
                            hover:text-slate-900
                            active:scale-95
                        "
                    >
                        <X className="h-5 w-5" />
                    </button>
                </header>

                {/* =====================================================
                    SCROLLABLE CONTENT
                ====================================================== */}

                <div
                    className="
                        min-h-0
                        flex-1
                        overflow-y-auto
                        overscroll-contain
                        px-5
                        pb-6
                        pt-2
                        no-scrollbar
                    "
                >
                    {/* =================================================
                        MANAGEMENT
                    ================================================== */}

                    <MenuSection
                        title="Management"
                        description="Control users and platform operations"
                        items={MANAGEMENT}
                        pathname={pathname}
                        onNavigate={onClose}
                    />

                    {/* =================================================
                        BUSINESS
                    ================================================== */}

                    <MenuSection
                        title="Business"
                        description="Manage commercial activity"
                        items={BUSINESS}
                        pathname={pathname}
                        onNavigate={onClose}
                    />

                    {/* =================================================
                        DANGER ZONE
                    ================================================== */}

                    <div className="mt-7">
                        <div
                            className="
                                mb-3
                                flex
                                items-center
                                justify-between
                                px-1
                            "
                        >
                            <div>
                                <p
                                    className="
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-[0.16em]
                                        text-slate-400
                                    "
                                >
                                    Account
                                </p>

                                <p
                                    className="
                                        mt-0.5
                                        text-xs
                                        text-slate-400
                                    "
                                >
                                    Administrator session
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleLogoutClick}
                            className="
                                group
                                flex
                                w-full
                                items-center
                                justify-between

                                rounded-[20px]

                                border
                                border-red-100

                                bg-red-50/70

                                px-4
                                py-3.5

                                text-left

                                transition-all
                                duration-200

                                hover:border-red-200
                                hover:bg-red-50

                                active:scale-[0.99]
                            "
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-white
                                        text-red-600
                                        shadow-sm
                                        ring-1
                                        ring-red-100
                                        transition
                                        group-hover:bg-red-600
                                        group-hover:text-white
                                    "
                                >
                                    <LogOut
                                        className="h-4.5 w-4.5"
                                        strokeWidth={2.2}
                                    />
                                </div>

                                <div>
                                    <p
                                        className="
                                            text-sm
                                            font-semibold
                                            text-red-700
                                        "
                                    >
                                        Sign out
                                    </p>

                                    <p
                                        className="
                                            mt-0.5
                                            text-[11px]
                                            text-red-400
                                        "
                                    >
                                        End administrator session
                                    </p>
                                </div>
                            </div>

                            <ChevronRight
                                className="
                                    h-4
                                    w-4
                                    text-red-300
                                    transition
                                    group-hover:translate-x-0.5
                                    group-hover:text-red-500
                                "
                            />
                        </button>
                    </div>

                    {/* =================================================
                        FOOTER
                    ================================================== */}

                    <div className="px-1 pb-1 pt-5 text-center">
                        <p
                            className="
                                text-[10px]
                                font-medium
                                text-slate-300
                            "
                        >
                            Administrator Control Center
                        </p>
                    </div>
                </div>
            </section>

            {/* =========================================================
                LOGOUT CONFIRMATION
            ========================================================== */}

            <AdminLogoutModal
                open={logoutOpen}
                onClose={handleLogoutClose}
                onConfirm={handleLogoutConfirm}
            />
        </>
    );
}

/* ================================================================
   MENU SECTION
================================================================ */

interface MenuSectionProps {
    title: string;
    description: string;
    items: any[];
    pathname: string;
    onNavigate: () => void;
}

function MenuSection({
    title,
    description,
    items,
    pathname,
    onNavigate,
}: MenuSectionProps) {
    return (
        <section className="pt-4">
            {/* Section heading */}
            <div className="mb-3 px-1">
                <p
                    className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-slate-400
                    "
                >
                    {title}
                </p>

                <p
                    className="
                        mt-0.5
                        text-xs
                        text-slate-400
                    "
                >
                    {description}
                </p>
            </div>

            {/* Navigation cards */}
            <div className="space-y-2">
                {items.map((item) => {
                    const Icon = item.icon;

                    const active =
                        pathname === item.href ||
                        pathname.startsWith(
                            `${item.href}/`,
                        );

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onNavigate}
                            className={`
                                group
                                flex
                                items-center
                                justify-between

                                rounded-[20px]

                                border

                                px-4
                                py-3.5

                                transition-all
                                duration-200

                                active:scale-[0.99]

                                ${
                                    active
                                        ? `
                                            border-slate-900
                                            bg-slate-950
                                            text-white
                                            shadow-[0_8px_24px_rgba(15,23,42,0.14)]
                                        `
                                        : `
                                            border-slate-100
                                            bg-slate-50/70
                                            text-slate-700
                                            hover:border-slate-200
                                            hover:bg-slate-50
                                        `
                                }
                            `}
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                {/* Icon */}
                                <div
                                    className={`
                                        flex
                                        h-10
                                        w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        transition
                                        ${
                                            active
                                                ? `
                                                    bg-white/10
                                                    text-white
                                                `
                                                : `
                                                    bg-white
                                                    text-slate-500
                                                    shadow-sm
                                                    ring-1
                                                    ring-slate-100
                                                    group-hover:text-slate-900
                                                `
                                        }
                                    `}
                                >
                                    <Icon
                                        className="h-4.5 w-4.5"
                                        strokeWidth={2}
                                    />
                                </div>

                                {/* Label */}
                                <div className="min-w-0">
                                    <p
                                        className={`
                                            truncate
                                            text-sm
                                            font-semibold
                                            ${
                                                active
                                                    ? "text-white"
                                                    : "text-slate-800"
                                            }
                                        `}
                                    >
                                        {item.title}
                                    </p>

                                    {item.description && (
                                        <p
                                            className={`
                                                mt-0.5
                                                truncate
                                                text-[11px]
                                                ${
                                                    active
                                                        ? "text-slate-300"
                                                        : "text-slate-400"
                                                }
                                            `}
                                        >
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Arrow */}
                            <ChevronRight
                                className={`
                                    ml-3
                                    h-4
                                    w-4
                                    shrink-0
                                    transition-all
                                    ${
                                        active
                                            ? "text-slate-400"
                                            : "text-slate-300 group-hover:translate-x-0.5 group-hover:text-slate-500"
                                    }
                                `}
                            />
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}