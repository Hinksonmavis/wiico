import { Suspense } from "react";

import DepositPaymentPageContent from "./DepositPaymentPageContent";

export default function DepositPaymentPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-[60vh] items-center justify-center">
                    <div className="text-center">
                        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

                        <p className="mt-4 text-sm text-slate-500">
                            Loading payment page...
                        </p>
                    </div>
                </div>
            }
        >
            <DepositPaymentPageContent />
        </Suspense>
    );
}