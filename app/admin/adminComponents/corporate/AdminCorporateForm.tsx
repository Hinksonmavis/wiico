"use client";

import {
    FormEvent,
    useEffect,
    useState,
} from "react";

import {
    X,
    Megaphone,
    Send,
    Save,
} from "lucide-react";

import {
    AdminCorporateAnnouncement,
} from "@/app/types/adminTypes/adminCorporate.types";

interface FormValues {
    title: string;
    message: string;
    isPublished: boolean;
}

interface Props {
    announcement:
        | AdminCorporateAnnouncement
        | null;

    isSubmitting: boolean;

    onClose: () => void;

    onSubmit: (
        values: FormValues,
    ) => Promise<void>;
}

export function AdminCorporateForm({
    announcement,
    isSubmitting,
    onClose,
    onSubmit,
}: Props) {

    const isEditing =
        Boolean(announcement);

    const [
        title,
        setTitle,
    ] = useState("");

    const [
        message,
        setMessage,
    ] = useState("");

    const [
        isPublished,
        setIsPublished,
    ] = useState(false);

    useEffect(() => {

        setTitle(
            announcement?.title ?? "",
        );

        setMessage(
            announcement?.message ?? "",
        );

        setIsPublished(
            announcement?.isPublished ?? false,
        );

    }, [announcement]);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ) => {

        event.preventDefault();

        const cleanTitle =
            title.trim();

        const cleanMessage =
            message.trim();

        if (
            !cleanTitle ||
            !cleanMessage
        ) {
            return;
        }

        await onSubmit({
            title: cleanTitle,
            message: cleanMessage,
            isPublished,
        });
    };

    return (
        <div
            className="
                fixed
                inset-0
                z-[100]
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
                    flex
                    max-h-[92vh]
                    w-full
                    flex-col
                    overflow-hidden
                    rounded-t-3xl
                    bg-white
                    shadow-2xl
                    sm:max-w-xl
                    sm:rounded-2xl
                "
            >

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-gray-100
                        px-5
                        py-4
                    "
                >

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                bg-gray-100
                                text-gray-700
                            "
                        >
                            <Megaphone size={19} />
                        </div>

                        <div>

                            <h2
                                className="
                                    text-base
                                    font-bold
                                    text-gray-900
                                "
                            >
                                {isEditing
                                    ? "Edit Announcement"
                                    : "New Announcement"}
                            </h2>

                            <p
                                className="
                                    text-xs
                                    text-gray-500
                                "
                            >
                                {isEditing
                                    ? "Update announcement details."
                                    : "Create a message for your users."}
                            </p>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            text-gray-500
                            hover:bg-gray-100
                            disabled:opacity-50
                        "
                    >
                        <X size={19} />
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="
                        overflow-y-auto
                        p-5
                    "
                >

                    <div>

                        <label
                            htmlFor="corporate-title"
                            className="
                                text-sm
                                font-semibold
                                text-gray-800
                            "
                        >
                            Title
                        </label>

                        <input
                            id="corporate-title"
                            value={title}
                            onChange={(event) =>
                                setTitle(
                                    event.target.value,
                                )
                            }
                            maxLength={150}
                            required
                            placeholder="Enter announcement title"
                            className="
                                mt-2
                                h-12
                                w-full
                                rounded-xl
                                border
                                border-gray-200
                                px-4
                                text-sm
                                outline-none
                                transition
                                focus:border-gray-400
                                focus:ring-2
                                focus:ring-gray-100
                            "
                        />

                        <div
                            className="
                                mt-1
                                text-right
                                text-[11px]
                                text-gray-400
                            "
                        >
                            {title.length}/150
                        </div>

                    </div>

                    <div className="mt-5">

                        <label
                            htmlFor="corporate-message"
                            className="
                                text-sm
                                font-semibold
                                text-gray-800
                            "
                        >
                            Message
                        </label>

                        <textarea
                            id="corporate-message"
                            value={message}
                            onChange={(event) =>
                                setMessage(
                                    event.target.value,
                                )
                            }
                            maxLength={5000}
                            required
                            rows={7}
                            placeholder="Write your announcement..."
                            className="
                                mt-2
                                w-full
                                resize-none
                                rounded-xl
                                border
                                border-gray-200
                                p-4
                                text-sm
                                leading-6
                                outline-none
                                transition
                                focus:border-gray-400
                                focus:ring-2
                                focus:ring-gray-100
                            "
                        />

                        <div
                            className="
                                mt-1
                                text-right
                                text-[11px]
                                text-gray-400
                            "
                        >
                            {message.length}/5000
                        </div>

                    </div>

                    <label
                        className="
                            mt-5
                            flex
                            cursor-pointer
                            items-center
                            gap-3
                            rounded-xl
                            border
                            border-gray-200
                            p-4
                        "
                    >

                        <input
                            type="checkbox"
                            checked={isPublished}
                            onChange={(event) =>
                                setIsPublished(
                                    event.target.checked,
                                )
                            }
                            className="
                                h-4
                                w-4
                                rounded
                            "
                        />

                        <div>

                            <p
                                className="
                                    text-sm
                                    font-semibold
                                    text-gray-800
                                "
                            >
                                Publish immediately
                            </p>

                            <p
                                className="
                                    mt-0.5
                                    text-xs
                                    text-gray-500
                                "
                            >
                                Make this announcement
                                visible to users after saving.
                            </p>

                        </div>

                    </label>

                    <div
                        className="
                            mt-6
                            flex
                            gap-3
                        "
                    >

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
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
                            type="submit"
                            disabled={
                                isSubmitting ||
                                !title.trim() ||
                                !message.trim()
                            }
                            className="
                                flex
                                flex-1
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-black
                                px-4
                                py-3
                                text-sm
                                font-semibold
                                text-white
                                hover:bg-gray-800
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >

                            {isSubmitting ? (
                                <>
                                    <span
                                        className="
                                            h-4
                                            w-4
                                            animate-spin
                                            rounded-full
                                            border-2
                                            border-white/30
                                            border-t-white
                                        "
                                    />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    {isPublished ? (
                                        <Send size={16} />
                                    ) : (
                                        <Save size={16} />
                                    )}

                                    {isEditing
                                        ? "Save Changes"
                                        : "Create Announcement"}
                                </>
                            )}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}