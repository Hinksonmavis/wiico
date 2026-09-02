"use client";

import {
    Search,
} from "lucide-react";

import {
    useMemo,
    useState,
} from "react";

import {
    AdminSupportConversation,
} from "@/app/types/adminTypes/adminSupport.types";
import { AdminSupportConversationItem } from "./AdminSupportConversationItem";


interface Props {
    conversations: AdminSupportConversation[];
    selectedConversationId: string;
    onSelect: (
        id: string,
    ) => void;
    isLoading: boolean;
}

export function AdminSupportConversationList({
    conversations,
    selectedConversationId,
    onSelect,
    isLoading,
}: Props) {

    const [
        search,
        setSearch,
    ] = useState("");

    const filteredConversations =
        useMemo(() => {

            const value =
                search
                    .trim()
                    .toLowerCase();

            if (!value) {
                return conversations;
            }

            return conversations.filter(
                (conversation) =>
                    conversation.userPhone
                        ?.toLowerCase()
                        .includes(value) ||
                    conversation.userEmail
                        ?.toLowerCase()
                        .includes(value) ||
                    conversation.userReferralCode
                        ?.toLowerCase()
                        .includes(value),
            );

        }, [
            conversations,
            search,
        ]);

    return (
        <div className="flex h-full min-h-0 flex-col">

            <div className="border-b border-slate-100 p-3">

                <div className="relative">

                    <Search
                        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        value={search}
                        onChange={(event) =>
                            setSearch(
                                event.target.value,
                            )
                        }
                        placeholder="Search conversations..."
                        className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                    />

                </div>

            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">

                {isLoading ? (

                    <div className="space-y-2 p-3">

                        {Array.from({
                            length: 6,
                        }).map((_, index) => (

                            <div
                                key={index}
                                className="h-20 animate-pulse rounded-xl bg-slate-100"
                            />

                        ))}

                    </div>

                ) : filteredConversations.length === 0 ? (

                    <div className="px-6 py-12 text-center">

                        <p className="text-sm font-medium text-slate-700">
                            No conversations found
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            Try another search.
                        </p>

                    </div>

                ) : (

                    <div className="p-2">

                        {filteredConversations.map(
                            (conversation) => (

                                <AdminSupportConversationItem
                                    key={
                                        conversation.id
                                    }

                                    conversation={
                                        conversation
                                    }

                                    selected={
                                        conversation.id ===
                                        selectedConversationId
                                    }

                                    onClick={() =>
                                        onSelect(
                                            conversation.id,
                                        )
                                    }
                                />

                            ),
                        )}

                    </div>

                )}

            </div>

        </div>
    );
}