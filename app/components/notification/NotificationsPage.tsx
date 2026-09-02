"use client";

import {
    Bell,
    RefreshCw,
} from "lucide-react";

import {
    useNotifications,
} from "@/app/hooks/clientHooks/notificationHooks/useNotifications";

import {
    useMarkNotificationAsRead,
} from "@/app/hooks/clientHooks/notificationHooks/useMarkNotificationAsRead";

import {
    useMarkAllNotificationsAsRead,
} from "@/app/hooks/clientHooks/notificationHooks/useMarkAllNotificationsAsRead";

import {
    useDeleteNotification,
} from "@/app/hooks/clientHooks/notificationHooks/useDeleteNotification";

import {
    useDeleteAllNotifications,
} from "@/app/hooks/clientHooks/notificationHooks/useDeleteAllNotifications";

import { NotificationCard } from "@/app/components/notification/NotificationCard";
import { NotificationsHeader } from "./NotificationsHeader";
import { NotificationActionsBar } from "./NotificationsActionBar";

export function NotificationsPage() {

    const query =
        useNotifications();

    const markAsRead =
        useMarkNotificationAsRead();

    const markAll =
        useMarkAllNotificationsAsRead();

    const deleteOne =
        useDeleteNotification();

    const deleteAll =
        useDeleteAllNotifications();

    const notifications =
        query.data ?? [];

    const unreadCount =
        notifications.filter(
            (item) => !item.isRead,
        ).length;

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

            <NotificationsHeader
                unreadCount={unreadCount}
            />

            {notifications.length > 0 && (
                <NotificationActionsBar
                    unreadCount={unreadCount}
                    isMarkingAll={markAll.isPending}
                    isDeletingAll={deleteAll.isPending}
                    onMarkAllRead={() =>
                        markAll.mutate()
                    }
                    onDeleteAll={() =>
                        deleteAll.mutate()
                    }
                />
            )}

            {/* Loading */}

            {query.isLoading && (
                <div className="space-y-3">

                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="
                                h-40
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
                        bg-red-50
                        p-8
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
                        Unable to load notifications.
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
                notifications.length === 0 && (
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

                        <Bell
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
                            No notifications
                        </h2>

                        <p
                            className="
                                mt-1
                                text-xs
                                text-slate-500
                            "
                        >
                            You're all caught up.
                        </p>

                    </div>
                )}

            {/* List */}

            {!query.isLoading &&
                !query.isError &&
                notifications.length > 0 && (
                    <div className="space-y-3">

                        {notifications.map(
                            (notification) => (
                                <NotificationCard
                                    key={
                                        notification.id
                                    }
                                    notification={
                                        notification
                                    }
                                    onRead={(id) =>
                                        markAsRead.mutate(
                                            id,
                                        )
                                    }
                                    onDelete={(id) =>
                                        deleteOne.mutate(
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