"use client";

export default function HeroStat({
    value,
    label,
}: {
    value: string;
    label: string;
}) {
    return (
        <div className="min-w-0">
            <p
                className="
                    text-[17px]
                    font-semibold
                    tracking-tight
                    text-white

                    sm:text-[20px]
                "
            >
                {value}
            </p>

            <p
                className="
                    mt-0.5
                    truncate
                    text-[9px]
                    font-medium
                    text-slate-500

                    sm:text-[10px]
                "
            >
                {label}
            </p>
        </div>
    );
}