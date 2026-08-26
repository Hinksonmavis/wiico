import PrivacyContent from "@/app/components/privacy/PrivacyContent";
import PrivacyHeader from "@/app/components/privacy/PrivacyHeader";
import PrivacyHero from "@/app/components/privacy/PrivacyHero";
import { PRIVACY_POLICY } from "@/app/constants/privacy.constants";

export default function PrivacyPage() {
    const policy = PRIVACY_POLICY;

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <PrivacyHeader />
            <PrivacyHero />
            <PrivacyContent />

            <footer className="border-t border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-8 text-center sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold text-slate-700">
                        © {new Date().getFullYear()} {policy.companyName}
                    </p>

                    <p className="mx-auto max-w-2xl text-xs leading-5 text-slate-500">
                        This Privacy Policy explains how we collect, use, and
                        protect information across our platform and related
                        services.
                    </p>
                </div>
            </footer>
        </main>
    );
}