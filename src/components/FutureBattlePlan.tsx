"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Calendar, FlaskConical, ArrowRight } from "lucide-react";

export default function FutureBattlePlan() {
    const nextActions = [
        { date: "Jun 15", action: "Launch Father's Day PPC Campaign", type: "growth" },
        { date: "Jun 20", action: "A/B Test Main Image for Hero Product", type: "test" },
        { date: "Jun 25", action: "Prime Day Inventory Check-in", type: "ops" },
    ];

    const activeTests = [
        { name: "Price Elasticity Test", detail: "£19.99 -> £21.99 on ASIN XYZ", status: "Gathering Data", daysRunning: 4 }
    ];

    return (
        <Card className="h-full border-zinc-200 shadow-sm flex flex-col">
            <CardHeader className="pb-2 border-b border-zinc-50 bg-zinc-50/30">
                <CardTitle className="text-sm font-bold text-zinc-800 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
                    Future Battle Plan
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 flex flex-col">
                {/* Next 30 Days List */}
                <div className="p-5 border-b border-zinc-100 flex-1">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">Next 30 Days</h4>
                    <div className="space-y-4">
                        {nextActions.map((item, i) => (
                            <div key={i} className="flex gap-3">
                                <div className="flex-shrink-0 w-12 pt-1">
                                    <span className="text-xs font-bold text-zinc-500 block bg-zinc-100 rounded px-1.5 py-0.5 text-center">{item.date}</span>
                                </div>
                                <div className="relative pl-4 border-l-2 border-indigo-100">
                                    <div className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-white"></div>
                                    <p className="text-sm text-zinc-800 font-medium leading-snug">{item.action}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Active Experiments */}
                <div className="p-5 bg-gradient-to-br from-indigo-50/50 to-white flex-1">
                    <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3 flex items-center">
                        <FlaskConical className="h-3 w-3 mr-1" />
                        Active Experiments
                    </h4>
                    {activeTests.map((test, i) => (
                        <div key={i} className="bg-white border border-indigo-100 shadow-sm rounded-lg p-3">
                            <div className="flex justify-between items-start mb-1">
                                <p className="text-sm font-bold text-zinc-900">{test.name}</p>
                                <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-medium">{test.status}</span>
                            </div>
                            <p className="text-xs text-zinc-500 mb-2">{test.detail}</p>
                            <div className="w-full bg-zinc-100 h-1 rounded-full overflow-hidden">
                                <div className="bg-indigo-500 h-full rounded-full animate-pulse" style={{ width: '40%' }}></div>
                            </div>
                            <p className="text-[10px] text-zinc-400 mt-1 text-right">Running for {test.daysRunning} days</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
