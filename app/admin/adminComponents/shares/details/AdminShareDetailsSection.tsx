"use client";

import AdminShareAnalytics from "./AdminShareAnalytics";

interface AdminShareDetailsAnalyticsSectionProps {
    isLoading: boolean;
    isError: boolean;
    analytics?: any;
}

export default function AdminShareDetailsAnalyticsSection({
    isLoading,
    isError,
    analytics,
}: AdminShareDetailsAnalyticsSectionProps) {

    if (isLoading) {
        return (
            <div className="h-64 animate-pulse rounded-2xl bg-slate-200" />
        );
    }


    if (
        isError ||
        !analytics
    ) {
        return (
            <section className="rounded-2xl border border-amber-100 bg-amber-50 p-5">

                <p className="text-sm font-semibold text-amber-800">
                    Analytics unavailable
                </p>

                <p className="mt-1 text-xs leading-5 text-amber-700">
                    We could not load analytics for this share.
                </p>

            </section>
        );
    }


    return (
        <AdminShareAnalytics
            analytics={analytics}
        />
    );
}