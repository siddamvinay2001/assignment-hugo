export interface Profile {
    name: string;
    nickname: string;
    email: string;
    password?: string;
}

export interface ProfileList {
    profiles: Profile[];
    currentProfile: Profile | null;
    addProfile: (profile: Profile) => Promise<void>;
    loadProfiles: ()=> Promise<void>;
    setCurrentProfile: (profile: Profile)=> void;
    clearCurrentProfile: () => void;
}
