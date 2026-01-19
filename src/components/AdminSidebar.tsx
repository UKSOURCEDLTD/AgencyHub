"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FileText, BarChart3, Settings, ShieldCheck, LogOut, Bot, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/firebase";

const navItems = [
    { href: "/admin", label: "Command Center", icon: LayoutDashboard },
    { href: "/admin/clients", label: "Client Directory", icon: Users },
    { href: "/admin/agents", label: "Agent Station", icon: Bot },
    { href: "/admin/audit", label: "Audit Engine", icon: ShieldCheck },
    { href: "/admin/sops", label: "SOP Library", icon: FileText },
    { href: "/admin/profit", label: "Agency FinOps", icon: DollarSign },
    { href: "/admin/crm", label: "CRM & Growth", icon: BarChart3 },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-white border-r border-zinc-200 min-h-screen flex flex-col fixed left-0 top-0 z-30">
            <div className="p-6 border-b border-zinc-100 flex items-center space-x-3">
                <div className="h-8 w-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-sm">
                    IH
                </div>
                <div>
                    <span className="block font-bold text-zinc-900 leading-tight">Agency Hub</span>
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Internal</span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-zinc-900 text-white shadow-sm"
                                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                            )}
                        >
                            <item.icon className={cn("h-4 w-4", isActive ? "text-zinc-300" : "text-zinc-400")} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-zinc-100 space-y-2">
                <div className="px-3 py-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                        <span>System Status</span>
                        <span className="text-emerald-500">All Systems Go</span>
                    </div>
                    <div className="flex space-x-1">
                        <div className="h-1 w-full bg-emerald-500 rounded-full"></div>
                    </div>
                </div>
                <button
                    onClick={() => auth.signOut()}
                    className="flex w-full items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                </button>
            </div>

        </aside>
    );
}
