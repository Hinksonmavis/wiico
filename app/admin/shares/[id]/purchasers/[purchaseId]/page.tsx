import AdminSharePurchaserDetailsPageContent from "@/app/admin/adminComponents/shares/purchaserDetails/AdminSharePurchaserDetailsPageContent";

export default async function Page({
    params,
}: {
    params: Promise<{
        id: string;
        purchaseId: string;
    }>;
}) {
    const { id, purchaseId } = await params;

    return (
        <AdminSharePurchaserDetailsPageContent
            shareId={id}
            purchaseId={purchaseId}
        />
    );
}