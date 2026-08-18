export interface UpdateProfileRequest {
    email?: string;
}

export interface UpdateProfileResponse {
    success: boolean;
    message: string;
    data: {
        id: string;
        phone: string;
        email: string | null;
        country: string;
        referralCode: string;
    };
}