"use client";

import { useEffect } from "react";

import {
    SupportHeader,
} from "./SupportHeader";

import {
    SupportConversationInfo,
} from "./SupportConversationInfo";

import {
    SupportMessages,
} from "./SupportMessages";

import {
    SupportComposer,
} from "./SupportComposer";

import {
    SupportLoading,
} from "./SupportLoading";

import {
    useMySupportConversation,
} from "@/app/hooks/clientHooks/supportHooks/useMySupportConversation";

import {
    useMySupportMessages,
} from "@/app/hooks/clientHooks/supportHooks/useMySupportMessages";

import {
    useSendSupportMessage,
} from "@/app/hooks/clientHooks/supportHooks/useSupportMessage";

import {
    useMarkSupportAsRead,
} from "@/app/hooks/clientHooks/supportHooks/useMarkSupportAsRead";

export function SupportPage() {

    // ============================================================
    // QUERIES
    // ============================================================

    const conversationQuery =
        useMySupportConversation();

    const messagesQuery =
        useMySupportMessages();

    // ============================================================
    // MUTATIONS
    // ============================================================

    const sendMessageMutation =
        useSendSupportMessage();

    const {
        mutate: markAsRead,
        isPending: isMarkingAsRead,
    } = useMarkSupportAsRead();

    // ============================================================
    // DATA
    // ============================================================

    const conversation =
        conversationQuery.data;

    const messages =
        messagesQuery.data ?? [];

    // ============================================================
    // MARK SUPPORT MESSAGES AS READ
    // ============================================================

    useEffect(() => {

        if (
            conversation &&
            conversation.userUnreadCount > 0 &&
            !isMarkingAsRead
        ) {
            markAsRead();
        }

    }, [
        conversation,
        isMarkingAsRead,
        markAsRead,
    ]);

    // ============================================================
    // SEND MESSAGE
    // ============================================================

    const handleSendMessage = (
        message: string,
    ) => {

        const trimmedMessage =
            message.trim();

        if (!trimmedMessage) {
            return;
        }

        if (
            conversation?.status ===
            "closed"
        ) {
            return;
        }

        sendMessageMutation.mutate(
            trimmedMessage,
        );
    };

    // ============================================================
    // LOADING
    // ============================================================

    if (
        conversationQuery.isLoading ||
        messagesQuery.isLoading
    ) {
        return (
            <SupportLoading />
        );
    }

    // ============================================================
    // PAGE
    // ============================================================

    return (
        <div
            className="
                flex
                h-[calc(100dvh-80px)]
                w-full
                flex-col
                overflow-hidden
                bg-gray-50
            "
        >

            {/* =====================================================
                HEADER
            ====================================================== */}

            <SupportHeader />

            {/* =====================================================
                CHAT CONTAINER
            ====================================================== */}

            <main
                className="
                    mx-auto
                    flex
                    min-h-0
                    w-full
                    max-w-3xl
                    flex-1
                    flex-col
                    overflow-hidden
                    bg-white

                    md:my-4
                    md:h-[calc(100dvh-112px)]
                    md:flex-none
                    md:rounded-2xl
                    md:border
                    md:border-gray-200
                    md:shadow-sm
                "
            >

                {/* =================================================
                    CONVERSATION INFO
                ================================================== */}

                <SupportConversationInfo
                    conversation={
                        conversation
                    }
                />

                {/* =================================================
                    ONLY THIS AREA SCROLLS
                ================================================== */}

                <SupportMessages
                    messages={
                        messages
                    }
                    isLoading={
                        messagesQuery.isLoading
                    }
                />

                {/* =================================================
                    FIXED COMPOSER
                ================================================== */}

                <SupportComposer
                    onSend={
                        handleSendMessage
                    }
                    disabled={
                        conversation?.status ===
                        "closed"
                    }
                    isSending={
                        sendMessageMutation.isPending
                    }
                    isClosed={
                        conversation?.status ===
                        "closed"
                    }
                />

            </main>

        </div>
    );
}