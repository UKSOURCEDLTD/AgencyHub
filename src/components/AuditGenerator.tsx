"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FileText, Search, AlertTriangle, CheckCircle, Loader2, Download } from "lucide-react";

export default function AuditGenerator() {
    const [asin, setAsin] = useState("");
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState<any>(null);

    const runAudit = async () => {
        if (!asin) return;
        setLoading(true);
        // Simulate API delay
        await new Promise(r => setTimeout(r, 2000));

        // Mock Result
        setReport({
            asin: asin,
            score: 42, // Low score = bad
            acos: '45.2%', // High
            grade: 'D+',
            issues: [
                { severity: 'high', text: 'ACOS (45%) exceeds net margin (20%). Losing money on every sale.' },
                { severity: 'high', text: 'Stranded Inventory detected at LBA4 warehouse.' },
                { severity: 'medium', text: 'Main Image does not use available pixels (white space > 10%).' },
                { severity: 'low', text: 'Description logic missing bullet points.' }
            ]
        });
        setLoading(false);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="col-span-1 space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-zinc-500">Target Selector</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-xs font-semibold text-zinc-900 block mb-2">Target Brand / ASIN</label>
                            <input
                                type="text"
                                value={asin}
                                onChange={(e) => setAsin(e.target.value)}
                                className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-zinc-900 outline-none transition-all"
                                placeholder="e.g. B08123XYZ"
                            />
                        </div>
                        <Button
                            onClick={runAudit}
                            disabled={loading || !asin}
                            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white"
                        >
                            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Auditing...</> : "Run 60-Day Deep Dive"}
                        </Button>
                    </CardContent>
                </Card>

                {/* History / Recent (Static Mock) */}
                <div className="bg-zinc-100 rounded-lg p-4 text-xs text-zinc-500">
                    <h4 className="font-bold text-zinc-900 mb-2">Recent Audits</h4>
                    <ul className="space-y-2">
                        <li className="flex justify-between"><span>Nike Air Max...</span> <span className="text-red-500 font-bold">Grade F</span></li>
                        <li className="flex justify-between"><span>Adidas Running...</span> <span className="text-emerald-600 font-bold">Grade A-</span></li>
                    </ul>
                </div>
            </div>

            {/* Report Display */}
            <div className="col-span-2">
                {!report ? (
                    <div className="h-full border-2 border-dashed border-zinc-200 rounded-xl flex flex-col items-center justify-center text-zinc-400 p-12 bg-zinc-50/50">
                        <Search className="h-12 w-12 mb-4 opacity-20" />
                        <p>Enter an ASIN to generate a relentless critique.</p>
                    </div>
                ) : (
                    <Card className="border-t-4 border-t-red-500 shadow-lg">
                        <CardHeader className="border-b border-zinc-100 flex flex-row justify-between items-start">
                            <div>
                                <div className="flex items-center space-x-2">
                                    <h2 className="text-2xl font-black text-zinc-900">AUDIT REPORT</h2>
                                    <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-sm font-bold">CRITICAL ISSUES FOUND</span>
                                </div>
                                <p className="text-zinc-500 text-sm mt-1">Generated for ASIN: {report.asin}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-4xl font-black text-red-600">{report.grade}</div>
                                <div className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Overall Score</div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            {/* Key Metrics */}
                            <div className="grid grid-cols-3 gap-4 pb-6 border-b border-zinc-100">
                                <div className="text-center p-3 bg-zinc-50 rounded-lg">
                                    <div className="text-xs text-zinc-500 uppercase">ACOS (Last 60d)</div>
                                    <div className="text-xl font-bold text-red-600">{report.acos}</div>
                                </div>
                                <div className="text-center p-3 bg-zinc-50 rounded-lg">
                                    <div className="text-xs text-zinc-500 uppercase">Profit Leak</div>
                                    <div className="text-xl font-bold text-red-600">-$420.00</div>
                                </div>
                                <div className="text-center p-3 bg-zinc-50 rounded-lg">
                                    <div className="text-xs text-zinc-500 uppercase">Listing Health</div>
                                    <div className="text-xl font-bold text-amber-500">Poor</div>
                                </div>
                            </div>

                            {/* Issues List */}
                            <div>
                                <h3 className="font-bold text-zinc-900 mb-3 flex items-center">
                                    <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                                    Identified Risks
                                </h3>
                                <div className="space-y-3">
                                    {report.issues.map((issue: any, idx: number) => (
                                        <div key={idx} className={`p-3 rounded-lg border flex items-start space-x-3 ${issue.severity === 'high' ? 'bg-red-50 border-red-100 text-red-900' : 'bg-zinc-50 border-zinc-100 text-zinc-700'}`}>
                                            <div className={`mt-0.5 h-2 w-2 rounded-full flex-shrink-0 ${issue.severity === 'high' ? 'bg-red-500 animate-pulse' : 'bg-zinc-400'}`}></div>
                                            <p className="text-sm font-medium">{issue.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button variant="outline" className="flex items-center text-zinc-600">
                                    <Download className="mr-2 h-4 w-4" /> Download PDF Report
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
