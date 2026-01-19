"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Power, AlertOctagon } from "lucide-react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function KillSwitch() {
    const [armed, setArmed] = useState(false);
    const [active, setActive] = useState(false);

    const handleKill = async () => {
        if (!armed) {
            setArmed(true);
            return;
        }

        // Execute Kill
        try {
            await updateDoc(doc(db, "system", "emergency_stop"), {
                active: true,
                triggeredAt: serverTimestamp(),
                triggeredBy: "Admin Manual Override"
            });
            setActive(true);
            alert("GLOBAL KILL SWITCH ACTIVATED. All Agents Pausing...");
        } catch (e) {
            console.error(e);
            // Fallback UI state if DB fails
            setActive(true);
        }
    };

    if (active) {
        return (
            <div className="bg-red-950/50 border border-red-500 rounded-lg p-3 text-center animate-pulse">
                <AlertOctagon className="h-6 w-6 text-red-500 mx-auto mb-2" />
                <p className="text-red-500 font-bold text-xs uppercase tracking-widest">System Halted</p>
                <Button size="sm" variant="destructive" onClick={() => setActive(false)} className="mt-2 text-[10px] h-6">
                    Reset System
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-2 text-center">Emergency Stop</p>
            <Button
                variant="destructive"
                className={`w-full transition-all ${armed ? 'animate-pulse font-bold' : 'opacity-80'}`}
                onClick={handleKill}
            >
                <Power className="mr-2 h-4 w-4" />
                {armed ? "CONFIRM SHUTDOWN" : "Arm Kill Switch"}
            </Button>
        </div>
    );
}
