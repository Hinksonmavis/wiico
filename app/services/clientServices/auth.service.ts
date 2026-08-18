import { AdminLoginRequest, AuthResponse, LoginRequest, LoginResponse, RefreshResponse, RegisterRequest, User } from "../../types/clientTypes/auth";
import Cookies from "js-cookie";

import { api } from "../api";

class AuthService {
    register(data: RegisterRequest) {
        return api.post<AuthResponse>(
            "/auth/register",
            data,
        );
    }

    login(data: LoginRequest) {
        return api.post<AuthResponse>(
            "/auth/login",
            data,
        );
    }

    adminLogin(data: AdminLoginRequest) {
        return api.post<AuthResponse>(
            "/auth/admin/login",
            data,
        );
    }

    refresh(refreshToken: string) {
        return api.post<RefreshResponse>(
            "/auth/refresh",
            {
                refreshToken,
            },
        );
    }

    logout(refreshToken: string) {
        return api.post<LoginResponse>("/auth/logout", {
            refreshToken,
        });
    }

    me() {
        return api.get<{
            success: boolean;
            data: User;
        }>("/auth/me");
    }

    updateMe(data: {
        email?: string | null;
    }) {
        return api.patch<{
            success: boolean;
            message: string;
            data: User;
        }>("/auth/me", data);
    }

    // Remove all local authentication.
    clearSession() {

        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");

    }
}

export const authService = new AuthService();