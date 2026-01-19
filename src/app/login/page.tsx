"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { doc, getDoc } from "firebase/firestore";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const cred = await signInWithEmailAndPassword(auth, email, password);
            // Check role
            const userDoc = await getDoc(doc(db, "users", cred.user.uid));
            if (userDoc.exists()) {
                const data = userDoc.data();
                if (data.role === 'admin') router.push("/admin");
                else router.push("/dashboard");
            } else {
                // Default fall back
                router.push("/dashboard");
            }
        } catch (error: any) {
            console.error(error);
            alert("Login failed: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
            <Card className="w-full max-w-md shadow-lg border-zinc-200">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 bg-zinc-900 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">IH</span>
                        </div>
                    </div>
                    <CardTitle className="text-2xl text-center font-bold tracking-tight">Welcome Back</CardTitle>
                    <p className="text-center text-sm text-zinc-500">Sign in to your account</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full" isLoading={loading}>
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-zinc-100">
                        <p className="text-xs text-center text-zinc-400 mb-3 uppercase tracking-wider font-semibold">Demo Access</p>
                        <div className="grid grid-cols-2 gap-3">
                            <DemoLoginButton role="admin" label="Admin View" />
                            <DemoLoginButton role="client" label="Client View" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function DemoLoginButton({ role, label }: { role: 'admin' | 'client', label: string }) {
    const { demoLogin } = useAuth() as any;
    const router = useRouter();

    const handleDemo = () => {
        demoLogin(role);
        if (role === 'admin') router.push('/admin');
        else router.push('/dashboard');
    };

    return (
        <Button
            variant="outline"
            onClick={handleDemo}
            type="button"
            className="w-full"
        >
            {label}
        </Button>
    );
}
