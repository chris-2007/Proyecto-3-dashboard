import type { ReactNode } from 'react'
import EmptyState from './EmptyState'

interface Props {
  titulo: string
  subtitulo: string
  nota?: string
  sinDatos: boolean
  children: ReactNode
}

export default function ChartCard({ titulo, subtitulo, nota, sinDatos, children }: Props) {
  return (
    <article className="card chart-card">
      <h4>{titulo}</h4>
      <p className="chart-card__sub">{subtitulo}</p>
      <div className="chart-card__body">
        {sinDatos ? <EmptyState mensaje="No hay partidos con los filtros actuales." /> : children}
      </div>
      {nota && <p className="chart-card__nota">{nota}</p>}
    </article>
  )
}
