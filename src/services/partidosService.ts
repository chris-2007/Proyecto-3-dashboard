import { get, ref } from 'firebase/database'
import { database } from '../firebase/firebase'
import type { Partido, Resultado } from '../types/partido'

const RUTA_PARTIDOS = 'partidos'

// Forma de cada nodo en Firebase (la misma de finished_matches.json)
interface PartidoJson {
  match_id: number
  matchday: number
  league_name: string
  group_name: string
  kickoff_date: string
  kickoff_time: string
  home_team_name: string
  away_team_name: string
  home_score: number
  away_score: number
  result: string
  winner_team_name: string
  total_goals: number
  goal_difference: number
  home_points: number
  away_points: number
  stadium_name: string
  // Firebase no guarda valores null: si no hay asistencia, la clave no existe
  match_attendance?: number | null
}

function adaptar(r: PartidoJson): Partido {
  return {
    id: r.match_id,
    fecha: r.kickoff_date,
    hora: r.kickoff_time,
    liga: r.league_name,
    grupo: r.group_name,
    jornada: r.matchday,
    local: r.home_team_name,
    visitante: r.away_team_name,
    golesLocal: r.home_score,
    golesVisitante: r.away_score,
    resultado: r.result as Resultado,
    ganador: r.winner_team_name === 'Draw' ? 'Empate' : r.winner_team_name,
    golesTotales: r.total_goals,
    diferencia: r.goal_difference,
    puntosLocal: r.home_points,
    puntosVisitante: r.away_points,
    estadio: r.stadium_name,
    asistencia: r.match_attendance ?? null,
  }
}

/** Lee una sola vez el nodo "partidos" y lo convierte al modelo Partido. */
export async function obtenerPartidos(): Promise<Partido[]> {
  const snapshot = await get(ref(database, RUTA_PARTIDOS))

  if (!snapshot.exists()) {
    throw new Error(
      `No hay datos en la ruta "${RUTA_PARTIDOS}". Revisa que el JSON se haya importado.`,
    )
  }

  // Firebase devuelve un objeto (clave = match_id) o un arreglo si las claves son 0, 1, 2…
  const valores = Object.values(snapshot.val() as Record<string, PartidoJson | null>)
  return valores.filter((r): r is PartidoJson => r !== null).map(adaptar)
}
