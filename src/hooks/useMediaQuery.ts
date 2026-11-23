import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [coincide, setCoincide] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const alCambiar = () => setCoincide(mql.matches)
    alCambiar()
    mql.addEventListener('change', alCambiar)
    return () => mql.removeEventListener('change', alCambiar)
  }, [query])

  return coincide
}
