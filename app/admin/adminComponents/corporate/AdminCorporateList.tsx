import {
    AdminCorporateAnnouncement,
} from "@/app/types/adminTypes/adminCorporate.types";
import { AdminCorporateCard } from "./AdminCorporateCard";


interface Props {
    announcements: AdminCorporateAnnouncement[];

    onEdit: (
        announcement: AdminCorporateAnnouncement,
    ) => void;

    onPublish: (
        id: string,
    ) => void;

    onUnpublish: (
        id: string,
    ) => void;

    onDelete: (
        announcement: AdminCorporateAnnouncement,
    ) => void;

    publishingId: string | null;
    unpublishingId: string | null;
}

export function AdminCorporateList({
    announcements,
    onEdit,
    onPublish,
    onUnpublish,
    onDelete,
    publishingId,
    unpublishingId,
}: Props) {

    return (
        <div
            className="
                grid
                gap-4
                md:grid-cols-2
                xl:grid-cols-3
            "
        >

            {announcements.map(
                (announcement) => (

                    <AdminCorporateCard
                        key={announcement.id}
                        announcement={
                            announcement
                        }
                        onEdit={onEdit}
                        onPublish={onPublish}
                        onUnpublish={onUnpublish}
                        onDelete={onDelete}
                        isPublishing={
                            publishingId ===
                            announcement.id
                        }
                        isUnpublishing={
                            unpublishingId ===
                            announcement.id
                        }
                    />

                ),
            )}

        </div>
    );
}