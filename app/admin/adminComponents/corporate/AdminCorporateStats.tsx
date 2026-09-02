import {
    FileText,
    Send,
    PencilLine,
} from "lucide-react";

interface Props {
    total: number;
    published: number;
    drafts: number;
}

export function AdminCorporateStats({
    total,
    published,
    drafts,
}: Props) {

    const stats = [
        {
            label: "Total",
            value: total,
            icon: FileText,
        },
        {
            label: "Published",
            value: published,
            icon: Send,
        },
        {
            label: "Drafts",
            value: drafts,
            icon: PencilLine,
        },
    ];

    return (
        <div
            className="
                mt-4
                grid
                grid-cols-3
                gap-2
                sm:gap-4
            "
        >

            {stats.map((stat) => {

                const Icon = stat.icon;

                return (
                    <div
                        key={stat.label}
                        className="
                            rounded-2xl
                            border
                            border-gray-200
                            bg-white
                            p-3
                            shadow-sm
                            sm:p-5
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                text-gray-500
                            "
                        >
                            <Icon size={16} />

                            <span
                                className="
                                    text-[11px]
                                    font-medium
                                    sm:text-xs
                                "
                            >
                                {stat.label}
                            </span>
                        </div>

                        <p
                            className="
                                mt-2
                                text-xl
                                font-bold
                                text-gray-900
                                sm:text-2xl
                            "
                        >
                            {stat.value}
                        </p>

                    </div>
                );

            })}

        </div>
    );
}