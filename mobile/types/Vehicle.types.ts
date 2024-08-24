export interface Vehicle {
    id: number;
    profileId: number;
    name: string;
    type: 2 | 3 | 4;
    engineCC: number;
}

export interface VehicleStore {
    vehicles: Vehicle[];
    addVehicle: (vehicle: Omit<Vehicle, 'id'>) => Promise<void>;
    removeVehicle: (vehicleId: number) => Promise<void>;
    loadVehicles: () => Promise<void>;
    loadCurrentVehicles: (profileId: number) => Promise<Vehicle[]>;
}