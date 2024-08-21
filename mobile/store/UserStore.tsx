import { ProfileList } from "@/types/Profile.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const useProfiles = create<ProfileList>((set) => ({
    profiles: [],
    currentProfile: null,
    addProfile: async (profile) => {
      set((state) => {
        const updatedProfiles = [...state.profiles, profile];
        AsyncStorage.setItem('profiles', JSON.stringify(updatedProfiles));
        return { profiles: updatedProfiles };
      });
    },
    loadProfiles: async () => {
      const profilesString = await AsyncStorage.getItem('profiles');
      const profiles = profilesString ? JSON.parse(profilesString) : [];
      set({ profiles });
    },
    setCurrentProfile: (profile) => set({ currentProfile: profile }),
    clearCurrentProfile: () => set({ currentProfile: null }),
  }));