"use client";

import LogoutCard from "@/app/components/logout/LogoutCard";
import ProfileSettingsTab from "@/app/components/profile/ProfileSettingsTab";
import SettingsHeader from "@/app/components/settings/SettingsHeader";

export default function SettingsPage() {
    return (
        <div
            className="
                min-h-screen
                w-full
                bg-slate-50
            "
        >
            <SettingsHeader />

            <main
                className="
                    mx-auto
                    w-full
                    max-w-lg
                    px-4
                    pb-10
                    pt-5

                    sm:px-5
                    sm:pt-6
                "
            >
                {/* Settings */}
                <section>
                    <div className="mb-3 px-1">
                        <p
                            className="
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.14em]
                                text-slate-400
                            "
                        >
                            Account
                        </p>
                    </div>

                    <ProfileSettingsTab />
                </section>

                {/* Logout */}
                <section className="mt-8">
                    <div className="mb-3 px-1">
                        <p
                            className="
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.14em]
                                text-slate-400
                            "
                        >
                            Session
                        </p>
                    </div>

                    <LogoutCard />
                </section>
            </main>
        </div>
    );
}