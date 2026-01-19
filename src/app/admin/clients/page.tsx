"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ClientCard from "@/components/ClientCard";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

export default function ClientDirectoryPage() {
    const [clients, setClients] = useState<any[]>([]);

    useEffect(() => {
        // Mocking fetch or using real if customized. 
        // For demo flow, lets use mixed real/mock data to ensure card UI looks good
        setClients([
            { id: 'client-alpha', name: 'Alpha Industries', health: 'green', marketplace: 'US / UK', activeAgents: 3 },
            { id: 'client-beta', name: 'Beta Brands', health: 'yellow', marketplace: 'US', activeAgents: 1 },
            { id: 'client-gamma', name: 'Gamma Goods', health: 'red', marketplace: 'EU', activeAgents: 0 },
            { id: 'client-delta', name: 'Delta Direct', health: 'green', marketplace: 'US', activeAgents: 4 },
        ]);
    }, []);

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Client Directory</h1>
                    <p className="text-zinc-500 mt-2">Manage your agency portfolio.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Client
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {clients.map(client => (
                    <ClientCard key={client.id} client={client} />
                ))}
            </div>
        </div>
    );
}
