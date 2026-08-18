"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Phone } from "lucide-react";

import { useAuthStore } from "@/app/store/auth.store";

import {
    LoginFormData,
    loginSchema,
} from "@/app/schema/auth.schema";

import { authService } from "@/app/services/clientServices/auth.service";

import { ROUTES } from "@/app/constants/routes";

import TextField from "../ui/TextField";
import PasswordField from "../ui/PasswordField";
import SubmitButton from "../ui/SubmitButton";
import LoginFormFooter from "../ui/LoginFooter";
import LoginSuccessModal from "../ui/LoginSuccessModal";

export default function LoginForm() {
    const router = useRouter();

    const login = useAuthStore(
        (state) => state.login,
    );

    const [loading, setLoading] =
        useState(false);

    const [loginSuccess, setLoginSuccess] =
        useState(false);

    const [loggedInPhone, setLoggedInPhone] =
        useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(
            loginSchema,
        ),

        defaultValues: {
            phone: "",
            password: "",
        },
    });

    const onSubmit = async (
        values: LoginFormData,
    ) => {
        try {
            setLoading(true);

            const response =
                await authService.login(
                    values,
                );

            const {
                accessToken,
                refreshToken,
            } = response.data;

            /**
             * Persist authentication.
             *
             * The authenticated user will
             * subsequently be loaded by
             * useCurrentUser().
             */
            login(
                accessToken,
                refreshToken,
            );

            /**
             * Store the phone number used
             * for this login.
             */
            setLoggedInPhone(
                values.phone,
            );

            /**
             * Show welcome modal instead
             * of redirecting immediately.
             */
            setLoginSuccess(true);

            toast.success(
                "Login successful.",
            );
        } catch (error: any) {
            toast.error(
                error?.response?.data
                    ?.message ??
                    "Login failed.",
            );
        } finally {
            setLoading(false);
        }
    };

    const handleContinue = () => {
        router.replace(
            ROUTES.DASHBOARD,
        );
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(
                    onSubmit,
                )}
                className="
                    flex
                    flex-col
                    gap-2
                    space-y-5
                    p-6
                "
            >
                <TextField
                    label="Phone Number"
                    type="tel"
                    placeholder="08012345678"
                    icon={
                        <Phone className="h-4 w-4" />
                    }
                    error={
                        errors.phone?.message
                    }
                    {...register("phone")}
                />

                <PasswordField
                    label="Password"
                    placeholder="Enter your password"
                    error={
                        errors.password?.message
                    }
                    {...register("password")}
                />

                <SubmitButton
                    loading={loading}
                    loadingText="Logging in..."
                >
                    Log In
                </SubmitButton>

                <LoginFormFooter />
            </form>

            <LoginSuccessModal
                open={loginSuccess}
                phone={loggedInPhone}
                onContinue={
                    handleContinue
                }
            />
        </>
    );
}