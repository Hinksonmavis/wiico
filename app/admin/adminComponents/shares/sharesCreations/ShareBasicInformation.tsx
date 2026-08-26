"use client";

import { CreateShareFormValues } from "@/app/schema/adminSchema/share.schema";
import {
    UseFormRegister,
    FieldErrors,
} from "react-hook-form";
import ShareFormField from "./ShareFormField";
import ShareLogoField from "./ShareLogoField";


interface ShareBasicInformationProps {
    register: UseFormRegister<CreateShareFormValues>;
    errors: FieldErrors<CreateShareFormValues>;
    logo: string | undefined;
    disabled?: boolean;
    onClearLogo: () => void;

    onUploadLogo: (
        file: File,
    ) => Promise<void>;
}

export default function ShareBasicInformation({
    register,
    errors,
    logo,
    disabled = false,
    onClearLogo,
    onUploadLogo,
}: ShareBasicInformationProps) {

    return (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-5 py-5 sm:px-6">

                <h2 className="text-base font-semibold text-slate-900">
                    Share Information
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                    Configure the basic information users will
                    see when viewing this share.
                </p>

            </div>

            <div className="space-y-6 p-5 sm:p-6">

                <ShareFormField
                    label="Share Name"
                    required
                    registration={
                        register("name")
                    }
                    error={
                        errors.name
                    }
                    placeholder="e.g. Premium Growth Share"
                    disabled={disabled}
                />

                <ShareLogoField
                    value={logo}
                    error={errors.logo}
                    disabled={disabled}
                    onClear={onClearLogo}
                    onUpload={onUploadLogo}
                />

                <div className="space-y-2">

                    <label
                        htmlFor="description"
                        className="text-sm font-semibold text-slate-800"
                    >
                        Description
                    </label>

                    <textarea
                        id="description"
                        {...register("description")}
                        rows={5}
                        disabled={disabled}
                        placeholder="Describe this share and what users should know about it..."
                        className={[
                            "w-full resize-none rounded-xl border bg-white px-3.5 py-3 text-sm text-slate-900",
                            "outline-none transition",
                            "placeholder:text-slate-400",
                            "focus:ring-2",
                            errors.description
                                ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                                : "border-slate-200 focus:border-slate-400 focus:ring-slate-100",
                            disabled
                                ? "cursor-not-allowed bg-slate-50"
                                : "",
                        ].join(" ")}
                    />

                    {errors.description?.message && (
                        <p className="text-xs font-medium text-red-600">
                            {
                                errors
                                    .description
                                    .message
                            }
                        </p>
                    )}

                </div>

            </div>

        </section>
    );
}