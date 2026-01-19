"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ClientRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/login");
            } else if (user.role === 'admin') {
                // Admins might want to see client view, but prompt says strict split:
                // "Redirect 'admin' role users to the Admin Logger."
                // I'll stick to strict for now.
                router.push("/admin");
            }
        }
    }, [user, loading, router]);

    if (loading || !user || user.role === 'admin') {
        return <div className="p-8 text-zinc-500">Verifying access...</div>;
    }

    return <>{children}</>;
}
