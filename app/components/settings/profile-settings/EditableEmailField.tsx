"use client";

import { useEffect, useState } from "react";
import {
    Check,
    Mail,
    Pencil,
    X,
} from "lucide-react";
import { toast } from "sonner";

import { userService } from "@/app/services/clientServices/user.service";

interface EditableEmailFieldProps {
    email?: string | null;
    onUpdated?: (email: string) => void;
}

export default function EditableEmailField({
    email,
    onUpdated,
}: EditableEmailFieldProps) {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(email ?? "");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setValue(email ?? "");
    }, [email]);

    const startEditing = () => {
        setValue(email ?? "");
        setEditing(true);
    };

    const cancelEditing = () => {
        setValue(email ?? "");
        setEditing(false);
    };

    const saveEmail = async () => {
        const normalizedEmail = value
            .trim()
            .toLowerCase();

        if (!normalizedEmail) {
            toast.error("Please enter your email address.");
            return;
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(normalizedEmail)) {
            toast.error(
                "Please enter a valid email address.",
            );
            return;
        }

        const currentEmail =
            (email ?? "").trim().toLowerCase();

        if (normalizedEmail === currentEmail) {
            setEditing(false);
            return;
        }

        try {
            setSaving(true);

            await userService.updateProfile({
                email: normalizedEmail,
            });

            onUpdated?.(normalizedEmail);

            setValue(normalizedEmail);
            setEditing(false);

            toast.success(
                "Email address updated successfully.",
            );
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ??
                    "Unable to update your email.",
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="border-b border-slate-100 px-5 py-4">
            <div className="flex items-start gap-3">
                {/* Icon */}
                <div
                    className="
                        mt-0.5
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-slate-50
                        text-slate-500
                    "
                >
                    <Mail className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                    {/* Label + Edit */}
                    <div className="flex items-center justify-between gap-3">
                        <p className="text-[12px] font-medium text-slate-400">
                            Email Address
                        </p>

                        {!editing && (
                            <button
                                type="button"
                                onClick={startEditing}
                                className="
                                    flex
                                    items-center
                                    gap-1
                                    rounded-lg
                                    px-2
                                    py-1
                                    text-[11px]
                                    font-semibold
                                    text-slate-600
                                    transition
                                    hover:bg-slate-100
                                    active:scale-95
                                "
                            >
                                <Pencil className="h-3 w-3" />
                                Edit
                            </button>
                        )}
                    </div>

                    {editing ? (
                        <div className="mt-2">
                            <input
                                type="email"
                                value={value}
                                onChange={(event) =>
                                    setValue(
                                        event.target.value,
                                    )
                                }
                                placeholder="Enter your email"
                                autoFocus
                                disabled={saving}
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    px-3
                                    py-2.5
                                    text-[13px]
                                    font-medium
                                    text-slate-900
                                    outline-none
                                    transition
                                    placeholder:text-slate-400
                                    focus:border-slate-400
                                    focus:bg-white
                                    focus:ring-2
                                    focus:ring-slate-100
                                    disabled:opacity-60
                                "
                            />

                            <div className="mt-3 flex gap-2">
                                <button
                                    type="button"
                                    onClick={cancelEditing}
                                    disabled={saving}
                                    className="
                                        flex
                                        flex-1
                                        items-center
                                        justify-center
                                        gap-1.5
                                        rounded-xl
                                        border
                                        border-slate-200
                                        bg-white
                                        py-2.5
                                        text-[12px]
                                        font-semibold
                                        text-slate-600
                                        transition
                                        hover:bg-slate-50
                                        active:scale-[0.98]
                                        disabled:opacity-50
                                    "
                                >
                                    <X className="h-3.5 w-3.5" />
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={saveEmail}
                                    disabled={saving}
                                    className="
                                        flex
                                        flex-1
                                        items-center
                                        justify-center
                                        gap-1.5
                                        rounded-xl
                                        bg-slate-900
                                        py-2.5
                                        text-[12px]
                                        font-semibold
                                        text-white
                                        transition
                                        hover:bg-slate-800
                                        active:scale-[0.98]
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                    "
                                >
                                    <Check className="h-3.5 w-3.5" />

                                    {saving
                                        ? "Saving..."
                                        : "Save Email"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p
                            className={`
                                mt-1
                                truncate
                                text-[13px]
                                font-semibold
                                ${
                                    email
                                        ? "text-slate-800"
                                        : "text-slate-400"
                                }
                            `}
                        >
                            {email || "No email added"}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}