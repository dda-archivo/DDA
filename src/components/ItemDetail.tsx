/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ArchivalItem } from "../types";
import MetadataSection, { MetadataField } from "./MetadataSection";
import { 
  ArrowLeft, 
  Edit3, 
  Trash2, 
  Info, 
  Users, 
  FileText, 
  Shield, 
  Link as LinkIcon, 
  Settings,
  Clock,
  HardDrive,
  Monitor,
  Volume2,
  ExternalLink
} from "lucide-react";

interface ItemDetailProps {
  item: ArchivalItem;
  onBack: () => void;
}

export default function ItemDetail({ item, onBack }: ItemDetailProps) {
  return (
    <div className="flex-1 bg-white overflow-y-auto">
      {/* Admin Toolbar */}
      <div className="sticky top-0 bg-white border-b border-omeka-border px-6 py-3 flex items-center justify-between z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-1.5 text-zinc-500 hover:bg-zinc-100 rounded transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-base font-bold text-zinc-900 truncate max-w-md leading-none">
              {item.identificacion.titulo}
            </h1>
            <span className="text-[10px] font-mono text-zinc-400 mt-1">{item.identificacion.codigoReferencia}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 text-zinc-700 border border-zinc-200 rounded text-xs font-bold hover:bg-zinc-200 transition-colors">
            <Edit3 size={14} />
            EDIT
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 border border-red-100 rounded text-xs font-bold hover:bg-red-100 transition-colors">
            <Trash2 size={14} />
            DELETE
          </button>
        </div>
      </div>

      <div className="p-8 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex border-b border-omeka-border mb-6">
            <button className="px-4 py-2 text-xs font-bold text-omeka-blue border-b-2 border-omeka-blue">Values</button>
            <button className="px-4 py-2 text-xs font-bold text-zinc-400 hover:text-zinc-600">Media</button>
            <button className="px-4 py-2 text-xs font-bold text-zinc-400 hover:text-zinc-600">Linked Resources</button>
          </div>

          {/* 1. Área de Identificación */}
          <MetadataSection title="1. Área de Identificación" icon={Info}>
            <MetadataField label="Código de Referencia" value={item.identificacion.codigoReferencia} standard="ISAD" />
            <MetadataField label="Título" value={item.identificacion.titulo} standard="ISAD/FIAF" />
            <MetadataField label="Fecha de Creación/Emisión" value={item.identificacion.fechaCreacion} standard="ISAD/FIAT" />
            <MetadataField label="Nivel de Descripción" value={item.identificacion.nivelDescripcion} standard="ISAD" />
            <MetadataField label="Tipo de Recurso" value={item.identificacion.tipoRecurso} standard="FIAF/ISAD" />
            <MetadataField label="Volumen y Soporte" value={item.identificacion.volumenSoporte} />
            <MetadataField label="Identificador de Acceso (NAS)" value={item.identificacion.identificadorAccesoNAS} />
            <MetadataField label="Identificador Externo (DOI/Handle)" value={item.identificacion.identificadorExterno} />
            <MetadataField label="Identificador del Repositorio" value={item.identificacion.identificadorRepositorio} standard="ISDIAH" />
            <MetadataField label="Ubicación del Depósito" value={item.identificacion.ubicacionDeposito} standard="ISDIAH" />
          </MetadataSection>

          {/* 2. Área de Contexto y Autoría */}
          <MetadataSection title="2. Área de Contexto y Autoría" icon={Users}>
            <MetadataField label="Productor / Creador" value={item.contexto.productor} standard="ISAD/ISAAR" />
            <MetadataField label="Fechas del Productor" value={item.contexto.fechasProductor} standard="ISAAR" />
            <MetadataField label="Créditos de Producción" value={item.contexto.creditosProduccion} standard="FIAF/FIAT" />
            <MetadataField label="Historia Institucional / Biográfica" value={item.contexto.historiaInstitucional} standard="ISAAR" />
            <MetadataField label="Historia Archivística" value={item.contexto.historiaArchivistica} standard="ISAD" />
            <MetadataField label="Forma de Ingreso" value={item.contexto.formaIngreso} standard="ISAD" />
          </MetadataSection>

          {/* 3. Área de Contenido y Estructura */}
          <MetadataSection title="3. Área de Contenido y Estructura" icon={FileText}>
            <MetadataField label="Alcance y Contenido / Sinopsis" value={item.contenido.alcanceContenido} standard="ISAD/FIAF" />
            <MetadataField label="Palabras Clave (Tags)" value={item.contenido.palabrasClave} standard="ISAD" />
            <MetadataField label="Sistema de Organización" value={item.contenido.sistemaOrganizacion} standard="ISAD" />
            <MetadataField label="Valoración y Selección" value={item.contenido.valoracionSeleccion} standard="ISAD" />
            <MetadataField label="Plazo de Conservación" value={item.contenido.plazoConservacion} standard="ISAD" />
            {item.contenido.puntosAccesoTimecodes && (
              <tr className="border-b border-omeka-border group hover:bg-white transition-colors">
                <td className="py-2.5 px-4 w-1/3 align-top bg-zinc-50/50 group-hover:bg-white border-r border-omeka-border">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold text-zinc-600 leading-tight">Puntos de Acceso / Timecodes</span>
                    <span className="text-[8px] font-black text-white bg-zinc-400 px-1.5 py-0.5 rounded-sm uppercase tracking-tighter w-fit">FIAT</span>
                  </div>
                </td>
                <td className="py-2.5 px-4">
                  <div className="space-y-2">
                    {item.contenido.puntosAccesoTimecodes.map((tc, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs">
                        <span className="font-mono bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200 text-zinc-600">{tc.time}</span>
                        <span className="font-medium text-zinc-900">{tc.label}</span>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            )}
          </MetadataSection>

          {/* 4. Área Técnica y Soporte */}
          <MetadataSection title="4. Área Técnica y Soporte" icon={Settings}>
            <MetadataField label="Extensión y Soporte" value={item.tecnica.extensionSoporte} standard="ISAD" />
            <MetadataField label="Formato Digital (MIME Type)" value={item.tecnica.formatoDigital} standard="FIAF" />
            <MetadataField label="Duración" value={item.tecnica.duracion} standard="FIAT/FIAF" />
            <MetadataField label="Hash de Integridad (NAS)" value={item.tecnica.hashDigital} />
            
            {item.tecnica.caracteristicasVideo && (
              <tr className="border-b border-omeka-border group hover:bg-white transition-colors">
                <td className="py-2.5 px-4 w-1/3 align-top bg-zinc-50/50 group-hover:bg-white border-r border-omeka-border">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold text-zinc-600 leading-tight">Características de Video</span>
                    <span className="text-[8px] font-black text-white bg-zinc-400 px-1.5 py-0.5 rounded-sm uppercase tracking-tighter w-fit">FIAT</span>
                  </div>
                </td>
                <td className="py-2.5 px-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-xs">
                      <Monitor size={12} className="text-zinc-400" />
                      <span className="text-zinc-500">Res:</span> <span className="font-bold">{item.tecnica.caracteristicasVideo.resolucion}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <FileText size={12} className="text-zinc-400" />
                      <span className="text-zinc-500">Ratio:</span> <span className="font-bold">{item.tecnica.caracteristicasVideo.aspectRatio}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Settings size={12} className="text-zinc-400" />
                      <span className="text-zinc-500">Bitrate:</span> <span className="font-bold">{item.tecnica.caracteristicasVideo.bitrate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Clock size={12} className="text-zinc-400" />
                      <span className="text-zinc-500">FPS:</span> <span className="font-bold">{item.tecnica.caracteristicasVideo.fps}</span>
                    </div>
                  </div>
                </td>
              </tr>
            )}

            {item.tecnica.caracteristicasAudio && (
              <tr className="border-b border-omeka-border group hover:bg-white transition-colors">
                <td className="py-2.5 px-4 w-1/3 align-top bg-zinc-50/50 group-hover:bg-white border-r border-omeka-border">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold text-zinc-600 leading-tight">Características de Audio</span>
                    <span className="text-[8px] font-black text-white bg-zinc-400 px-1.5 py-0.5 rounded-sm uppercase tracking-tighter w-fit">FIAT</span>
                  </div>
                </td>
                <td className="py-2.5 px-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-xs">
                      <Volume2 size={12} className="text-zinc-400" />
                      <span className="text-zinc-500">Canales:</span> <span className="font-bold">{item.tecnica.caracteristicasAudio.canales}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Settings size={12} className="text-zinc-400" />
                      <span className="text-zinc-500">Sample:</span> <span className="font-bold">{item.tecnica.caracteristicasAudio.sampleRate}</span>
                    </div>
                  </div>
                </td>
              </tr>
            )}

            <MetadataField label="Estado de Conservación" value={item.tecnica.estadoConservacion} standard="FIAF" />
            <MetadataField label="Requisitos de Software" value={item.tecnica.requisitosSoftware} standard="ISAD" />
          </MetadataSection>

          {/* 5. Área de Acceso y Uso */}
          <MetadataSection title="5. Área de Acceso y Uso" icon={Shield}>
            <MetadataField label="Condiciones de Acceso" value={item.acceso.condicionesAcceso} standard="ISAD" />
            <MetadataField label="Condiciones de Reproducción" value={item.acceso.condicionesReproduccion} standard="ISAD" />
            <MetadataField label="Licencia de Uso / Derechos" value={item.acceso.licenciaUso} standard="ISAD/FIAF" />
            <MetadataField label="Lengua / Escritura" value={item.acceso.lenguaEscritura} standard="ISAD" />
            <MetadataField label="Disponibilidad de Originales" value={item.acceso.disponibilidadOriginales} standard="ISAD" />
            <MetadataField label="Unidades Relacionadas" value={item.acceso.unidadesRelacionadas} standard="ISAD" />
            <MetadataField label="Publicaciones Relacionadas" value={item.acceso.publicacionesRelacionadas} standard="ISAD" />
          </MetadataSection>

          {/* 6. Área de Control */}
          <MetadataSection title="6. Área de Control (Metadoc)" icon={LinkIcon}>
            <MetadataField label="Reglas de Descripción" value={item.control.reglasConvenciones} standard="ISAD" />
            <MetadataField label="Estado de Elaboración" value={item.control.estadoElaboracion} />
            <MetadataField label="Fecha de la Descripción" value={item.control.fechaDescripcion} standard="ISAD" />
            <MetadataField label="Institución Responsable" value={item.control.institucionResponsable} standard="ISDIAH" />
            <MetadataField label="Responsable de la Ficha" value={item.control.responsableFicha} standard="ISAAR" />
            <MetadataField label="Notas del Archivero" value={item.control.notas} />
          </MetadataSection>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-zinc-50 border border-omeka-border rounded-sm p-4 space-y-4 shadow-sm">
            <div className="aspect-video bg-white border border-zinc-200 rounded-sm overflow-hidden shadow-inner flex items-center justify-center">
              {item.thumbnailUrl ? (
                <img 
                  src={item.thumbnailUrl} 
                  alt="" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <FileText size={48} className="text-zinc-200" />
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                <span>Resource Type</span>
                <span className="text-zinc-900">{item.identificacion.tipoRecurso}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                <span>Access</span>
                <span className={`px-1.5 py-0.5 rounded-sm ${item.acceso.condicionesAcceso === 'Público' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {item.acceso.condicionesAcceso}
                </span>
              </div>
            </div>

            {item.identificacion.identificadorAccesoNAS && (
              <div className="pt-4 border-t border-zinc-200">
                <a 
                  href={item.identificacion.identificadorAccesoNAS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2 bg-omeka-blue text-white rounded-sm text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <HardDrive size={14} />
                  VIEW ON NAS
                  <ExternalLink size={12} />
                </a>
              </div>
            )}
          </div>

          <div className="bg-zinc-900 rounded-sm p-4 text-white shadow-lg">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex flex-col items-center justify-center gap-2 p-3 bg-zinc-800 hover:bg-zinc-700 rounded transition-colors border border-zinc-700">
                <FileText size={16} className="text-zinc-400" />
                <span className="text-[9px] font-bold uppercase tracking-tighter">Export PDF</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-3 bg-zinc-800 hover:bg-zinc-700 rounded transition-colors border border-zinc-700">
                <LinkIcon size={16} className="text-zinc-400" />
                <span className="text-[9px] font-bold uppercase tracking-tighter">Copy URI</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
