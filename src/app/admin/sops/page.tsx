"use client";
import React from "react";
import { Button } from "@/components/ui/Button";
import { FileText, CheckSquare, Zap } from "lucide-react";

const sops = [
    { id: 1, title: "New Client Onboarding", steps: 12, automated: 4 },
    { id: 2, title: "Listing Suppression Appeal", steps: 8, automated: 6 },
    { id: 3, title: "PPC Weekly Optimization", steps: 5, automated: 5 }, // Fully automated
];

export default function SOPPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">SOP Library</h1>
                <p className="text-zinc-500 mt-2">Standard Operating Procedures & Automation Mapping.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quick Start Templates */}
                <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-xl p-8 text-white flex items-center justify-between shadow-lg">
                    <div>
                        <h2 className="text-xl font-bold mb-2">Launch Onboarding</h2>
                        <p className="text-zinc-400 text-sm max-w-md">Instantly generate the 12-step checklist for a new client. 4 steps will be auto-executed by agents.</p>
                    </div>
                    <Button className="bg-white text-zinc-900 hover:bg-zinc-100">
                        <Zap className="mr-2 h-4 w-4 text-amber-500" />
                        Start Sequence
                    </Button>
                </div>

                {sops.map((sop) => (
                    <div key={sop.id} className="bg-white border border-zinc-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="bg-zinc-100 p-3 rounded-lg group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                                <FileText className="h-6 w-6" />
                            </div>
                            {sop.automated === sop.steps && (
                                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">Fully Automated</span>
                            )}
                        </div>
                        <h3 className="font-bold text-lg text-zinc-900 mb-2">{sop.title}</h3>

                        <div className="space-y-3">
                            <div className="flex items-center text-sm text-zinc-600">
                                <CheckSquare className="h-4 w-4 mr-2 text-zinc-400" />
                                <span>{sop.steps} Total Steps</span>
                            </div>
                            <div className="flex items-center text-sm text-zinc-600">
                                <Zap className="h-4 w-4 mr-2 text-amber-500" />
                                <span>{sop.automated} Handled by Agents</span>
                            </div>

                            {/* Automation Visualizer */}
                            <div className="flex h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden mt-2">
                                <div className="bg-amber-500 h-full" style={{ width: `${(sop.automated / sop.steps) * 100}%` }}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
