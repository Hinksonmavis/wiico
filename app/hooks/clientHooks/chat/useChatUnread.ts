"use client";

import { useMemo } from "react";

import {
    useCorporateAnnouncements,
} from "../corporateHooks/useCorporateAnnouncements";

import {
    useUnreadNotifications,
} from "../notificationHooks/useUnreadNotifications";

import {
    useMySupportConversation,
} from "../supportHooks/useMySupportConversation";

export function useChatUnread() {

    const notifications =
        useUnreadNotifications();

    const corporate =
        useCorporateAnnouncements();

    const support =
        useMySupportConversation();

    const unreadNotifications =
        notifications.data?.length ?? 0;

    const unreadCorporate =
        corporate.data?.filter(
            (item) => !item.isRead,
        ).length ?? 0;

    const unreadSupport =
        support.data?.userUnreadCount ?? 0;

    const total =
        unreadNotifications +
        unreadCorporate +
        unreadSupport;

    const isLoading =
        notifications.isLoading ||
        corporate.isLoading ||
        support.isLoading;

    const isFetching =
        notifications.isFetching ||
        corporate.isFetching ||
        support.isFetching;

    return useMemo(
        () => ({
            total,

            notifications:
                unreadNotifications,

            corporate:
                unreadCorporate,

            support:
                unreadSupport,

            isLoading,

            isFetching,
        }),
        [
            total,
            unreadNotifications,
            unreadCorporate,
            unreadSupport,
            isLoading,
            isFetching,
        ],
    );
}