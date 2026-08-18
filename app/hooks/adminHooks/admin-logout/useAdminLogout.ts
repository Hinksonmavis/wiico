"use client";

import { useRouter } from "next/navigation";

import Cookies from "js-cookie";
import { authService } from "@/app/services/clientServices/auth.service";

export function useAdminLogout() {
    const router = useRouter();

    async function logout() {
        const refreshToken =
            Cookies.get("refreshToken");

        try {
            if (refreshToken) {
                await authService.logout(
                    refreshToken,
                );
            }
        } catch (error) {
            console.error(
                "Admin logout request failed:",
                error,
            );
        } finally {
            // Clear local authentication.

            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");

            if (
                typeof window !==
                "undefined"
            ) {
                localStorage.removeItem(
                    "accessToken",
                );

                localStorage.removeItem(
                    "refreshToken",
                );

                sessionStorage.removeItem(
                    "accessToken",
                );

                sessionStorage.removeItem(
                    "refreshToken",
                );
            }

            // Go to the public homepage.

            router.replace("/");
        }
    }

    return {
        logout,
    };
}