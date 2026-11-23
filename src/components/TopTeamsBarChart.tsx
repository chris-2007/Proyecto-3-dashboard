import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { EquipoPuntos } from '../types/partido'

interface Props {
  datos: EquipoPuntos[]
  maximo?: number
  compacto?: boolean
}

export default function TopTeamsBarChart({ datos, maximo = 10, compacto = false }: Props) {
  const items = datos.slice(0, maximo)
  const abreviar = (nombre: string) =>
    compacto && nombre.length > 11 ? `${nombre.slice(0, 10)}…` : nombre

  return (
    <div
      style={{ height: items.length * 34 + 12 }}
      role="img"
      aria-label="Top de selecciones por puntos"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={items} layout="vertical" margin={{ top: 0, right: 32, bottom: 0, left: 0 }}>
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="equipo"
            width={compacto ? 86 : 120}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: compacto ? 11 : 13 }}
            tickFormatter={abreviar}
          />
          <Tooltip
            cursor={{ fill: 'rgba(66, 99, 235, 0.08)' }}
            formatter={(valor, _n, item) => [
              `${valor} pts (dif. de goles ${item.payload.difGoles})`,
              'Puntos',
            ]}
          />
          <Bar dataKey="puntos" fill="#4263eb" radius={[0, 4, 4, 0]} barSize={18}>
            <LabelList dataKey="puntos" position="right" fontSize={12} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
