/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum NivelDescripcion {
  FONDO = "Fondo",
  SERIE = "Serie",
  EXPEDIENTE = "Expediente",
  ITEM = "Ítem",
}

export enum EstadoElaboracion {
  BORRADOR = "Borrador",
  REVISADO = "Revisado",
  FINAL = "Final",
}

export enum CondicionAcceso {
  PUBLICO = "Público",
  RESERVADO = "Reservado",
  CONFIDENCIAL = "Confidencial",
}

export enum TipoRecurso {
  PAPEL = "Papel",
  FOTOGRAFIA = "Fotografía",
  PELICULA = "Película",
  VIDEO = "Video",
  AUDIO = "Audio",
  DIGITAL = "Digital",
}

export interface ArchivalItem {
  id: string;
  
  // 1. Área de Identificación
  identificacion: {
    codigoReferencia: string; // ISAD
    titulo: string; // ISAD/FIAF
    fechaCreacion: string; // ISO 8601
    nivelDescripcion: NivelDescripcion;
    tipoRecurso: TipoRecurso;
    volumenSoporte: string; // Cantidad y tipo
    identificadorAccesoNAS?: string; // URL NAS
    identificadorRepositorio: string; // ISDIAH
    ubicacionDeposito: string; // ISDIAH
    identificadorExterno?: string; // DOI, Handle, etc.
  };

  // 2. Área de Contexto y Autoría
  contexto: {
    productor: string; // ISAAR
    fechasProductor?: string; // Fechas de existencia del productor
    creditosProduccion?: string; // FIAF/FIAT (Audiovisual)
    historiaInstitucional: string; // ISAAR
    historiaArchivistica: string; // ISAD
    formaIngreso: string; // ISAD
  };

  // 3. Área de Contenido y Estructura
  contenido: {
    alcanceContenido: string; // ISAD/FIAF (Sinopsis)
    palabrasClave: string[]; // Tags
    sistemaOrganizacion: string; // ISAD
    valoracionSeleccion?: string; // ISAD
    plazoConservacion?: string; // Tiempo de retención
    puntosAccesoTimecodes?: { time: string; label: string }[]; // FIAT
  };

  // 4. Área Técnica y Soporte (NAS / Audiovisual)
  tecnica: {
    extensionSoporte: string;
    formatoDigital?: string; // MIME Type
    duracion?: string; // HH:MM:SS
    caracteristicasVideo?: {
      resolucion: string;
      aspectRatio: string;
      bitrate: string;
      fps: string;
    };
    caracteristicasAudio?: {
      canales: string;
      sampleRate: string;
    };
    estadoConservacion: string; // FIAF
    requisitosSoftware: string; // ISAD
    hashDigital?: string; // MD5/SHA para integridad en NAS
  };

  // 5. Área de Acceso y Uso
  acceso: {
    condicionesAcceso: CondicionAcceso;
    condicionesReproduccion?: string; // Reglas de copia
    licenciaUso: string; // Creative Commons, etc.
    lenguaEscritura: string;
    disponibilidadOriginales: string;
    unidadesRelacionadas?: string;
    publicacionesRelacionadas?: string;
  };

  // 6. Área de Control (Metadoc)
  control: {
    reglasConvenciones: string; // ISAD, ISAAR, etc.
    estadoElaboracion: EstadoElaboracion;
    fechaDescripcion: string;
    institucionResponsable: string; // ISDIAH
    responsableFicha: string; // ISAAR
    notas?: string; // Notas generales del archivero
  };

  // Visuals
  thumbnailUrl?: string;
  previewUrl?: string;
}
