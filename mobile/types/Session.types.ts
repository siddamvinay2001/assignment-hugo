import { Profile } from "./Profile.types";

export interface SessionContextType {
    authenticated: boolean;
    setAuthenticated: (auth: boolean) => Promise<void>;
}