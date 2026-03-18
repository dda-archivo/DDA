/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ArchivalItem } from "../types";
import { Filter, SortAsc, Plus, MoreVertical, FileText, Video, Image as ImageIcon, Music, Search } from "lucide-react";

interface ArchiveExplorerProps {
  items: ArchivalItem[];
  onSelectItem: (item: ArchivalItem) => void;
  onAddNewItem: () => void;
}

const getIcon = (tipo: string) => {
  switch (tipo) {
    case "Video": return <Video size={14} />;
    case "Fotografía": return <ImageIcon size={14} />;
    case "Audio": return <Music size={14} />;
    default: return <FileText size={14} />;
  }
};

export default function ArchiveExplorer({ items, onSelectItem, onAddNewItem }: ArchiveExplorerProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-white">
      {/* Admin Header */}
      <div className="sticky top-0 bg-white border-b border-omeka-border px-6 py-4 flex items-center justify-between z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">Items</h2>
          <div className="h-6 w-px bg-zinc-200" />
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search items..." 
              className="pl-9 pr-4 py-1.5 bg-zinc-50 border border-zinc-200 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-omeka-blue focus:border-omeka-blue w-64 transition-all"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={onAddNewItem}
            className="flex items-center gap-2 px-4 py-2 bg-omeka-blue text-white rounded-sm text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus size={14} />
            ADD NEW ITEM
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="px-6 py-3 bg-zinc-50 border-b border-omeka-border flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button className="text-[10px] font-black text-omeka-blue hover:text-blue-800 flex items-center gap-1.5 uppercase tracking-widest transition-colors">
            <Filter size={12} /> Filter
          </button>
          <button className="text-[10px] font-black text-omeka-blue hover:text-blue-800 flex items-center gap-1.5 uppercase tracking-widest transition-colors">
            <SortAsc size={12} /> Sort
          </button>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
            {items.length} items found
          </span>
        </div>
      </div>

      {/* Resource Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse resource-table">
          <thead>
            <tr>
              <th className="w-10">
                <input type="checkbox" className="rounded-sm border-zinc-300 text-omeka-blue focus:ring-omeka-blue cursor-pointer" />
              </th>
              <th>Title / Reference</th>
              <th>Resource Type</th>
              <th>Status</th>
              <th>Owner / Cataloger</th>
              <th>Last Modified</th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-omeka-border">
            {items.map((item) => (
              <tr 
                key={item.id} 
                className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                onClick={() => onSelectItem(item)}
              >
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" className="rounded-sm border-zinc-300 text-omeka-blue focus:ring-omeka-blue cursor-pointer" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-100 rounded-sm border border-zinc-200 overflow-hidden shrink-0 flex items-center justify-center text-zinc-400 shadow-inner group-hover:border-omeka-blue transition-colors">
                      {item.thumbnailUrl ? (
                        <img src={item.thumbnailUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        getIcon(item.identificacion.tipoRecurso)
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-omeka-blue group-hover:underline leading-tight mb-1">{item.identificacion.titulo}</p>
                      <p className="text-[10px] text-zinc-500 font-mono tracking-tighter">{item.identificacion.codigoReferencia}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[9px] font-black text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-sm border border-zinc-200 uppercase tracking-widest">
                    {item.identificacion.tipoRecurso}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-sm border uppercase tracking-widest ${
                    item.control.estadoElaboracion === "Final" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                    item.control.estadoElaboracion === "Revisado" ? "bg-amber-50 text-amber-700 border-amber-200" :
                    "bg-zinc-50 text-zinc-600 border-zinc-200"
                  }`}>
                    {item.control.estadoElaboracion}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-zinc-600 font-bold">
                  {item.control.responsableFicha}
                </td>
                <td className="px-6 py-4 text-xs text-zinc-500 font-medium">
                  {item.control.fechaDescripcion}
                </td>
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <button className="p-1.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded transition-all">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
