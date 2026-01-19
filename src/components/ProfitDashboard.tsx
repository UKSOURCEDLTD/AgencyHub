"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { DollarSign, Clock, Users, Database } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data Structure
const initialClients = [
    { id: '1', name: 'Alpha Industries', retainer: 5000, hoursUsed: 12, hourlyCost: 50, softwareCost: 200 },
    { id: '2', name: 'Beta Brands', retainer: 2500, hoursUsed: 45, hourlyCost: 50, softwareCost: 150 }, // Over servicing
    { id: '3', name: 'Gamma Goods', retainer: 10000, hoursUsed: 20, hourlyCost: 65, softwareCost: 500 },
];

export default function ProfitDashboard() {
    const [clients] = useState(initialClients);

    const calculateNet = (c: any) => {
        const laborCost = c.hoursUsed * c.hourlyCost;
        const totalCost = laborCost + c.softwareCost;
        return c.retainer - totalCost;
    };

    const getMargin = (c: any) => {
        const net = calculateNet(c);
        return ((net / c.retainer) * 100).toFixed(1);
    };

    return (
        <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {clients.map(client => {
                    const net = calculateNet(client);
                    const margin = parseFloat(getMargin(client));
                    const isProfitable = margin > 30; // Target margin
                    const isLoss = margin < 0;

                    return (
                        <Card key={client.id} className={cn("border-l-4", isLoss ? "border-l-red-500" : (isProfitable ? "border-l-emerald-500" : "border-l-yellow-400"))}>
                            <CardHeader className="pb-2">
                                <CardTitle className="flex justify-between items-center text-sm font-bold text-zinc-900">
                                    {client.name}
                                    <span className={cn("px-2 py-0.5 rounded text-[10px]", isLoss ? "bg-red-100 text-red-700" : "bg-zinc-100 text-zinc-600")}>
                                        {isLoss ? 'CRITICAL LOSS' : 'Healthy'}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-baseline mb-4">
                                    <h3 className={cn("text-2xl font-black", isLoss ? "text-red-600" : "text-zinc-900")}>
                                        ${net.toLocaleString()}
                                    </h3>
                                    <span className={cn("text-xs font-bold", isLoss ? "text-red-500" : "text-zinc-400")}>
                                        {margin}% Margin
                                    </span>
                                </div>

                                <div className="space-y-2 text-xs text-zinc-500 border-t border-zinc-100 pt-3">
                                    <div className="flex justify-between">
                                        <span className="flex items-center"><DollarSign className="w-3 h-3 mr-1" /> Retainer</span>
                                        <span className="font-bold text-zinc-700">${client.retainer}</span>
                                    </div>
                                    <div className="flex justify-between text-red-400">
                                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> Labor ({client.hoursUsed}h)</span>
                                        <span>-${client.hoursUsed * client.hourlyCost}</span>
                                    </div>
                                    <div className="flex justify-between text-red-400">
                                        <span className="flex items-center"><Database className="w-3 h-3 mr-1" /> Software</span>
                                        <span>-${client.softwareCost}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Insight Section */}
            <div className="bg-zinc-900 rounded-xl p-6 text-zinc-400 text-sm">
                <h4 className="text-white font-bold mb-2 flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    Resource Allocation Insight
                </h4>
                <p>
                    <span className="text-white font-bold">Beta Brands</span> is consuming 45 hours (2.5x avg) but generating low margin.
                    Suggest moving to <span className="text-emerald-400">Hourly Overage Billing</span> or firing client.
                </p>
            </div>
        </div>
    );
}
