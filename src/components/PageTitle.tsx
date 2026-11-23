interface Props {
  titulo: string
  descripcion: string
}

export default function PageTitle({ titulo, descripcion }: Props) {
  return (
    <div className="page-title">
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
    </div>
  )
}
