import raw from './finished_matches.json'
import type { Partido, Resultado } from '../types/partido'

// Estructura generada por transformar.py (Sprint 1)
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
  match_attendance: number | null
}

export const partidos: Partido[] = (raw as unknown as PartidoJson[]).map((r) => ({
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
}))
