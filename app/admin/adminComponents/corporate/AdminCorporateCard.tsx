"use client";

import {
    Edit3,
    Eye,
    EyeOff,
    MoreVertical,
    Trash2,
} from "lucide-react";

import {
    AdminCorporateAnnouncement,
} from "@/app/types/adminTypes/adminCorporate.types";

import {
    useState,
} from "react";

interface Props {
    announcement: AdminCorporateAnnouncement;

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

    isPublishing: boolean;
    isUnpublishing: boolean;
}

function formatDate(
    value: string | Date | null,
) {

    if (!value) {
        return "Not published";
    }

    return new Intl.DateTimeFormat(
        "en-NG",
        {
            dateStyle: "medium",
            timeStyle: "short",
        },
    ).format(
        new Date(value),
    );
}

export function AdminCorporateCard({
    announcement,
    onEdit,
    onPublish,
    onUnpublish,
    onDelete,
    isPublishing,
    isUnpublishing,
}: Props) {

    const [
        menuOpen,
        setMenuOpen,
    ] = useState(false);

    const isBusy =
        isPublishing ||
        isUnpublishing;

    return (
        <article
            className="
                flex
                min-h-[250px]
                flex-col
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-5
                shadow-sm
                transition
                hover:shadow-md
            "
        >

            <div
                className="
                    flex
                    items-start
                    justify-between
                    gap-3
                "
            >

                <div
                    className={`
                        inline-flex
                        rounded-full
                        px-2.5
                        py-1
                        text-[11px]
                        font-semibold

                        ${
                            announcement.isPublished
                                ? "bg-green-50 text-green-700"
                                : "bg-gray-100 text-gray-600"
                        }
                    `}
                >
                    {announcement.isPublished
                        ? "Published"
                        : "Draft"}
                </div>

                <div className="relative">

                    <button
                        type="button"
                        onClick={() =>
                            setMenuOpen(
                                (value) =>
                                    !value,
                            )
                        }
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            text-gray-500
                            transition
                            hover:bg-gray-100
                        "
                    >
                        <MoreVertical
                            size={18}
                        />
                    </button>

                    {menuOpen && (
                        <div
                            className="
                                absolute
                                right-0
                                top-10
                                z-20
                                w-40
                                overflow-hidden
                                rounded-xl
                                border
                                border-gray-200
                                bg-white
                                p-1
                                shadow-lg
                            "
                        >

                            <button
                                type="button"
                                onClick={() => {
                                    setMenuOpen(false);
                                    onEdit(
                                        announcement,
                                    );
                                }}
                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-2
                                    rounded-lg
                                    px-3
                                    py-2.5
                                    text-left
                                    text-sm
                                    text-gray-700
                                    hover:bg-gray-50
                                "
                            >
                                <Edit3 size={15} />
                                Edit
                            </button>

                            <button
                                type="button"
                                disabled={isBusy}
                                onClick={() => {
                                    setMenuOpen(false);

                                    if (
                                        announcement.isPublished
                                    ) {
                                        onUnpublish(
                                            announcement.id,
                                        );
                                    } else {
                                        onPublish(
                                            announcement.id,
                                        );
                                    }
                                }}
                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-2
                                    rounded-lg
                                    px-3
                                    py-2.5
                                    text-left
                                    text-sm
                                    text-gray-700
                                    hover:bg-gray-50
                                    disabled:opacity-50
                                "
                            >

                                {announcement.isPublished ? (
                                    <EyeOff size={15} />
                                ) : (
                                    <Eye size={15} />
                                )}

                                {announcement.isPublished
                                    ? "Unpublish"
                                    : "Publish"}

                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setMenuOpen(false);
                                    onDelete(
                                        announcement,
                                    );
                                }}
                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-2
                                    rounded-lg
                                    px-3
                                    py-2.5
                                    text-left
                                    text-sm
                                    text-red-600
                                    hover:bg-red-50
                                "
                            >
                                <Trash2 size={15} />
                                Delete
                            </button>

                        </div>
                    )}

                </div>

            </div>

            <div className="mt-5 flex-1">

                <h3
                    className="
                        line-clamp-2
                        text-base
                        font-bold
                        text-gray-900
                    "
                >
                    {announcement.title}
                </h3>

                <p
                    className="
                        mt-3
                        line-clamp-4
                        text-sm
                        leading-6
                        text-gray-600
                    "
                >
                    {announcement.message}
                </p>

            </div>

            <div
                className="
                    mt-5
                    border-t
                    border-gray-100
                    pt-4
                "
            >

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-3
                        text-[11px]
                        text-gray-400
                    "
                >

                    <span>
                        Created{" "}
                        {formatDate(
                            announcement.createdAt,
                        )}
                    </span>

                    {announcement.isPublished && (
                        <span>
                            Published{" "}
                            {formatDate(
                                announcement.publishedAt,
                            )}
                        </span>
                    )}

                </div>

                <div
                    className="
                        mt-3
                        flex
                        gap-2
                    "
                >

                    <button
                        type="button"
                        onClick={() =>
                            onEdit(
                                announcement,
                            )
                        }
                        className="
                            flex
                            flex-1
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-gray-200
                            px-3
                            py-2.5
                            text-xs
                            font-semibold
                            text-gray-700
                            transition
                            hover:bg-gray-50
                        "
                    >
                        <Edit3 size={15} />
                        Edit
                    </button>

                    <button
                        type="button"
                        disabled={isBusy}
                        onClick={() =>
                            announcement.isPublished
                                ? onUnpublish(
                                    announcement.id,
                                )
                                : onPublish(
                                    announcement.id,
                                )
                        }
                        className="
                            flex
                            flex-1
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-black
                            px-3
                            py-2.5
                            text-xs
                            font-semibold
                            text-white
                            transition
                            hover:bg-gray-800
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >

                        {announcement.isPublished
                            ? "Unpublish"
                            : "Publish"}

                    </button>

                </div>

            </div>

        </article>
    );
}