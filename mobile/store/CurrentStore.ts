import { CurrentStore } from "@/types/CurrentStore.types";
import { create } from "zustand";

export const useCurrentStore = create<CurrentStore>((set) => ({
    currentProfile: null,
    currentVehicleId: null,
    setCurrentProfile: (profile) => set({ currentProfile: profile }),
    setCurrentVehicleId: (vehicleId) => set({ currentVehicleId: vehicleId }),
}));