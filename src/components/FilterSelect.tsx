interface Props {
  etiqueta: string
  opciones: string[]
  valor: string
  onChange: (valor: string) => void
  deshabilitado?: boolean
}

export default function FilterSelect({
  etiqueta,
  opciones,
  valor,
  onChange,
  deshabilitado = false,
}: Props) {
  return (
    <label className="filter-select">
      <span>{etiqueta}</span>
      <select
        value={valor}
        disabled={deshabilitado || opciones.length === 0}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Todas</option>
        {opciones.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}
