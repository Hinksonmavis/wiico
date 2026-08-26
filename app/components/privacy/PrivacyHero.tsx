import { ShieldCheck } from "lucide-react";

import { PRIVACY_POLICY } from "@/app/constants/privacy.constants";

export default function PrivacyHero() {
    const policy = PRIVACY_POLICY;

    return (
        <section className="relative overflow-hidden border-b border-slate-200 bg-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.16),_transparent_38%),radial-gradient(circle_at_left,_rgba(99,102,241,0.10),_transparent_34%)]" />

            <div className="relative mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                <div className="max-w-3xl">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/15">
                        <ShieldCheck className="h-7 w-7" />
                    </div>

                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-sky-700">
                        Legal & Transparency
                    </p>

                    <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                        {policy.title}
                    </h1>

                    <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                        {policy.intro.description}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <div className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm shadow-sm">
                            <p className="text-xs font-medium text-slate-500">
                                Effective date
                            </p>
                            <p className="mt-1 font-semibold text-slate-800">
                                {policy.intro.effectiveDate}
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm shadow-sm">
                            <p className="text-xs font-medium text-slate-500">
                                Last updated
                            </p>
                            <p className="mt-1 font-semibold text-slate-800">
                                {policy.intro.lastUpdated}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}