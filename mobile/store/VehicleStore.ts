import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Vehicle, VehicleStore } from "@/types/Profile.types";
import { useAutoIncrementStore } from "./AutoIncrementStore";

const VEHICLES_KEY = "vehicles";

export const useVehicleStore = create<VehicleStore>((set) => ({
  vehicles: [],
  addVehicle: async (vehicle) => {
    try {
      const { getNextVehicleId } = useAutoIncrementStore.getState();
      const nextVehicleId = await getNextVehicleId();
      const newVehicle = { ...vehicle, id: nextVehicleId };
      const updatedVehicles = [...get().vehicles, newVehicle];
      set({ vehicles: updatedVehicles });
      await AsyncStorage.setItem(VEHICLES_KEY, JSON.stringify(updatedVehicles));
    } catch (error) {
      console.error('Failed to add vehicle:', error);
    }
  },

  removeVehicle: async (vehicleId) => {
    try {
      const updatedVehicles = get().vehicles.filter(
        (vehicle) => vehicle.id !== vehicleId
      );
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
      const currentVehicles = allVehicles.filter(
        (vehicle) => vehicle.profileId === profileId
      );
      set({ vehicles: currentVehicles });
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
  setName: (name) => set((state) => ({ name, })),
  setType: (type) => set((state) => ({ type, })),
  setEngineCC: (engineCC) => set((state) => ({ engineCC, })),
  setErrors: (errors) => set({ errors }),
  clearVehicleForm: () =>
    set({
      name: "",
      type: 2 as VehicleType,
      engineCC: 0,
      errors: {},
    }),
}));