import { useCallback, useEffect, useState } from 'react'
import { obtenerPartidos } from '../services/partidosService'
import type { Partido } from '../types/partido'

export default function useFetchData() {
  const [partidos, setPartidos] = useState<Partido[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [intento, setIntento] = useState(0)

  // Se ejecuta al montar el componente y cada vez que cambia "intento" (reintentar)
  useEffect(() => {
    let cancelado = false

    async function cargarDatos() {
      try {
        const datos = await obtenerPartidos()
        if (!cancelado) setPartidos(datos)
      } catch (e) {
        if (!cancelado) {
          setError(e instanceof Error ? e.message : 'No se pudieron cargar los partidos.')
        }
      } finally {
        if (!cancelado) setCargando(false)
      }
    }

    cargarDatos()

    // Evita actualizar el estado si el componente se desmonta durante la consulta
    return () => {
      cancelado = true
    }
  }, [intento])

  const recargar = useCallback(() => {
    setCargando(true)
    setError(null)
    setIntento((n) => n + 1)
  }, [])

  return { partidos, cargando, error, recargar }
}
