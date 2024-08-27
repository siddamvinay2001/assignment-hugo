import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAutoIncrementStore } from "./AutoIncrementStore";
import { useProfileStore } from "./ProfileStore";
import { Vehicle, VehicleStore, VehicleFormStore } from "@/types/Vehicle.types";

const VEHICLES_KEY = "vehicles";

export const useVehicleStore = create<VehicleStore>((set) => ({
  vehicles: [],
  addVehicle: async (vehicle) => {
    try {
      const { getNextVehicleId } = useAutoIncrementStore.getState();
      const nextVehicleId = await getNextVehicleId();
      const newVehicle = { ...vehicle, id: nextVehicleId };
      const vehiclesString = await AsyncStorage.getItem(VEHICLES_KEY);
      const allVehicles = vehiclesString ? JSON.parse(vehiclesString) : [];
      const updatedVehicles = [...allVehicles, newVehicle];
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
