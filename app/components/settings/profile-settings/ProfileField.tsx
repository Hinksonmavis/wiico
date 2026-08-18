import { ReactNode } from "react";

interface ProfileFieldProps {
    label: string;
    value: string;
    icon?: ReactNode;
    last?: boolean;
}

export default function ProfileField({
    label,
    value,
    icon,
    last = false,
}: ProfileFieldProps) {
    return (
        <div
            className={`
                flex
                items-center
                gap-3
                px-5
                py-4
                ${!last ? "border-b border-slate-100" : ""}
            `}
        >
            {icon && (
                <div
                    className="
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
                    {icon}
                </div>
            )}

            <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-slate-400">
                    {label}
                </p>

                <p className="mt-0.5 truncate text-[13px] font-semibold text-slate-800">
                    {value}
                </p>
            </div>
        </div>
    );
}