import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProfileList, UserType } from "@/types/Profile.types";

export const useProfileStore = create<ProfileList>((set) => ({
  profiles: [],
  currentProfile: null,
  addProfile: async (profile) => {
    set((state) => {
      const updatedProfiles = [...state.profiles, profile];
      // Await the AsyncStorage.setItem to ensure it completes
      AsyncStorage.setItem("profiles", JSON.stringify(updatedProfiles)).catch(
        (error) => {
          console.error("Failed to save profiles to AsyncStorage", error);
        }
      );
      return { profiles: updatedProfiles };
    });
  },
  setCurrentProfile: (profile) => set({ currentProfile: profile }),
  clearCurrentProfile: () => set({ currentProfile: null }),
  loadProfiles: async () => {
    const profilesString = await AsyncStorage.getItem("profiles");
    const profiles = profilesString ? JSON.parse(profilesString) : [];
    set({ profiles });
  },
}));

export const useUserStore = create<UserType>((set) => ({
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
