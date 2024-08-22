export interface Profile {
    name: string;
    nickname?: string;
    email: string;
    password?: string;
    isProtected: boolean;
}

export interface ProfileList {
    profiles: Profile[];
    currentProfile: Profile | null;
    addProfile: (profile: Profile) => void;
    loadProfiles: () => Promise<void>;
    setCurrentProfile: (profile: Profile) => void;
    clearCurrentProfile: () => void;
}

export type UserStep = "create-user" | "set-password" | "empty-form"

export interface UserType {
    name: string;
    nickname: string;
    email: string;
    password: string;
    confirmPassword: string;
    checked: boolean;
    step: UserStep;
    errors: any;
    isProtected: boolean;
    setProtected: (isProtected: boolean) => void;
    setStep: (step: UserStep) => void;
    setName: (name: string) => void;
    setNickname: (nickname: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setConfirmPassword: (confirmPassword: string) => void;
    setChecked: (isChecked: boolean) => void;
    clearForm: () => void;
    clearPasswordForm: () => void;
    setErros: any;
}