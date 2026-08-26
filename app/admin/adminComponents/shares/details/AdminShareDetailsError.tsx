"use client";

interface AdminShareDetailsErrorProps {
    message: string;
    onBack: () => void;
}

export default function AdminShareDetailsError({
    message,
    onBack,
}: AdminShareDetailsErrorProps) {
    return (
        <div className="mx-auto max-w-lg py-16 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
                !
            </div>

            <h1 className="mt-4 text-lg font-bold text-slate-900">
                Unable to load share
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
                {message}
            </p>

            <button
                type="button"
                onClick={onBack}
                className="mt-6 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
                Back to shares
            </button>

        </div>
    );
}