import KpiCard from './KpiCard'

interface Props {
  valor: number | null
  decimales: number
  unidad: string
}

export default function AverageAttendance({ valor, decimales, unidad }: Props) {
  return (
    <KpiCard
      etiqueta="Asistencia promedio"
      valor={valor}
      decimales={decimales}
      unidad={unidad}
      nota="No incluye partidos sin dato de asistencia."
    />
  )
}
