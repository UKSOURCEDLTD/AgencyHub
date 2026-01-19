"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-zinc-800">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">
        <div className="mb-6 h-16 w-16 bg-white rounded-2xl flex items-center justify-center shadow-[0_0_50px_-12px_rgba(255,255,255,0.3)]">
          <span className="text-zinc-950 font-bold text-2xl">IH</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
          Agency Intelligence Hub.
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12">
          The unified interface for modern agency operations. Track progress, log updates, and maintain client transparency.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          <Link href="/login" className="group">
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all hover:bg-zinc-800/50 text-left h-full">
              <div className="h-10 w-10 bg-zinc-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-zinc-700 transition-colors">
                <LayoutDashboard className="h-5 w-5 text-zinc-200" />
              </div>
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                Client Portal
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-zinc-400" />
              </h3>
              <p className="text-sm text-zinc-500">
                For brands to track SEO, PPC, and Account Health updates in real-time.
              </p>
            </div>
          </Link>

          <Link href="/login" className="group">
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all hover:bg-zinc-800/50 text-left h-full">
              <div className="h-10 w-10 bg-zinc-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-zinc-700 transition-colors">
                <ShieldCheck className="h-5 w-5 text-zinc-200" />
              </div>
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                Admin Logger
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-zinc-400" />
              </h3>
              <p className="text-sm text-zinc-500">
                Internal tool for Account Managers to push rapid updates to the timeline.
              </p>
            </div>
          </Link>
        </div>
      </div>

      <footer className="absolute bottom-6 w-full text-center text-xs text-zinc-600">
        © 2026 Agency Intelligence Hub. Rest assured.
      </footer>
    </div>
  );
}
