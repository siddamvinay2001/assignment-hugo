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
    loadProfiles: () => Promise<void>;
    setCurrentProfile: (profile: Profile) => void;
    clearCurrentProfile: () => void;
}

export interface UserType {
    name: string;
    nickname: string;
    email: string;
    password: string;
    confirmPassword: string;
    isChecked: boolean;
    setName: (name: string) => void;
    setNickname: (nickname: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setConfirmPassword: (confirmPassword: string) => void;
    setChecked: (isChecked: boolean) => void;
    clearForm: () => void;
}