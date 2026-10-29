export interface AutomatizacionAsociada {
  id: number
  cambio: string
  descripcion: string
  hostnames: string
  creador: string
  grupoAsignado: string
}

export const gruposTecnologicos = ['GRUPO-OPERACION', 'GRUPO-OPERACION-WAN', 'GRUPO-INFRAESTRUCTURA-BASE']

const creadores = ['U2DS1804', 'U2DS1804', 'U2DS2177']

export const automatizacionesAsociadas: AutomatizacionAsociada[] = Array.from({ length: 22 }, (_, i) => ({
  id: i + 1,
  cambio: `CH${1758512 - i * 1373}`,
  descripcion: `Automatización ${i + 1}`,
  hostnames: i % 4 === 3 ? '' : `servidor${String((i % 6) + 1).padStart(2, '0')}.demo.local`,
  creador: creadores[i % creadores.length] as string,
  grupoAsignado: gruposTecnologicos[i % gruposTecnologicos.length] as string
}))
