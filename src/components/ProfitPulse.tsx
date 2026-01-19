"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { DollarSign, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

export default function ProfitPulse() {
    // Mock Data - In production this would come from an API
    const metrics = {
        netProfit: { value: "£452.00", status: "good", sub: "Yesterday's Net Profit", percent: "+12%" },
        tacos: { value: "14.2%", status: "good", sub: "Month-to-Date TACOS", warningThreshold: 15 },
        bleedingSpend: { value: "£42.50", status: "warning", sub: "Wasted Ad Spend (Yes.)", help: "Spend with 0 Sales" }
    };

    return (
        <Card className="mb-6 border-zinc-200 shadow-sm">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        <h3 className="font-bold text-lg text-zinc-900">Profit Pulse</h3>
                    </div>
                    <span className="text-xs font-mono text-zinc-400 bg-zinc-100 px-2 py-1 rounded">LIVE</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-zinc-100">
                    {/* Net Profit */}
                    <div className="px-4 first:pl-0">
                        <p className="text-sm text-zinc-500 font-medium mb-1">Est. Net Profit (Yesterday)</p>
                        <div className="flex items-baseline space-x-2">
                            <span className="text-3xl font-bold text-zinc-900 tracking-tight">{metrics.netProfit.value}</span>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full flex items-center">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                {metrics.netProfit.percent}
                            </span>
                        </div>
                    </div>

                    {/* TACOS */}
                    <div className="px-4">
                        <p className="text-sm text-zinc-500 font-medium mb-1">TACOS (MTD)</p>
                        <div className="flex items-baseline space-x-2">
                            <span className={`text-3xl font-bold tracking-tight ${parseFloat(metrics.tacos.value) > metrics.tacos.warningThreshold ? 'text-amber-600' : 'text-zinc-900'}`}>
                                {metrics.tacos.value}
                            </span>
                            <span className="text-xs text-zinc-400">Target: &lt;15%</span>
                        </div>
                    </div>

                    {/* Bleeding Spend */}
                    <div className="px-4 pt-4 md:pt-0">
                        <div className="flex items-center space-x-2 mb-1">
                            <p className="text-sm text-zinc-500 font-medium">Bleeding Ad Spend</p>
                            <AlertTriangle className="h-3 w-3 text-amber-500" />
                        </div>
                        <div className="flex items-baseline space-x-2">
                            <span className="text-3xl font-bold text-red-600 tracking-tight">{metrics.bleedingSpend.value}</span>
                            <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-md font-medium">Action Required</span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-2">Spend on keywords with 0 sales yesterday.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
