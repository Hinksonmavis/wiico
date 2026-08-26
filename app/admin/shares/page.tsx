"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminShare } from "@/app/types/adminTypes/share.types";
import { ShareStatus } from "@/app/types/sharedTypes/shareStatus.types";
import { useAdminShares } from "@/app/hooks/adminHooks/shares/useAdminShares";
import ShareManagementHeader from "../adminComponents/shares/ShareManagementHeader";
import ShareSearch from "../adminComponents/shares/ShareSearch";
import ShareStatusFilter from "../adminComponents/shares/ShareStatusFilter";
import ShareTable from "../adminComponents/shares/ShareTable";
import ShareCard from "../adminComponents/shares/ShareCard";
import SharePagination from "../adminComponents/shares/SharePagination";
import ShareManagementLoading from "../adminComponents/shares/ShareManagementLoading";
import ShareEmptyState from "../adminComponents/shares/ShareEmptyState";

export default function AdminSharesPage() {

    const router = useRouter();

    const [search, setSearch] =
        useState("");

    const [status, setStatus] =
        useState<
            ShareStatus | "ALL"
        >("ALL");

    const [page, setPage] =
        useState(1);

    const limit = 20;

    const {
        data,
        isLoading,
        isFetching,
        isError,
        error,
    } = useAdminShares({
        page,
        limit,
        search: search || undefined,
        status:
            status === "ALL"
                ? undefined
                : status,
    });

    useEffect(() => {
        setPage(1);
    }, [search, status]);

    const shares =
        data?.data ?? [];

    const pagination =
        data?.pagination;

    const handleCreate = () => {
        router.push(
            "/admin/shares/create",
        );
    };

    const handleView = (
        share: AdminShare,
    ) => {
        router.push(
            `/admin/shares/${share.id}`,
        );
    };

    const handleEdit = (
        share: AdminShare,
    ) => {
        router.push(
            `/admin/shares/${share.id}/edit`,
        );
    };

    const handleStart = (
        share: AdminShare,
    ) => {
        // The mutation will be connected here.
        console.log(
            "Start share:",
            share.id,
        );
    };

    const handleClose = (
        share: AdminShare,
    ) => {
        // The mutation will be connected here.
        console.log(
            "Close share:",
            share.id,
        );
    };

    const handleDelete = (
        share: AdminShare,
    ) => {
        // The mutation will be connected here.
        console.log(
            "Delete share:",
            share.id,
        );
    };

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-5 sm:px-6 lg:px-8">

            <div className="mx-auto w-full max-w-7xl space-y-5">

                <ShareManagementHeader
                    onCreate={handleCreate}
                />

                <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                    <div className="flex flex-col gap-3 md:flex-row">

                        <ShareSearch
                            value={search}
                            onChange={setSearch}
                        />

                        <ShareStatusFilter
                            value={status}
                            onChange={setStatus}
                        />

                    </div>

                </section>

                {isError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {error instanceof Error
                            ? error.message
                            : "Failed to load shares."}
                    </div>
                )}

                {isLoading ? (
                    <ShareManagementLoading />
                ) : shares.length === 0 ? (
                    <ShareEmptyState
                        hasFilters={
                            Boolean(
                                search ||
                                status !== "ALL",
                            )
                        }
                        onCreate={
                            handleCreate
                        }
                    />
                ) : (
                    <>
                        <div
                            className={
                                isFetching
                                    ? "opacity-60 transition-opacity"
                                    : ""
                            }
                        >

                            <ShareTable
                                shares={shares}
                                onView={
                                    handleView
                                }
                                onEdit={
                                    handleEdit
                                }
                                onStart={
                                    handleStart
                                }
                                onClose={
                                    handleClose
                                }
                                onDelete={
                                    handleDelete
                                }
                            />

                            <div className="space-y-3 md:hidden">

                                {shares.map(
                                    (share) => (
                                        <ShareCard
                                            key={
                                                share.id
                                            }
                                            share={
                                                share
                                            }
                                            onView={() =>
                                                handleView(
                                                    share,
                                                )
                                            }
                                            onEdit={() =>
                                                handleEdit(
                                                    share,
                                                )
                                            }
                                            onStart={() =>
                                                handleStart(
                                                    share,
                                                )
                                            }
                                            onClose={() =>
                                                handleClose(
                                                    share,
                                                )
                                            }
                                            onDelete={() =>
                                                handleDelete(
                                                    share,
                                                )
                                            }
                                        />
                                    ),
                                )}

                            </div>

                        </div>

                        {pagination && (
                            <SharePagination
                                pagination={
                                    pagination
                                }
                                onPageChange={
                                    setPage
                                }
                            />
                        )}
                    </>
                )}

            </div>

        </main>
    );
}