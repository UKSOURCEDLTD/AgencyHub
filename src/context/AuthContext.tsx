"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface AuthUser extends User {
    role?: 'admin' | 'client';
    assignedClientId?: string;
}

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    demoLogin: (role: 'admin' | 'client') => void;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, demoLogin: () => { } });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    // Demo Login Function
    const demoLogin = (role: 'admin' | 'client') => {
        setUser({
            uid: 'demo-user',
            email: role === 'admin' ? 'admin@agency.com' : 'client@brand.com',
            role: role,
            assignedClientId: role === 'client' ? 'demo-client-1' : undefined,
            emailVerified: true,
            isAnonymous: false,
            metadata: {},
            providerData: [],
            refreshToken: '',
            tenantId: null,
            delete: async () => { },
            getIdToken: async () => '',
            getIdTokenResult: async () => ({} as any),
            reload: async () => { },
            toJSON: () => ({}),
            displayName: role === 'admin' ? 'Demo Admin' : 'Demo Client',
            phoneNumber: null,
            photoURL: null,
            providerId: 'demo',
        } as AuthUser);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            // If we already have a demo user logged in manually, don't overwrite with null from firebase
            // (Unless we genuinely want firebase to take precedence. For this demo, let's allow manual override)
            if (firebaseUser) {
                try {
                    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUser({ ...firebaseUser, role: userData.role, assignedClientId: userData.assignedClientId } as AuthUser);
                    } else {
                        setUser(firebaseUser as AuthUser);
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                    setUser(firebaseUser as AuthUser);
                }
            } else {
                // Only set to null if we don't have a demo user set (rudimentary check, or we just rely on the user not falling into this block instantly if onAuthStateChanged fires initially)
                // Actually, onAuthStateChanged fires typically once on load. use demoLogin AFTER load.
                if (!user) setLoading(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, demoLogin: demoLogin as any }}>
            {loading ? (
                <div className="h-screen w-full flex items-center justify-center bg-zinc-950 text-white">
                    <div className="animate-pulse">Loading Agency Hub...</div>
                </div>
            ) : children}
        </AuthContext.Provider>
    );
};
