/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ArchivalItem, TipoRecurso } from "../types";
import { FileText, Video, Image as ImageIcon, Music, ExternalLink, Calendar, Hash } from "lucide-react";

interface ItemCardProps {
  item: ArchivalItem;
  onClick: (item: ArchivalItem) => void;
  key?: React.Key;
}

const getIcon = (tipo: TipoRecurso) => {
  switch (tipo) {
    case TipoRecurso.VIDEO: return <Video size={16} />;
    case TipoRecurso.FOTOGRAFIA: return <ImageIcon size={16} />;
    case TipoRecurso.AUDIO: return <Music size={16} />;
    default: return <FileText size={16} />;
  }
};

export default function ItemCard({ item, onClick }: ItemCardProps) {
  return (
    <div 
      onClick={() => onClick(item)}
      className="group bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-zinc-300 transition-all cursor-pointer flex flex-col h-full"
    >
      <div className="aspect-video relative overflow-hidden bg-zinc-100">
        <img 
          src={item.thumbnailUrl || "https://picsum.photos/seed/archive/400/300"} 
          alt={item.identificacion.titulo}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-white/90 backdrop-blur-sm text-zinc-900 text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1.5 shadow-sm uppercase tracking-wider">
            {getIcon(item.identificacion.tipoRecurso)}
            {item.identificacion.tipoRecurso}
          </span>
          <span className={`text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wider ${
            item.acceso.condicionesAcceso === "Público" ? "bg-emerald-500/90 text-white" : "bg-amber-500/90 text-white"
          }`}>
            {item.acceso.condicionesAcceso}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="font-bold text-zinc-900 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
            {item.identificacion.titulo}
          </h3>
          <ExternalLink size={16} className="text-zinc-300 group-hover:text-zinc-500 transition-colors shrink-0" />
        </div>

        <p className="text-xs text-zinc-500 line-clamp-2 mb-4 flex-1 italic">
          {item.contenido.alcanceContenido}
        </p>

        <div className="space-y-2 pt-4 border-t border-zinc-100">
          <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
            <Hash size={12} />
            {item.identificacion.codigoReferencia}
          </div>
          <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
            <Calendar size={12} />
            {item.identificacion.fechaCreacion}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.contenido.palabrasClave.slice(0, 3).map(tag => (
            <span key={tag} className="text-[9px] font-bold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full uppercase tracking-tighter">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
