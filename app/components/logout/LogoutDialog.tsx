"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
    Loader2,
    LogOut,
    ShieldCheck,
    X,
} from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { authService } from "@/app/services/clientServices/auth.service";

interface Props {
    open: boolean;
    onClose: () => void;
}

interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
    };
    message?: string;
}

export default function LogoutDialog({
    open,
    onClose,
}: Props) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [loading, setLoading] = useState(false);

    // Close the dialog with the Escape key.
    useEffect(() => {
        if (!open || loading) {
            return;
        }

        const handleKeyDown = (
            event: KeyboardEvent,
        ) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener(
            "keydown",
            handleKeyDown,
        );

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown,
            );
        };
    }, [open, loading, onClose]);

    // Prevent the page behind the dialog from scrolling.
    useEffect(() => {
        if (!open) {
            return;
        }

        const previousOverflow =
            document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow =
                previousOverflow;
        };
    }, [open]);

    const handleLogout = async () => {
        if (loading) {
            return;
        }

        try {
            setLoading(true);

            // Get the refresh token from the same
            // storage locations used by the application.
            const refreshToken =
                Cookies.get("refreshToken") ??
                localStorage.getItem("refreshToken");

            // Tell the backend to invalidate the
            // current refresh token.
            if (refreshToken) {
                await authService.logout(
                    refreshToken,
                );
            }

            // Clear local authentication state.
            authService.clearSession();

            // Remove cached authenticated data.
            queryClient.clear();

            // Close the dialog before navigating.
            onClose();

            toast.success(
                "You have been logged out successfully.",
            );

            // Return the user to the login page.
            router.replace("/login");
            router.refresh();
        } catch (error: unknown) {
            const apiError =
                error as ApiError;

            toast.error(
                apiError.response?.data?.message ??
                apiError.message ??
                "Unable to log out. Please try again.",
            );

            setLoading(false);
        }
    };

    if (!open) {
        return null;
    }

    return (
        <div
            className="
                fixed
                inset-0
                z-[100]
                flex
                items-end
                justify-center
                bg-slate-950/55
                px-3
                pb-3
                backdrop-blur-md
                sm:items-center
                sm:px-5
                sm:pb-0
            "
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-dialog-title"
            aria-describedby="logout-dialog-description"
        >
            {/* Backdrop */}
            <button
                type="button"
                aria-label="Close logout dialog"
                disabled={loading}
                onClick={onClose}
                className="
                    absolute
                    inset-0
                    cursor-default
                    disabled:cursor-not-allowed
                "
            />

            {/* Dialog */}
            <div
                className="
                    relative
                    w-full
                    max-w-[430px]
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-white/80
                    bg-white
                    shadow-[0_24px_80px_rgba(15,23,42,0.25)]
                    animate-in
                    slide-in-from-bottom-4
                    duration-200
                    sm:slide-in-from-bottom-0
                    sm:zoom-in-95
                "
            >
                {/* Mobile handle */}
                <div className="flex justify-center pt-3 sm:hidden">
                    <div
                        className="
                            h-1
                            w-10
                            rounded-full
                            bg-slate-200
                        "
                    />
                </div>

                {/* Close button */}
                <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    aria-label="Close"
                    className="
                        absolute
                        right-4
                        top-4
                        z-10
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-slate-100
                        text-slate-500
                        transition
                        hover:bg-slate-200
                        hover:text-slate-700
                        active:scale-95
                        disabled:pointer-events-none
                        disabled:opacity-50
                    "
                >
                    <X size={17} />
                </button>

                {/* Content */}
                <div className="px-5 pb-5 pt-7 sm:px-7 sm:pb-7 sm:pt-8">
                    {/* Icon */}
                    <div className="flex justify-center">
                        <div
                            className="
                                relative
                                flex
                                h-[76px]
                                w-[76px]
                                items-center
                                justify-center
                                rounded-[24px]
                                bg-red-50
                                ring-8
                                ring-red-50/60
                            "
                        >
                            <LogOut
                                size={30}
                                strokeWidth={2}
                                className="text-red-600"
                            />

                            <div
                                className="
                                    absolute
                                    -bottom-1
                                    -right-1
                                    flex
                                    h-7
                                    w-7
                                    items-center
                                    justify-center
                                    rounded-full
                                    border-4
                                    border-white
                                    bg-emerald-500
                                "
                            >
                                <ShieldCheck
                                    size={13}
                                    className="text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="mt-7 text-center">
                        <p
                            className="
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.18em]
                                text-red-500
                            "
                        >
                            Sign out
                        </p>

                        <h2
                            id="logout-dialog-title"
                            className="
                                mt-1.5
                                text-[22px]
                                font-bold
                                tracking-tight
                                text-slate-950
                                sm:text-2xl
                            "
                        >
                            Leaving already?
                        </h2>

                        <p
                            id="logout-dialog-description"
                            className="
                                mx-auto
                                mt-2
                                max-w-[300px]
                                text-[13px]
                                leading-5
                                text-slate-500
                                sm:text-sm
                            "
                        >
                            Are you sure you want to log
                            out of your account?
                        </p>
                    </div>

                    {/* Security message */}
                    <div
                        className="
                            mt-6
                            flex
                            items-start
                            gap-3
                            rounded-2xl
                            border
                            border-slate-100
                            bg-slate-50
                            p-3.5
                        "
                    >
                        <div
                            className="
                                flex
                                h-8
                                w-8
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-white
                                shadow-sm
                            "
                        >
                            <ShieldCheck
                                size={16}
                                className="text-emerald-500"
                            />
                        </div>

                        <div>
                            <p
                                className="
                                    text-xs
                                    font-semibold
                                    text-slate-800
                                "
                            >
                                Your account stays protected
                            </p>

                            <p
                                className="
                                    mt-0.5
                                    text-[11px]
                                    leading-4
                                    text-slate-500
                                "
                            >
                                Your session will be securely
                                closed on this device.
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div
                        className="
                            mt-5
                            grid
                            grid-cols-2
                            gap-3
                        "
                    >
                        {/* Cancel */}
                        <button
                            type="button"
                            disabled={loading}
                            onClick={onClose}
                            className="
                                flex
                                h-12
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                px-4
                                text-sm
                                font-semibold
                                text-slate-700
                                transition-all
                                hover:bg-slate-50
                                active:scale-[0.98]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            Stay Signed In
                        </button>

                        {/* Logout */}
                        <button
                            type="button"
                            disabled={loading}
                            onClick={handleLogout}
                            className="
                                flex
                                h-12
                                items-center
                                justify-center
                                gap-2
                                rounded-2xl
                                bg-red-600
                                px-4
                                text-sm
                                font-semibold
                                text-white
                                shadow-[0_8px_20px_rgba(220,38,38,0.20)]
                                transition-all
                                hover:bg-red-700
                                active:scale-[0.98]
                                disabled:cursor-not-allowed
                                disabled:opacity-70
                            "
                        >
                            {loading ? (
                                <>
                                    <Loader2
                                        size={17}
                                        className="animate-spin"
                                    />

                                    <span>
                                        Signing out...
                                    </span>
                                </>
                            ) : (
                                <>
                                    <LogOut size={17} />

                                    <span>
                                        Log Out
                                    </span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Bottom note */}
                    <p
                        className="
                            mt-4
                            text-center
                            text-[10px]
                            leading-4
                            text-slate-400
                        "
                    >
                        You can sign back in anytime
                        using your account credentials.
                    </p>
                </div>
            </div>
        </div>
    );
}