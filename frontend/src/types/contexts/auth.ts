export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
}

export interface AuthContextData {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    signIn: (credentials: { user: User; token: string }) => void;
    signOut: () => void;
}