import api, { getHeaderToken } from "./api";
import { RecoveryPasswordRequest } from "@/@types/auth/recovery-password";
import { SignInRequest, SignInResponse } from "@/@types/auth/sign-in";
import { SignUpRequest } from "@/@types/auth/sign-up";
import { UpdateAuthUserRequest } from "@/@types/auth/update-auth-user";
import { UpdateAuthUserPasswordRequest } from "@/@types/auth/update-auth-user-password";

export const signIn = async (signInRequest: SignInRequest) => {
    return await api.post<SignInResponse>("/authentication/sign-in", signInRequest);
}

export const signUp = async (signUpRequest: SignUpRequest) => {
    return await api.post("/authentication/sign-up", signUpRequest);
}

export const recoveryPassword = async (recoveryPasswordRequest: RecoveryPasswordRequest) => {
    return await api.post("/authentication/recovery-password", recoveryPasswordRequest);
}

export const validateToken = async (): Promise<boolean> => {
    try {
        await api.get("/authentication/validate", getHeaderToken());
        return true;
    } catch {
        return false
    }
}

export const updateAuthUser = async (updateAuthUserRequest: UpdateAuthUserRequest) => {
    return api.put("/authentication", updateAuthUserRequest, getHeaderToken());;
}

export const updateAuthUserPassword = async (updateAuthUserPasswordRequest: UpdateAuthUserPasswordRequest) => {
    return api.patch("/authentication/change-password", updateAuthUserPasswordRequest, getHeaderToken());
}