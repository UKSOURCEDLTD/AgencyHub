"use client";
import React, { useState, useEffect } from "react";
import { collection, query, where, orderBy, getDocs, updateDoc, doc, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Eye, EyeOff, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Log {
    id: string;
    category: string;
    message: string;
    timestamp: any;
    isPublic: boolean;
    authorInternal: string;
}

export default function MasterWorkFeed({ clientId }: { clientId: string }) {
    const { user } = useAuth();
    const [logs, setLogs] = useState<Log[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [category, setCategory] = useState("PPC");
    const [isPublic, setIsPublic] = useState(true);
    const [loading, setLoading] = useState(false);

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
        }
    };

    useEffect(() => {
        if (clientId) fetchLogs();
    }, [clientId]);

    const handlePost = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addDoc(collection(db, "work_logs"), {
                clientId,
                category,
                message: newMessage,
                authorInternal: user?.displayName || user?.email || "Admin",
                timestamp: serverTimestamp(),
                isPublic: isPublic
            });
            setNewMessage("");
            fetchLogs(); // Refresh
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const toggleVisibility = async (logId: string, currentStatus: boolean) => {
        // Optimistic update
        setLogs(logs.map(l => l.id === logId ? { ...l, isPublic: !currentStatus } : l));
        try {
            await updateDoc(doc(db, "work_logs", logId), { isPublic: !currentStatus });
        } catch (e) {
            console.error("Error toggling", e);
            fetchLogs(); // Revert on fail
        }
    };

    return (
        <div className="space-y-6">
            {/* Rapid Log Input */}
            <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow-sm">
                <form onSubmit={handlePost}>
                    <div className="flex space-x-2 mb-2">
                        <Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-1/3 bg-zinc-50 border-zinc-100"
                        >
                            <option value="PPC">PPC</option>
                            <option value="SEO">SEO</option>
                            <option value="Listing">Listing</option>
                            <option value="Account Health">Health</option>
                            <option value="Strategy">Strategy</option>
                        </Select>
                        <div className="flex items-center space-x-2 w-full justify-end">
                            <span className={cn("text-xs font-medium cursor-pointer", isPublic ? "text-emerald-600" : "text-zinc-400")} onClick={() => setIsPublic(true)}>Public</span>
                            <div
                                className={cn("w-8 h-4 rounded-full p-0.5 cursor-pointer transition-colors relative", isPublic ? "bg-emerald-500" : "bg-amber-400")}
                                onClick={() => setIsPublic(!isPublic)}
                            >
                                <div className={cn("w-3 h-3 bg-white rounded-full shadow-sm transition-transform", isPublic ? "translate-x-4" : "translate-x-0")}></div>
                            </div>
                            <span className={cn("text-xs font-medium cursor-pointer", !isPublic ? "text-amber-600" : "text-zinc-400")} onClick={() => setIsPublic(false)}>Internal</span>
                        </div>
                    </div>
                    <Textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Log prompt..."
                        className="bg-zinc-50 mb-2 border-zinc-100"
                    />
                    <div className="flex justify-end">
                        <Button type="submit" size="sm" isLoading={loading}>Post to Timeline</Button>
                    </div>
                </form>
            </div>

            {/* Feed */}
            <div className="space-y-4">
                {logs.map((log) => (
                    <div key={log.id} className={cn("group relative pl-4 border-l-2 transition-all", log.isPublic ? "border-zinc-200" : "border-amber-300 bg-amber-50/30 p-2 rounded-r-lg")}>
                        <div className="flex justify-between items-start mb-1">
                            <div className="flex items-center space-x-2">
                                <span className={cn("text-[10px] uppercase font-bold px-1.5 py-0.5 rounded", log.isPublic ? "bg-zinc-100 text-zinc-500" : "bg-amber-100 text-amber-700")}>
                                    {log.category}
                                </span>
                                <span className="text-[10px] text-zinc-400">
                                    {log.timestamp?.seconds ? new Date(log.timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }) : 'Just now'}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => toggleVisibility(log.id, log.isPublic)} title={log.isPublic ? "Hide from Client" : "Make Public"}>
                                    {log.isPublic ? <Eye className="h-3 w-3 text-zinc-400 hover:text-zinc-900" /> : <EyeOff className="h-3 w-3 text-amber-500 hover:text-amber-700" />}
                                </button>
                            </div>
                        </div>
                        <p className="text-sm text-zinc-800 mb-1">{log.message}</p>
                        <div className="flex items-center space-x-1 text-[10px] text-zinc-400">
                            <User className="h-3 w-3" />
                            <span>{log.authorInternal}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
