"use client";

interface ShareCreationNoticeProps {
    disabled?: boolean;
}

export default function ShareCreationNotice({
    disabled = false,
}: ShareCreationNoticeProps) {

    return (
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-5">

            <div className="flex gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100">

                    <span className="text-sm font-bold text-amber-700">
                        !
                    </span>

                </div>

                <div>

                    <p className="text-sm font-semibold text-amber-900">
                        Before creating this share
                    </p>

                    <p className="mt-1 text-xs leading-5 text-amber-800">
                        Make sure the return percentage and
                        cycle duration are correct. These values
                        form part of the share configuration used
                        for purchases.
                    </p>

                </div>

            </div>

        </section>
    );
}