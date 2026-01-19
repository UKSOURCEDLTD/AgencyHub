import React from 'react';
import AuditGenerator from '@/components/AuditGenerator';

export default function AuditPage() {
    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-zinc-900">Rapid Audit Engine</h1>
                <p className="text-zinc-500">Generate 60-day retroactive audits in seconds. Identify margin leaks and stranded inventory.</p>
            </div>
            <AuditGenerator />
        </div>
    );
}
