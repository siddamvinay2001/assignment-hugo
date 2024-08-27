import { Profile } from "./Profile.types";

export interface CurrentStore {
    currentProfile: Profile | null;
    currentVehicleId: number | null;
    setCurrentProfile: (profile: Profile) => void;
    setCurrentVehicleId: (vehicleId: number) => void;
}