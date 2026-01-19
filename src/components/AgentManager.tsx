"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Bot, Power, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for demo, replacing with Firestore real-time later
const initialAgents = [
    { id: 'agent-1', name: 'Review Sentinel', isActive: true, lastRun: '10m ago' },
    { id: 'agent-2', name: 'PPC Monitor', isActive: true, lastRun: '2m ago' },
    { id: 'agent-3', name: 'Stock predictor', isActive: false, lastRun: '2d ago' },
    { id: 'agent-4', name: 'Competitor Spy', isActive: true, lastRun: '1h ago' },
];

export default function AgentManager({ clientId }: { clientId: string }) {
    const [agents, setAgents] = useState(initialAgents);

    const toggleAgent = (id: string) => {
        setAgents(agents.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a));
    };

    return (
        <Card className="h-full border-zinc-200">
            <CardHeader className="pb-3 border-b border-zinc-100 bg-zinc-50/50">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-zinc-900 flex items-center">
                    <Bot className="h-4 w-4 mr-2 text-zinc-500" />
                    Agent Command Deck
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y divide-zinc-100">
                    {agents.map(agent => (
                        <div key={agent.id} className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors">
                            <div>
                                <div className="flex items-center space-x-2">
                                    <h4 className={cn("text-sm font-medium", agent.isActive ? "text-zinc-900" : "text-zinc-400 line-through")}>{agent.name}</h4>
                                    {agent.isActive && <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>}
                                </div>
                                <p className="text-[10px] text-zinc-400 mt-0.5 flex items-center">
                                    <RefreshCw className="h-3 w-3 mr-1" /> {agent.lastRun}
                                </p>
                            </div>
                            <button
                                onClick={() => toggleAgent(agent.id)}
                                className={cn(
                                    "h-8 w-12 rounded-full p-1 transition-colors relative",
                                    agent.isActive ? "bg-zinc-900" : "bg-zinc-200"
                                )}
                            >
                                <div className={cn(
                                    "h-6 w-6 rounded-full bg-white shadow-sm transition-transform flex items-center justify-center",
                                    agent.isActive ? "translate-x-4" : "translate-x-0"
                                )}>
                                    <Power className={cn("h-3 w-3", agent.isActive ? "text-emerald-600" : "text-zinc-300")} />
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
