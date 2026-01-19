"use client";
import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ExternalLink, Zap, PenTool } from "lucide-react";

interface ClientCardProps {
    id: string;
    name: string;
    logoUrl?: string;
    health: 'green' | 'yellow' | 'red';
    marketplace: string;
    activeAgents: number;
}

export default function ClientCard({ client }: { client: ClientCardProps }) {
    return (
        <Card className="hover:shadow-md transition-shadow border-zinc-200">
            <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 bg-zinc-100 rounded-xl flex items-center justify-center border border-zinc-200 overflow-hidden">
                            {client.logoUrl ? (
                                <img src={client.logoUrl} alt={client.name} className="h-full w-full object-cover" />
                            ) : (
                                <span className="font-bold text-zinc-400 text-lg">{client.name.substring(0, 2)}</span>
                            )}
                        </div>
                        <div>
                            <h3 className="font-bold text-zinc-900 leading-tight">{client.name}</h3>
                            <div className="flex items-center mt-1">
                                <div className={`h-2 w-2 rounded-full mr-2 ${client.health === 'green' ? 'bg-emerald-500' : client.health === 'yellow' ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                                <span className="text-xs text-zinc-500 capitalize">{client.health} Health</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                        <span className="text-[10px] font-bold bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded border border-zinc-200 tracking-wide uppercase">{client.marketplace}</span>
                        <span className="text-[10px] font-medium text-amber-600 flex items-center bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                            <Zap className="h-3 w-3 mr-1 fill-amber-500" />
                            {client.activeAgents} Active
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                    <Link href={`/admin/clients/${client.id}`} className="w-full">
                        <Button variant="primary" className="w-full h-8 text-xs">Manage</Button>
                    </Link>
                    <Button variant="outline" className="w-full h-8 text-xs">
                        <PenTool className="h-3 w-3 mr-1" /> Log Work
                    </Button>
                </div>
                <div className="mt-2 text-center">
                    <a href="/dashboard" target="_blank" className="text-[10px] text-zinc-400 hover:text-zinc-600 flex items-center justify-center transition-colors">
                        <ExternalLink className="h-3 w-3 mr-1" /> View as Client
                    </a>
                </div>
            </CardContent>
        </Card>
    );
}
