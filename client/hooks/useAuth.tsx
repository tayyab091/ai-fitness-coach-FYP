"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const API = process.env.NEXT_PUBLIC_API_URL || "";

export type AppRole = "admin" | "trainer" | "user";

export interface AuthUser {
    id: string;
    email: string;
    fullName: string;
    role: AppRole;
    avatarUrl?: string | null;
}

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    signUp: (email: string, password: string, fullName: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function apiFetch<T>(
    path: string,
    options?: RequestInit
): Promise<T> {
    const res = await fetch(`${API}${path}`, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        ...options,
    });
    if (!res.ok) {
        const body = await res.json().catch(() => ({ message: "Request failed" }));
        throw new Error(body.message || "Request failed");
    }
    return res.json();
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Restore session on mount
    useEffect(() => {
        apiFetch<{ user: AuthUser }>("/api/auth/me")
            .then(({ user }) => setUser(user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const signUp = async (email: string, password: string, fullName: string) => {
        try {
            const { user } = await apiFetch<{ user: AuthUser }>("/api/auth/register", {
                method: "POST",
                body: JSON.stringify({ email, password, fullName }),
            });
            setUser(user);
            toast.success("Account created!", {
                description: "Welcome to T.E.S.T.!",
            });
            router.push("/");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Sign up failed";
            toast.error("Sign up failed", { description: message });
            throw err;
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            const { user } = await apiFetch<{ user: AuthUser }>("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });
            setUser(user);
            router.push("/");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Sign in failed";
            toast.error("Sign in failed", { description: message });
            throw err;
        }
    };

    const signOut = async () => {
        await apiFetch("/api/auth/logout", { method: "POST" }).catch(() => { });
        setUser(null);
        toast.success("Signed out successfully");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        // Safe fallback for static export / out of context use
        return {
            user: null,
            loading: true,
            signUp: async () => { },
            signIn: async () => { },
            signOut: async () => { }
        };
    }
    return ctx;
}
