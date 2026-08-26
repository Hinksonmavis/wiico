import {
    CheckCircle2,
    ChevronRight,
    Mail,
} from "lucide-react";

import { PRIVACY_POLICY } from "@/app/constants/privacy.constants";

export default function PrivacyContent() {
    const policy = PRIVACY_POLICY;

    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[230px_minmax(0,1fr)]">
                <aside className="hidden lg:block">
                    <div className="sticky top-20 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="px-3 pb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                            On this page
                        </p>

                        <nav className="space-y-1">
                            {policy.sections.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="
                                        group flex items-center justify-between
                                        gap-3 rounded-xl px-3 py-2.5 text-sm
                                        font-medium text-slate-600 transition
                                        hover:bg-sky-50 hover:text-sky-800
                                    "
                                >
                                    <span>{section.title}</span>
                                    <ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-sky-600" />
                                </a>
                            ))}
                        </nav>
                    </div>
                </aside>

                <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="divide-y divide-slate-100">
                        {policy.sections.map(
                            (section, sectionIndex) => (
                                <section
                                    key={section.id}
                                    id={section.id}
                                    className="scroll-mt-24 px-5 py-8 sm:px-8 sm:py-10"
                                >
                                    <div className="flex items-start gap-4">
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sm font-bold text-sky-700">
                                            {sectionIndex + 1}
                                        </span>

                                        <div className="min-w-0 flex-1">
                                            <h2 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                                                {section.title}
                                            </h2>

                                            <div className="mt-4 space-y-4">
                                                {section.paragraphs?.map(
                                                    (paragraph, index) => (
                                                        <p
                                                            key={index}
                                                            className="text-sm leading-7 text-slate-600 sm:text-base"
                                                        >
                                                            {paragraph}
                                                        </p>
                                                    ),
                                                )}
                                            </div>

                                            {"bullets" in section &&
    section.bullets &&
    section.bullets.length > 0 && (
        <ul className="mt-5 space-y-3">
            {section.bullets.map(
                (bullet, index) => (
                    <li
                        key={index}
                        className="flex gap-3 text-sm leading-6 text-slate-600 sm:text-base"
                    >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />

                        <span>{bullet}</span>
                    </li>
                ),
            )}
        </ul>
    )}

                                            {"contact" in section &&
                                                section.contact && (
                                                    <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50/70 p-5">
                                                        <div className="flex items-start gap-3">
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sky-700 shadow-sm">
                                                                <Mail className="h-5 w-5" />
                                                            </div>

                                                            <div className="min-w-0">
                                                                <p className="font-semibold text-slate-900">
                                                                    Need help?
                                                                </p>

                                                                <p className="mt-1 text-sm text-slate-600">
                                                                    Contact our support team.
                                                                </p>

                                                                <a
                                                                    href={`mailto:${section.contact.email}`}
                                                                    className="mt-2 inline-block break-all text-sm font-semibold text-sky-700 underline decoration-sky-300 underline-offset-4 transition hover:text-sky-900"
                                                                >
                                                                    {section.contact.email}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </section>
                            ),
                        )}
                    </div>
                </article>
            </div>
        </div>
    );
}