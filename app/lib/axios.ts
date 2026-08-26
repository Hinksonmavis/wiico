import axios, {
    AxiosHeaders,
    InternalAxiosRequestConfig,
} from "axios";

import { useAuthStore } from "../store/auth.store";

interface RetryRequestConfig
    extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

interface RefreshResponse {
    accessToken: string;
    refreshToken: string;
}

interface RefreshApiResponse {
    success: boolean;
    message: string;
    data: RefreshResponse;
}

// ============================================================
// API CONFIGURATION
// ============================================================

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:5000/api/v1";

// ============================================================
// MAIN AXIOS CLIENT
// ============================================================
//
// Do not set a global Content-Type header here.
// Axios must set multipart boundaries for FormData uploads.
//

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// ============================================================
// REFRESH CLIENT
// ============================================================
//
// This client deliberately has no interceptors, so a failed
// refresh request cannot trigger another refresh request.
//

const refreshClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// ============================================================
// SHARED REFRESH PROMISE
// ============================================================
//
// Multiple simultaneous 401 responses share one refresh call.
//

let refreshPromise: Promise<RefreshResponse> | null =
    null;

// ============================================================
// HELPERS
// ============================================================

const shouldSkipRefresh = (
    request?: RetryRequestConfig,
) => {
    const url = request?.url ?? "";

    return [
        "/auth/login",
        "/auth/register",
        "/auth/refresh",
    ].some((endpoint) => url.includes(endpoint));
};

const notifySessionExpired = () => {
    if (typeof window === "undefined") {
        return;
    }

    window.dispatchEvent(
        new Event("auth:session-expired"),
    );
};

// ============================================================
// REQUEST INTERCEPTOR
// ============================================================
//
// Attach the access token to outgoing authenticated requests.
//

axiosInstance.interceptors.request.use(
    (
        config: InternalAxiosRequestConfig,
    ) => {
        const token =
            useAuthStore
                .getState()
                .accessToken;

        if (!token) {
            return config;
        }

        const headers =
            config.headers instanceof AxiosHeaders
                ? config.headers
                : new AxiosHeaders(
                    config.headers,
                );

        headers.set(
            "Authorization",
            `Bearer ${token}`,
        );

        config.headers = headers;

        return config;
    },

    (error) => {
        return Promise.reject(error);
    },
);

// ============================================================
// RESPONSE INTERCEPTOR
// ============================================================
//
// On a protected request:
// 401 → refresh tokens once → retry original request.
//
// Login, registration, and refresh requests never enter this
// flow. Invalid credentials must show an error, not reload the
// browser.
//

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },

    async (error) => {
        const originalRequest =
            error.config as
                | RetryRequestConfig
                | undefined;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        // Invalid credentials from Login/Register are normal
        // form errors, not expired-session errors.
        if (shouldSkipRefresh(originalRequest)) {
            return Promise.reject(error);
        }

        // Refresh only a first 401 response.
        if (
            error.response?.status !== 401 ||
            originalRequest._retry
        ) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            const auth =
                useAuthStore.getState();

            const currentRefreshToken =
                auth.refreshToken;

            if (!currentRefreshToken) {
                throw new Error(
                    "Missing refresh token.",
                );
            }

            if (!refreshPromise) {
                refreshPromise =
                    refreshClient
                        .post<RefreshApiResponse>(
                            "/auth/refresh",
                            {
                                refreshToken:
                                    currentRefreshToken,
                            },
                        )
                        .then((response) => {
                            const {
                                accessToken,
                                refreshToken,
                            } = response.data.data;

                            if (
                                !accessToken ||
                                !refreshToken
                            ) {
                                throw new Error(
                                    "Refresh response did not include valid tokens.",
                                );
                            }

                            // A user may legitimately be null
                            // during initial application startup.
                            // Do not reject a valid token refresh.
                            useAuthStore
                                .getState()
                                .login(
                                    accessToken,
                                    refreshToken,
                                );

                            return {
                                accessToken,
                                refreshToken,
                            };
                        })
                        .finally(() => {
                            refreshPromise = null;
                        });
            }

            const {
                accessToken,
            } = await refreshPromise;

            const headers =
                originalRequest.headers instanceof
                AxiosHeaders
                    ? originalRequest.headers
                    : new AxiosHeaders(
                        originalRequest.headers,
                    );

            headers.set(
                "Authorization",
                `Bearer ${accessToken}`,
            );

            originalRequest.headers = headers;

            return axiosInstance(originalRequest);
        } catch (refreshError) {
            useAuthStore
                .getState()
                .logout();

            // Do not use window.location.replace().
            // It forces a full browser reload and caused the loop.
            notifySessionExpired();

            return Promise.reject(refreshError);
        }
    },
);

export default axiosInstance;