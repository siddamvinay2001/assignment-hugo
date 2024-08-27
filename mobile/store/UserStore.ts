import { create } from "zustand";
import { UserStore } from "@/types/User.types";

export const useUserStore = create<UserStore>((set) => ({
  name: "",
  nickname: "",
  email: "",
  checked: false,
  isProtected: false,
  errors: {},

  setName: (name) => set({ name }),
  setNickname: (nickname) => set({ nickname }),
  setEmail: (email) => set({ email }),
  setChecked: (checked) => set({ checked }),
  setErrors: (errors) => set({ errors }),
  setProtected: (isProtected) => set({ isProtected }),
  clearUserForm: () => set({
    name: "",
    nickname: "",
    email: "",
    checked: false,
    errors: {},
    isProtected: false,
  }),
}));
