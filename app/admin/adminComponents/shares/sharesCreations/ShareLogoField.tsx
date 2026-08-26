"use client";

import {
    ImageIcon,
    Loader2,
    Upload,
    X,
} from "lucide-react";
import {
    ChangeEvent,
    useEffect,
    useRef,
    useState,
} from "react";
import { FieldError } from "react-hook-form";

interface ShareLogoFieldProps {
    value?: string;
    error?: FieldError;
    disabled?: boolean;
    onClear: () => void;
    onUpload: (file: File) => Promise<void>;
}

const MAX_FILE_SIZE =
    5 * 1024 * 1024;

const ALLOWED_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
] as const;

export default function ShareLogoField({
    value,
    error,
    disabled = false,
    onClear,
    onUpload,
}: ShareLogoFieldProps) {

    const inputRef =
        useRef<HTMLInputElement | null>(null);

    const [preview, setPreview] =
        useState<string | null>(
            value || null,
        );

    const [isUploading, setIsUploading] =
        useState(false);

    const [uploadError, setUploadError] =
        useState<string | null>(null);


    /**
     * Synchronize preview with the
     * uploaded Cloudinary URL.
     */
    useEffect(() => {

        setPreview(
            value || null,
        );

    }, [value]);


    /**
     * Clean up temporary object URLs.
     */
    useEffect(() => {

        return () => {

            if (
                preview &&
                preview.startsWith("blob:")
            ) {
                URL.revokeObjectURL(
                    preview,
                );
            }

        };

    }, [preview]);


    /**
     * Handle local file selection.
     */
    const handleFileChange = async (
        event: ChangeEvent<HTMLInputElement>,
    ) => {

        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

        setUploadError(null);


        /**
         * Validate file type.
         */
        if (
            !ALLOWED_TYPES.includes(
                file.type as (
                    typeof ALLOWED_TYPES
                )[number],
            )
        ) {

            setUploadError(
                "Only JPG, PNG and WEBP images are allowed.",
            );

            event.target.value = "";

            return;
        }


        /**
         * Validate file size.
         */
        if (
            file.size >
            MAX_FILE_SIZE
        ) {

            setUploadError(
                "Image size cannot exceed 5 MB.",
            );

            event.target.value = "";

            return;
        }


        /**
         * Create temporary local preview.
         */
        const objectUrl =
            URL.createObjectURL(
                file,
            );

        setPreview(
            objectUrl,
        );

        setIsUploading(
            true,
        );


        try {

            /**
             * Upload to backend.
             */
            await onUpload(
                file,
            );

        } catch (uploadError) {

            /**
             * Remove temporary preview.
             */
            URL.revokeObjectURL(
                objectUrl,
            );

            /**
             * Restore existing uploaded
             * logo if one exists.
             */
            setPreview(
                value || null,
            );

            setUploadError(
                uploadError instanceof Error
                    ? uploadError.message
                    : "Failed to upload logo.",
            );

        } finally {

            setIsUploading(
                false,
            );

            /**
             * Allow selecting the same
             * file again later.
             */
            event.target.value = "";
        }
    };


    /**
     * Remove logo.
     */
    const handleClear = () => {

        if (isUploading) {
            return;
        }

        setUploadError(null);

        setPreview(null);

        onClear();

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };


    const displayError =
        uploadError ||
        error?.message;


    return (
        <div className="space-y-3">

            {/* Label */}
            <div>

                <label className="text-sm font-semibold text-slate-800">
                    Share Logo
                    <span className="ml-1 font-normal text-slate-400">
                        (Optional)
                    </span>
                </label>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                    Upload a JPG, PNG or WEBP image.
                    Maximum size is 5 MB.
                </p>

            </div>


            {/* Upload card */}
            <div
                className={[
                    "relative overflow-hidden rounded-2xl border bg-white",
                    displayError
                        ? "border-red-300"
                        : "border-slate-200",
                ].join(" ")}
            >

                <div className="flex flex-col items-center gap-5 p-5 sm:flex-row sm:p-6">

                    {/* Preview */}
                    <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

                        {preview ? (

                            <img
                                src={preview}
                                alt="Share logo preview"
                                className="h-full w-full object-cover"
                            />

                        ) : (

                            <ImageIcon
                                className="h-8 w-8 text-slate-300"
                                strokeWidth={1.5}
                            />

                        )}

                        {isUploading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">

                                <Loader2
                                    className="h-6 w-6 animate-spin text-white"
                                />

                            </div>
                        )}

                    </div>


                    {/* Content */}
                    <div className="min-w-0 flex-1 text-center sm:text-left">

                        <p className="text-sm font-semibold text-slate-800">
                            {isUploading
                                ? "Uploading logo..."
                                : preview
                                    ? "Logo uploaded"
                                    : "Upload a share logo"}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            {isUploading
                                ? "Please wait while the image is being uploaded."
                                : "Choose an image from your device. It will be stored securely."}
                        </p>


                        {/* Actions */}
                        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">

                            <label
                                className={[
                                    "inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition",
                                    "bg-slate-900 text-white hover:bg-slate-800",
                                    "focus-within:ring-2 focus-within:ring-slate-300",
                                    disabled ||
                                    isUploading
                                        ? "pointer-events-none opacity-50"
                                        : "cursor-pointer",
                                ].join(" ")}
                            >

                                {isUploading ? (
                                    <Loader2
                                        className="h-4 w-4 animate-spin"
                                    />
                                ) : (
                                    <Upload
                                        className="h-4 w-4"
                                    />
                                )}

                                {preview
                                    ? "Change Image"
                                    : "Choose Image"}

                                <input
                                    ref={inputRef}
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                    disabled={
                                        disabled ||
                                        isUploading
                                    }
                                    onChange={
                                        handleFileChange
                                    }
                                    className="sr-only"
                                />

                            </label>


                            {preview &&
                                !isUploading &&
                                !disabled && (
                                    <button
                                        type="button"
                                        onClick={
                                            handleClear
                                        }
                                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                                    >
                                        <X className="h-4 w-4" />
                                        Remove
                                    </button>
                                )}

                        </div>

                    </div>

                </div>

            </div>


            {/* Error */}
            {displayError && (
                <p className="text-xs font-medium text-red-600">
                    {displayError}
                </p>
            )}

        </div>
    );
}