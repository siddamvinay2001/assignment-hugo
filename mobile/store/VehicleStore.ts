import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Vehicle, VehicleStore } from "@/types/Profile.types";
import { useAutoIncrementStore } from "./AutoIncrementStore";
import { useProfileStore } from "./ProfileStore";

const VEHICLES_KEY = "vehicles";

export const useVehicleStore = create<VehicleStore>((set) => ({
  vehicles: [],
  currentVehicles: [],

  addVehicle: async (vehicle) => {
    try {
      const { getNextVehicleId } = useAutoIncrementStore.getState();
      const nextVehicleId = await getNextVehicleId();
      const newVehicle = { ...vehicle, id: nextVehicleId };
      const vehiclesString = await AsyncStorage.getItem(VEHICLES_KEY);
      const allVehicles = vehiclesString ? JSON.parse(vehiclesString) : [];
      const updatedVehicles = [...allVehicles, newVehicle];
      set({ vehicles: updatedVehicles });
      await AsyncStorage.setItem(VEHICLES_KEY, JSON.stringify(updatedVehicles));
    } catch (error) {
      console.error('Failed to add vehicle:', error);
    }
  },

  removeVehicle: async (vehicleId) => {
    try {
      const vehiclesString = await AsyncStorage.getItem(VEHICLES_KEY);
      const allVehicles = vehiclesString ? JSON.parse(vehiclesString) : [];
      const updatedVehicles = allVehicles.filter(v => v.id !== vehicleId);
      set({ vehicles: updatedVehicles });
      await AsyncStorage.setItem(VEHICLES_KEY, JSON.stringify(updatedVehicles));
    } catch (error) {
      console.error('Failed to remove vehicle:', error);
    }
  },

  loadVehicles: async () => {
    try {
      const vehiclesString = await AsyncStorage.getItem(VEHICLES_KEY);
      const vehicles = vehiclesString ? JSON.parse(vehiclesString) : [];
      set({ vehicles });
    } catch (error) {
      console.error('Failed to load vehicles:', error);
    }
  },

  loadCurrentVehicles: async (profileId) => {
    try {
      const vehiclesString = await AsyncStorage.getItem(VEHICLES_KEY);
      const allVehicles = vehiclesString ? JSON.parse(vehiclesString) : [];
      const currentVehicles = allVehicles.filter(v => v.profileId === profileId);
      set({ currentVehicles });
    } catch (error) {
      console.error('Failed to load current vehicles:', error);
    }
  },
}));

export const useVehicleFormStore = create<VehicleFormStore>((set) => ({
  name: "",
  type: 2 as VehicleType,
  engineCC: 0,
  errors: {},
  setName: (name) => set({ name }),
  setType: (type) => set({ type }),
  setEngineCC: (engineCC) => set({ engineCC }),
  setErrors: (errors) => set({ errors }),
  clearVehicleForm: () => set({
    name: "",
    type: 2 as VehicleType,
    engineCC: 0,
    errors: {},
  }),
}));
