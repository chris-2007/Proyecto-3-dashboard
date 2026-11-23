import { useMemo, useState } from 'react'
import type { Columna, Partido, Resultado } from '../types/partido'
import { COLORES_RESULTADO } from '../utils/stats'
import EmptyState from './EmptyState'

interface Props {
  partidos: Partido[]
  columnas: Columna[]
  filasPorPagina?: number
  onOrdenar?: (clave: keyof Partido) => void
}

type Orden = { clave: keyof Partido; asc: boolean }

function comparar(a: Partido[keyof Partido], b: Partido[keyof Partido]): number {
  if (a === null) return b === null ? 0 : 1 // los null van al final
  if (b === null) return -1
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return String(a).localeCompare(String(b), 'es', { numeric: true })
}

export default function MatchesTable({ partidos, columnas, filasPorPagina = 10, onOrdenar }: Props) {
  const [orden, setOrden] = useState<Orden>({ clave: 'fecha', asc: true })
  const [pagina, setPagina] = useState(0)

  const ordenados = useMemo(() => {
    const copia = [...partidos].sort((a, b) => comparar(a[orden.clave], b[orden.clave]))
    return orden.asc ? copia : copia.reverse()
  }, [partidos, orden])

  if (partidos.length === 0) return <EmptyState mensaje="No hay partidos con los filtros actuales." />

  const totalPaginas = Math.ceil(ordenados.length / filasPorPagina)
  const paginaActual = Math.min(pagina, totalPaginas - 1)
  const filas = ordenados.slice(paginaActual * filasPorPagina, (paginaActual + 1) * filasPorPagina)

  const alOrdenar = (clave: keyof Partido) => {
    setOrden((o) => ({ clave, asc: o.clave === clave ? !o.asc : true }))
    onOrdenar?.(clave)
  }

  return (
    <div className="table">
      <div className="table__scroll">
        <table>
          <thead>
            <tr>
              {columnas.map((c) => (
                <th
                  key={c.titulo}
                  aria-sort={
                    orden.clave === c.clave ? (orden.asc ? 'ascending' : 'descending') : 'none'
                  }
                >
                  <button type="button" onClick={() => alOrdenar(c.clave)}>
                    {c.titulo}
                    {orden.clave === c.clave && (orden.asc ? ' ▲' : ' ▼')}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filas.map((p) => (
              <tr key={p.id}>
                {columnas.map((c) => {
                  const valor = p[c.clave]
                  if (c.clave === 'ganador') {
                    return (
                      <td key={c.titulo}>
                        <span
                          className="chip"
                          style={{ background: COLORES_RESULTADO[p.resultado as Resultado] }}
                          title={p.resultado}
                        />
                        {String(valor)}
                      </td>
                    )
                  }
                  return (
                    <td key={c.titulo}>
                      {c.formato ? c.formato(valor, p) : valor === null ? '—' : String(valor)}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table__pager">
        <span>
          Página {paginaActual + 1} de {totalPaginas} · {partidos.length} partidos
        </span>
        <div>
          <button
            type="button"
            className="btn btn--soft"
            disabled={paginaActual === 0}
            onClick={() => setPagina(paginaActual - 1)}
          >
            Anterior
          </button>
          <button
            type="button"
            className="btn btn--soft"
            disabled={paginaActual >= totalPaginas - 1}
            onClick={() => setPagina(paginaActual + 1)}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  )
}
