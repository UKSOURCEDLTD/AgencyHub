"use client";
import React, { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Lock, Unlock } from "lucide-react";

export default function AdminLogger() {
    const { user } = useAuth();
    const [clients, setClients] = useState<{ id: string, name: string }[]>([]);
    const [selectedClient, setSelectedClient] = useState("");
    const [category, setCategory] = useState("PPC");
    const [message, setMessage] = useState("");
    const [isSecret, setIsSecret] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch clients
        const fetchClients = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "clients"));
                const clientList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
                // Add demo clients if empty (for preview)
                if (clientList.length === 0) {
                    setClients([
                        { id: 'demo-client-1', name: 'Alpha Industries' },
                        { id: 'demo-client-2', name: 'Beta Brands' },
                        { id: 'demo-client-3', name: 'Gamma Goods' }
                    ]);
                } else {
                    setClients(clientList);
                }
            } catch (e) {
                console.error("Error fetching clients", e);
                // Fallback for demo
                setClients([
                    { id: 'demo-client-1', name: 'Alpha Industries' },
                    { id: 'demo-client-2', name: 'Beta Brands' },
                    { id: 'demo-client-3', name: 'Gamma Goods' }
                ]);
            }
        };
        fetchClients();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedClient || !message) return;
        setLoading(true);

        try {
            if (user?.uid === 'demo-user') {
                // Simulate lag
                await new Promise(r => setTimeout(r, 800));
                alert("Demo Log Saved! (Not actively writing to DB in demo mode)");
            } else {
                await addDoc(collection(db, "work_logs"), {
                    clientId: selectedClient,
                    category,
                    message,
                    authorInternal: user?.displayName || user?.email || "Unknown Agent",
                    timestamp: serverTimestamp(),
                    isPublic: !isSecret
                });
            }
            setMessage("");
            // Don't reset client to allow rapid logging for same client
            setIsSecret(false);
        } catch (e) {
            console.error(e);
            alert("Error saving log");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full shadow-sm border-zinc-200">
            <CardHeader className="pb-3 border-b border-zinc-100 bg-zinc-50/50">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-zinc-900 flex items-center space-x-2">
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span>Rapid-Log Terminal</span>
                    </CardTitle>
                    <div className="text-xs text-zinc-400 font-mono">V.2.0.1</div>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Target Client</label>
                            <Select
                                value={selectedClient}
                                onChange={(e) => setSelectedClient(e.target.value)}
                                required
                                className="bg-white"
                            >
                                <option value="">-- Select Client --</option>
                                {clients.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Category</label>
                            <Select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="bg-white"
                            >
                                <option value="PPC">PPC Optimization</option>
                                <option value="SEO">SEO / Content</option>
                                <option value="Listing">Listing Maintenance</option>
                                <option value="Account Health">Account Health</option>
                                <option value="Logistics">Logistics / Stock</option>
                                <option value="Strategy">Strategy</option>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Update Message</label>
                            <button
                                type="button"
                                onClick={() => setIsSecret(!isSecret)}
                                className={`text-xs flex items-center space-x-1 px-2 py-1 rounded transition-colors ${isSecret ? 'bg-amber-100 text-amber-700' : 'bg-transparent text-zinc-400 hover:text-zinc-600'}`}
                            >
                                {isSecret ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                                <span>{isSecret ? 'Internal Only (Secret)' : 'Public to Client'}</span>
                            </button>
                        </div>
                        <Textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter activity details..."
                            required
                            rows={3}
                            className={`bg-white transition-all ${isSecret ? 'border-amber-200 ring-amber-100 focus:ring-amber-200' : ''}`}
                        />
                    </div>

                    <Button type="submit" isLoading={loading} className={`w-full ${isSecret ? 'bg-amber-500 hover:bg-amber-600 text-white' : ''}`}>
                        {isSecret ? 'Log Secret Entry' : 'Publish Update'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
