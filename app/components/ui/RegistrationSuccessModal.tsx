"use client";

import {
    Check,
    ArrowRight,
    Phone,
    Sparkles,
} from "lucide-react";

interface RegistrationSuccessModalProps {
    open: boolean;
    phone: string;
    onContinue: () => void;
}

export default function RegistrationSuccessModal({
    open,
    phone,
    onContinue,
}: RegistrationSuccessModalProps) {
    if (!open) return null;

    return (
        <div
            className="
                fixed inset-0 z-[100]
                flex items-center justify-center
                bg-slate-950/60
                px-5
                backdrop-blur-sm
            "
        >
            <div
                className="
                    relative w-full max-w-[420px]
                    overflow-hidden
                    rounded-[28px]
                    bg-white
                    shadow-2xl
                "
            >
                {/* Decorative background */}
                <div
                    className="
                        absolute inset-x-0 top-0 h-36
                        bg-gradient-to-b
                        from-emerald-50
                        via-emerald-50/60
                        to-transparent
                    "
                />

                {/* Decorative sparkle */}
                <div
                    className="
                        absolute right-6 top-6
                        flex h-9 w-9
                        items-center justify-center
                        rounded-full
                        bg-white
                        text-emerald-500
                        shadow-sm
                    "
                >
                    <Sparkles className="h-4 w-4" />
                </div>

                <div className="relative px-6 pb-6 pt-8 sm:px-8">
                    {/* Success icon */}
                    <div className="flex justify-center">
                        <div
                            className="
                                flex h-20 w-20
                                items-center justify-center
                                rounded-full
                                bg-emerald-50
                                ring-8 ring-emerald-50/60
                            "
                        >
                            <div
                                className="
                                    flex h-14 w-14
                                    items-center justify-center
                                    rounded-full
                                    bg-emerald-500
                                    text-white
                                    shadow-lg
                                    shadow-emerald-500/20
                                "
                            >
                                <Check
                                    className="h-7 w-7"
                                    strokeWidth={3}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="mt-7 text-center">
                        <p
                            className="
                                text-xs font-semibold
                                uppercase tracking-[0.18em]
                                text-emerald-600
                            "
                        >
                            Account created
                        </p>

                        <h2
                            className="
                                mt-2
                                text-2xl
                                font-semibold
                                tracking-tight
                                text-slate-900
                            "
                        >
                            Welcome to WIICO
                        </h2>

                        <p
                            className="
                                mx-auto mt-3
                                max-w-[320px]
                                text-sm leading-6
                                text-slate-500
                            "
                        >
                            Your account has been created
                            successfully. You're all set to
                            start using your account.
                        </p>
                    </div>

                    {/* Account information */}
                    <div
                        className="
                            mt-7
                            rounded-2xl
                            border border-slate-100
                            bg-slate-50
                            p-4
                        "
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="
                                    flex h-10 w-10 shrink-0
                                    items-center justify-center
                                    rounded-xl
                                    bg-white
                                    text-slate-600
                                    shadow-sm
                                "
                            >
                                <Phone className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">
                                <p
                                    className="
                                        text-xs
                                        font-medium
                                        text-slate-400
                                    "
                                >
                                    Registered phone number
                                </p>

                                <p
                                    className="
                                        mt-0.5
                                        truncate
                                        text-sm
                                        font-semibold
                                        text-slate-900
                                    "
                                >
                                    {phone}
                                </p>
                            </div>

                            <div
                                className="
                                    ml-auto
                                    rounded-full
                                    bg-emerald-100
                                    px-2.5 py-1
                                    text-[10px]
                                    font-semibold
                                    text-emerald-700
                                "
                            >
                                Active
                            </div>
                        </div>
                    </div>

                    {/* Continue */}
                    <button
                        type="button"
                        onClick={onContinue}
                        className="
                            mt-5
                            flex w-full
                            items-center justify-center
                            gap-2
                            rounded-2xl
                            bg-slate-900
                            px-5 py-4
                            text-sm
                            font-semibold
                            text-white
                            shadow-lg
                            shadow-slate-900/10
                            transition
                            hover:bg-slate-800
                            active:scale-[0.98]
                        "
                    >
                        Continue to Dashboard

                        <ArrowRight className="h-4 w-4" />
                    </button>

                    <p
                        className="
                            mt-4 text-center
                            text-[11px]
                            leading-5
                            text-slate-400
                        "
                    >
                        Your account is ready. You can now
                        access your dashboard.
                    </p>
                </div>
            </div>
        </div>
    );
}