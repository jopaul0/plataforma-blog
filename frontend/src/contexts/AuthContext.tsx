'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/services/api';
import { AuthContextData, User } from '@/types/contexts/auth';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('@PortalLux:token');
        const userData = localStorage.getItem('@PortalLux:user');

        if (token && userData) {
            setUser(JSON.parse(userData));
            api.defaults.headers.authorization = `Bearer ${token}`;
        }

        setLoading(false);
    }, []);

    function signIn({ user, token }: { user: User; token: string }) {
        localStorage.setItem('@PortalLux:token', token);
        localStorage.setItem('@PortalLux:user', JSON.stringify(user));

        api.defaults.headers.authorization = `Bearer ${token}`;
        setUser(user);
    }

    function signOut() {
        localStorage.removeItem('@PortalLux:token');
        localStorage.removeItem('@PortalLux:user');
        setUser(null);
        delete api.defaults.headers.authorization;
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);