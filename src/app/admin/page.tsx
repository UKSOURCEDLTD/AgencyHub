"use client";
import AdminLogger from "@/components/AdminLogger";
import ClientHealthGrid from "@/components/ClientHealthGrid";
import TeamAuditLog from "@/components/TeamAuditLog";

export default function AdminPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Command Center</h1>
                <p className="text-zinc-500 mt-2">Agency overview and rapid-response terminal.</p>
            </div>

            {/* Traffic Lights */}
            <ClientHealthGrid />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Logger */}
                <div className="lg:col-span-2 space-y-8">
                    <AdminLogger />
                    {/* Future: Task List or HITL Queue preview */}
                </div>

                {/* Side Panel: Audit */}
                <div className="lg:col-span-1">
                    <TeamAuditLog />
                </div>
            </div>
        </div>
    );
}
