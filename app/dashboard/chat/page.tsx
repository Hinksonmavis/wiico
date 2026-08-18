"use client";

import {
    ArrowLeft,
    Bell,
    MessageCircle,
    Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChatPage() {
    const router = useRouter();

    return (
        <main className="relative min-h-screen overflow-hidden bg-slate-50">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="
                        absolute
                        -right-24
                        -top-24
                        h-72
                        w-72
                        rounded-full
                        bg-[#076DF3]/10
                        blur-3xl
                    "
                />

                <div
                    className="
                        absolute
                        -bottom-32
                        -left-24
                        h-80
                        w-80
                        rounded-full
                        bg-blue-200/30
                        blur-3xl
                    "
                />
            </div>

            <div
                className="
                    relative
                    mx-auto
                    flex
                    min-h-screen
                    w-full
                    max-w-md
                    flex-col
                    px-5
                    pb-10
                    pt-5
                "
            >
                {/* Header */}
                <header className="flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        aria-label="Go back"
                        className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            text-slate-700
                            shadow-sm
                            transition
                            hover:bg-slate-50
                            active:scale-95
                        "
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-slate-200
                            bg-white/80
                            px-3.5
                            py-2
                            shadow-sm
                            backdrop-blur
                        "
                    >
                        <span
                            className="
                                h-2
                                w-2
                                rounded-full
                                bg-[#076DF3]
                                shadow-[0_0_0_4px_rgba(7,109,243,0.10)]
                            "
                        />

                        <span className="text-xs font-semibold text-slate-600">
                            Coming Soon
                        </span>
                    </div>
                </header>

                {/* Main */}
                <section className="flex flex-1 flex-col items-center justify-center py-12 text-center">
                    {/* Animated icon */}
                    <div className="relative mb-8">
                        <div
                            className="
                                absolute
                                inset-0
                                animate-ping
                                rounded-[30px]
                                bg-[#076DF3]/10
                            "
                        />

                        <div
                            className="
                                relative
                                flex
                                h-24
                                w-24
                                items-center
                                justify-center
                                rounded-[30px]
                                bg-[#076DF3]
                                shadow-[0_20px_50px_rgba(7,109,243,0.25)]
                            "
                        >
                            <MessageCircle
                                size={42}
                                strokeWidth={1.8}
                                className="text-white"
                            />

                            <div
                                className="
                                    absolute
                                    -right-2
                                    -top-2
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border-4
                                    border-slate-50
                                    bg-white
                                    text-[#076DF3]
                                    shadow-sm
                                "
                            >
                                <Sparkles size={15} />
                            </div>
                        </div>
                    </div>

                    {/* Badge */}
                    <div
                        className="
                            mb-5
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            bg-[#076DF3]/10
                            px-3.5
                            py-2
                            text-xs
                            font-bold
                            text-[#076DF3]
                        "
                    >
                        <Sparkles size={14} />
                        Something great is coming
                    </div>

                    {/* Heading */}
                    <h1
                        className="
                            max-w-sm
                            text-[2.35rem]
                            font-extrabold
                            leading-[1.05]
                            tracking-[-0.04em]
                            text-slate-950
                        "
                    >
                        Chat is
                        <span className="block text-[#076DF3]">
                            coming soon.
                        </span>
                    </h1>

                    {/* Description */}
                    <p
                        className="
                            mt-5
                            max-w-sm
                            text-[15px]
                            leading-7
                            text-slate-500
                        "
                    >
                        We are building a better way for you to
                        connect, get support, and stay informed.
                        Our chat experience will be available soon.
                    </p>

                    {/* Feature preview */}
                    <div
                        className="
                            mt-9
                            w-full
                            rounded-[26px]
                            border
                            border-white/80
                            bg-white/70
                            p-4
                            text-left
                            shadow-[0_12px_40px_rgba(15,23,42,0.06)]
                            backdrop-blur-xl
                        "
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className="
                                    flex
                                    h-12
                                    w-12
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-[#076DF3]/10
                                    text-[#076DF3]
                                "
                            >
                                <MessageCircle size={22} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-bold text-slate-900">
                                    Smarter conversations
                                </p>

                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    Connect with support and get
                                    the help you need.
                                </p>
                            </div>

                            <div className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                                <span className="h-1.5 w-1.5 rounded-full bg-[#076DF3]" />
                            </div>
                        </div>
                    </div>

                    {/* Notification CTA */}
                    <button
                        type="button"
                        className="
                            mt-5
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2.5
                            rounded-2xl
                            bg-[#076DF3]
                            px-5
                            py-4
                            text-sm
                            font-bold
                            text-white
                            shadow-[0_12px_30px_rgba(7,109,243,0.20)]
                            transition
                            hover:bg-[#0562dc]
                            active:scale-[0.98]
                        "
                    >
                        <Bell size={18} />
                        Notify me when it's ready
                    </button>
                </section>

                {/* Footer */}
                <footer className="pt-4 text-center">
                    <p className="text-[11px] font-medium text-slate-400">
                        We're working behind the scenes to make
                        your experience better.
                    </p>
                </footer>
            </div>
        </main>
    );
}