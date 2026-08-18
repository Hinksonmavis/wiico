import axios, {
    AxiosHeaders,
    InternalAxiosRequestConfig,
} from "axios";

import { useAuthStore } from "../store/auth.store";
import { ROUTES } from "../constants/routes";

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

// API CONFIGURATION
const API_URL =
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:5000/api/v1";


// MAIN AXIOS CLIENT
const axiosInstance = axios.create({
    baseURL: API_URL,

    headers: {
        "Content-Type": "application/json",
    },

    withCredentials: true,
});


// REFRESH CLIENT
// This client intentionally has no interceptors.
// It is used only to refresh the access token.
//
// This prevents: /auth/refresh -> 401 -> refresh -> /auth/refresh -> ...
const refreshClient = axios.create({
    baseURL: API_URL,

    headers: {
        "Content-Type": "application/json",
    },

    withCredentials: true,
});


// SHARED REFRESH PROMISE
// If several requests receive 401 at the same time,
// only one refresh request will be sent.
//
// The other requests wait for the same promise.
let refreshPromise: Promise<RefreshResponse> | null = null;


// REQUEST INTERCEPTOR
// Adds the current access token to every authenticated request.
axiosInstance.interceptors.request.use(
    (
        config: InternalAxiosRequestConfig,
    ) => {
        const token = useAuthStore.getState().accessToken;

        if (token) {

            // Always convert the headers object to
            // AxiosHeaders so we can safely use .set().
            const headers = config.headers instanceof AxiosHeaders
                ? config.headers
                : new AxiosHeaders(
                    config.headers,
                );

            headers.set(
                "Authorization",
                `Bearer ${token}`,
            );

            config.headers = headers;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    },
);


// RESPONSE INTERCEPTOR
//
// Handles expired access tokens.
//
// Flow:
//
// Request
//    ↓
// 401
//    ↓
// Refresh access token
//    ↓
// Save new tokens
//    ↓
// Retry original request
//
// A 403 is NOT refreshed.
axiosInstance.interceptors.response.use(

    // SUCCESS
    (response) => {
        return response;
    },

    // ERROR
    async (error) => {
        const originalRequest = error.config as
            | RetryRequestConfig
            | undefined;

        
        // No request information.
        if (!originalRequest) {
            return Promise.reject(error);
        }

        // Never refresh the refresh endpoint.
        if (
            originalRequest.url?.includes(
                "/auth/refresh",
            )
        ) {
            return Promise.reject(error);
        }

        // Only refresh on 401.
        //
        // 401 = missing/invalid/expired authentication.
        //
        // 403 = authenticated but forbidden.
        //
        // Therefore 403 must NOT trigger refresh.
        if (
            error.response?.status !== 401 ||
            originalRequest._retry
        ) {
            return Promise.reject(error);
        }

        // Mark this request so it cannot refresh repeatedly.
        originalRequest._retry = true;

        try {
            const auth = useAuthStore.getState();

            const currentRefreshToken = auth.refreshToken;

            // Refresh token does not exist.
            if (!currentRefreshToken) {
                throw new Error(
                    "Missing refresh token.",
                );
            }

            // START REFRESH REQUEST
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
                        .then(
                            (response) => {

                                const {
                                    accessToken,
                                    refreshToken,
                                } = response.data.data;

                                // Get the latest state.
                                const currentAuth = useAuthStore.getState();

                                // The refresh endpoint returns only tokens.
                                //
                                // Keep the existing user in the auth store.
                                if (!currentAuth.user) {
                                    throw new Error(
                                        "Authenticated user is missing.",
                                    );
                                }

                                // Update authentication tokens.
                                currentAuth.login(
                                    accessToken,
                                    refreshToken,
                                );

                                return {
                                    accessToken,
                                    refreshToken,
                                };
                            },
                        )
                        .finally(() => {

                            // Allow another refresh later.
                            refreshPromise = null;

                        });
            }

            // WAIT FOR REFRESH
            const {
                accessToken,
            } = await refreshPromise;

            // RETRY ORIGINAL REQUEST
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

            originalRequest.headers =
                headers;

            return axiosInstance(
                originalRequest,
            );

        } catch (refreshError) {

            // =================================================
            // REFRESH FAILED
            // =================================================
            //
            // The refresh token is invalid/expired or the
            // authenticated session can no longer be restored.
            //
            // Clear authentication and send the user to login.
            // =================================================

            useAuthStore
                .getState()
                .logout();

            if (
                typeof window !==
                "undefined"
            ) {

                window.location.replace(
                    ROUTES.LOGIN,
                );
            }

            return Promise.reject(
                refreshError,
            );
        }
    },
);

export default axiosInstance;