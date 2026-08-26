"use client";

import {
    ArrowLeft,
    Layers3,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ShareCreationHeaderProps {
    disabled?: boolean;
}

export default function ShareCreationHeader({
    disabled = false,
}: ShareCreationHeaderProps) {

    const router = useRouter();

    const handleBack = () => {
        if (disabled) {
            return;
        }

        router.push(
            "/admin/shares",
        );
    };

    return (
        <header className="space-y-4">

            <button
                type="button"
                onClick={handleBack}
                disabled={disabled}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <ArrowLeft className="h-4 w-4" />

                Back to Shares
            </button>

            <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
                    <Layers3
                        className="h-6 w-6"
                        strokeWidth={1.8}
                    />
                </div>

                <div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                        Create Share
                    </h1>

                    <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                        Create an investment share that users
                        can purchase from the platform.
                    </p>
                </div>

            </div>

        </header>
    );
}