export type VehicleType = 2 | 3 | 4;

export interface Vehicle {
    id: number;
    profileId: number;
    name: string;
    type: VehicleType;
    engineCC: number;
}

export interface VehicleStore {
    vehicles: Vehicle[];
    addVehicle: (vehicle: Omit<Vehicle, 'id'>) => Promise<void>;
    removeVehicle: (vehicleId: number) => Promise<void>;
    loadVehicles: () => Promise<void>;
    loadCurrentVehicles: (profileId: number) => Promise<Vehicle[]>;
}

export interface VehicleFormStore {
    name: string;
    type: VehicleType;
    engineCC: number;
    errors: Record<string, string>;
    setErrors: (errors: { [key: string]: string }) => void;
    setName: (name: string) => void;
    setType: (type: VehicleType) => void;
    setEngineCC: (engineCC: number) => void;
    validateForm: () => boolean;
    clearVehicleForm: () => void;
}
