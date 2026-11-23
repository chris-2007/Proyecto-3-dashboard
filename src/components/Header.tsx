interface Props {
  titulo: string
  subtitulo: string
}

export default function Header({ titulo, subtitulo }: Props) {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo" aria-hidden="true" />
        <h1 className="header__titulo">{titulo}</h1>
      </div>
      <p className="header__subtitulo">{subtitulo}</p>
    </header>
  )
}
