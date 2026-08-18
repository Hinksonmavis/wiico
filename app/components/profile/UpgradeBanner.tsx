import Link from "next/link";
import {
    ChevronRight,
    ShieldEllipsis,
} from "lucide-react";

import { ROUTES } from "@/app/constants/routes";

interface UpgradeBannerProps {
    href?: string;
}

export default function UpgradeBanner({
    href = ROUTES.MEMBERS,
}: UpgradeBannerProps) {
    return (
        <Link
            href={href}
            className="
                group
                relative
                z-20
                mx-3
                flex
                items-center
                justify-between
                gap-3
                overflow-hidden
                rounded-[18px]
                border
                border-white/70
                bg-gradient-to-r
                from-slate-100
                via-slate-100/95
                to-slate-200
                px-3.5
                py-3
                ring-1
                ring-black/5
                shadow-[0_6px_20px_rgba(15,23,42,0.06)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_12px_28px_rgba(15,23,42,0.1)]
                sm:mx-4
                sm:gap-4
                sm:rounded-[20px]
                sm:px-4
                sm:py-3.5
                md:px-5
                md:py-4
                lg:rounded-[22px]
            "
        >
            {/* Glass Highlight */}
            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-white/60
                    via-white/10
                    to-transparent
                "
            />

            {/* Soft Light */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -right-10
                    -top-10
                    h-24
                    w-24
                    rounded-full
                    bg-white/40
                    blur-3xl
                    sm:h-28
                    sm:w-28
                "
            />

            {/* Left Content */}
            <div
                className="
                    relative
                    flex
                    min-w-0
                    items-center
                    gap-2.5
                    sm:gap-3
                    md:gap-4
                "
            >
                {/* Icon */}
                <div
                    className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/70
                        bg-white/50
                        shadow-inner
                        backdrop-blur-md
                        sm:h-11
                        sm:w-11
                        sm:rounded-[14px]
                        md:h-12
                        md:w-12
                        lg:h-14
                        lg:w-14
                        lg:rounded-2xl
                    "
                >
                    <ShieldEllipsis
                        className="
                            h-[20px]
                            w-[20px]
                            text-slate-600
                            sm:h-[21px]
                            sm:w-[21px]
                            md:h-[23px]
                            md:w-[23px]
                            lg:h-7
                            lg:w-7
                        "
                        strokeWidth={1.7}
                    />
                </div>

                {/* Text */}
                <div className="min-w-0">
                    <h3
                        className="
                            truncate
                            text-[14px]
                            font-semibold
                            tracking-tight
                            text-slate-900
                            sm:text-[15px]
                            md:text-[16px]
                            lg:text-[17px]
                        "
                    >
                        Upgrade Membership
                    </h3>

                    <p
                        className="
                            mt-0.5
                            max-w-[210px]
                            truncate
                            text-[11px]
                            leading-4
                            text-slate-500
                            sm:max-w-[280px]
                            sm:text-[12px]
                            sm:leading-5
                            md:max-w-none
                            md:text-[13px]
                        "
                    >
                        Unlock more platform benefits.
                    </p>
                </div>
            </div>

            {/* Right Arrow */}
            <div
                className="
                    relative
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/70
                    bg-white/50
                    backdrop-blur-md
                    transition-all
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:bg-white/70
                    sm:h-10
                    sm:w-10
                    md:h-11
                    md:w-11
                "
            >
                <ChevronRight
                    className="
                        h-[17px]
                        w-[17px]
                        text-slate-500
                        sm:h-[18px]
                        sm:w-[18px]
                        md:h-5
                        md:w-5
                    "
                />
            </div>

            {/* Bottom Reflection */}
            <div
                className="
                    pointer-events-none
                    absolute
                    inset-x-4
                    bottom-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-white/80
                    to-transparent
                    sm:inset-x-5
                "
            />
        </Link>
    );
}