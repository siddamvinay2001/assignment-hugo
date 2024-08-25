import { create } from "zustand";
import { RefuelFormStore, RefuelStore } from "@/types/Refuel.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
const REFUELS_KEY = "refuels";

export const useRefuelStore = create<RefuelStore>((set) => ({
    refuels: [],
    selectedVehicle: null,
    setSelectedVehicle: (vehicleId) => set({ selectedVehicle: vehicleId }),
    addRefuel: async (refuel) => {
        try {
            const { getNextRefuelId } = useAutoIncrementStore.getState();
            const nextRefuelId = await getNextRefuelId();
            const newRefuel = { ...refuel, id: nextRefuelId };
            const refuelsString = await AsyncStorage.getItem(REFUELS_KEY);
            const allRefuels = refuelsString ? JSON.parse(refuelsString) : [];
            const updatedRefuels = [...allRefuels, newRefuel];
            set({ refuels: updatedRefuels });
            await AsyncStorage.setItem(REFUELS_KEY, JSON.stringify(updatedRefuels));
        } catch (error) {
            console.error('Failed to add refuel:', error);
        }
    },
    removeRefuel: async (refuelId) => {
        try {
            const refuelsString = await AsyncStorage.getItem(REFUELS_KEY);
            const allRefuels = refuelsString ? JSON.parse(refuelsString) : [];
            const updatedRefuels = allRefuels.filter(r => r.id !== refuelId);
            set({ refuels: updatedRefuels });
            await AsyncStorage.setItem(REFUELS_KEY, JSON.stringify(updatedRefuels));
        } catch (error) {
            console.error('Failed to remove refuel:', error);
        }
    },
    loadRefuels: async () => {
        try {
            const refuelsString = await AsyncStorage.getItem(REFUELS_KEY);
            const refuels = refuelsString ? JSON.parse(refuelsString) : [];
            set({ refuels });
        } catch (error) {
            console.error('Failed to load refuels:', error);
        }
    },
    loadVehicleRefuels: async (vehicleId) => {
        try {
            const refuelsString = await AsyncStorage.getItem(REFUELS_KEY);
            const allRefuels = refuelsString ? JSON.parse(refuelsString) : [];
            const vehicleRefuels = allRefuels.filter(r => r.vehicleId === vehicleId);
            set({ refuels: vehicleRefuels });
        } catch (error) {
            console.error('Failed to load vehicle refuels:', error);
        }
    },
}));


export const useRefuelFormStore = create<RefuelFormStore>((set, get) => ({
    fuelAdded: 0,
    cost: 0,
    date: new Date().toISOString(),
    odometerStart: undefined,
    odometerEnd: undefined,
    errors: {},

    setFuelAdded: (fuel) => set({ fuelAdded: parseFloat(fuel) || 0 }),
    setCost: (cost) => set({ cost: parseFloat(cost) || 0 }),
    setDate: (date) => set({ date }),
    setOdometerStart: (start) => {
        const { odometerEnd } = get();
        set({ odometerStart: parseInt(start) || undefined });
        if (odometerEnd !== undefined && start) {
            const newMileage = odometerEnd - parseInt(start);
            set({ mileage: newMileage });
        }
    },
    setOdometerEnd: (end) => {
        const { odometerStart } = get();
        set({ odometerEnd: parseInt(end) || undefined });
        if (odometerStart !== undefined && end) {
            const newMileage = parseInt(end) - odometerStart;
            set({ mileage: newMileage });
        }
    },
    setErrors: (errors) => set({ errors }),

    validateForm: () => {
        const errors: Record<string, string> = {};
        const { fuelAdded, cost, date, odometerStart, odometerEnd } = get();

        if (!fuelAdded || fuelAdded <= 0) errors.fuelAdded = "Fuel added is required and must be greater than 0";
        if (!cost || cost <= 0) errors.cost = "Cost is required and must be greater than 0";
        if (!date) errors.date = "Date is required";
        if (odometerStart === undefined) errors.odometerStart = "Odometer start is required";
        if (odometerEnd === undefined) errors.odometerEnd = "Odometer end is required";
        if (odometerStart !== undefined && odometerEnd !== undefined && odometerEnd < odometerStart) {
            errors.odometerEnd = "Odometer end must be greater than or equal to the start";
        }

        set({ errors });

        return Object.keys(errors).length === 0;
    },

    clearRefuelForm: () => set({
        fuelAdded: 0,
        cost: 0,
        date: new Date().toISOString(),
        odometerStart: undefined,
        odometerEnd: undefined,
        errors: {},
    }),
}));