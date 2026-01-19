"use client";
import React from "react";
import { Folder, FileText, Download, ChevronRight } from "lucide-react";

const reports = [
    {
        year: '2025', months: [
            { name: 'December', files: ['EOM_Report_Dec25.pdf', 'Strategy_2026_Draft.pdf'] },
            { name: 'November', files: ['EOM_Report_Nov25.pdf', 'PPC_Audit_Nov25.pdf'] }
        ]
    },
];

export default function TheVault() {
    return (
        <div className="mt-12 pt-8 border-t border-zinc-200">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-zinc-900 flex items-center">
                    <Folder className="mr-2 h-5 w-5 text-zinc-400" />
                    The Vault
                </h2>
                <button className="text-xs text-zinc-500 hover:text-zinc-900 underline">View Full Archive</button>
            </div>

            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm">
                {reports.map((yearGroup) => (
                    <div key={yearGroup.year}>
                        {yearGroup.months.map((month, idx) => (
                            <div key={month.name} className={`p-4 ${idx !== 0 ? 'border-t border-zinc-100' : ''}`}>
                                <div className="flex items-center mb-3">
                                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider w-24">{month.name} {yearGroup.year}</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {month.files.map(file => (
                                        <div key={file} className="flex items-center justify-between p-3 rounded-lg border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:border-zinc-300 hover:shadow-sm transition-all cursor-pointer group">
                                            <div className="flex items-center space-x-3 overflow-hidden">
                                                <FileText className="h-4 w-4 text-zinc-400 group-hover:text-zinc-600" />
                                                <span className="text-sm text-zinc-600 font-medium truncate group-hover:text-zinc-900">{file}</span>
                                            </div>
                                            <Download className="h-3 w-3 text-zinc-300 group-hover:text-zinc-800" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
