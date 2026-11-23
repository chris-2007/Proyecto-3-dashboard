import KpiCard from './KpiCard'

interface Props {
  valor: number | null
  decimales: number
  unidad: string
}

export default function AverageGoalsPerMatch({ valor, decimales, unidad }: Props) {
  return (
    <KpiCard
      etiqueta="Promedio de goles por partido"
      valor={valor}
      decimales={decimales}
      unidad={unidad}
    />
  )
}
