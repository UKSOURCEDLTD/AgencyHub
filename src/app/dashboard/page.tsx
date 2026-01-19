"use client";
import React, { useEffect, useState } from "react";
import ClientRoute from "@/components/ClientRoute";
import ActivityFeed from "@/components/ActivityFeed";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { Button } from "@/components/ui/Button";
import StrategyPin from "@/components/StrategyPin";
import SentinelGauges from "@/components/SentinelGauges";
import TheVault from "@/components/TheVault";

export default function DashboardPage() {
    const { user } = useAuth();
    const [clientData, setClientData] = useState<any>(null);

    useEffect(() => {
        if (user?.assignedClientId) {
            const fetchClient = async () => {
                try {
                    const docRef = doc(db, "clients", user.assignedClientId!);
                    const snap = await getDoc(docRef);
                    if (snap.exists()) {
                        setClientData(snap.data());
                    }
                } catch (e) {
                    console.error("Error fetching client data", e);
                }
            };
            fetchClient();
        }
    }, [user]);

    if (!user?.assignedClientId) {
        return (
            <ClientRoute>
                <div className="flex min-h-screen items-center justify-center p-8 text-center bg-zinc-50">
                    <div>
                        <p className="text-zinc-600 mb-4">No client account assigned. Please contact support.</p>
                        <Button onClick={() => auth.signOut()} variant="outline">Logout</Button>
                    </div>
                </div>
            </ClientRoute>
        );
    }

    return (
        <ClientRoute>
            <div className="min-h-screen bg-zinc-50">
                {/* Header */}
                <header className="bg-white border-b border-zinc-200 px-6 py-4 flex justify-between items-center sticky top-0 z-20 shadow-sm transition-all">
                    <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-zinc-100 rounded-full flex items-center justify-center overflow-hidden border border-zinc-200">
                            {clientData?.logoUrl ? (
                                <img src={clientData.logoUrl} alt="Logo" className="h-full w-full object-cover" />
                            ) : (
                                <span className="text-xs font-bold text-zinc-400">LH</span>
                            )}
                        </div>
                        <div>
                            <h1 className="font-bold text-zinc-900 leading-tight text-lg">{clientData?.name || "Client Dashboard"}</h1>
                            <div className="flex items-center space-x-2">
                                <div className={`h-2 w-2 rounded-full ${clientData?.accountHealth === 'red' ? 'bg-red-500' : clientData?.accountHealth === 'yellow' ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`}></div>
                                <span className="text-xs text-zinc-500 font-medium uppercase tracking-wide">
                                    {clientData?.accountHealth === 'red' ? 'Status: Critical' : clientData?.accountHealth === 'yellow' ? 'Status: Warning' : 'Status: Active'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button variant="ghost" size="sm" onClick={() => auth.signOut()} className="text-zinc-500">Log Out</Button>
                    </div>
                </header>

                {/* Content */}
                <main className="max-w-5xl mx-auto p-6 md:p-12">
                    <StrategyPin />
                    <SentinelGauges clientData={clientData} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="mb-6 flex items-baseline justify-between border-b border-zinc-200 pb-4">
                                <h2 className="text-xl font-bold text-zinc-900">Live Pulse</h2>
                                <span className="text-xs text-zinc-400">Timeline</span>
                            </div>
                            <ActivityFeed clientId={user.assignedClientId} />
                        </div>
                        <div className="lg:col-span-1">
                            <div className="bg-zinc-900 text-white p-6 rounded-xl shadow-lg mb-8">
                                <h3 className="font-bold mb-2">Need Help?</h3>
                                <p className="text-xs text-zinc-400 mb-4">Your account manager is online.</p>
                                <Button size="sm" variant="secondary" className="w-full">Book Strategy Call</Button>
                            </div>

                            <div className="bg-white border border-zinc-200 rounded-xl p-6">
                                <h3 className="font-bold text-zinc-900 text-sm mb-4">Quick Links</h3>
                                <ul className="space-y-2 text-sm text-zinc-600">
                                    <li className="hover:text-zinc-900 cursor-pointer flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>View Monthly Report</li>
                                    <li className="hover:text-zinc-900 cursor-pointer flex items-center"><span className="w-1.5 h-1.5 bg-zinc-300 rounded-full mr-2"></span>Book PPC Audit</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <TheVault />
                </main>
            </div>
        </ClientRoute>
    );
}
