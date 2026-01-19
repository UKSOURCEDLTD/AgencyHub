"use client";
import React, { useState } from "react";
import AdminRoute from "@/components/AdminRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Bot, AlertTriangle, Zap, Activity, Settings2 } from "lucide-react";

const agents = [
    { id: 1, name: "PPC Optimizer", client: "Alpha Industries", status: "active", heartbeat: "2ms", config: "Target ACOS: 25%" },
    { id: 2, name: "Price Sentinel", client: "Alpha Industries", status: "active", heartbeat: "45ms", config: "Min Floor: $19.99" },
    { id: 3, name: "Stock Navigator", client: "Beta Brands", status: "warning", heartbeat: "120ms", config: "Reorder Point: 500 units" },
    { id: 4, name: "Review Watchdog", client: "Gamma Goods", status: "idle", heartbeat: "-", config: "Alert: < 3 Stars" },
];

const hitlQueue = [
    { id: 101, agent: "PPC Optimizer", issue: "Budget Exhausted Early", severity: "high", time: "10:42 AM" },
    { id: 102, agent: "Listing Guardian", issue: "Title Change Rejected", severity: "medium", time: "09:15 AM" },
];

export default function AgentsPage() {
    return (
        <div>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Agent Control Tower</h1>
                    <p className="text-zinc-500 mt-2">Manage deployment, configuration, and HITL interventions.</p>
                </div>
                <Button>
                    <Zap className="mr-2 h-4 w-4" />
                    Deploy New Agent
                </Button>
            </div>

            {/* HITL Queue */}
            <div className="mb-10">
                <h2 className="text-lg font-bold text-zinc-900 mb-4 flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
                    HITL Queue (Human-in-the-Loop)
                </h2>
                <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
                    {hitlQueue.map((item) => (
                        <div key={item.id} className="p-4 border-b border-zinc-100 last:border-0 flex items-center justify-between hover:bg-zinc-50">
                            <div className="flex items-center space-x-4">
                                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                                <div>
                                    <p className="text-sm font-bold text-zinc-900">{item.issue}</p>
                                    <p className="text-xs text-zinc-500">Flagged by <span className="font-mono text-zinc-700">{item.agent}</span> at {item.time}</p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <Button size="sm" variant="outline">Ignore</Button>
                                <Button size="sm" variant="primary">Resolve</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Deployment Grid */}
            <h2 className="text-lg font-bold text-zinc-900 mb-4 flex items-center">
                <Bot className="mr-2 h-5 w-5 text-zinc-500" />
                Active Deployments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((agent) => (
                    <Card key={agent.id} className="relative overflow-hidden group hover:border-zinc-300 transition-all">
                        <div className={`absolute top-0 left-0 w-1 h-full ${agent.status === 'active' ? 'bg-emerald-500' : agent.status === 'warning' ? 'bg-amber-500' : 'bg-zinc-300'}`}></div>
                        <CardHeader className="pb-2 pl-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-base font-bold text-zinc-900">{agent.name}</CardTitle>
                                    <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wide">{agent.client}</p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <Activity className={`h-4 w-4 ${agent.status === 'active' ? 'text-emerald-500' : 'text-zinc-300'}`} />
                                    <span className="text-[10px] font-mono text-zinc-400 mt-1">{agent.heartbeat}</span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pl-6 pt-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-xs font-mono bg-zinc-100 px-2 py-1 rounded text-zinc-600 border border-zinc-200">
                                    {agent.config}
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="h-1.5 flex-1 bg-zinc-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-zinc-900 w-2/3"></div>
                                </div>
                                <span className="text-[10px] text-zinc-400">Load</span>
                                <Button size="sm" variant="ghost" className="h-6 w-6 p-0"><Settings2 className="h-3 w-3" /></Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
