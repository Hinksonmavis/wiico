"use client";

import {
    AlertTriangle,
    Loader2,
    Trash2,
    X,
} from "lucide-react";

import {
    AdminCorporateAnnouncement,
} from "@/app/types/adminTypes/adminCorporate.types";

interface Props {
    announcement: AdminCorporateAnnouncement;

    isDeleting: boolean;

    onCancel: () => void;

    onConfirm: () => void;
}

export function AdminCorporateDeleteDialog({
    announcement,
    isDeleting,
    onCancel,
    onConfirm,
}: Props) {

    return (
        <div
            className="
                fixed
                inset-0
                z-[110]
                flex
                items-end
                justify-center
                bg-black/40
                p-0
                sm:items-center
                sm:p-4
            "
        >

            <div
                className="
                    w-full
                    rounded-t-3xl
                    bg-white
                    p-5
                    shadow-2xl
                    sm:max-w-md
                    sm:rounded-2xl
                "
            >

                <div
                    className="
                        flex
                        items-start
                        justify-between
                    "
                >

                    <div
                        className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-full
                            bg-red-50
                            text-red-600
                        "
                    >
                        <AlertTriangle size={21} />
                    </div>

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isDeleting}
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            text-gray-400
                            hover:bg-gray-100
                        "
                    >
                        <X size={18} />
                    </button>

                </div>

                <h2
                    className="
                        mt-5
                        text-lg
                        font-bold
                        text-gray-900
                    "
                >
                    Delete announcement?
                </h2>

                <p
                    className="
                        mt-2
                        text-sm
                        leading-6
                        text-gray-500
                    "
                >
                    You are about to permanently delete{" "}
                    <span className="font-semibold text-gray-700">
                        "{announcement.title}"
                    </span>
                    . This action cannot be undone.
                </p>

                <div
                    className="
                        mt-6
                        flex
                        gap-3
                    "
                >

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isDeleting}
                        className="
                            flex-1
                            rounded-xl
                            border
                            border-gray-200
                            px-4
                            py-3
                            text-sm
                            font-semibold
                            text-gray-700
                            hover:bg-gray-50
                            disabled:opacity-50
                        "
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="
                            flex
                            flex-1
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-red-600
                            px-4
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            hover:bg-red-700
                            disabled:opacity-50
                        "
                    >

                        {isDeleting ? (
                            <>
                                <Loader2
                                    size={16}
                                    className="animate-spin"
                                />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 size={16} />
                                Delete
                            </>
                        )}

                    </button>

                </div>

            </div>

        </div>
    );
}