"use client";
import React, { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Shield, EyeOff } from "lucide-react";

export default function TeamAuditLog() {
    const [logs, setLogs] = useState<any[]>([]);

    useEffect(() => {
        // Determine user via checking window/localStorage or just fetch all for demo (in real app auth context handles this)
        const fetchLogs = async () => {
            try {
                const q = query(
                    collection(db, "work_logs"),
                    orderBy("timestamp", "desc"),
                    limit(10)
                );
                const snap = await getDocs(q);
                setLogs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
            } catch (e) { console.error(e); }
        };
        fetchLogs();
    }, []);

    return (
        <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
            <div className="bg-zinc-50/50 px-6 py-4 border-b border-zinc-100 flex justify-between items-center">
                <h3 className="font-bold text-zinc-900 text-sm">Team Activity Audit</h3>
                <span className="text-xs bg-zinc-100 text-zinc-500 px-2 py-1 rounded">Last 24h</span>
            </div>
            <div className="divide-y divide-zinc-50">
                {logs.length === 0 ? (
                    <div className="p-6 text-center text-zinc-400 text-sm">No recent internal logs found.</div>
                ) : (
                    logs.map(log => (
                        <div key={log.id} className="p-4 flex items-start space-x-4 hover:bg-zinc-50/50 transition-colors">
                            <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-500 uppercase">
                                {(log.authorInternal || "U").substring(0, 2)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-sm font-medium text-zinc-900">
                                        {log.authorInternal}
                                        <span className="text-zinc-400 font-normal"> logged </span>
                                        {log.category}
                                    </p>
                                    <span className="text-xs text-zinc-400 whitespace-nowrap">
                                        {log.timestamp?.seconds ? new Date(log.timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now'}
                                    </span>
                                </div>
                                <p className="text-sm text-zinc-600 truncate">{log.message}</p>
                                {!log.isPublic && (
                                    <div className="mt-1 inline-flex items-center text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">
                                        <EyeOff className="w-3 h-3 mr-1" />
                                        Secret Note
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
