import { ProfileList, UserType } from "@/types/Profile.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const useProfileStore = create<ProfileList>((set) => ({
  profiles: [],
  currentProfile: null,
  addProfile: async (profile) => {
    set((state) => {
      const updatedProfiles = [...state.profiles, profile];
      AsyncStorage.setItem("profiles", JSON.stringify(updatedProfiles));
      return { profiles: updatedProfiles };
    });
  },
  loadProfiles: async () => {
    const profilesString = await AsyncStorage.getItem("profiles");
    const profiles = profilesString ? JSON.parse(profilesString) : [];
    set({ profiles });
  },
  setCurrentProfile: (profile) => set({ currentProfile: profile }),
  clearCurrentProfile: () => set({ currentProfile: null }),
}));

export const useUserStore = create<UserType>((set) => ({
  name: "",
  nickname: "",
  email: "",
  password: "",
  confirmPassword: "",
  isChecked: false,
  errors: {},
  setName: (name) => set({ name }),
  setNickname: (nickname) => set({ nickname }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setChecked: (isChecked) => set({ isChecked }),
  setErrors: (errors) => set({ errors }),
  clearForm: () =>
    set({
      name: "",
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
      isChecked: false,
      errors: {},
    }),
}));
