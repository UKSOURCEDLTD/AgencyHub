import React from 'react';
import ProfitDashboard from '@/components/ProfitDashboard';

export default function ProfitPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Agency FinOps (CPI)</h1>
                    <p className="text-zinc-500">Real-time profitability tracking per client.</p>
                </div>
                <div className="text-right">
                    <div className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Agency Net Margin</div>
                    <div className="text-3xl font-black text-emerald-600">32.4%</div>
                </div>
            </div>
            <ProfitDashboard />
        </div>
    );
}
