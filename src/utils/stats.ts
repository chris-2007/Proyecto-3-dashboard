import type {
  AsistenciaHora,
  EquipoPuntos,
  Filtros,
  Kpis,
  OpcionesFiltros,
  Partido,
  Resultado,
  ResultadoCategoria,
} from '../types/partido'

export const COLORES_RESULTADO: Record<Resultado, string> = {
  Local: '#4263eb',
  Visitante: '#f08c00',
  Empate: '#868e96',
}

/** Franjas que muestra el gráfico (según la planificación). Hora UTC. */
export const FRANJAS_HORARIAS = ['16:00', '18:00']

const unicos = (valores: string[]) =>
  [...new Set(valores)].sort((a, b) => a.localeCompare(b, 'es', { numeric: true }))

const promedio = (valores: number[]): number | null =>
  valores.length === 0 ? null : valores.reduce((a, b) => a + b, 0) / valores.length

export function filtrarPartidos(partidos: Partido[], f: Filtros): Partido[] {
  return partidos.filter(
    (p) =>
      (!f.liga || p.liga === f.liga) &&
      (!f.grupo || p.grupo === f.grupo) &&
      (!f.jornada || String(p.jornada) === f.jornada),
  )
}

/** Opciones jerárquicas: Liga → Grupo → Jornada. */
export function opcionesFiltros(partidos: Partido[], f: Filtros): OpcionesFiltros {
  const porLiga = partidos.filter((p) => !f.liga || p.liga === f.liga)
  const porGrupo = porLiga.filter((p) => !f.grupo || p.grupo === f.grupo)
  return {
    ligas: unicos(partidos.map((p) => p.liga)),
    grupos: unicos(porLiga.map((p) => p.grupo)),
    jornadas: unicos(porGrupo.map((p) => String(p.jornada))),
  }
}

export function calcularKpis(partidos: Partido[]): Kpis {
  return {
    promGoles: promedio(partidos.map((p) => p.golesTotales)),
    // Los partidos sin asistencia (null) se excluyen, no cuentan como 0
    promAsistencia: promedio(
      partidos.flatMap((p) => (p.asistencia === null ? [] : [p.asistencia])),
    ),
    difAbsProm: promedio(partidos.map((p) => Math.abs(p.diferencia))),
  }
}

/** Top por puntos (local + visitante); desempata por diferencia de goles. */
export function topEquipos(partidos: Partido[], maximo = 10): EquipoPuntos[] {
  const mapa = new Map<string, { puntos: number; dif: number }>()
  const sumar = (equipo: string, puntos: number, dif: number) => {
    const a = mapa.get(equipo) ?? { puntos: 0, dif: 0 }
    a.puntos += puntos
    a.dif += dif
    mapa.set(equipo, a)
  }
  for (const p of partidos) {
    sumar(p.local, p.puntosLocal, p.diferencia)
    sumar(p.visitante, p.puntosVisitante, -p.diferencia)
  }
  return [...mapa]
    .map(([equipo, v]) => ({ equipo, puntos: v.puntos, difGoles: v.dif }))
    .sort(
      (a, b) =>
        b.puntos - a.puntos || b.difGoles - a.difGoles || a.equipo.localeCompare(b.equipo),
    )
    .slice(0, maximo)
}

export function distribucionResultados(partidos: Partido[]): ResultadoCategoria[] {
  const total = partidos.length
  if (total === 0) return []
  const categorias: Resultado[] = ['Local', 'Visitante', 'Empate']
  return categorias.map((categoria) => {
    const cantidad = partidos.filter((p) => p.resultado === categoria).length
    return { categoria, cantidad, porcentaje: Math.round((cantidad / total) * 1000) / 10 }
  })
}

export function asistenciaPorHora(partidos: Partido[]): AsistenciaHora[] {
  return FRANJAS_HORARIAS.flatMap((hora) => {
    const delaHora = partidos.filter((p) => p.hora.slice(11, 13) === hora.slice(0, 2))
    const conDato = delaHora.flatMap((p) => (p.asistencia === null ? [] : [p.asistencia]))
    const prom = promedio(conDato)
    return prom === null ? [] : [{ hora, promedio: prom, partidos: delaHora.length }]
  })
}

export function formatearNumero(valor: number, decimales: number): string {
  return valor.toLocaleString('es-EC', {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  })
}
