"use client";

import { useEffect } from "react";

import axiosInstance from "@/app/lib/axios";
import { useAuthStore } from "@/app/store/auth.store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = useAuthStore(
    (state) => state.accessToken,
  );

  const user = useAuthStore(
    (state) => state.user,
  );

  const setUser = useAuthStore(
    (state) => state.setUser,
  );

  useEffect(() => {
    // Guest pages such as Login and Register should render normally.
    if (!accessToken || user) {
      return;
    }

    const controller = new AbortController();

    async function loadCurrentUser() {
      try {
        const response = await axiosInstance.get(
          "/auth/me",
          {
            signal: controller.signal,
          },
        );

        if (controller.signal.aborted) {
          return;
        }

        const currentUser = response.data?.data;

        if (currentUser) {
          setUser(currentUser);
        } else {
          console.error(
            "AuthProvider: /auth/me returned no user data.",
          );
        }
      } catch (error) {
        // React development mode can cancel the first request deliberately.
        if (controller.signal.aborted) {
          return;
        }

        console.error(
          "AuthProvider: failed to load current user:",
          error,
        );

        // Do not call router.refresh(), location.reload(), or logout here.
        // A failed request must not cause a navigation/reload loop.
      }
    }

    loadCurrentUser();

    return () => {
      controller.abort();
    };
  }, [accessToken, user, setUser]);

  // Never block the whole app while /auth/me is loading.
  return <>{children}</>;
}