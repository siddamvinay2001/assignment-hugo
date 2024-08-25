export interface Refuel {
    id: number;
    vehicleId: number;
    fuelAdded: number;
    cost: number;
    date: string;
    odometerStart?: number;  // Optional: could be undefined
    odometerEnd?: number;    // Optional: could be undefined
}

export interface RefuelStore {
    refuels: Refuel[];
    addRefuel: (refuel: Omit<Refuel, 'id'>) => Promise<void>;
    removeRefuel: (refuelId: number) => Promise<void>;
    loadRefuels: () => Promise<void>;
    loadVehicleRefuels: (vehicleId: number) => Promise<void>;
}

interface RefuelFormStore {
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