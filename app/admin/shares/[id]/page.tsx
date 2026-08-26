"use client";

import {
    useState,
} from "react";

import {
    useParams,
    useRouter,
} from "next/navigation";

import {
    useAdminShare,
} from "@/app/hooks/adminHooks/shares/useAdminShare";

import {
    useAdminShareAnalytics,
} from "@/app/hooks/adminHooks/shares/useAdminShareAnalytics";

import {
    useAdminSharePurchasers,
} from "@/app/hooks/adminHooks/shares/useAdminSharePurchasers";

import AdminShareDetailsHeader from "../../adminComponents/shares/details/AdminShareDetailsHeader";
import AdminShareInformation from "../../adminComponents/shares/details/AdminShareInformation";
import AdminShareFinancialTerms from "../../adminComponents/shares/details/AdminShareFinancialTerms";
import AdminShareLifecycle from "../../adminComponents/shares/details/AdminShareLifecycle";
import AdminShareDetailsActions from "../../adminComponents/shares/details/AdminShareDetailsActions";
import AdminShareDetailsPurchasersSection from "../../adminComponents/shares/details/AdminShareDetailsPurchasersSection";
import AdminShareDetailsSkeleton from "../../adminComponents/shares/details/AdminShareDetailsSkeleton";
import AdminShareDetailsError from "../../adminComponents/shares/details/AdminShareDetailsError";
import AdminShareDetailsAnalyticsSection from "../../adminComponents/shares/details/AdminShareDetailsSection";
import StartShareDialog from "../../adminComponents/shares/dialogs/StartShareDialog";
import CloseShareDialog from "../../adminComponents/shares/dialogs/CloseShareDialog";
import DeleteShareDialog from "../../adminComponents/shares/dialogs/DeleteShareDialog";
import ShareActionModal from "../../adminComponents/shares/dialogs/ShareActionModal";

