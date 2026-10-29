export interface Tarjeta {
  id: number
  nombre: string
  icono: string
  jt: number
  favorita: boolean
  activa: boolean
}

const iconos = ['pi pi-clipboard', 'pi pi-cog', 'pi pi-th-large', 'pi pi-cog', 'pi pi-cog', 'pi pi-cog']
const jts = [5, 5, 3, 3, 5, 0]

export function crearTarjetas(nombreBase: string, cantidad: number): Tarjeta[] {
  return Array.from({ length: cantidad }, (_, i) => ({
    id: i + 1,
    nombre: `${nombreBase} ${i + 1}`,
    icono: iconos[i % iconos.length] as string,
    jt: jts[i % jts.length] as number,
    favorita: i % 5 === 0,
    activa: i % 7 !== 6
  }))
}
