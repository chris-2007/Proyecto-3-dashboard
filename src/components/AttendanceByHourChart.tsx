import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { AsistenciaHora } from '../types/partido'

interface Props {
  datos: AsistenciaHora[]
  compacto?: boolean
}

export default function AttendanceByHourChart({ datos, compacto = false }: Props) {
  const items = datos.map((d) => ({
    ...d,
    etiqueta: compacto ? d.hora : `${d.hora} (${d.partidos} partidos)`,
  }))
  const miles = (v: number) => v.toLocaleString('es-EC', { maximumFractionDigits: 0 })

  return (
    <div style={{ height: 260 }} role="img" aria-label="Asistencia promedio por franja horaria">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={items} margin={{ top: 16, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid vertical={false} stroke="#e3e6ee" />
          <XAxis
            dataKey="etiqueta"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: compacto ? 11 : 13 }}
          />
          <YAxis
            width={48}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11 }}
            tickFormatter={miles}
          />
          <Tooltip
            cursor={{ fill: 'rgba(66, 99, 235, 0.08)' }}
            formatter={(valor, _n, item) => [
              `${miles(Number(valor))} espectadores (${item.payload.partidos} partidos)`,
              'Promedio',
            ]}
          />
          <Bar dataKey="promedio" fill="#4263eb" radius={[4, 4, 0, 0]} maxBarSize={72}>
            <LabelList
              dataKey="promedio"
              position="top"
              fontSize={12}
              formatter={(v) => miles(Number(v))}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
