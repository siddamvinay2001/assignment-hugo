import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Profile, ProfileStore } from "@/types/Profile.types";
import { useAutoIncrementStore } from "./AutoIncrementStore";

const PROFILES_KEY = "profiles";

export const useProfileStore = create<ProfileStore>((set) => ({
    profiles: [],
    currentProfile: null,
    addProfile: async (profile) => {
        const { getNextProfileId } = useAutoIncrementStore.getState();
        const nextProfileId = await getNextProfileId();
        set((state) => {
            const newProfile = { ...profile, id: nextProfileId };
            const updatedProfiles = [...state.profiles, newProfile];
            AsyncStorage.setItem(PROFILES_KEY, JSON.stringify(updatedProfiles)).catch(
                (error) => {
                    console.error("Failed to save profiles to AsyncStorage", error);
                }
            );
            return { profiles: updatedProfiles };
        });
        return nextProfileId;
    },
    loadProfiles: async () => {
        try {
            const profilesString = await AsyncStorage.getItem(PROFILES_KEY);
            const profiles = profilesString ? JSON.parse(profilesString) : [];
            set({ profiles });
        } catch (error) {
            console.error("Failed to load profiles from AsyncStorage", error);
        }
    },
    setCurrentProfile: (profile) => set({ currentProfile: profile }),
    clearCurrentProfile: () => set({ currentProfile: null }),
    deleteProfile: async (profileId) => {
        set((state) => {
            const updatedProfiles = state.profiles.filter(profile => profile.id !== profileId);
            AsyncStorage.setItem(PROFILES_KEY, JSON.stringify(updatedProfiles)).catch(
                (error) => {
                    console.error("Failed to delete profile from AsyncStorage", error);
                }
            );
            return { profiles: updatedProfiles };
        });
    },
    deleteAllAccounts: async () => {
        try {
            await AsyncStorage.clear();
        } catch (err) {
            console.log("Error clearing local storage", err);
        }
    }
}));
