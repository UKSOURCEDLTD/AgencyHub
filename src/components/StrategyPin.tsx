"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Target, Flag } from "lucide-react";

export default function StrategyPin() {
    return (
        <Card className="mb-8 border-indigo-100 bg-indigo-50/30">
            <CardContent className="p-6 md:flex items-center justify-between">
                <div className="flex items-start space-x-4 mb-4 md:mb-0">
                    <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                        <Target className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-wide mb-1">Strategic Focus: Q1 Launch</h3>
                        <p className="text-zinc-700 max-w-xl text-sm leading-relaxed">
                            For the next 30 days, we are aggressively targeting the "Sustainable Kitchen" category keywords to improve organic rank before Prime Day.
                        </p>
                    </div>
                </div>
                <div className="flex items-center text-xs font-semibold bg-white px-3 py-1.5 rounded-full border border-indigo-100 text-indigo-600 shadow-sm">
                    <Flag className="h-3 w-3 mr-2" />
                    <span>On Track</span>
                </div>
            </CardContent>
        </Card>
    );
}
