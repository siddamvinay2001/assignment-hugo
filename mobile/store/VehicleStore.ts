import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Vehicle, VehicleStore } from "@/types/Profile.types";
import { useAutoIncrementStore } from "./AutoIncrementStore";

const VEHICLES_KEY = "vehicles";

export const useVehicleStore = create<VehicleStore>((set) => ({
  vehicles: [],
  addVehicle: async (vehicle) => {
    const { getNextVehicleId } = useAutoIncrementStore.getState();
    const nextVehicleId = await getNextVehicleId();
    set((state) => {
      const newVehicle = { ...vehicle, id: nextVehicleId };
      const updatedVehicles = [...state.vehicles, newVehicle];
      AsyncStorage.setItem(VEHICLES_KEY, JSON.stringify(updatedVehicles)).catch(
        (error) => {
          console.error("Failed to save vehicles to AsyncStorage", error);
        }
      );
      return { vehicles: updatedVehicles };
    });
  },
  removeVehicle: async (vehicleId) => {
    set((state) => {
      const updatedVehicles = state.vehicles.filter(
        (vehicle) => vehicle.id !== vehicleId
      );
      AsyncStorage.setItem(VEHICLES_KEY, JSON.stringify(updatedVehicles)).catch(
        (error) => {
          console.error("Failed to remove vehicle from AsyncStorage", error);
        }
      );
      return { vehicles: updatedVehicles };
    });
  },
  loadVehicles: async () => {
    try {
      const vehiclesString = await AsyncStorage.getItem(VEHICLES_KEY);
      const vehicles = vehiclesString ? JSON.parse(vehiclesString) : [];
      set({ vehicles });
    } catch (error) {
      console.error("Failed to load vehicles from AsyncStorage", error);
    }
  },
  loadCurrentVehicles: async (profileId) => {
    try {
      const vehiclesString = await AsyncStorage.getItem(VEHICLES_KEY);
      const vehicles = vehiclesString ? JSON.parse(vehiclesString) : [];
      return vehicles.filter((vehicle) => vehicle.profileId === profileId);
    } catch (error) {
      console.error("Failed to load current vehicles from AsyncStorage", error);
      return [];
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