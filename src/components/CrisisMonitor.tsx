"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { AlertCircle, PackageX, CheckCircle } from "lucide-react";

export default function CrisisMonitor() {
    // Mock Data
    const crisis = {
        suppressedAsins: 0,
        stockoutRisk: 2, // SKUs with < 15 days cover
        urgentStockouts: [
            { sku: "LUK-BOTTLE-01", daysLeft: 4 },
            { sku: "LUK-CAP-BLK", daysLeft: 12 }
        ]
    };

    return (
        <Card className="mb-6 border-zinc-200 overflow-hidden">
            <div className="bg-zinc-50 px-6 py-3 border-b border-zinc-100 flex justify-between items-center">
                <h3 className="font-bold text-sm text-zinc-700 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-zinc-400" />
                    Crisis Monitor
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Real-time Check</span>
            </div>
            <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-100">

                {/* Suppressed Listings Box */}
                <div className="p-6 flex items-center justify-between group hover:bg-zinc-50/50 transition-colors">
                    <div>
                        <p className="text-sm text-zinc-500 font-medium mb-1">Suppressed Listings</p>
                        {crisis.suppressedAsins === 0 ? (
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl font-bold text-zinc-900">0</span>
                                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center border border-emerald-100">
                                    <CheckCircle className="h-3 w-3 mr-1" /> All Active
                                </span>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl font-bold text-red-600 animate-pulse">{crisis.suppressedAsins}</span>
                                <span className="text-xs text-red-600 font-bold">Action Needed</span>
                            </div>
                        )}
                    </div>
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${crisis.suppressedAsins > 0 ? 'bg-red-100 text-red-600' : 'bg-zinc-100 text-zinc-400'}`}>
                        <AlertCircle className="h-5 w-5" />
                    </div>
                </div>

                {/* Stockout Risk Box */}
                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm text-zinc-500 font-medium mb-1">Stockout Risk (&lt;15 Days)</p>
                            <span className="text-2xl font-bold text-zinc-900">{crisis.stockoutRisk} <span className="text-sm font-normal text-zinc-400">SKUs</span></span>
                        </div>
                        <div className="h-10 w-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
                            <PackageX className="h-5 w-5" />
                        </div>
                    </div>
                    {crisis.urgentStockouts.length > 0 && (
                        <div className="space-y-2">
                            {crisis.urgentStockouts.map((item, i) => (
                                <div key={i} className="flex items-center justify-between text-xs bg-amber-50/50 p-2 rounded border border-amber-100">
                                    <span className="font-medium text-zinc-700">{item.sku}</span>
                                    <span className="font-bold text-amber-700">{item.daysLeft} days left</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </CardContent>
        </Card>
    );
}
