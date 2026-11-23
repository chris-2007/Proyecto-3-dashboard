interface Pestana {
  id: string
  texto: string
}

interface Props {
  pestanas: Pestana[]
  activa: string
  onChange: (id: string) => void
}

export default function TabSwitcher({ pestanas, activa, onChange }: Props) {
  return (
    <div className="tab-switcher" role="tablist">
      {pestanas.map((p) => (
        <button
          key={p.id}
          type="button"
          role="tab"
          aria-selected={p.id === activa}
          className={p.id === activa ? 'tab tab--activa' : 'tab'}
          onClick={() => onChange(p.id)}
        >
          {p.texto}
        </button>
      ))}
    </div>
  )
}
