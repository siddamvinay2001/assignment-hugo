export interface Profile {
    id: number;
    name: string;
    nickname?: string;
    email: string;
    password?: string;
    isProtected: boolean;
}

export interface ProfileStore {
    profiles: Profile[];
    currentProfile: Profile | null;
    addProfile: (profile: Omit<Profile, 'id'>) => Promise<void>;
    loadProfiles: () => Promise<void>;
    setCurrentProfile: (profile: Profile) => void;
    clearCurrentProfile: () => void;
    deleteProfile: (profileId: Number) => Promise<void>;
}

