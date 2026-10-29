export interface CatalogoOperativas {
  id: number
  titulo: string
  descripcion: string
  etiquetas: string[]
}

export const descripcionCatalogo = 'Acceso a los módulos operativos de Demo para ejecución, consulta e informes de automatizaciones vinculadas a infraestructuras corporativas.'

export const catalogos: CatalogoOperativas[] = [
  { id: 1, titulo: 'Catálogo 1', descripcion: 'Acceso al catalogo de operativas de gestión de componentes instalados en los servidores.', etiquetas: [] },
  { id: 2, titulo: 'Catálogo 2', descripcion: 'Acceso al catalogo de operativas de gestión del sistema.', etiquetas: ['#ipl', '#reinicio', '#redhat'] },
  { id: 3, titulo: 'Catálogo 3', descripcion: 'Acceso al catalogo de operativas especificas.', etiquetas: [] }
]

export const categorias = ['Categoría 1', 'Categoría 2', 'Categoría 3']

export const etiquetasTecnicas = ['Etiqueta 1', 'Etiqueta 2', 'Etiqueta 3']
