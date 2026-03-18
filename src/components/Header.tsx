/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Search, User, Settings, LogOut } from "lucide-react";

export default function Header() {
  return (
    <header className="h-12 bg-omeka-dark flex items-center justify-between px-4 sticky top-0 z-50 shadow-md">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-omeka-blue rounded-sm flex items-center justify-center text-white text-[10px] font-black">
            OS
          </div>
          <h1 className="font-bold text-sm tracking-tight text-white leading-none">
            Omeka S <span className="text-zinc-400 font-normal">| DDA Archivo</span>
          </h1>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-8 hidden md:block">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
          <input
            type="text"
            placeholder="Search items..."
            className="w-full bg-zinc-800 border-none focus:ring-1 focus:ring-omeka-blue rounded py-1 pl-8 pr-4 text-xs text-zinc-300 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-1.5 text-zinc-400 hover:text-white transition-colors">
          <Settings size={16} />
        </button>
        <div className="h-4 w-[1px] bg-zinc-700 mx-1"></div>
        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-bold text-white">Administrador</p>
          </div>
          <div className="w-7 h-7 rounded bg-zinc-700 flex items-center justify-center text-zinc-300 border border-zinc-600">
            <User size={14} />
          </div>
          <button className="p-1.5 text-zinc-400 hover:text-white transition-colors">
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}
