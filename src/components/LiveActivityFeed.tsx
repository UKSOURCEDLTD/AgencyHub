"use client";
import React, { useState } from 'react';
import { Radio } from 'lucide-react';

export default function LiveActivityFeed({ clientId }: { clientId: string }) {
    const [isSimulating, setIsSimulating] = useState(false);

    const triggerMockEvent = async (type: string) => {
        setIsSimulating(true);
        try {
            await fetch('/api/webhooks/sp-api', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    notificationType: type,
                    payload: {
                        clientId,
                        oldPrice: '$29.99',
                        newPrice: '$24.99',
                        asin: 'B08XYZ123',
                        newTitle: "Updated Brand Title with Keywords 2026"
                    }
                })
            });
        } catch (e) {
            console.error(e);
        } finally {
            setTimeout(() => setIsSimulating(false), 1000);
        }
    };

    return (
        <div className="bg-zinc-900 text-zinc-400 p-2 rounded-lg text-[10px] font-mono mb-4 flex items-center justify-between border border-zinc-800">
            <div className="flex items-center space-x-2">
                <Radio className={`h-3 w-3 ${isSimulating ? 'text-green-500 animate-pulse' : 'text-zinc-600'}`} />
                <span>SP-API LIVE STREAM: {isSimulating ? 'RECEIVING DATA...' : 'C0NNECTED'}</span>
            </div>
            <div className="flex space-x-1">
                <button onClick={() => triggerMockEvent('PRICING_HEALTH')} className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-300">
                    Sim: Price Drop
                </button>
                <button onClick={() => triggerMockEvent('LISTING_CHANGE_RECORD')} className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-300">
                    Sim: Title Change
                </button>
            </div>
        </div>
    );
}
