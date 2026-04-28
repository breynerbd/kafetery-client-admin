import { axiosAuth } from './api';

export const login = (data) =>
    axiosAuth.post("/api/auth/login", data);

export const register = (data) =>
    axiosAuth.post("/api/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" }
    });

export const forgotPassword = (email) =>
    axiosAuth.post("/api/auth/forgot-password", { email });

export const resetPassword = (token, newPassword) =>
    axiosAuth.post("/api/auth/reset-password", { token, newPassword });

export const resendVerification = (email) =>
    axiosAuth.post("/api/auth/resend-verification", { email });

export const getMe = () =>
    axiosAuth.get("/api/auth/me");