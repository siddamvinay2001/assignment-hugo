import { create } from "zustand";
import { RefuelFormStore, RefuelStore } from "@/types/Refuel.types";
import { useAutoIncrementStore } from "./AutoIncrementStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
const REFUELS_KEY = "refuels";

export const useRefuelStore = create<RefuelStore>((set) => ({
    refuels: [],
    addRefuel: async (refuel) => {
        try {
            const { getNextRefuelId } = useAutoIncrementStore.getState();
            const nextRefuelId = await getNextRefuelId();
            const newRefuel = { ...refuel, id: nextRefuelId };
            const refuelsString = await AsyncStorage.getItem(REFUELS_KEY);
            const allRefuels = refuelsString ? JSON.parse(refuelsString) : [];
            const updatedRefuels = [...allRefuels, newRefuel];
            await AsyncStorage.setItem(REFUELS_KEY, JSON.stringify(updatedRefuels));
        } catch (error) {
            console.error('Failed to add refuel:', error);
        }
    },
    updateRefuel: async (updatedRefuel) => {
        try {
            const refuelsString = await AsyncStorage.getItem(REFUELS_KEY);
            const allRefuels = refuelsString ? JSON.parse(refuelsString) : [];
            const updatedRefuels = allRefuels.map(r =>
                r.id === updatedRefuel.id ? { ...r, ...updatedRefuel } : r
            );
            await AsyncStorage.setItem(REFUELS_KEY, JSON.stringify(updatedRefuels));
        } catch (error) {
            console.error('Failed to update refuel:', error);
        }
    },
    removeRefuel: async (refuelId) => {
        try {
            const refuelsString = await AsyncStorage.getItem(REFUELS_KEY);
            const allRefuels = refuelsString ? JSON.parse(refuelsString) : [];
            const updatedRefuels = allRefuels.filter(r => r.id !== refuelId);
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
}));


export const useRefuelFormStore = create<RefuelFormStore>((set, get) => ({
    fuelAdded: 0,
    cost: 0,
    date: new Date(),
    odometerStart: undefined,
    odometerEnd: undefined,
    errors: {},

    setFuelAdded: (fuel) => set({ fuelAdded: fuel }),
    setCost: (cost) => set({ cost }),
    setDate: (date) => set({ date }),
    setOdometerStart: (start) => set({ odometerStart: start }),
    setOdometerEnd: (end) => set({ odometerEnd: end }),
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
        date: new Date(),
        odometerStart: undefined,
        odometerEnd: undefined,
        errors: {},
    }),
}));