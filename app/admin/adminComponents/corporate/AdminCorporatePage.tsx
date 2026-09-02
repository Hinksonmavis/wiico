"use client";

import { useMemo, useState } from "react";

import {
    Megaphone,
    Plus,
    Search,
} from "lucide-react";

import {
    useCreateCorporateAnnouncement,
} from "@/app/hooks/adminHooks/corporate/useCreateCorporateAnnouncement";

import {
    useUpdateCorporateAnnouncement,
} from "@/app/hooks/adminHooks/corporate/useUpdateCorporateAnnouncement";

import {
    usePublishCorporateAnnouncement,
} from "@/app/hooks/adminHooks/corporate/usePublishCorporateAnnouncement";

import {
    useUnpublishCorporateAnnouncement,
} from "@/app/hooks/adminHooks/corporate/useUnpublishCorporateAnnouncement";

import {
    useDeleteCorporateAnnouncement,
} from "@/app/hooks/adminHooks/corporate/useDeleteCorporateAnnouncement";

import {
    AdminCorporateAnnouncement,
} from "@/app/types/adminTypes/adminCorporate.types";
import { useAdminCorporateAnnouncements } from "@/app/hooks/adminHooks/corporate/useAdminCoporateAnnouncements";
import { AdminCorporateHeader } from "./AdminCorporateHeader";
import { AdminCorporateStats } from "./AdminCorporateStats";
import { AdminCorporateEmptyState } from "./AdminCorporateEmptyState";
import { AdminCorporateList } from "./AdminCorporateList";
import { AdminCorporateForm } from "./AdminCorporateForm";
import { AdminCorporateDeleteDialog } from "./AdminCorporateDeleteDialog";

