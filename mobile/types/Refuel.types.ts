import { Vehicle } from "./Vehicle.types";

export interface Refuel {
    id: number;
    vehicleId: number;
    fuelAdded: number;
    cost: number;
    date: string;
    odometerStart?: number;
    odometerEnd?: number;
}

export interface RefuelStore {
    refuels: Refuel[];
    addRefuel: (refuel: Omit<Refuel, 'id'>) => Promise<void>;
    updateRefuel: (refuelId: number) => Promise<void>;
    removeRefuel: (refuelId: number) => Promise<void>;
    loadRefuels: () => Promise<void>;
}

export interface RefuelFormStore {
    fuelAdded: number;
    cost: number;
    date: string;
    odometerStart?: number;
    odometerEnd?: number;
    errors: Record<string, string>;
    setFuelAdded: (fuel: string) => void;
    setCost: (cost: string) => void;
    setDate: (date: string) => void;
    setOdometerStart: (start: string) => void;
    setOdometerEnd: (end: string) => void;
    setErrors: (errors: Record<string, string>) => void;
    validateForm: () => boolean;
    clearRefuelForm: () => void;
}