export default function AdminShareDetailsPage() {

    const params = useParams();
    const router = useRouter();


    /**
     * =========================================================
     * SHARE ID
     * =========================================================
     */

    const shareId = typeof params.id === "string"
        ? params.id
        : "";


    /**
     * =========================================================
     * STATE
     * =========================================================
     */

    const [
        purchaserPage,
        setPurchaserPage,
    ] = useState(1);


    /**
     * Manage Share modal.
     */
    const [
        actionsOpen,
        setActionsOpen,
    ] = useState(false);


    /**
     * Start confirmation dialog.
     */
    const [
        startDialogOpen,
        setStartDialogOpen,
    ] = useState(false);


    /**
     * Close confirmation dialog.
     */
    const [
        closeDialogOpen,
        setCloseDialogOpen,
    ] = useState(false);


    /**
     * Delete confirmation dialog.
     */
    const [
        deleteDialogOpen,
        setDeleteDialogOpen,
    ] = useState(false);


    /**
     * =========================================================
     * QUERIES
     * =========================================================
     */

    const shareQuery =
        useAdminShare(
            shareId,
        );


    const analyticsQuery =
        useAdminShareAnalytics(
            shareId,
        );


    const purchasersQuery =
        useAdminSharePurchasers(
            shareId,
            {
                page: purchaserPage,
                limit: 10,
            },
        );


    /**
     * =========================================================
     * LOADING
     * =========================================================
     */

    if (
        shareQuery.isLoading
    ) {

        return (
            <main className="min-h-screen bg-slate-50 px-4 py-5 sm:px-6 lg:px-8">

                <AdminShareDetailsSkeleton />

            </main>
        );
    }


    /**
     * =========================================================
     * ERROR
     * =========================================================
     */

    if (
        shareQuery.isError ||
        !shareQuery.data
    ) {

        return (
            <main className="min-h-screen bg-slate-50 px-4 py-5 sm:px-6 lg:px-8">

                <AdminShareDetailsError
                    message="The share could not be found or an error occurred while loading it."
                    onBack={() =>
                        router.push(
                            "/admin/shares",
                        )
                    }
                />

            </main>
        );
    }


    /**
     * =========================================================
     * SHARE
     * =========================================================
     */

    const share =
        shareQuery.data;


    /**
     * =========================================================
     * ACTION HANDLERS
     * =========================================================
     */

    const handleManage =
        () => {

            setActionsOpen(
                true,
            );
        };


    /**
     * START
     *
     * Close action modal first,
     * then open confirmation dialog.
     */
    const handleStart =
        () => {

            setActionsOpen(
                false,
            );

            setStartDialogOpen(
                true,
            );
        };


    /**
     * CLOSE
     */
    const handleClose =
        () => {

            setActionsOpen(
                false,
            );

            setCloseDialogOpen(
                true,
            );
        };


    /**
     * DELETE
     */
    const handleDelete =
        () => {

            setActionsOpen(
                false,
            );

            setDeleteDialogOpen(
                true,
            );
        };


    /**
     * =========================================================
     * PAGE
     * =========================================================
     */

    return (
        <>

            <main className="min-h-screen bg-slate-50 px-4 py-5 sm:px-6 lg:px-8">

                <div className="mx-auto max-w-7xl space-y-5">


                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <AdminShareDetailsHeader
                        share={share}
                    />


                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    <AdminShareDetailsActions
                        onManage={
                            handleManage
                        }
                    />


                    {/* =================================================
                        INFORMATION
                    ================================================= */}

                    <div className="grid gap-5 lg:grid-cols-2">

                        <AdminShareInformation
                            share={share}
                        />

                        <AdminShareFinancialTerms
                            share={share}
                        />

                    </div>


                    {/* =================================================
                        LIFECYCLE
                    ================================================= */}

                    <AdminShareLifecycle
                        status={
                            share.status
                        }
                    />


                    {/* =================================================
                        ANALYTICS
                    ================================================= */}

                    <AdminShareDetailsAnalyticsSection
                        isLoading={
                            analyticsQuery.isLoading
                        }

                        isError={
                            analyticsQuery.isError
                        }

                        analytics={
                            analyticsQuery.data
                        }
                    />


                    {/* =================================================
                        PURCHASERS
                    ================================================= */}

                    <AdminShareDetailsPurchasersSection
                        shareId={
                            share.id
                        }

                        shareName={
                            share.name
                        }

                        isLoading={
                            purchasersQuery.isLoading
                        }

                        isError={
                            purchasersQuery.isError
                        }

                        data={
                            purchasersQuery.data
                        }

                        page={
                            purchaserPage
                        }

                        onPageChange={
                            setPurchaserPage
                        }
                    />

                </div>

            </main>


            {/* =========================================================
                ACTION MODAL
            ========================================================= */}

            <ShareActionModal
                open={
                    actionsOpen
                }

                status={
                    share.status
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

                onDismiss={() =>
                    setActionsOpen(
                        false,
                    )
                }
            />


            {/* =========================================================
                START CONFIRMATION
            ========================================================= */}

            <StartShareDialog
                open={
                    startDialogOpen
                }

                shareId={
                    share.id
                }

                shareName={
                    share.name
                }

                onClose={() =>
                    setStartDialogOpen(
                        false,
                    )
                }
            />


            {/* =========================================================
                CLOSE CONFIRMATION
            ========================================================= */}

            <CloseShareDialog
                open={
                    closeDialogOpen
                }

                shareId={
                    share.id
                }

                shareName={
                    share.name
                }

                onClose={() =>
                    setCloseDialogOpen(
                        false,
                    )
                }
            />


            {/* =========================================================
                DELETE CONFIRMATION
            ========================================================= */}

            <DeleteShareDialog
                open={
                    deleteDialogOpen
                }

                shareId={
                    share.id
                }

                shareName={
                    share.name
                }

                status={
                    share.status
                }

                onClose={() =>
                    setDeleteDialogOpen(
                        false,
                    )
                }
            />

        </>
    );
}