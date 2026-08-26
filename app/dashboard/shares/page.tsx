"use client";

import SharesClient from "@/app/components/shares/SharesClient";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SharesPage() {

    const router = useRouter();

    const handleBack = () => {
        router.back()
    };

    return (
        <main 
            className="min-h-screen bg-slate-50 px-4 py-4 sm:px-6 lg:px-8"
        >
            <section className="mt-2">
                <SharesClient />
            </section>
        </main>
    );
}