export function AdminCorporatePage() {

    const announcementsQuery =
        useAdminCorporateAnnouncements();

    const createMutation =
        useCreateCorporateAnnouncement();

    const updateMutation =
        useUpdateCorporateAnnouncement();

    const publishMutation =
        usePublishCorporateAnnouncement();

    const unpublishMutation =
        useUnpublishCorporateAnnouncement();

    const deleteMutation =
        useDeleteCorporateAnnouncement();

    const [
        search,
        setSearch,
    ] = useState("");

    const [
        formOpen,
        setFormOpen,
    ] = useState(false);

    const [
        editingAnnouncement,
        setEditingAnnouncement,
    ] =
        useState<AdminCorporateAnnouncement | null>(
            null,
        );

    const [
        deletingAnnouncement,
        setDeletingAnnouncement,
    ] =
        useState<AdminCorporateAnnouncement | null>(
            null,
        );

    const announcements =
        announcementsQuery.data ?? [];

    const filteredAnnouncements =
        useMemo(() => {

            const query =
                search
                    .trim()
                    .toLowerCase();

            if (!query) {
                return announcements;
            }

            return announcements.filter(
                (announcement) =>
                    announcement.title
                        .toLowerCase()
                        .includes(query) ||
                    announcement.message
                        .toLowerCase()
                        .includes(query),
            );

        }, [
            announcements,
            search,
        ]);

    const publishedCount =
        announcements.filter(
            (announcement) =>
                announcement.isPublished,
        ).length;

    const draftCount =
        announcements.length -
        publishedCount;

    const openCreateForm = () => {

        setEditingAnnouncement(null);
        setFormOpen(true);
    };

    const openEditForm = (
        announcement: AdminCorporateAnnouncement,
    ) => {

        setEditingAnnouncement(
            announcement,
        );

        setFormOpen(true);
    };

    const closeForm = () => {

        if (
            createMutation.isPending ||
            updateMutation.isPending
        ) {
            return;
        }

        setFormOpen(false);
        setEditingAnnouncement(null);
    };

    const handleSubmit = async (
        values: {
            title: string;
            message: string;
            isPublished: boolean;
        },
    ) => {

        if (editingAnnouncement) {

            await updateMutation.mutateAsync({
                id: editingAnnouncement.id,

                data: {
                    title: values.title,
                    message: values.message,
                    isPublished:
                        values.isPublished,
                },
            });

        } else {

            await createMutation.mutateAsync({
                title: values.title,
                message: values.message,
                isPublished:
                    values.isPublished,
            });
        }

        closeForm();
    };

    const handlePublish = (
        id: string,
    ) => {

        publishMutation.mutate(id);
    };

    const handleUnpublish = (
        id: string,
    ) => {

        unpublishMutation.mutate(id);
    };

    const handleDelete = async () => {

        if (!deletingAnnouncement) {
            return;
        }

        await deleteMutation.mutateAsync(
            deletingAnnouncement.id,
        );

        setDeletingAnnouncement(null);
    };

    const isLoading =
        announcementsQuery.isLoading;

    return (
        <div className="mx-auto w-full max-w-7xl">

            <AdminCorporateHeader
                onCreate={openCreateForm}
                total={announcements.length}
            />

            <AdminCorporateStats
                total={announcements.length}
                published={publishedCount}
                drafts={draftCount}
            />

            <div className="mt-6">

                <div
                    className="
                        flex
                        flex-col
                        gap-3
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >

                    <div>
                        <h2
                            className="
                                text-base
                                font-bold
                                text-gray-900
                            "
                        >
                            Corporate Announcements
                        </h2>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-gray-500
                            "
                        >
                            Create and manage announcements
                            visible to users.
                        </p>
                    </div>

                    <div
                        className="
                            relative
                            w-full
                            sm:max-w-xs
                        "
                    >

                        <Search
                            size={18}
                            className="
                                pointer-events-none
                                absolute
                                left-3
                                top-1/2
                                -translate-y-1/2
                                text-gray-400
                            "
                        />

                        <input
                            value={search}
                            onChange={(event) =>
                                setSearch(
                                    event.target.value,
                                )
                            }
                            placeholder="Search announcements..."
                            className="
                                h-11
                                w-full
                                rounded-xl
                                border
                                border-gray-200
                                bg-white
                                pl-10
                                pr-4
                                text-sm
                                outline-none
                                transition
                                focus:border-gray-400
                                focus:ring-2
                                focus:ring-gray-100
                            "
                        />

                    </div>

                </div>

                <div className="mt-5">

                    {isLoading ? (

                        <div
                            className="
                                grid
                                gap-4
                                md:grid-cols-2
                                xl:grid-cols-3
                            "
                        >

                            {Array.from({
                                length: 6,
                            }).map((_, index) => (

                                <div
                                    key={index}
                                    className="
                                        h-64
                                        animate-pulse
                                        rounded-2xl
                                        border
                                        border-gray-200
                                        bg-white
                                    "
                                />

                            ))}

                        </div>

                    ) : filteredAnnouncements.length === 0 ? (

                        <AdminCorporateEmptyState
                            hasSearch={Boolean(search)}
                            onCreate={openCreateForm}
                        />

                    ) : (

                        <AdminCorporateList
                            announcements={
                                filteredAnnouncements
                            }

                            onEdit={
                                openEditForm
                            }

                            onPublish={
                                handlePublish
                            }

                            onUnpublish={
                                handleUnpublish
                            }

                            onDelete={
                                setDeletingAnnouncement
                            }

                            publishingId={
                                publishMutation.isPending
                                    ? publishMutation.variables
                                    : null
                            }

                            unpublishingId={
                                unpublishMutation.isPending
                                    ? unpublishMutation.variables
                                    : null
                            }
                        />

                    )}

                </div>

            </div>

            {formOpen && (
                <AdminCorporateForm
                    announcement={
                        editingAnnouncement
                    }

                    isSubmitting={
                        createMutation.isPending ||
                        updateMutation.isPending
                    }

                    onClose={closeForm}
                    onSubmit={handleSubmit}
                />
            )}

            {deletingAnnouncement && (
                <AdminCorporateDeleteDialog
                    announcement={
                        deletingAnnouncement
                    }

                    isDeleting={
                        deleteMutation.isPending
                    }

                    onCancel={() =>
                        setDeletingAnnouncement(
                            null,
                        )
                    }

                    onConfirm={
                        handleDelete
                    }
                />
            )}

        </div>
    );
}