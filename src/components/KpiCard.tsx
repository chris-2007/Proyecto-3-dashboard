import { formatearNumero } from '../utils/stats'

interface Props {
  etiqueta: string
  valor: number | null
  decimales: number
  unidad: string
  nota?: string
}

export default function KpiCard({ etiqueta, valor, decimales, unidad, nota }: Props) {
  return (
    <article className="card kpi-card">
      <h4 className="kpi-card__etiqueta">{etiqueta}</h4>
      <p className="kpi-card__valor">
        {valor === null ? '—' : formatearNumero(valor, decimales)}
        {valor !== null && <span className="kpi-card__unidad"> {unidad}</span>}
      </p>
      {valor === null && <p className="kpi-card__nota">Sin datos con los filtros actuales.</p>}
      {nota && <p className="kpi-card__nota">{nota}</p>}
    </article>
  )
}
