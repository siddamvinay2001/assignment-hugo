export interface UserStore {
    name: string;
    nickname: string;
    email: string;
    checked: boolean;
    isProtected: boolean;
    errors: {
        name?: string;
        nickname?: string;
        email?: string;
    };
    setName: (name: string) => void;
    setNickname: (nickname: string) => void;
    setEmail: (email: string) => void;
    setChecked: (checked: boolean) => void;
    setErrors: (errors: { [key: string]: string }) => void;
    setProtected: (isProtected: boolean) => void;
    clearUserForm: () => void;
}
