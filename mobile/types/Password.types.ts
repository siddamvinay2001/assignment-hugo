export interface PasswordStore {
    password: string;
    confirmPassword: string;
    passwordArray: string[];
    confirmPasswordArray: string[];
    errors: {
        password?: string;
        confirmPassword?: string;
    };
    setPassword: (password: string) => void;
    setConfirmPassword: (confirmPassword: string) => void;
    setPasswordArray: (index: number, value: string) => void;
    setConfirmPasswordArray: (index: number, value: string) => void;
    setErrors: (errors: { [key: string]: string }) => void;
    clearPasswordForm: () => void;
}
