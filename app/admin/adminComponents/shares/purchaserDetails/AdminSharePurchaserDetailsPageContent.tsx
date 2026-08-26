"use client";

import { useState } from "react";

import { useAdminSharePurchaserDetails } from "@/app/hooks/adminHooks/shares/useAdminSharePurchaserDetails";

import AdminSharePurchaserDetailsHeader from "./AdminSharePurchaserDetailsHeader";
import AdminSharePurchaserDetailsInfo from "./AdminSharePurchaserDetailsInfo";
import AdminSharePurchaserDetailsSkeleton from "./AdminSharePurchaserDetailsSkeleton";
import AdminSharePurchaserDetailsError from "./AdminSharePurchaserDetailsError";
import CreditPurchaserReturnDialog from "../dialogs/CreditPurchaserReturnDialog";

interface AdminSharePurchaserDetailsPageContentProps {
    shareId: string;
    purchaseId: string;
}

export default function AdminSharePurchaserDetailsPageContent({
    shareId,
    purchaseId,
}: AdminSharePurchaserDetailsPageContentProps) {

    const [creditDialogOpen, setCreditDialogOpen] = useState(false);

    const {
        data: purchaser,
        isLoading,
        isError,
        refetch,
    } = useAdminSharePurchaserDetails(shareId, purchaseId);

    if (isLoading) {
        return <AdminSharePurchaserDetailsSkeleton />;
    }

    if (isError || !purchaser) {
        return (
            <AdminSharePurchaserDetailsError
                shareId={shareId}
                onRetry={() => refetch()}
            />
        );
    }

    return (
        <div className="space-y-5">

            <AdminSharePurchaserDetailsHeader
                shareId={shareId}
                purchaser={purchaser}
                onCreditReturn={() => setCreditDialogOpen(true)}
            />

            <AdminSharePurchaserDetailsInfo
                purchaser={purchaser}
            />

            <CreditPurchaserReturnDialog
                open={creditDialogOpen}
                shareId={shareId}
                purchaseId={purchaseId}
                purchaser={purchaser}
                onClose={() => setCreditDialogOpen(false)}
            />

        </div>
    );
}