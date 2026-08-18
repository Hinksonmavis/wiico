"use client";

import { useEffect, useState } from "react";
import {
    useRouter,
    useSearchParams,
} from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
    Phone,
    Gift,
} from "lucide-react";

import { useAuthStore } from "@/app/store/auth.store";

import {
    RegisterFormData,
    registerSchema,
} from "@/app/schema/auth.schema";

import { authService } from "@/app/services/clientServices/auth.service";

import { ROUTES } from "@/app/constants/routes";

import TextField from "../ui/TextField";
import PasswordField from "../ui/PasswordField";
import SubmitButton from "../ui/SubmitButton";
import RegisterFormFooter from "../ui/RegisterFormFooter";
import RegistrationSuccessModal from "../ui/RegistrationSuccessModal";

export default function RegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const login = useAuthStore(
        (state) => state.login,
    );

    const [loading, setLoading] =
        useState(false);

    const [registrationSuccess, setRegistrationSuccess] =
        useState(false);

    const [registeredPhone, setRegisteredPhone] =
        useState("");

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),

        defaultValues: {
            phone: "",
            password: "",
            confirmPassword: "",
            referral: "",
            country: "",
        },
    });

    /**
     * Auto-fill referral code.
     *
     * Example:
     * /register?ref=NX-4K8P2A
     */
    useEffect(() => {
        const referral =
            searchParams.get("ref");

        if (referral) {
            setValue(
                "referral",
                referral.toUpperCase(),
                {
                    shouldValidate: true,
                },
            );
        }
    }, [
        searchParams,
        setValue,
    ]);

    const onSubmit = async (
        values: RegisterFormData,
    ) => {
        try {
            setLoading(true);

            const response =
                await authService.register({
                    phone: values.phone,
                    password: values.password,
                    confirmPassword:
                        values.confirmPassword,
                    referral:
                        values.referral,
                    country:
                        values.country?.trim() ||
                        "Nigeria",
                });

            const {
                accessToken,
                refreshToken,
                user,
            } = response.data;

            /**
             * Save authenticated session.
             */
            login(
                accessToken,
                refreshToken,
            );

            /**
             * Store the registered phone
             * for the success modal.
             */
            setRegisteredPhone(
                user?.phone ??
                    values.phone,
            );

            /**
             * Show success modal instead
             * of redirecting immediately.
             */
            setRegistrationSuccess(true);

            toast.success(
                "Account created successfully.",
            );
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ??
                    "Registration failed.",
            );
        } finally {
            setLoading(false);
        }
    };

    const handleContinue = () => {
        router.push(
            ROUTES.DASHBOARD,
        );
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="
                    flex flex-col
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
                    placeholder="Create a password"
                    error={
                        errors.password?.message
                    }
                    {...register("password")}
                />

                <PasswordField
                    label="Confirm Password"
                    placeholder="Confirm password"
                    error={
                        errors.confirmPassword
                            ?.message
                    }
                    {...register(
                        "confirmPassword",
                    )}
                />

                <TextField
                    label="Country"
                    placeholder="Nigeria"
                    hint="Leave blank if you're in Nigeria."
                    error={
                        errors.country?.message
                    }
                    {...register("country")}
                />

                <TextField
                    label="Invitation (Optional)"
                    placeholder="Example: NX-4K8P2A"
                    icon={
                        <Gift className="h-4 w-4" />
                    }
                    className="uppercase"
                    error={
                        errors.referral?.message
                    }
                    {...register("referral")}
                />

                <SubmitButton
                    loading={loading}
                    loadingText="Creating account..."
                >
                    Create Account
                </SubmitButton>

                <RegisterFormFooter />
            </form>

            <RegistrationSuccessModal
                open={registrationSuccess}
                phone={registeredPhone}
                onContinue={handleContinue}
            />
        </>
    );
}