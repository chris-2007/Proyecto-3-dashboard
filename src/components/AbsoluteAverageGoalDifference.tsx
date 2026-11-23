import KpiCard from './KpiCard'

interface Props {
  valor: number | null
  decimales: number
  unidad: string
}

export default function AbsoluteAverageGoalDifference({ valor, decimales, unidad }: Props) {
  return (
    <KpiCard
      etiqueta="Diferencia de goles promedio"
      valor={valor}
      decimales={decimales}
      unidad={unidad}
      nota="Valor absoluto: mientras más bajo, más parejos los partidos."
    />
  )
}
