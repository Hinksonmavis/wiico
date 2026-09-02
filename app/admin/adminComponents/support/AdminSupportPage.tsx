"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    ArrowLeft,
    MessageCircle,
} from "lucide-react";

import {
    useAdminSupportConversations,
} from "@/app/hooks/adminHooks/support/useAdminSupportConversations";

import {
    useAdminSupportConversation,
} from "@/app/hooks/adminHooks/support/useAdminSupportConversation";

import {
    useAdminSupportMessages,
} from "@/app/hooks/adminHooks/support/useAdminSupportMessages";

import {
    useAdminSendSupportMessage,
} from "@/app/hooks/adminHooks/support/useAdminSendSupportMessage";

import {
    useMarkAdminSupportAsRead,
} from "@/app/hooks/adminHooks/support/useMarkAdminSupportAsRead";

import {
    useUpdateSupportStatus,
} from "@/app/hooks/adminHooks/support/useUpdateSupportStatus";

import {
    AdminSupportHeader,
} from "./AdminSupportHeader";

import {
    AdminSupportConversationList,
} from "./AdminSupportConversationList";

import {
    AdminSupportConversationHeader,
} from "./AdminSupportConversationHeader";

import {
    AdminSupportMessages,
} from "./AdminSupportMessages";

import {
    AdminSupportComposer,
} from "./AdminSupportComposer";

import {
    AdminSupportEmptyState,
} from "./AdminSupportEmptyState";

import {
    SupportConversationStatus,
} from "@/app/types/sharedTypes/support.types";

export function AdminSupportPage() {

    const [
        selectedConversationId,
        setSelectedConversationId,
    ] = useState<string>("");

    const [
        mobileShowConversation,
        setMobileShowConversation,
    ] = useState(false);

    const conversationsQuery =
        useAdminSupportConversations();

    const conversationQuery =
        useAdminSupportConversation(
            selectedConversationId,
        );

    const messagesQuery =
        useAdminSupportMessages(
            selectedConversationId,
        );

    const sendMessageMutation =
        useAdminSendSupportMessage();

    const markAsReadMutation =
        useMarkAdminSupportAsRead();

    const updateStatusMutation =
        useUpdateSupportStatus();

    const conversations =
        conversationsQuery.data ?? [];

    const conversation =
        conversationQuery.data;

    const messages =
        messagesQuery.data ?? [];

    useEffect(() => {

        if (
            !selectedConversationId &&
            conversations.length > 0
        ) {
            setSelectedConversationId(
                conversations[0].id,
            );
        }

    }, [
        conversations,
        selectedConversationId,
    ]);

    const handleSelectConversation = (
        conversationId: string,
    ) => {

        setSelectedConversationId(
            conversationId,
        );

        setMobileShowConversation(
            true,
        );

        markAsReadMutation.mutate(
            conversationId,
        );
    };

    const handleBack = () => {

        setMobileShowConversation(
            false,
        );
    };

    const handleSendMessage = (
        message: string,
    ) => {

        if (
            !selectedConversationId ||
            !message.trim()
        ) {
            return;
        }

        sendMessageMutation.mutate({
            conversationId:
                selectedConversationId,

            message:
                message.trim(),
        });
    };

    const handleStatusChange = (
        status: SupportConversationStatus,
    ) => {

        if (
            !selectedConversationId
        ) {
            return;
        }

        updateStatusMutation.mutate({
            conversationId:
                selectedConversationId,

            status,
        });
    };

    return (
        <div className="flex min-h-[calc(100vh-80px)] flex-col bg-slate-50">

            <AdminSupportHeader
                totalConversations={
                    conversations.length
                }
            />

            <div className="flex min-h-0 flex-1 overflow-hidden">

                {/* =====================================================
                    CONVERSATION LIST
                ====================================================== */}

                <aside
                    className={[
                        "w-full shrink-0 border-r border-slate-200 bg-white",
                        "md:w-[320px] lg:w-[360px]",
                        mobileShowConversation
                            ? "hidden md:block"
                            : "block",
                    ].join(" ")}
                >

                    <AdminSupportConversationList
                        conversations={
                            conversations
                        }

                        selectedConversationId={
                            selectedConversationId
                        }

                        onSelect={
                            handleSelectConversation
                        }

                        isLoading={
                            conversationsQuery.isLoading
                        }
                    />

                </aside>

                {/* =====================================================
                    CHAT
                ====================================================== */}

                <section
                    className={[
                        "min-w-0 flex-1 bg-white",
                        mobileShowConversation
                            ? "flex"
                            : "hidden md:flex",
                    ].join(" ")}
                >

                    {!selectedConversationId ? (

                        <AdminSupportEmptyState />

                    ) : (

                        <div className="flex min-h-0 w-full flex-col">

                            <AdminSupportConversationHeader
                                conversation={
                                    conversation
                                }

                                onBack={
                                    handleBack
                                }

                                onStatusChange={
                                    handleStatusChange
                                }

                                isUpdatingStatus={
                                    updateStatusMutation.isPending
                                }
                            />

                            <AdminSupportMessages
                                messages={
                                    messages
                                }

                                isLoading={
                                    messagesQuery.isLoading
                                }
                            />

                            <AdminSupportComposer
                                onSend={
                                    handleSendMessage
                                }

                                disabled={
                                    !conversation ||
                                    conversation.status === "closed" ||
                                    sendMessageMutation.isPending
                                }

                                isSending={
                                    sendMessageMutation.isPending
                                }

                                isClosed={
                                    conversation?.status === "closed"
                                }
                            />

                        </div>
                    )}

                </section>

            </div>
        </div>
    );
}