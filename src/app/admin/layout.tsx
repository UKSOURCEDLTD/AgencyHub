"use client";
import React from "react";
import AdminRoute from "@/components/AdminRoute";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminRoute>
            <div className="flex min-h-screen bg-zinc-50">
                <AdminSidebar />
                <main className="flex-1 ml-64 p-8">
                    {children}
                </main>
            </div>
        </AdminRoute>
    );
}
