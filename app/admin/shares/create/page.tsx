"use client";

import { useRouter } from "next/navigation";
import ShareCreationHeader from "../../adminComponents/shares/sharesCreations/ShareCreationHeader";
import ShareCreationForm from "../../adminComponents/shares/sharesCreations/ShareCreationForm";

export default function CreateSharePage() {
    const router = useRouter();

    // const handleSuccess = () => {
    //     router.push("/admin/shares");
    // };

    // const handleCancel = () => {
    //     router.push("/admin/shares");
    // };

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-5 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-4xl space-y-5">

                {/* <ShareCreationHeader /> */}

                <ShareCreationForm />

            </div>
        </main>
    );
}