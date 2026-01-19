"use client";
import React from "react";
import { Coffee, ThumbsUp, ThumbsDown } from "lucide-react";

export default function MorningCoffeeSnapshot() {
    // Logic: Only show if screen is small (handled via CSS 'md:hidden')

    const snapshot = {
        sentiment: "positive", // or 'negative'
        sales: "£2,100",
        profit: "£450",
        issues: 0
    };

    return (
        <div className="md:hidden mb-6">
            <div className={`rounded-xl p-5 text-white shadow-lg ${snapshot.sentiment === 'positive' ? 'bg-gradient-to-r from-emerald-600 to-emerald-800' : 'bg-gradient-to-r from-red-600 to-red-800'}`}>
                <div className="flex items-center justify-between mb-2">
                    <h2 className="font-bold text-lg flex items-center opacity-90">
                        <Coffee className="h-5 w-5 mr-2" />
                        Morning Check
                    </h2>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded font-medium">Yesterday</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <p className="text-emerald-100 text-xs font-medium uppercase tracking-wide opacity-80">Sales</p>
                        <p className="text-2xl font-bold">{snapshot.sales}</p>
                    </div>
                    <div>
                        <p className="text-emerald-100 text-xs font-medium uppercase tracking-wide opacity-80">Net Profit</p>
                        <p className="text-2xl font-bold">{snapshot.profit}</p>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
                    <div className="flex items-center">
                        {snapshot.issues === 0 ? (
                            <ThumbsUp className="h-4 w-4 mr-2" />
                        ) : (
                            <ThumbsDown className="h-4 w-4 mr-2" />
                        )}
                        <span className="font-medium text-sm">
                            {snapshot.issues === 0 ? "Relax, everything is good." : `${snapshot.issues} Critical Issues detected.`}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
