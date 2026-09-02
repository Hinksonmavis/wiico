"use client";

import {
    ArrowLeft,
    Building2,
    RefreshCw,
} from "lucide-react";

import {
    useRouter,
} from "next/navigation";

import {
    useCorporateAnnouncements,
} from "@/app/hooks/clientHooks/corporateHooks/useCorporateAnnouncements";

import {
    useMarkCorporateAsRead,
} from "@/app/hooks/clientHooks/corporateHooks/useMarkCorporateAsRead";

import {
    CorporateAnnouncementCard,
} from "./CorporateAnnouncementCard";

export function CorporatePage() {

    const router = useRouter();

    const query =
        useCorporateAnnouncements();

    const markAsRead =
        useMarkCorporateAsRead();

    const announcements =
        query.data ?? [];

    return (
        <div
            className="
                mx-auto
                w-full
                max-w-2xl
                px-4
                pb-8
                sm:px-0
            "
        >

            {/* Header */}

            <div
                className="
                    mb-5
                    flex
                    items-center
                    gap-3
                    sm:mb-6
                "
            >

                <button
                    type="button"
                    aria-label="Go back"
                    onClick={() =>
                        router.back()
                    }
                    className="
                        -ml-2
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        text-slate-600
                        transition-colors
                        hover:bg-slate-100
                        active:bg-slate-200
                        focus-visible:outline
                        focus-visible:outline-2
                        focus-visible:outline-offset-2
                        focus-visible:outline-slate-400
                    "
                >
                    <ArrowLeft size={20} />
                </button>

                <div
                    className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#1590FC]
                        text-white
                        sm:h-11
                        sm:w-11
                        sm:rounded-2xl
                    "
                >
                    <Building2
                        size={20}
                        strokeWidth={2.25}
                    />
                </div>

                <div className="min-w-0">

                    <h1
                        className="
                            truncate
                            text-lg
                            font-bold
                            tracking-tight
                            text-slate-950
                            sm:text-xl
                        "
                    >
                        Corporate
                    </h1>

                    <p
                        className="
                            mt-0.5
                            truncate
                            text-xs
                            text-slate-500
                        "
                    >
                        Official company announcements
                    </p>

                </div>

            </div>

            {/* Loading */}

            {query.isLoading && (
                <div className="space-y-2.5 sm:space-y-3">

                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="
                                h-36
                                animate-pulse
                                rounded-2xl
                                bg-slate-100
                            "
                        />
                    ))}

                </div>
            )}

            {/* Error */}

            {query.isError && (
                <div
                    className="
                        rounded-2xl
                        border
                        border-red-100
                        bg-red-50
                        p-5
                        text-center
                    "
                >

                    <p
                        className="
                            text-sm
                            font-semibold
                            text-red-700
                        "
                    >
                        Unable to load announcements.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            query.refetch()
                        }
                        className="
                            mt-3
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-red-600
                            px-4
                            py-2
                            text-xs
                            font-semibold
                            text-white
                            transition
                            hover:bg-red-700
                            active:scale-[0.98]
                        "
                    >
                        <RefreshCw size={14} />
                        Try again
                    </button>

                </div>
            )}

            {/* Empty */}

            {!query.isLoading &&
                !query.isError &&
                announcements.length === 0 && (
                    <div
                        className="
                            rounded-2xl
                            border
                            border-dashed
                            border-slate-300
                            bg-white
                            p-10
                            text-center
                        "
                    >

                        <Building2
                            size={32}
                            className="
                                mx-auto
                                text-slate-300
                            "
                        />

                        <h2
                            className="
                                mt-4
                                text-sm
                                font-bold
                                text-slate-800
                            "
                        >
                            No announcements
                        </h2>

                        <p
                            className="
                                mt-1
                                text-xs
                                text-slate-500
                            "
                        >
                            There are no corporate
                            announcements at the moment.
                        </p>

                    </div>
                )}

            {/* Announcements */}

            {!query.isLoading &&
                !query.isError &&
                announcements.length > 0 && (
                    <div className="space-y-2.5 sm:space-y-3">

                        {announcements.map(
                            (announcement) => (
                                <CorporateAnnouncementCard
                                    key={
                                        announcement.id
                                    }
                                    announcement={
                                        announcement
                                    }
                                    onRead={(id) =>
                                        markAsRead.mutate(
                                            id,
                                        )
                                    }
                                />
                            ),
                        )}

                    </div>
                )}

        </div>
    );
}