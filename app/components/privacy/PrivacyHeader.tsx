"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function PrivacyHeader() {
    const router = useRouter();

    return (
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-5xl items-center px-4 py-3 sm:px-6 lg:px-8">
                <button
                    type="button"
                    onClick={() => router.back()}
                    aria-label="Go back"
                    className="
                        inline-flex h-10 items-center gap-2 rounded-xl
                        px-3 text-sm font-semibold text-slate-600
                        transition hover:bg-slate-100 hover:text-slate-950
                        focus:outline-none focus:ring-2
                        focus:ring-sky-500 focus:ring-offset-2
                    "
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </button>

                <p className="ml-auto text-sm font-medium text-slate-500">
                    Privacy & Security
                </p>
            </div>
        </header>
    );
}