interface Props {
  mensaje: string
}

export default function EmptyState({ mensaje }: Props) {
  return (
    <div className="empty-state" role="status">
      {mensaje}
    </div>
  )
}
