import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { ROUTES } from "@/app/constants/routes";

export default function AboutCompany() {
    return (
        <section
            className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
            "
        >
            {/* ==========================
                Header
            ========================== */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* <div
                        className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-2xl
                            bg-[#FDDA02]/15
                            text-[#D89B00]
                        "
                    >
                        <Building2 size={22} />
                    </div> */}

                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Company Profile
                        </h2>

                        <p className="text-xs text-slate-500">
                            Learn more about WIICO
                        </p>
                    </div>
                </div>

                <Link
                    href={ROUTES.ABOUT}
                    className="
                        flex
                        items-center
                        gap-1
                        rounded-full
                        bg-slate-100
                        px-3
                        py-2
                        text-xs
                        font-medium
                        text-slate-700
                        transition-all
                        hover:bg-[#4DA8FE]
                        hover:text-white
                    "
                >
                    View

                    <ChevronRight size={15} />
                </Link>
            </div>

            {/* ==========================
                Divider
            ========================== */}
            <div className="my-5 h-px bg-slate-100" />

            {/* ==========================
                Description
            ========================== */}
            <p className="text-[14px] leading-7 text-slate-600">
                <span className="font-semibold text-slate-900">
                    WIICO
                </span>{" "}
                We are the world's first <strong>Interactive Conflict</strong> to
                <strong> Development Investment Trust,</strong> operating in direct collaboration with the UN. You buy shares in post war reconstruction. You receive a guaranteed base dividend every single week......
            </p>
        </section>
    );
}