"use client";

import { useEffect, useState } from "react";

import axiosInstance from "@/app/lib/axios";
import { useAuthStore } from "@/app/store/auth.store";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const {
        accessToken,
        user,
        setUser,
        logout,
    } = useAuthStore();

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        let mounted = true;

        async function initialize() {
            /**
             * No authenticated session.
             */
            if (!accessToken) {
                if (mounted) {
                    setLoading(false);
                }

                return;
            }

            /**
             * User already loaded.
             */
            if (user) {
                if (mounted) {
                    setLoading(false);
                }

                return;
            }

            try {
                const response =
                    await axiosInstance.get(
                        "/auth/me",
                    );

                if (!mounted) {
                    return;
                }

                setUser(
                    response.data.data,
                );
            } catch (error) {
                console.error(
                    "AuthProvider: failed to load current user:",
                    error,
                );

                /**
                 * IMPORTANT:
                 *
                 * Do not immediately logout here.
                 *
                 * We need to know whether the problem
                 * is authentication, API availability,
                 * token refresh, etc.
                 */
                if (mounted) {
                    setLoading(false);
                }

                return;
            }

            if (mounted) {
                setLoading(false);
            }
        }

        initialize();

        return () => {
            mounted = false;
        };
    }, [
        accessToken,
        user,
        setUser,
    ]);

    if (loading) {
        return null;
    }

    return children;
}