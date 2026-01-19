"use client";
import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import SOPActiveTask from "@/components/SOPActiveTask";

export default function SOPLibrary() {
    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Operational Alpha Center</h1>
                    <p className="text-zinc-500">Standard Operating Protocols with cryptographic verification.</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Protocol
                </Button>
            </div>

            {/* Search Bar - Aesthetic Only */}
            <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <input
                    className="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-lg bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-zinc-900 outline-none transition-all"
                    placeholder="Search active protocols..."
                />
            </div>

            {/* The Enforcer */}
            <div className="space-y-4">
                <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Active Tasks</h2>
                <SOPActiveTask />
            </div>
        </div>
    );
}
