import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { ResultadoCategoria } from '../types/partido'

interface Props {
  datos: ResultadoCategoria[]
  colores: Record<string, string>
}

export default function ResultsDonutChart({ datos, colores }: Props) {
  return (
    <div className="donut">
      <div className="donut__chart" role="img" aria-label="Distribución de resultados">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={datos}
              dataKey="cantidad"
              nameKey="categoria"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={2}
              stroke="none"
            >
              {datos.map((d) => (
                <Cell key={d.categoria} fill={colores[d.categoria]} />
              ))}
            </Pie>
            <Tooltip formatter={(valor, nombre) => [`${valor} partidos`, nombre]} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="donut__leyenda">
        {datos.map((d) => (
          <li key={d.categoria}>
            <span className="dot" style={{ background: colores[d.categoria] }} />
            <span>{d.categoria}</span>
            <strong>{d.porcentaje}%</strong>
            <span className="muted">({d.cantidad})</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
