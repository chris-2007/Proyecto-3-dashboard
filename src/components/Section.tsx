import type { ReactNode } from 'react'

interface Props {
  titulo: string
  descripcion: string
  cantidad: number
  children: ReactNode
}

export default function Section({ titulo, descripcion, cantidad, children }: Props) {
  return (
    <section className="section" aria-label={titulo}>
      <div className="section__head">
        <h3>{titulo}</h3>
        <span className="section__desc">{descripcion}</span>
        <span className="section__count">
          {cantidad} {cantidad === 1 ? 'espacio' : 'espacios'}
        </span>
      </div>
      {children}
    </section>
  )
}
