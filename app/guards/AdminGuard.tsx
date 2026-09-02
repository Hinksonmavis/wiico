"use client";

import {
    ReactNode,
    useEffect,
} from "react";

import {
    usePathname,
    useRouter,
} from "next/navigation";

import { ROUTES } from "@/app/constants/routes";
import { useAuthStore } from "@/app/store/auth.store";

interface Props {
    children: ReactNode;
}

export default function AdminGuard({
    children,
}: Props) {

    const router = useRouter();

    const pathname =
        usePathname();

    const {
        user,
        isAuthenticated,
        isAuthInitialized,
    } = useAuthStore();

    useEffect(() => {

        /*
         * Do nothing until authentication
         * restoration has completed.
         */
        if (!isAuthInitialized) {
            return;
        }

        /*
         * No authenticated session.
         */
        if (!isAuthenticated) {

            router.replace(
                `${ROUTES.ADMIN_LOGIN}?redirect=${encodeURIComponent(
                    pathname,
                )}`,
            );

            return;
        }

        /*
         * Authenticated but user information
         * is unavailable.
         *
         * AuthProvider should normally prevent
         * this state, but fail safely if it occurs.
         */
        if (!user) {

            router.replace(
                `${ROUTES.ADMIN_LOGIN}?redirect=${encodeURIComponent(
                    pathname,
                )}`,
            );

            return;
        }

        /*
         * Authenticated user is not an admin.
         */
        if (user.role !== "admin") {

            router.replace(
                ROUTES.DASHBOARD,
            );

        }

    }, [
        isAuthInitialized,
        isAuthenticated,
        user,
        pathname,
        router,
    ]);

    /*
     * Authentication is still being restored.
     */
    if (!isAuthInitialized) {

        return (
            <div
                className="
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    bg-gray-50
                    px-6
                "
            >

                <div className="text-center">

                    <div
                        className="
                            mx-auto
                            h-10
                            w-10
                            animate-spin
                            rounded-full
                            border-4
                            border-gray-200
                            border-t-black
                        "
                    />

                    <h2
                        className="
                            mt-5
                            text-base
                            font-semibold
                            text-gray-900
                        "
                    >
                        Verifying administrator session
                    </h2>

                    <p
                        className="
                            mt-2
                            text-sm
                            text-gray-500
                        "
                    >
                        Please wait...
                    </p>

                </div>

            </div>
        );
    }

    /*
     * After initialization, do not render
     * protected content unless the user is
     * definitely an admin.
     */
    if (
        !isAuthenticated ||
        !user ||
        user.role !== "admin"
    ) {

        return null;
    }

    return <>{children}</>;
}