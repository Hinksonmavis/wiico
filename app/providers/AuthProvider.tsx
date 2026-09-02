"use client";

import { useEffect } from "react";

import axiosInstance from "@/app/lib/axios";
import { useAuthStore } from "@/app/store/auth.store";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    const accessToken =
        useAuthStore(
            (state) =>
                state.accessToken,
        );

    const user =
        useAuthStore(
            (state) =>
                state.user,
        );

    const setUser =
        useAuthStore(
            (state) =>
                state.setUser,
        );

    const logout =
        useAuthStore(
            (state) =>
                state.logout,
        );

    const setAuthInitialized =
        useAuthStore(
            (state) =>
                state.setAuthInitialized,
        );

    useEffect(() => {

        /*
         * No access token means this is a guest session.
         * Authentication restoration is complete.
         */
        if (!accessToken) {

            setAuthInitialized(true);

            return;
        }

        /*
         * We already have the authenticated user.
         */
        if (user) {

            setAuthInitialized(true);

            return;
        }

        const controller =
            new AbortController();

        async function loadCurrentUser() {

            try {

                const response =
                    await axiosInstance.get(
                        "/auth/me",
                        {
                            signal:
                                controller.signal,
                        },
                    );

                if (
                    controller.signal.aborted
                ) {
                    return;
                }

                const currentUser =
                    response.data?.data;

                if (!currentUser) {

                    throw new Error(
                        "AuthProvider: /auth/me returned no user.",
                    );
                }

                setUser(
                    currentUser,
                );

            } catch (error) {

                if (
                    controller.signal.aborted
                ) {
                    return;
                }

                console.error(
                    "AuthProvider: failed to restore session:",
                    error,
                );

                /*
                 * The stored access token is no longer
                 * sufficient to authenticate the user.
                 *
                 * Clear the local authentication state.
                 */
                logout();

            } finally {

                if (
                    !controller.signal.aborted
                ) {
                    setAuthInitialized(
                        true,
                    );
                }

            }
        }

        loadCurrentUser();

        return () => {
            controller.abort();
        };

    }, [
        accessToken,
        user,
        setUser,
        logout,
        setAuthInitialized,
    ]);

    return <>{children}</>;
}