"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import PrivateNotepad from "@/components/PrivateNotepad";
import MasterWorkFeed from "@/components/MasterWorkFeed";
import AgentManager from "@/components/AgentManager";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function MissionControlPage() {
    const params = useParams();
    const clientId = params.id as string;
    const [clientName, setClientName] = useState("Loading...");

    useEffect(() => {
        if (clientId) {
            // Fetch client name for header
            const fetchClient = async () => {
                // For demo, if ID starts with demo, just format it
                if (clientId.startsWith('client-') || clientId.startsWith('demo-')) {
                    const mocknames: any = { 'client-alpha': 'Alpha Industries', 'client-beta': 'Beta Brands', 'client-gamma': 'Gamma Goods' };
                    setClientName(mocknames[clientId] || clientId);
                    return;
                }
                try {
                    const snap = await getDoc(doc(db, "clients", clientId));
                    if (snap.exists()) setClientName(snap.data().name);
                } catch (e) { console.error(e); }
            };
            fetchClient();
        }
    }, [clientId]);

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/clients">
                        <Button variant="ghost" size="sm" className="pl-0 hover:bg-transparent hover:text-zinc-900 text-zinc-400">
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">{clientName} <span className="text-zinc-400 font-normal text-lg">// Mission Control</span></h1>
                </div>
                <a href="/dashboard" target="_blank">
                    <Button variant="outline" size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Open Public View
                    </Button>
                </a>
            </div>

            {/* 3-Column Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 flex-1 min-h-0">
                {/* Left: Strategy (25%) */}
                <div className="xl:col-span-1 flex flex-col gap-6 overflow-y-auto pr-1">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
                            <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold mb-1">30d Revenue</p>
                            <p className="text-2xl font-bold text-zinc-900">$142k</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
                            <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold mb-1">Inv Health</p>
                            <p className="text-2xl font-bold text-emerald-600">Great</p>
                        </div>
                    </div>
                    <div className="flex-1 min-h-[400px]">
                        <PrivateNotepad clientId={clientId} />
                    </div>
                </div>

                {/* Center: Feed (50%) */}
                <div className="xl:col-span-2 bg-zinc-50 rounded-xl border border-zinc-200 flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-zinc-200 bg-white">
                        <h3 className="font-bold text-zinc-900">Master Work Feed</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6">
                        <MasterWorkFeed clientId={clientId} />
                    </div>
                </div>

                {/* Right: Agents (25%) */}
                <div className="xl:col-span-1 overflow-y-auto">
                    <AgentManager clientId={clientId} />
                </div>
            </div>
        </div>
    );
}
