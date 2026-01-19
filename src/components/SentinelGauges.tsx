"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { ShieldCheck, Package, DollarSign } from "lucide-react";

export default function SentinelGauges({ clientData }: { clientData: any }) {
    // Mock data simulation based on props if needed, or static for now
    const stats = [
        {
            label: "Account Health",
            value: "Good",
            sub: "0 Violations",
            icon: ShieldCheck,
            color: "text-emerald-500",
            metricColor: "text-emerald-500",
            barColor: "bg-emerald-500",
            percent: 100
        },
        {
            label: "Inventory Health",
            value: "32 Days",
            sub: "Days of Cover",
            icon: Package,
            color: "text-blue-500",
            metricColor: "text-zinc-900",
            barColor: "bg-blue-500",
            percent: 65
        },
        {
            label: "Buy Box Win Rate",
            value: "94.2%",
            sub: "Last 24 Hours",
            icon: DollarSign,
            color: "text-amber-500",
            metricColor: "text-zinc-900",
            barColor: "bg-amber-500",
            percent: 94
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, i) => (
                <Card key={i} className="relative overflow-hidden border-zinc-200">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-sm font-medium text-zinc-500">{stat.label}</h3>
                            </div>
                            <div className={`p-2 bg-zinc-50 rounded-lg ${stat.color}`}>
                                <stat.icon className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="mb-2">
                            <span className={`text-2xl font-bold ${stat.metricColor}`}>{stat.value}</span>
                            <p className="text-xs text-zinc-400 mt-1">{stat.sub}</p>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${stat.barColor}`} style={{ width: `${stat.percent}%` }}></div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
