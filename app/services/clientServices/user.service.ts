import { UpdateProfileRequest, UpdateProfileResponse } from "@/app/types/clientTypes/user.types";
import { api } from "../api";

class UserService {
    updateProfile(data: UpdateProfileRequest) {
        return api.patch<UpdateProfileResponse>(
            "/auth/me",
            data,
        );
    }
}

export const userService =
    new UserService();