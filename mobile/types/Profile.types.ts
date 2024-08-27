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
    addProfile: (profile: Omit<Profile, 'id'>) => Promise<number>;
    loadProfiles: () => Promise<void>;
    deleteProfile: (profileId: Number) => Promise<void>;
}

