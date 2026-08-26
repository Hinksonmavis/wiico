"use client";

import { CreateShareFormValues } from "@/app/schema/adminSchema/share.schema";
import {
    UseFormRegister,
    FieldErrors,
} from "react-hook-form";
import ShareFormField from "./ShareFormField";


interface ShareReturnConfigurationProps {
    register: UseFormRegister<CreateShareFormValues>;

    errors: FieldErrors<CreateShareFormValues>;

    disabled?: boolean;
}

export default function ShareReturnConfiguration({
    register,
    errors,
    disabled = false,
}: ShareReturnConfigurationProps) {

    return (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-5 py-5 sm:px-6">

                <h2 className="text-base font-semibold text-slate-900">
                    Return Configuration
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                    Define the daily return and investment
                    cycle for this share.
                </p>

            </div>

            <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-2">

                <ShareFormField
                    label="Daily Return"
                    required
                    type="number"
                    registration={
                        register(
                            "dailyReturnPercentage",
                            {
                                valueAsNumber: true,
                            },
                        )
                    }
                    error={
                        errors.dailyReturnPercentage
                    }
                    placeholder="e.g. 16"
                    description="Percentage earned per day."
                    min={0.01}
                    step={0.01}
                    disabled={disabled}
                />

                <ShareFormField
                    label="Cycle Days"
                    required
                    type="number"
                    registration={
                        register(
                            "cycleDays",
                            {
                                valueAsNumber: true,
                            },
                        )
                    }
                    error={
                        errors.cycleDays
                    }
                    placeholder="e.g. 30"
                    description="Number of days before the share reaches maturity."
                    min={1}
                    step={1}
                    disabled={disabled}
                />

            </div>

        </section>
    );
}