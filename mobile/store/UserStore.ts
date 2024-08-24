import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserStore } from "@/types/Profile.types";

export const useUserStore = create<UserStore>((set) => ({
  name: "",
  nickname: "",
  email: "",
  password: "",
  confirmPassword: "",
  isProtected: false,
  checked: false,
  errors: {},
  setName: (name) => set({ name }),
  setNickname: (nickname) => set({ nickname }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setChecked: (checked) => set({ checked }),
  setErrors: (errors) => set({ errors }),
  setProtected: (isProtected) => set({ isProtected }),
  clearPasswordForm: () =>
    set({
      password: "",
      confirmPassword: "",
    }),
  clearForm: () =>
    set({
      name: "",
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
      checked: false,
      errors: {},
      isProtected: false,
    }),
}));
