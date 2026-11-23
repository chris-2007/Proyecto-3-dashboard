import type { ReactNode } from 'react'

interface Props {
  header: ReactNode
  filtros: ReactNode
  titulo: ReactNode
  pestanas?: ReactNode
  children: ReactNode
}

export default function DashboardLayout({ header, filtros, titulo, pestanas, children }: Props) {
  return (
    <div className="layout">
      {header}
      <main className="layout__main">
        {filtros}
        {titulo}
        {pestanas}
        {children}
      </main>
    </div>
  )
}
