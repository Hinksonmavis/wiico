"use client";

import {
    CheckCircle2,
} from "lucide-react";

interface UpgradeSuccessModalProps {
    onClose: () => void;
    onViewHistory: () => void;
}

// ================================================================
// SUCCESS VIEW
//
// Shown once the upgrade request has been submitted, replacing
// the validation checklist entirely.
// ================================================================

export default function UpgradeSuccessModal({
    onClose,
    onViewHistory,
}: UpgradeSuccessModalProps) {

    return (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm">
            <div
                className="
                    flex h-full w-full flex-col
                    bg-white
                    sm:mx-auto
                    sm:my-6
                    sm:h-[calc(100vh-48px)]
                    sm:max-h-[760px]
                    sm:w-[calc(100%-32px)]
                    sm:max-w-md
                    sm:rounded-[32px]
                    sm:shadow-[0_30px_80px_rgba(15,23,42,0.25)]
                    overflow-hidden
                "
            >
                <div
                    className="
                        flex
                        flex-1
                        flex-col
                        items-center
                        justify-center
                        px-6
                        py-10
                        text-center
                    "
                >

                    <div
                        className="
                            flex
                            h-20
                            w-20
                            items-center
                            justify-center
                            rounded-full
                            bg-emerald-50
                        "
                    >
                        <CheckCircle2
                            size={40}
                            className="text-emerald-600"
                        />
                    </div>

                    <h2
                        className="
                            mt-6
                            text-xl
                            font-bold
                            tracking-tight
                            text-slate-900
                            sm:text-2xl
                        "
                    >
                        Request Submitted
                    </h2>

                    <p
                        className="
                            mt-2
                            max-w-xs
                            text-sm
                            leading-6
                            text-slate-500
                        "
                    >
                        Your upgrade request has been submitted
                        successfully. We'll notify you once it's
                        been reviewed.
                    </p>

                </div>

                <footer
                    className="
                        shrink-0
                        border-t
                        border-slate-100
                        bg-slate-50
                        px-4
                        pb-[max(1rem,env(safe-area-inset-bottom))]
                        pt-4
                        sm:px-6
                        sm:py-5
                    "
                >
                    <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                order-2
                                h-12
                                w-full
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                px-4
                                text-sm
                                font-semibold
                                text-slate-700
                                transition
                                active:scale-[0.98]
                                hover:bg-slate-100
                                sm:order-1
                                sm:flex-1
                            "
                        >
                            Close
                        </button>

                        <button
                            type="button"
                            onClick={onViewHistory}
                            className="
                                order-1
                                h-12
                                w-full
                                rounded-2xl
                                bg-[#1590FC]
                                px-4
                                text-sm
                                font-semibold
                                text-white
                                shadow-lg
                                shadow-blue-400/25
                                transition
                                active:scale-[0.98]
                                hover:bg-[#0D86EE]
                                sm:order-2
                                sm:flex-1
                            "
                        >
                            View Upgrade History
                        </button>

                    </div>
                </footer>

            </div>
        </div>
    );
}