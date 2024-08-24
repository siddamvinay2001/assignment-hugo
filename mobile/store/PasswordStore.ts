// src/store/PasswordStore.ts
import { create } from "zustand";
import { PasswordStore } from "@/types/Password.types";

export const usePasswordStore = create<PasswordStore>((set) => ({
    password: "",
    confirmPassword: "",
    passwordArray: Array(4).fill(""),
    confirmPasswordArray: Array(4).fill(""),
    errors: {},

    setPassword: (password) => set({ password }),
    setConfirmPassword: (confirmPassword) => set({ confirmPassword }),

    setPasswordArray: (index: number, value: string) => set((state) => {
        const newArray = [...state.passwordArray];
        newArray[index] = value;
        return {
            passwordArray: newArray,
            password: newArray.join(""),
        };
    }),

    setConfirmPasswordArray: (index: number, value: string) => set((state) => {
        const newArray = [...state.confirmPasswordArray];
        newArray[index] = value;
        return {
            confirmPasswordArray: newArray,
            confirmPassword: newArray.join(""),
        };
    }),

    setErrors: (errors) => set({ errors }),
    clearPasswordForm: () => set({
        password: "",
        confirmPassword: "",
        passwordArray: Array(4).fill(""),
        confirmPasswordArray: Array(4).fill(""),
        errors: {},
    }),
}));
