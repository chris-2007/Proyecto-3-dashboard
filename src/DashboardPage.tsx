import { useMemo, useState } from 'react'
import useFetchData from './hooks/useFetchData'
import { useMediaQuery } from './hooks/useMediaQuery'
import { FILTROS_VACIOS } from './types/partido'
import type { Columna, Filtros } from './types/partido'
import {
  asistenciaPorHora,
  calcularKpis,
  COLORES_RESULTADO,
  distribucionResultados,
  filtrarPartidos,
  opcionesFiltros,
  topEquipos,
} from './utils/stats'

import AbsoluteAverageGoalDifference from './components/AbsoluteAverageGoalDifference'
import AttendanceByHourChart from './components/AttendanceByHourChart'
import AverageAttendance from './components/AverageAttendance'
import AverageGoalsPerMatch from './components/AverageGoalsPerMatch'
import ChartCard from './components/ChartCard'
import DashboardLayout from './components/DashboardLayout'
import EmptyState from './components/EmptyState'
import FilterBar from './components/FilterBar'
import Header from './components/Header'
import MatchesTable from './components/MatchesTable'
import PageTitle from './components/PageTitle'
import ResultsDonutChart from './components/ResultsDonutChart'
import Section from './components/Section'
import TabSwitcher from './components/TabSwitcher'
import TopTeamsBarChart from './components/TopTeamsBarChart'

const PESTANAS = [
  { id: 'kpi', texto: 'KPI' },
  { id: 'graficos', texto: 'Gráficos' },
  { id: 'detallado', texto: 'Detallado' },
]

const marcador = (p: { golesLocal: number; golesVisitante: number }) =>
  `${p.golesLocal} - ${p.golesVisitante}`

const COLUMNAS_ESCRITORIO: Columna[] = [
  { clave: 'fecha', titulo: 'Fecha' },
  { clave: 'liga', titulo: 'Liga' },
  { clave: 'grupo', titulo: 'Grupo' },
  { clave: 'jornada', titulo: 'Jornada' },
  { clave: 'local', titulo: 'Local' },
  { clave: 'golesTotales', titulo: 'Marcador', formato: (_v, p) => marcador(p) },
  { clave: 'visitante', titulo: 'Visitante' },
  { clave: 'ganador', titulo: 'Ganador' },
  { clave: 'estadio', titulo: 'Estadio' },
  {
    clave: 'asistencia',
    titulo: 'Asistencia',
    formato: (v) => (typeof v === 'number' ? v.toLocaleString('es-EC') : '—'),
  },
]

// En móvil: fecha, partido, marcador y ganador (según la planificación)
const COLUMNAS_MOVIL: Columna[] = [
  { clave: 'fecha', titulo: 'Fecha' },
  { clave: 'local', titulo: 'Partido', formato: (_v, p) => `${p.local} vs ${p.visitante}` },
  { clave: 'golesTotales', titulo: 'Marcador', formato: (_v, p) => marcador(p) },
  { clave: 'ganador', titulo: 'Ganador' },
]

