"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from "lucide-react";

const mockClients = [
    { id: '1', name: 'Alpha Industries', health: 'green', metric: 'Buy Box: 92%' },
    { id: '2', name: 'Beta Brands', health: 'yellow', metric: 'Stock Risk: 1 SKU' },
    { id: '3', name: 'Gamma Goods', health: 'red', metric: 'Listing Suppressed' },
    { id: '4', name: 'Delta Direct', health: 'green', metric: 'Sales Up 15%' },
];

export default function ClientHealthGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {mockClients.map((client) => (
                <Card key={client.id} className="border-l-4 border-l-transparent data-[health=green]:border-l-emerald-500 data-[health=yellow]:border-l-yellow-500 data-[health=red]:border-l-red-500">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-sm text-zinc-900">{client.name}</h3>
                            <p className="text-xs text-zinc-500 mt-1">{client.metric}</p>
                        </div>
                        <div>
                            {client.health === 'green' && <div className="h-3 w-3 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>}
                            {client.health === 'yellow' && <div className="h-3 w-3 bg-yellow-500 rounded-full shadow-[0_0_8px_rgba(234,179,8,0.5)] animate-pulse"></div>}
                            {client.health === 'red' && <div className="h-3 w-3 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse"></div>}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
