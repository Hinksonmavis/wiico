import ShareDetailsClient from "@/app/components/shares/ShareDetailsClient";

interface ShareDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ShareDetailPage({
    params,
}: ShareDetailPageProps) {
    const { id } = await params;

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-7 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <ShareDetailsClient shareId={id} />
            </div>
        </main>
    );
}