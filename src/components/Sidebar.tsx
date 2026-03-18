/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  Box, 
  Layers, 
  FileText, 
  Users, 
  Globe, 
  Puzzle, 
  Settings,
  ChevronRight,
  Database,
  ShieldCheck,
  History,
  HardDrive
} from "lucide-react";

const mainNav = [
  { icon: Box, label: "Items", active: true },
  { icon: Layers, label: "Item sets" },
  { icon: FileText, label: "Media" },
  { icon: Users, label: "Resources" },
];

const archivalNav = [
  { icon: Database, label: "Archival Hierarchy" },
  { icon: ShieldCheck, label: "Access Control" },
  { icon: History, label: "Audit Logs" },
];

const addonNav = [
  { icon: Puzzle, label: "DDA Archive Manager" },
  { icon: HardDrive, label: "NAS Connector" },
];

export default function Sidebar() {
  return (
    <aside className="w-56 bg-zinc-100 border-r border-omeka-border flex flex-col h-[calc(100vh-48px)] sticky top-12 shadow-sm z-20">
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-0.5">
          {mainNav.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center justify-between px-4 py-2 text-xs font-bold transition-colors ${
                item.active 
                  ? "bg-white text-omeka-blue border-y border-omeka-border" 
                  : "text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={14} className={item.active ? "text-omeka-blue" : "text-zinc-400"} />
                {item.label}
              </div>
              {item.active && <ChevronRight size={12} />}
            </button>
          ))}
        </nav>

        <div className="mt-6 px-4 mb-2">
          <p className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Archival Management</p>
        </div>
        <nav className="space-y-0.5">
          {archivalNav.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-zinc-600 hover:bg-zinc-200 transition-colors"
            >
              <item.icon size={14} className="text-zinc-400" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-6 px-4 mb-2">
          <p className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">DDA Addon</p>
        </div>
        <nav className="space-y-0.5">
          {addonNav.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-zinc-600 hover:bg-zinc-200 transition-colors"
            >
              <item.icon size={14} className="text-zinc-400" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-6 px-4 mb-2">
          <p className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">System</p>
        </div>
        <nav className="space-y-0.5">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-zinc-600 hover:bg-zinc-200 transition-colors">
            <Users size={14} className="text-zinc-400" />
            Users
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-zinc-600 hover:bg-zinc-200 transition-colors">
            <Settings size={14} className="text-zinc-400" />
            Settings
          </button>
        </nav>
      </div>

      <div className="p-4 bg-zinc-200/50 border-t border-omeka-border">
        <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 tracking-tighter">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          NAS CONNECTED
        </div>
      </div>
    </aside>
  );
}
