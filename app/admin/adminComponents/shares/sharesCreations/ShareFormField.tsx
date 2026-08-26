"use client";

import {
    InputHTMLAttributes,
} from "react";

import {
    UseFormRegisterReturn,
    FieldError,
} from "react-hook-form";

interface ShareFormFieldProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        "name"
    > {

    label: string;

    required?: boolean;

    registration:
        UseFormRegisterReturn;

    error?: FieldError;

    description?: string;
}

export default function ShareFormField({
    label,
    required = false,
    registration,
    error,
    description,
    className = "",
    ...props
}: ShareFormFieldProps) {

    return (
        <div className="space-y-2">

            <label
                htmlFor={
                    registration.name
                }
                className="text-sm font-semibold text-slate-800"
            >

                {label}

                {required && (
                    <span className="ml-1 text-red-500">
                        *
                    </span>
                )}

            </label>

            <input
                id={
                    registration.name
                }
                {...registration}
                {...props}
                className={[
                    "h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-slate-900",
                    "outline-none transition",
                    "placeholder:text-slate-400",
                    "focus:ring-2",
                    error
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-slate-400 focus:ring-slate-100",
                    props.disabled
                        ? "cursor-not-allowed bg-slate-50"
                        : "",
                    className,
                ].join(" ")}
            />

            {description && !error && (
                <p className="text-xs leading-5 text-slate-500">
                    {description}
                </p>
            )}

            {error?.message && (
                <p className="text-xs font-medium text-red-600">
                    {error.message}
                </p>
            )}

        </div>
    );
}