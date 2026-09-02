"use client";

interface ReferralLevelTabsProps {
    activeLevel: 1 | 2 | 3;

    onChange: (
        level: 1 | 2 | 3,
    ) => void;

    counts: {
        level1: number;
        level2: number;
        level3: number;
    };
}

export default function ReferralLevelTabs({
    activeLevel,
    onChange,
    counts,
}: ReferralLevelTabsProps) {

    const levels = [
        {
            value: 1 as const,
            label: "Level 1",
            count: counts.level1,
        },
        {
            value: 2 as const,
            label: "Level 2",
            count: counts.level2,
        },
        {
            value: 3 as const,
            label: "Level 3",
            count: counts.level3,
        },
    ];

    return (
        <div className="mb-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

            {levels.map((level) => {

                const active =
                    activeLevel === level.value;

                return (
                    <button
                        key={level.value}
                        type="button"
                        onClick={() =>
                            onChange(level.value)
                        }
                        className={[
                            "flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition",
                            active
                                ? "bg-[#1590FC] text-white"
                                : "bg-slate-100 text-slate-600",
                        ].join(" ")}
                    >

                        <span>
                            {level.label}
                        </span>

                        <span
                            className={[
                                "rounded-full px-1.5 py-0.5 text-[10px]",
                                active
                                    ? "bg-white/20 text-white"
                                    : "bg-white text-slate-500",
                            ].join(" ")}
                        >
                            {level.count}
                        </span>

                    </button>
                );
            })}

        </div>
    );
}