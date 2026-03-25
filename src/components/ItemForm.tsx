/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  ArchivalItem, 
  NivelDescripcion, 
  TipoRecurso, 
  CondicionAcceso, 
  EstadoElaboracion 
} from "../types";
import { 
  ArrowLeft, 
  Save, 
  Info, 
  Users, 
  FileText, 
  Settings, 
  Shield, 
  Link as LinkIcon,
  X,
  HardDrive,
} from "lucide-react";

interface ItemFormProps {
  onBack: () => void;
  onSave: (item: Partial<ArchivalItem>) => void;
}

type FormTab = "identificacion" | "contexto" | "contenido" | "tecnica" | "acceso" | "control" | "media";

export default function ItemForm({ onBack, onSave }: ItemFormProps) {
  const [activeTab, setActiveTab] = useState<FormTab>("identificacion");
  
  // Form state
  const [formData, setFormData] = useState<Partial<ArchivalItem>>({
    identificacion: {
      codigoReferencia: "",
      titulo: "",
      fechaCreacion: "",
      nivelDescripcion: NivelDescripcion.ITEM,
      tipoRecurso: TipoRecurso.PAPEL,
      volumenSoporte: "",
      identificadorRepositorio: "ISDIAH-UNT-DDA",
      ubicacionDeposito: "",
    },
    contexto: {
      productor: "",
      historiaInstitucional: "",
      historiaArchivistica: "",
      formaIngreso: "",
    },
    contenido: {
      alcanceContenido: "",
      palabrasClave: [],
      sistemaOrganizacion: "",
    },
    tecnica: {
      extensionSoporte: "",
      estadoConservacion: "",
      requisitosSoftware: "",
    },
    acceso: {
      condicionesAcceso: CondicionAcceso.PUBLICO,
      licenciaUso: "",
      lenguaEscritura: "",
      disponibilidadOriginales: "",
    },
    control: {
      reglasConvenciones: "ISAD(G), ISAAR(CPF), ISDIAH, FIAF, FIAT",
      estadoElaboracion: EstadoElaboracion.BORRADOR,
      fechaDescripcion: new Date().toISOString().split('T')[0],
      institucionResponsable: "Departamento de Documentación y Archivo - UNT",
      responsableFicha: "",
    },
    media: []
  });

  const handleInputChange = (section: keyof ArchivalItem, field: string, value: any, subfield?: string) => {
    setFormData(prev => {
      const sectionData = { ...(prev[section] as any) };
      
      if (subfield) {
        sectionData[field] = {
          ...sectionData[field],
          [subfield]: value
        };
      } else {
        sectionData[field] = value;
      }

      return {
        ...prev,
        [section]: sectionData
      };
    });
  };

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag !== "");
    handleInputChange('contenido', 'palabrasClave', tags);
  };

  const handleAddTimecode = () => {
    setFormData(prev => {
      const timecodes = [...(prev.contenido?.puntosAccesoTimecodes || [])];
      timecodes.push({ time: "00:00:00", label: "" });
      return {
        ...prev,
        contenido: {
          ...prev.contenido!,
          puntosAccesoTimecodes: timecodes
        }
      };
    });
  };

  const handleRemoveTimecode = (index: number) => {
    setFormData(prev => {
      const timecodes = [...(prev.contenido?.puntosAccesoTimecodes || [])];
      timecodes.splice(index, 1);
      return {
        ...prev,
        contenido: {
          ...prev.contenido!,
          puntosAccesoTimecodes: timecodes
        }
      };
    });
  };

  const handleTimecodeChange = (index: number, field: 'time' | 'label', value: string) => {
    setFormData(prev => {
      const timecodes = [...(prev.contenido?.puntosAccesoTimecodes || [])];
      timecodes[index] = { ...timecodes[index], [field]: value };
      return {
        ...prev,
        contenido: {
          ...prev.contenido!,
          puntosAccesoTimecodes: timecodes
        }
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const renderField = (label: string, section: keyof ArchivalItem, field: string, type: string = "text", options?: any[], subfield?: string) => {
    const sectionData = formData[section] as any;
    const value = subfield ? sectionData?.[field]?.[subfield] : sectionData?.[field];
    
    return (
      <div className="mb-4">
        <label className="block text-[11px] font-black text-zinc-500 uppercase tracking-widest mb-1.5">
          {label}
        </label>
        {type === "select" ? (
          <select 
            value={value || ""}
            onChange={(e) => handleInputChange(section, field, e.target.value, subfield)}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-omeka-blue focus:border-omeka-blue outline-none transition-all"
          >
            <option value="">Select...</option>
            {options?.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : type === "textarea" ? (
          <textarea 
            value={value || ""}
            onChange={(e) => handleInputChange(section, field, e.target.value, subfield)}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-omeka-blue focus:border-omeka-blue outline-none transition-all min-h-[100px]"
          />
        ) : (
          <input 
            type={type}
            value={value || ""}
            onChange={(e) => handleInputChange(section, field, e.target.value, subfield)}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-omeka-blue focus:border-omeka-blue outline-none transition-all"
          />
        )}
      </div>
    );
  };

  const tabs = [
    { id: "identificacion", label: "1. Identificación", icon: Info },
    { id: "contexto", label: "2. Contexto", icon: Users },
    { id: "contenido", label: "3. Contenido", icon: FileText },
    { id: "tecnica", label: "4. Técnica", icon: Settings },
    { id: "acceso", label: "5. Acceso", icon: Shield },
    { id: "control", label: "6. Control", icon: LinkIcon },
    { id: "media", label: "7. Media", icon: HardDrive },
  ];

  return (
    <div className="flex-1 bg-white overflow-hidden flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-omeka-border px-6 py-3 flex items-center justify-between z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-1.5 text-zinc-500 hover:bg-zinc-100 rounded transition-colors"
          >
            <X size={18} />
          </button>
          <h1 className="text-base font-bold text-zinc-900 leading-none">
            Add New Item
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onBack}
            className="px-4 py-1.5 bg-white text-zinc-600 border border-zinc-200 rounded-sm text-xs font-bold hover:bg-zinc-50 transition-colors"
          >
            CANCEL
          </button>
          <button 
            onClick={handleSubmit}
            className="flex items-center gap-2 px-4 py-1.5 bg-omeka-blue text-white rounded-sm text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Save size={14} />
            SAVE ITEM
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Tab Sidebar */}
        <div className="w-64 bg-zinc-50 border-r border-omeka-border overflow-y-auto">
          <div className="p-4">
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">Form Sections</p>
            <div className="space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as FormTab)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-sm text-xs font-bold transition-all ${
                    activeTab === tab.id 
                      ? "bg-white text-omeka-blue shadow-sm border border-omeka-border" 
                      : "text-zinc-500 hover:bg-zinc-200/50"
                  }`}
                >
                  <tab.icon size={14} className={activeTab === tab.id ? "text-omeka-blue" : "text-zinc-400"} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-white">
          <form className="max-w-3xl" onSubmit={handleSubmit}>
            {activeTab === "identificacion" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-2 pb-4 border-b border-zinc-100 mb-6">
                  <Info size={18} className="text-omeka-blue" />
                  <h2 className="text-sm font-black text-zinc-700 uppercase tracking-widest">Área de Identificación</h2>
                </div>
                {renderField("Código de Referencia (ISAD)", "identificacion", "codigoReferencia")}
                {renderField("Título (ISAD/FIAF)", "identificacion", "titulo")}
                {renderField("Fecha de Creación/Emisión (ISO 8601)", "identificacion", "fechaCreacion", "date")}
                {renderField("Nivel de Descripción", "identificacion", "nivelDescripcion", "select", Object.values(NivelDescripcion))}
                {renderField("Tipo de Recurso", "identificacion", "tipoRecurso", "select", Object.values(TipoRecurso))}
                {renderField("Volumen y Soporte", "identificacion", "volumenSoporte")}
                {renderField("Identificador de Acceso (URL NAS)", "identificacion", "identificadorAccesoNAS", "url")}
                {renderField("Identificador Externo (DOI/Handle)", "identificacion", "identificadorExterno")}
                {renderField("Identificador del Repositorio (ISDIAH)", "identificacion", "identificadorRepositorio")}
                {renderField("Ubicación del Depósito (ISDIAH)", "identificacion", "ubicacionDeposito")}
              </div>
            )}

            {activeTab === "contexto" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-2 pb-4 border-b border-zinc-100 mb-6">
                  <Users size={18} className="text-omeka-blue" />
                  <h2 className="text-sm font-black text-zinc-700 uppercase tracking-widest">Área de Contexto y Autoría</h2>
                </div>
                {renderField("Productor / Creador (ISAD/ISAAR)", "contexto", "productor")}
                {renderField("Fechas del Productor (ISAAR)", "contexto", "fechasProductor")}
                {renderField("Créditos de Producción (FIAF/FIAT)", "contexto", "creditosProduccion", "textarea")}
                {renderField("Historia Institucional / Biográfica (ISAAR)", "contexto", "historiaInstitucional", "textarea")}
                {renderField("Historia Archivística (ISAD)", "contexto", "historiaArchivistica", "textarea")}
                {renderField("Forma de Ingreso (ISAD)", "contexto", "formaIngreso")}
              </div>
            )}

            {activeTab === "contenido" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-2 pb-4 border-b border-zinc-100 mb-6">
                  <FileText size={18} className="text-omeka-blue" />
                  <h2 className="text-sm font-black text-zinc-700 uppercase tracking-widest">Área de Contenido y Estructura</h2>
                </div>
                {renderField("Alcance y Contenido / Sinopsis (ISAD/FIAF)", "contenido", "alcanceContenido", "textarea")}
                <div className="mb-4">
                  <label className="block text-[11px] font-black text-zinc-500 uppercase tracking-widest mb-1.5">
                    Palabras Clave (Separadas por coma)
                  </label>
                  <input 
                    type="text"
                    defaultValue={formData.contenido?.palabrasClave?.join(', ')}
                    onChange={(e) => handleTagsChange(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-omeka-blue focus:border-omeka-blue outline-none transition-all"
                  />
                </div>
                {renderField("Sistema de Organización (ISAD)", "contenido", "sistemaOrganizacion")}
                {renderField("Valoración y Selección (ISAD)", "contenido", "valoracionSeleccion", "textarea")}
                {renderField("Plazo de Conservación (ISAD)", "contenido", "plazoConservacion")}

                <div className="mt-8 pt-6 border-t border-zinc-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Puntos de Acceso / Timecodes (FIAT)</h3>
                    <button 
                      type="button"
                      onClick={handleAddTimecode}
                      className="text-[10px] font-bold text-omeka-blue hover:underline"
                    >
                      + ADD TIMECODE
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {formData.contenido?.puntosAccesoTimecodes?.map((tc, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="w-32">
                          <input 
                            type="text"
                            placeholder="00:00:00"
                            value={tc.time}
                            onChange={(e) => handleTimecodeChange(index, 'time', e.target.value)}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-sm px-3 py-2 text-xs font-mono focus:ring-1 focus:ring-omeka-blue focus:border-omeka-blue outline-none transition-all"
                          />
                        </div>
                        <div className="flex-1">
                          <input 
                            type="text"
                            placeholder="Description of the scene..."
                            value={tc.label}
                            onChange={(e) => handleTimecodeChange(index, 'label', e.target.value)}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-sm px-3 py-2 text-xs focus:ring-1 focus:ring-omeka-blue focus:border-omeka-blue outline-none transition-all"
                          />
                        </div>
                        <button 
                          type="button"
                          onClick={() => handleRemoveTimecode(index)}
                          className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {(!formData.contenido?.puntosAccesoTimecodes || formData.contenido.puntosAccesoTimecodes.length === 0) && (
                      <p className="text-[11px] text-zinc-400 italic">No timecodes added yet.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "tecnica" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-2 pb-4 border-b border-zinc-100 mb-6">
                  <Settings size={18} className="text-omeka-blue" />
                  <h2 className="text-sm font-black text-zinc-700 uppercase tracking-widest">Área Técnica y Soporte</h2>
                </div>
                {renderField("Extensión y Soporte (ISAD)", "tecnica", "extensionSoporte")}
                {renderField("Formato Digital (MIME Type)", "tecnica", "formatoDigital")}
                {renderField("Duración (HH:MM:SS)", "tecnica", "duracion")}
                {renderField("Hash de Integridad (MD5/SHA)", "tecnica", "hashDigital")}
                
                <div className="grid grid-cols-2 gap-4 p-4 bg-zinc-50 border border-zinc-200 rounded-sm">
                  <h3 className="col-span-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Video Specs (FIAT)</h3>
                  {renderField("Resolución", "tecnica", "caracteristicasVideo", "text", undefined, "resolucion")}
                  {renderField("Aspect Ratio", "tecnica", "caracteristicasVideo", "text", undefined, "aspectRatio")}
                  {renderField("Bitrate", "tecnica", "caracteristicasVideo", "text", undefined, "bitrate")}
                  {renderField("FPS", "tecnica", "caracteristicasVideo", "text", undefined, "fps")}
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-zinc-50 border border-zinc-200 rounded-sm">
                  <h3 className="col-span-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Audio Specs (FIAT)</h3>
                  {renderField("Canales", "tecnica", "caracteristicasAudio", "text", undefined, "canales")}
                  {renderField("Sample Rate", "tecnica", "caracteristicasAudio", "text", undefined, "sampleRate")}
                </div>

                {renderField("Estado de Conservación (FIAF)", "tecnica", "estadoConservacion")}
                {renderField("Requisitos de Software (ISAD)", "tecnica", "requisitosSoftware")}
              </div>
            )}

            {activeTab === "acceso" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-2 pb-4 border-b border-zinc-100 mb-6">
                  <Shield size={18} className="text-omeka-blue" />
                  <h2 className="text-sm font-black text-zinc-700 uppercase tracking-widest">Área de Acceso y Uso</h2>
                </div>
                {renderField("Condiciones de Acceso (ISAD)", "acceso", "condicionesAcceso", "select", Object.values(CondicionAcceso))}
                {renderField("Condiciones de Reproducción (ISAD)", "acceso", "condicionesReproduccion", "textarea")}
                {renderField("Licencia de Uso / Derechos (ISAD/FIAF)", "acceso", "licenciaUso")}
                {renderField("Lengua / Escritura (ISAD)", "acceso", "lenguaEscritura")}
                {renderField("Disponibilidad de Originales (ISAD)", "acceso", "disponibilidadOriginales")}
                {renderField("Unidades Relacionadas (ISAD)", "acceso", "unidadesRelacionadas", "textarea")}
                {renderField("Publicaciones Relacionadas (ISAD)", "acceso", "publicacionesRelacionadas", "textarea")}
              </div>
            )}

            {activeTab === "control" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-2 pb-4 border-b border-zinc-100 mb-6">
                  <LinkIcon size={18} className="text-omeka-blue" />
                  <h2 className="text-sm font-black text-zinc-700 uppercase tracking-widest">Área de Control (Metadoc)</h2>
                </div>
                {renderField("Reglas o Convenciones", "control", "reglasConvenciones")}
                {renderField("Estado de Elaboración", "control", "estadoElaboracion", "select", Object.values(EstadoElaboracion))}
                {renderField("Fecha de la Descripción", "control", "fechaDescripcion", "date")}
                {renderField("Institución Responsable (ISDIAH)", "control", "institucionResponsable")}
                {renderField("Responsable de la Ficha (ISAAR)", "control", "responsableFicha")}
                {renderField("Notas del Archivero", "control", "notas", "textarea")}
              </div>
            )}

            {activeTab === "media" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-2 pb-4 border-b border-zinc-100 mb-6">
                  <HardDrive size={18} className="text-omeka-blue" />
                  <h2 className="text-sm font-black text-zinc-700 uppercase tracking-widest">Media Attachments</h2>
                </div>
                
                <div className="bg-zinc-50 border border-dashed border-zinc-300 rounded-sm p-8 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mb-4 text-zinc-400">
                    <HardDrive size={24} />
                  </div>
                  <h3 className="text-xs font-bold text-zinc-900 mb-1 tracking-tight">Connect to NAS to upload media</h3>
                  <p className="text-[10px] text-zinc-500 max-w-[200px] leading-relaxed">
                    Media files are stored on the departmental NAS. Use the NAS Connector to sync files.
                  </p>
                  <button 
                    type="button"
                    className="mt-4 px-4 py-1.5 bg-white border border-zinc-200 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-zinc-50 transition-colors"
                  >
                    Open NAS Browser
                  </button>
                </div>

                <div className="mt-8">
                  <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">Linked Media</h3>
                  <div className="space-y-2">
                    {formData.media?.map((m, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white border border-zinc-200 rounded-sm shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-zinc-100 rounded flex items-center justify-center text-zinc-400">
                            <FileText size={14} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-zinc-900 leading-none">{m.titulo}</span>
                            <span className="text-[9px] font-mono text-zinc-400 mt-1 uppercase">{m.tipo} • {m.size}</span>
                          </div>
                        </div>
                        <button 
                          type="button"
                          className="p-1.5 text-zinc-400 hover:text-red-500 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {(!formData.media || formData.media.length === 0) && (
                      <p className="text-[11px] text-zinc-400 italic">No media attached yet.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-zinc-100 flex justify-end gap-3">
               <button 
                type="button"
                onClick={onBack}
                className="px-6 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-700 transition-colors"
              >
                DISCARD CHANGES
              </button>
              <button 
                type="submit"
                className="flex items-center gap-2 px-8 py-2 bg-omeka-blue text-white rounded-sm text-xs font-bold hover:bg-blue-700 transition-colors shadow-md"
              >
                <Save size={14} />
                SAVE NEW RESOURCE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
