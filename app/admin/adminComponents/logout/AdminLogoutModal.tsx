"use client";

import { useEffect, useState } from "react";
import {
    Check,
    LogOut,
    ShieldCheck,
    Sparkles,
    X,
} from "lucide-react";

interface AdminLogoutModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void> | void;
}

export default function AdminLogoutModal({
    open,
    onClose,
    onConfirm,
}: AdminLogoutModalProps) {
    const [isLoggingOut, setIsLoggingOut] =
        useState(false);

    const [isSuccess, setIsSuccess] =
        useState(false);

    useEffect(() => {
        if (!open) {
            setIsLoggingOut(false);
            setIsSuccess(false);
        }
    }, [open]);

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (
            event: KeyboardEvent,
        ) => {
            if (
                event.key === "Escape" &&
                !isLoggingOut
            ) {
                onClose();
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown,
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown,
            );
        };
    }, [
        open,
        isLoggingOut,
        onClose,
    ]);

    if (!open) {
        return null;
    }

    async function handleConfirm() {
        if (isLoggingOut) {
            return;
        }

        try {
            setIsLoggingOut(true);

            await onConfirm();

            setIsSuccess(true);

        } catch (error) {
            console.error(
                "Admin logout failed:",
                error,
            );

            setIsLoggingOut(false);
        }
    }

    return (
        <div
            className="
                fixed
                inset-0
                z-[200]
                flex
                items-center
                justify-center
                bg-slate-950/60
                px-4
                py-6
                backdrop-blur-md
            "
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-logout-title"
        >
            {/* Backdrop */}

            <button
                type="button"
                aria-label="Close logout dialog"
                onClick={() => {
                    if (!isLoggingOut) {
                        onClose();
                    }
                }}
                className="
                    absolute
                    inset-0
                    cursor-default
                "
            />

            {/* Modal */}

            <div
                className="
                    relative
                    z-10
                    w-full
                    max-w-[430px]
                    overflow-hidden
                    rounded-[30px]
                    border
                    border-white/70
                    bg-white
                    shadow-[0_30px_100px_rgba(15,23,42,0.30)]
                    animate-in
                    fade-in
                    zoom-in-95
                    duration-200
                "
            >
                {/* Decorative top section */}

                <div
                    className="
                        relative
                        overflow-hidden
                        px-6
                        pb-7
                        pt-8
                        text-center
                    "
                >
                    {/* Soft background glow */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -left-16
                            -top-20
                            h-48
                            w-48
                            rounded-full
                            bg-blue-100/70
                            blur-3xl
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-16
                            top-0
                            h-40
                            w-40
                            rounded-full
                            bg-indigo-100/60
                            blur-3xl
                        "
                    />

                    {/* Close */}

                    {!isLoggingOut && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                absolute
                                right-5
                                top-5
                                z-20
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
                            "
                            aria-label="Close"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}

                    {/* Animated illustration */}

                    <div className="relative mx-auto h-28 w-28">
                        {/* Outer pulse */}

                        <div
                            className="
                                absolute
                                inset-0
                                animate-ping
                                rounded-full
                                bg-blue-100/60
                            "
                            style={{
                                animationDuration:
                                    "2.5s",
                            }}
                        />

                        {/* Main circle */}

                        <div
                            className="
                                absolute
                                inset-2
                                flex
                                items-center
                                justify-center
                                rounded-full
                                bg-gradient-to-br
                                from-slate-900
                                via-blue-900
                                to-blue-600
                                shadow-[0_15px_35px_rgba(37,99,235,0.25)]
                            "
                        >
                            {isSuccess ? (
                                <Check
                                    className="
                                        h-10
                                        w-10
                                        text-white
                                        animate-in
                                        zoom-in
                                        duration-300
                                    "
                                    strokeWidth={2.5}
                                />
                            ) : (
                                <LogOut
                                    className="
                                        h-10
                                        w-10
                                        text-white
                                        -translate-x-0.5
                                    "
                                    strokeWidth={1.8}
                                />
                            )}
                        </div>

                        {/* Floating sparkles */}

                        <div
                            className="
                                absolute
                                -right-1
                                top-1
                                flex
                                h-7
                                w-7
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white
                                bg-blue-50
                                text-blue-600
                                shadow-sm
                                animate-bounce
                            "
                            style={{
                                animationDuration:
                                    "2s",
                            }}
                        >
                            <Sparkles className="h-3.5 w-3.5" />
                        </div>

                        <div
                            className="
                                absolute
                                -bottom-1
                                left-0
                                flex
                                h-6
                                w-6
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white
                                bg-indigo-50
                                text-indigo-600
                                shadow-sm
                            "
                        >
                            <ShieldCheck className="h-3 w-3" />
                        </div>
                    </div>

                    {/* Heading */}

                    <div className="relative mt-6">
                        {isSuccess ? (
                            <>
                                <p
                                    className="
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-[0.2em]
                                        text-blue-600
                                    "
                                >
                                    Session ended
                                </p>

                                <h2
                                    id="admin-logout-title"
                                    className="
                                        mt-2
                                        text-2xl
                                        font-bold
                                        tracking-tight
                                        text-slate-900
                                    "
                                >
                                    Goodbye, Admin
                                </h2>

                                <p
                                    className="
                                        mx-auto
                                        mt-3
                                        max-w-[310px]
                                        text-sm
                                        leading-6
                                        text-slate-500
                                    "
                                >
                                    You have been securely
                                    signed out of the
                                    administrator panel.
                                </p>
                            </>
                        ) : (
                            <>
                                <p
                                    className="
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-[0.2em]
                                        text-blue-600
                                    "
                                >
                                    Administrator session
                                </p>

                                <h2
                                    id="admin-logout-title"
                                    className="
                                        mt-2
                                        text-2xl
                                        font-bold
                                        tracking-tight
                                        text-slate-900
                                    "
                                >
                                    Goodbye, Admin
                                </h2>

                                <p
                                    className="
                                        mx-auto
                                        mt-3
                                        max-w-[320px]
                                        text-sm
                                        leading-6
                                        text-slate-500
                                    "
                                >
                                    Do you want to log out
                                    from your administrator
                                    panel, sir?
                                </p>
                            </>
                        )}
                    </div>
                </div>

                {/* Confirmation section */}

                {!isSuccess && (
                    <div
                        className="
                            border-t
                            border-slate-100
                            bg-slate-50/70
                            px-5
                            py-5
                        "
                    >
                        {/* Security notice */}

                        <div
                            className="
                                mb-4
                                flex
                                items-center
                                gap-3
                                rounded-2xl
                                border
                                border-blue-100
                                bg-blue-50/70
                                px-4
                                py-3
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
                                    text-blue-600
                                    shadow-sm
                                "
                            >
                                <ShieldCheck className="h-4 w-4" />
                            </div>

                            <p
                                className="
                                    text-[11px]
                                    leading-5
                                    text-blue-800
                                "
                            >
                                Your administrator session
                                will be securely closed.
                            </p>
                        </div>

                        {/* Buttons */}

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                disabled={isLoggingOut}
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
                                    transition
                                    hover:bg-slate-100
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            >
                                Stay Logged In
                            </button>

                            <button
                                type="button"
                                disabled={isLoggingOut}
                                onClick={handleConfirm}
                                className="
                                    relative
                                    flex
                                    h-12
                                    items-center
                                    justify-center
                                    gap-2
                                    overflow-hidden
                                    rounded-2xl
                                    bg-slate-900
                                    px-4
                                    text-sm
                                    font-semibold
                                    text-white
                                    shadow-lg
                                    shadow-slate-900/10
                                    transition
                                    hover:bg-slate-800
                                    active:scale-[0.98]
                                    disabled:cursor-not-allowed
                                    disabled:opacity-70
                                "
                            >
                                {isLoggingOut ? (
                                    <>
                                        <span
                                            className="
                                                h-4
                                                w-4
                                                animate-spin
                                                rounded-full
                                                border-2
                                                border-white/30
                                                border-t-white
                                            "
                                        />

                                        Signing out...
                                    </>
                                ) : (
                                    <>
                                        <LogOut className="h-4 w-4" />

                                        Yes, Log Out
                                    </>
                                )}
                            </button>
                        </div>

                        <p
                            className="
                                mt-4
                                text-center
                                text-[10px]
                                text-slate-400
                            "
                        >
                            You can sign back in at any
                            time.
                        </p>
                    </div>
                )}

                {/* Success state */}

                {isSuccess && (
                    <div
                        className="
                            border-t
                            border-slate-100
                            bg-slate-50/70
                            px-5
                            py-5
                        "
                    >
                        <div
                            className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                text-xs
                                font-medium
                                text-slate-500
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

                            Redirecting you to the
                            homepage...
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}