"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search, Flame, FileBarChart, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

const leads = [
    { id: 1, name: "EcoKitchen Co.", status: "Hot", score: 92, lastLogin: "2h ago", assigned: "Sarah" },
    { id: 2, name: "YogaFlex", status: "Warm", score: 65, lastLogin: "2d ago", assigned: "Mike" },
    { id: 3, name: "PetPals", status: "Cold", score: 20, lastLogin: "1w ago", assigned: "Bot" },
];

export default function CRMPage() {
    const [asin, setAsin] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAudit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert(`Audit generated for ${asin}. Demo dashboard populated.`);
        }, 1500);
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Growth Engine</h1>
                <p className="text-zinc-500 mt-2">Prospect tracking and instant value generation.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Audit Creator */}
                <div className="lg:col-span-2 bg-zinc-900 rounded-xl p-8 text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <FileBarChart className="h-32 w-32" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4 relative z-10">Instant Audit Creator</h2>
                    <p className="text-zinc-400 mb-6 max-w-lg relative z-10">Enter a prospect's ASIN to generate a "First Impression" report. The system will crawl the listing and populate a demo dashboard in seconds to wow the client.</p>

                    <form onSubmit={handleAudit} className="flex flex-col sm:flex-row gap-4 relative z-10">
                        <Input
                            placeholder="Paste ASIN (e.g. B08...)"
                            className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-600"
                            value={asin}
                            onChange={(e) => setAsin(e.target.value)}
                            required
                        />
                        <Button variant="secondary" isLoading={loading}>
                            Generate Report <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </form>
                </div>

                {/* Quick Stats */}
                <Card className="bg-white border-zinc-200">
                    <CardContent className="p-6 space-y-6">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-zinc-500">Pipeline Value</span>
                                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">+12%</span>
                            </div>
                            <div className="text-3xl font-bold text-zinc-900">$142,000</div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-zinc-500">Active Retainers</span>
                            </div>
                            <div className="text-3xl font-bold text-zinc-900">18</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Lead Tracker */}
            <h2 className="text-lg font-bold text-zinc-900 mb-4 flex items-center">
                <Flame className="mr-2 h-5 w-5 text-orange-500" />
                Lead "Warmth" Tracker
            </h2>
            <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-zinc-50 text-zinc-500 font-medium border-b border-zinc-100">
                        <tr>
                            <th className="px-6 py-4">Prospect</th>
                            <th className="px-6 py-4">Thermometer</th>
                            <th className="px-6 py-4">Last Activity</th>
                            <th className="px-6 py-4">Contract Status</th>
                            <th className="px-6 py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                        {leads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-zinc-50/50">
                                <td className="px-6 py-4 font-bold text-zinc-900">{lead.name}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-24 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${lead.score > 80 ? 'bg-orange-500' : lead.score > 50 ? 'bg-yellow-500' : 'bg-blue-300'}`}
                                                style={{ width: `${lead.score}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-zinc-500">{lead.score}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-zinc-500">{lead.lastLogin}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center text-zinc-600">
                                        <Calendar className="h-3 w-3 mr-2" />
                                        <span>Renewal: Oct 1</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-zinc-400 hover:text-zinc-900 font-medium">View Deal</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
