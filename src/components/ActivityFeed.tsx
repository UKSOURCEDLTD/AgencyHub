"use client";
import React, { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Search, BarChart, FileText, Activity, Layers, Bell } from "lucide-react";

interface Log {
    id: string;
    category: string;
    message: string;
    timestamp: any;
}

const getIcon = (category: string) => {
    switch (category) {
        case "SEO": return <Search className="w-5 h-5 text-blue-500" />;
        case "PPC": return <BarChart className="w-5 h-5 text-green-500" />;
        case "Listing": return <FileText className="w-5 h-5 text-orange-500" />;
        case "Account Health": return <Activity className="w-5 h-5 text-red-500" />;
        case "Strategy": return <Layers className="w-5 h-5 text-purple-500" />;
        default: return <Bell className="w-5 h-5 text-zinc-500" />;
    }
};

export default function ActivityFeed({ clientId }: { clientId: string }) {
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!clientId) return;
        const fetchLogs = async () => {
            try {
                const q = query(
                    collection(db, "work_logs"),
                    where("clientId", "==", clientId),
                    orderBy("timestamp", "desc")
                );
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Log));
                setLogs(data);
            } catch (e) {
                console.error("Error fetching logs:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, [clientId]);

    if (loading) return <div className="text-zinc-500 animate-pulse text-sm">Syncing timeline...</div>;
    if (logs.length === 0) return <div className="text-zinc-500 text-sm">No recent activity found.</div>;

    return (
        <div className="relative border-l border-zinc-200 ml-3 space-y-8 pb-8">
            {logs.map((log) => (
                <div key={log.id} className="relative pl-8">
                    <div className="absolute -left-3 top-0 bg-white p-1 rounded-full border border-zinc-100 shadow-sm z-10">
                        {getIcon(log.category)}
                    </div>
                    <div className="flex flex-col space-y-1 bg-white p-4 rounded-lg shadow-sm border border-zinc-50/50">
                        <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">{log.category}</span>
                            <span className="text-xs text-zinc-400">•</span>
                            <span className="text-xs text-zinc-400">
                                {log.timestamp?.seconds ? new Date(log.timestamp.seconds * 1000).toLocaleDateString() : 'Just now'}
                            </span>
                        </div>
                        <p className="text-zinc-800 text-sm leading-relaxed">{log.message}</p>
                        <div className="flex items-center pt-2">
                            <div className="h-px w-4 bg-zinc-200 mr-2"></div>
                            <p className="text-xs text-zinc-400 font-medium uppercase tracking-widest">Agency Update</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
