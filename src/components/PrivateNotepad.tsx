"use client";
import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";
import { Save, Lock } from "lucide-react";

export default function PrivateNotepad({ clientId }: { clientId: string }) {
    const { user } = useAuth();
    const [note, setNote] = useState("");
    const [saving, setSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    useEffect(() => {
        // Fetch existing note
        const fetchNote = async () => {
            try {
                const docRef = doc(db, "clients", clientId, "admin_notes", "general");
                const snap = await getDoc(docRef);
                if (snap.exists()) {
                    setNote(snap.data().content || "");
                    if (snap.data().updatedAt) {
                        setLastSaved(snap.data().updatedAt.toDate());
                    }
                }
            } catch (e) {
                console.error("Error fetching notes", e);
            }
        };
        if (clientId) fetchNote();
    }, [clientId]);

    const handleSave = async () => {
        if (!clientId) return;
        setSaving(true);
        try {
            await setDoc(doc(db, "clients", clientId, "admin_notes", "general"), {
                content: note,
                updatedAt: serverTimestamp(),
                updatedBy: user?.uid
            });
            setLastSaved(new Date());
        } catch (e) {
            console.error("Error saving note", e);
        } finally {
            setSaving(false);
        }
    };

    // Auto-save on blur or periodic could be added, for now manual/blur

    return (
        <Card className="h-full border-zinc-200 flex flex-col shadow-none">
            <CardHeader className="pb-2 pt-4 px-4 bg-zinc-50 border-b border-zinc-100 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center">
                    <Lock className="h-3 w-3 mr-1" /> Private Strategy
                </CardTitle>
                <div className="flex items-center space-x-2">
                    {lastSaved && <span className="text-[10px] text-zinc-400">Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>}
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="text-zinc-400 hover:text-zinc-600 transition-colors"
                    >
                        <Save className={`h-4 w-4 ${saving ? 'animate-pulse text-zinc-400' : ''}`} />
                    </button>
                </div>
            </CardHeader>
            <CardContent className="p-0 flex-1">
                <Textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    onBlur={handleSave}
                    className="w-full h-full min-h-[200px] resize-none border-0 focus-visible:ring-0 rounded-none p-4 text-sm leading-relaxed bg-yellow-50/20 placeholder:text-zinc-300"
                    placeholder="Internal notes, strategy ideas, and warnings..."
                />
            </CardContent>
        </Card>
    );
}
