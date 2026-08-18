import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
import QueryProvider from "./providers/query-provider";
import AuthProvider from "./providers/AuthProvider";
import SecurityProtection from "./layout/SecurityProtection";

const poppins = Poppins({
    subsets: ["latin"],
    weight: [
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900",
    ],
    variable: "--font-poppins",
    display: "swap",
});

export const metadata: Metadata = {
    title: "WIICO",
    description: "Advertising Platform Dashboard",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`
                    ${poppins.variable}
                    font-sans
                    antialiased
                    bg-slate-100
                    overflow-hidden
                `}
                // className={`font-serif antialiased bg-slate-100 overflow-hidden`}
            >
                <SecurityProtection />
                {/* =====================================================
                    Desktop Stage
                    - Centers the mobile app shell.
                    - Prevents the browser page from scrolling.
                ====================================================== */}
                <div
                    className="
                        flex
                        h-dvh
                        w-full
                        items-center
                        justify-center
                        bg-[radial-gradient(circle_at_top,_theme(colors.slate.50),_theme(colors.slate.200))]
                    "
                >
                    {/* =================================================
                        Mobile App Shell
                        - Fixed mobile width.
                        - Occupies the full viewport height.
                    ================================================== */}
                    <div
                        className="
                            relative
                            flex
                            h-dvh
                            w-full
                            max-w-[480px]
                            flex-col
                            bg-white
                            border-x
                            border-slate-200
                            shadow-[0_8px_40px_-8px_rgba(15,23,42,0.25)]
                        "
                    >
                        <QueryProvider>
                            {/* =========================================
                                Scrollable Content Area
                                - Only this section scrolls.
                                - Header/Footer (if added later) stay fixed.
                            ========================================== */}
                            <main
                                className="
                                    flex-1
                                    overflow-y-auto
                                    overscroll-contain
                                    no-scrollbar
                                "
                            >
                                <AuthProvider>

                                {   children}
                                </AuthProvider>
                            </main>

                            {/* Global Toast Notifications */}
                            <Toaster        position="top-center" />
                        </QueryProvider>
                    </div>
                </div>
            </body>
        </html>
    );
}