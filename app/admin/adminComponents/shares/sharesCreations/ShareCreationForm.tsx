"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    useForm,
} from "react-hook-form";
import {
    zodResolver,
} from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
    CreateAdminShareDto,
    ShareLogoUploadResponse,
} from "@/app/types/adminTypes/share.types";

import {
    useCreateAdminShare,
} from "@/app/hooks/adminHooks/shares/useCreateAdminShare";

import ShareCreationHeader from "./ShareCreationHeader";
import ShareBasicInformation from "./ShareBasicInformation";
import ShareReturnConfiguration from "./ShareReturnConfiguration";
import ShareCreationNotice from "./ShareCreationNotice";
import ShareCreationActions from "./ShareCreationActions";

import {
    CreateShareFormValues,
    createShareSchema,
} from "@/app/schema/adminSchema/share.schema";

import { api } from "@/app/services/api";

export default function ShareCreationForm() {

    const router = useRouter();

    const {
        mutateAsync: createShare,
        isPending,
        isSuccess,
        isError,
        error,
    } = useCreateAdminShare();

    const {
        register,
        handleSubmit,
        watch,
        setError,
        setValue,
        resetField,
        formState: {
            errors,
        },
    } = useForm<CreateShareFormValues>({
        resolver:
            zodResolver(
                createShareSchema,
            ),

        defaultValues: {
            name: "",
            logo: "",
            logoPublicId: "",
            description: "",
            dailyReturnPercentage: undefined,
            cycleDays: undefined,
        },

        mode: "onBlur",
    });

    const logo =
        watch("logo");


    /**
     * Upload share logo.
     *
     * The image is uploaded first.
     * The backend returns the Cloudinary
     * URL and public ID.
     */
    const handleLogoUpload = async (
        file: File,
    ): Promise<void> => {

        const formData =
            new FormData();

        formData.append(
            "file",
            file,
        );

        const response =
            await api.post<ShareLogoUploadResponse>(
                "/files/share-logo",
                formData,
            );

        const uploaded = response.data;

        if (
            !uploaded?.url ||
            !uploaded?.publicId
        ) {
            throw new Error(
                "Logo upload failed. Invalid server response.",
            );
        }

        /**
         * Store Cloudinary URL in form.
         */
        setValue(
            "logo",
            uploaded.url,
            {
                shouldDirty: true,
                shouldValidate: true,
            },
        );

        /**
         * Store Cloudinary public ID
         * so the backend can manage/delete
         * the uploaded asset later.
         */
        setValue(
            "logoPublicId",
            uploaded.publicId,
            {
                shouldDirty: true,
                shouldValidate: true,
            },
        );
    };


    /**
     * Clear uploaded logo.
     */
    const handleClearLogo = () => {

        resetField(
            "logo",
            {
                defaultValue: "",
            },
        );

        resetField(
            "logoPublicId",
            {
                defaultValue: "",
            },
        );
    };


    /**
     * Redirect after successful creation.
     */
    useEffect(() => {

        if (!isSuccess) {
            return;
        }

        toast.success(
            "Share created successfully.",
        );

        const timer =
            window.setTimeout(
                () => {
                    router.push(
                        "/admin/shares",
                    );
                },
                700,
            );

        return () =>
            window.clearTimeout(
                timer,
            );

    }, [
        isSuccess,
        router,
    ]);


    /**
     * Display mutation errors.
     */
    useEffect(() => {

        if (
            !isError ||
            !error
        ) {
            return;
        }

        toast.error(
            error instanceof Error
                ? error.message
                : "Failed to create share.",
        );

    }, [
        isError,
        error,
    ]);


    /**
     * Submit form.
     */
    const onSubmit = async (
        values: CreateShareFormValues,
    ) => {

        const dto: CreateAdminShareDto = {

            name:
                values.name.trim(),

            logo:
                values.logo?.trim()
                    ? values.logo.trim()
                    : null,

            logoPublicId:
                values.logoPublicId?.trim()
                    ? values.logoPublicId.trim()
                    : null,

            description:
                values.description?.trim()
                    ? values.description.trim()
                    : null,

            dailyReturnPercentage:
                values.dailyReturnPercentage,

            cycleDays:
                values.cycleDays,
        };

        try {

            await createShare(
                dto,
            );

        } catch (submitError) {

            if (
                submitError instanceof Error
            ) {

                setError(
                    "root",
                    {
                        message:
                            submitError.message,
                    },
                );

            }

        }
    };


    /**
     * Cancel creation.
     */
    const handleCancel = () => {

        if (isPending) {
            return;
        }

        router.push(
            "/admin/shares",
        );
    };


    return (
        <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">

            <div className="mx-auto w-full max-w-4xl space-y-6">

                <ShareCreationHeader
                    disabled={
                        isPending ||
                        isSuccess
                    }
                />

                {isSuccess && (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">

                        <p className="text-sm font-semibold text-emerald-900">
                            Share created successfully
                        </p>

                        <p className="mt-1 text-xs leading-5 text-emerald-700">
                            The share has been created and is
                            now available in the STARTED state.
                        </p>

                    </div>
                )}

                {errors.root?.message && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4">

                        <p className="text-sm font-medium text-red-700">
                            {errors.root.message}
                        </p>

                    </div>
                )}

                <form
                    onSubmit={
                        handleSubmit(
                            onSubmit,
                        )
                    }
                    className="space-y-6"
                >

                    <ShareBasicInformation
                        register={register}
                        errors={errors}
                        logo={logo}
                        disabled={
                            isPending ||
                            isSuccess
                        }
                        onClearLogo={
                            handleClearLogo
                        }
                        onUploadLogo={
                            handleLogoUpload
                        }
                    />

                    <ShareReturnConfiguration
                        register={register}
                        errors={errors}
                        disabled={
                            isPending ||
                            isSuccess
                        }
                    />

                    <ShareCreationNotice />

                    <ShareCreationActions
                        isPending={
                            isPending
                        }
                        isSuccess={
                            isSuccess
                        }
                        onCancel={
                            handleCancel
                        }
                    />

                </form>

            </div>

        </main>
    );
}