export default function DashboardPage() {
  const { partidos, cargando, error, recargar } = useFetchData()
  const [filtros, setFiltros] = useState<Filtros>(FILTROS_VACIOS)
  const [pestanaActiva, setPestanaActiva] = useState('kpi')
  const esMovil = useMediaQuery('(max-width: 768px)')

  const partidosFiltrados = useMemo(() => filtrarPartidos(partidos, filtros), [partidos, filtros])
  const opciones = useMemo(() => opcionesFiltros(partidos, filtros), [partidos, filtros])
  const kpis = useMemo(() => calcularKpis(partidosFiltrados), [partidosFiltrados])
  const top = useMemo(() => topEquipos(partidosFiltrados, 10), [partidosFiltrados])
  const resultados = useMemo(() => distribucionResultados(partidosFiltrados), [partidosFiltrados])
  const porHora = useMemo(() => asistenciaPorHora(partidosFiltrados), [partidosFiltrados])

  const cambiarFiltro = (nombre: keyof Filtros, valor: string) =>
    setFiltros((f) => {
      const nuevo = { ...f, [nombre]: valor }
      // Jerarquía: al cambiar la liga o el grupo se reinician los niveles inferiores
      if (nombre === 'liga') return { ...nuevo, grupo: '', jornada: '' }
      if (nombre === 'grupo') return { ...nuevo, jornada: '' }
      return nuevo
    })

  // En móvil solo se monta la sección de la pestaña activa
  const ver = (id: string) => !esMovil || pestanaActiva === id

  if (cargando || error) {
    return (
      <div className="layout">
        <Header titulo="Panel de datos" subtitulo="UEFA Nations League 2026" />
        <EmptyState
          mensaje={cargando ? 'Cargando partidos desde Firebase…' : `Error al cargar los datos: ${error}`}
        />
        {error && (
          <p style={{ textAlign: 'center', marginTop: 16 }}>
            <button type="button" className="btn btn--soft" onClick={recargar}>
              Reintentar
            </button>
          </p>
        )}
      </div>
    )
  }

  return (
    <DashboardLayout
      header={<Header titulo="Panel de datos" subtitulo="UEFA Nations League 2026" />}
      filtros={
        <FilterBar
          filtros={filtros}
          opciones={opciones}
          onCambiarFiltro={cambiarFiltro}
          onLimpiar={() => setFiltros(FILTROS_VACIOS)}
        />
      }
      titulo={
        <PageTitle
          titulo="Fase de liga"
          descripcion={`${partidosFiltrados.length} de ${partidos.length} partidos finalizados con los filtros actuales.`}
        />
      }
      pestanas={
        esMovil ? (
          <TabSwitcher pestanas={PESTANAS} activa={pestanaActiva} onChange={setPestanaActiva} />
        ) : undefined
      }
    >
      {ver('kpi') && (
        <Section titulo="KPI" descripcion="Indicadores principales" cantidad={3}>
          <div className="grid-3">
            <AverageGoalsPerMatch valor={kpis.promGoles} decimales={2} unidad="goles" />
            <AverageAttendance valor={kpis.promAsistencia} decimales={0} unidad="espectadores" />
            <AbsoluteAverageGoalDifference valor={kpis.difAbsProm} decimales={2} unidad="goles" />
          </div>
        </Section>
      )}

      {ver('graficos') && (
        <Section titulo="Gráficos" descripcion="Visualizaciones principales" cantidad={3}>
          <div className="grid-3">
            <ChartCard
              titulo="Top 10 selecciones por puntos"
              subtitulo="Puntos como local y visitante; desempate por diferencia de goles."
              sinDatos={top.length === 0}
            >
              <TopTeamsBarChart datos={top} maximo={10} compacto={esMovil} />
            </ChartCard>

            <ChartCard
              titulo="Distribución de resultados"
              subtitulo="Victoria local, victoria visitante y empate."
              sinDatos={resultados.length === 0}
            >
              <ResultsDonutChart datos={resultados} colores={COLORES_RESULTADO} />
            </ChartCard>

            <ChartCard
              titulo="Asistencia por franja horaria"
              subtitulo="Promedio de espectadores según la hora de inicio (UTC)."
              nota="Parte de la diferencia puede deberse a la liga y no solo al horario: los partidos de las 16:00 suelen jugarse en estadios más pequeños."
              sinDatos={porHora.length === 0}
            >
              <AttendanceByHourChart datos={porHora} compacto={esMovil} />
            </ChartCard>
          </div>
        </Section>
      )}

      {ver('detallado') && (
        <Section titulo="Detallado" descripcion="Todos los partidos" cantidad={1}>
          <div className="card">
            <MatchesTable
              partidos={partidosFiltrados}
              columnas={esMovil ? COLUMNAS_MOVIL : COLUMNAS_ESCRITORIO}
              filasPorPagina={10}
            />
          </div>
        </Section>
      )}

    </DashboardLayout>
  )
}
