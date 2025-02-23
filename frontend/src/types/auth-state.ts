import { User } from "./user";


export interface AuthState {
    user: User | undefined | null;
    loading: boolean;
    setUser: (user: User | null) => void;
    hydrateAuth: () => void;
    login: (email: string, password: string) => Promise<void>;
    registerUser: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}