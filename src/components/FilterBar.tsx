import type { Filtros, OpcionesFiltros } from '../types/partido'
import FilterSelect from './FilterSelect'

interface Props {
  filtros: Filtros
  opciones: OpcionesFiltros
  onCambiarFiltro: (nombre: keyof Filtros, valor: string) => void
  onLimpiar: () => void
}

export default function FilterBar({ filtros, opciones, onCambiarFiltro, onLimpiar }: Props) {
  return (
    <div className="filter-bar">
      <FilterSelect
        etiqueta="Liga"
        opciones={opciones.ligas}
        valor={filtros.liga}
        onChange={(v) => onCambiarFiltro('liga', v)}
      />
      <FilterSelect
        etiqueta="Grupo"
        opciones={opciones.grupos}
        valor={filtros.grupo}
        onChange={(v) => onCambiarFiltro('grupo', v)}
      />
      <FilterSelect
        etiqueta="Jornada"
        opciones={opciones.jornadas}
        valor={filtros.jornada}
        onChange={(v) => onCambiarFiltro('jornada', v)}
      />
      <button type="button" className="btn btn--soft" onClick={onLimpiar}>
        Limpiar filtros
      </button>
    </div>
  )
}
