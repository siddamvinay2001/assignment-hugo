import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PROFILE_ID_KEY = "nextProfileId";
const VEHICLE_ID_KEY = "nextVehicleId";
const REFUEL_ID_KEY = "nextRefuelId";

async function getNextId(key: string): Promise<number> {
    try {
        const idString = await AsyncStorage.getItem(key);
        let nextId = idString ? parseInt(idString, 10) : 1;
        await AsyncStorage.setItem(key, (nextId + 1).toString());
        return nextId;
    } catch (error) {
        console.error(`Failed to get or set next ID for ${key}`, error);
        return 1;
    }
}

export const useAutoIncrementStore = create<{
    getNextProfileId: () => Promise<number>;
    getNextVehicleId: () => Promise<number>;
    getNextRefuelId: () => Promise<number>;
}>((set) => ({
    getNextProfileId: () => getNextId(PROFILE_ID_KEY),
    getNextVehicleId: () => getNextId(VEHICLE_ID_KEY),
    getNextRefuelId: () => getNextId(REFUEL_ID_KEY),
}));
