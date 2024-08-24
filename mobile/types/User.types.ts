export interface UserStore {
    name: string;
    nickname: string;
    email: string;
    password: string;
    confirmPassword: string;
    checked: boolean;
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