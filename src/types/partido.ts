export type Resultado = 'Local' | 'Visitante' | 'Empate'

export interface Partido {
  id: number
  fecha: string // AAAA-MM-DD
  hora: string // ISO UTC, ej. 2026-09-24T16:00:00Z
  liga: string
  grupo: string
  jornada: number
  local: string
  visitante: string
  golesLocal: number
  golesVisitante: number
  resultado: Resultado
  ganador: string // nombre del equipo o "Empate"
  golesTotales: number
  diferencia: number // golesLocal - golesVisitante
  puntosLocal: number
  puntosVisitante: number
  estadio: string
  asistencia: number | null
}

export interface Filtros {
  liga: string
  grupo: string
  jornada: string // '' = Todas
}

export const FILTROS_VACIOS: Filtros = { liga: '', grupo: '', jornada: '' }

export interface OpcionesFiltros {
  ligas: string[]
  grupos: string[]
  jornadas: string[]
}

export interface Kpis {
  promGoles: number | null
  promAsistencia: number | null
  difAbsProm: number | null
}

export interface EquipoPuntos {
  equipo: string
  puntos: number
  difGoles: number
}

export interface ResultadoCategoria {
  categoria: Resultado
  cantidad: number
  porcentaje: number
}

export interface AsistenciaHora {
  hora: string
  promedio: number
  partidos: number
}

export interface Columna {
  clave: keyof Partido
  titulo: string
  formato?: (valor: Partido[keyof Partido], partido: Partido) => string
}
