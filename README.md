# Demo ZTC

Prototipo de maqueta navegable para validar flujos de usuario y como base sobre la que se integrará el design system del proyecto.

> **Estado:** demo / prototipo. Todos los datos son simulados (mocks) y no hay conexión con ningún backend.

## Alcance

La aplicación cubre tres áreas funcionales, accesibles desde la barra lateral:

### 1. Crear cambio (`/crear-cambio`)
Catálogo de cambios presentado en tarjetas.
- Búsqueda por nombre.
- Filtros por estado (activas / deshabilitadas) y por favoritas.
- Ordenación ascendente / descendente.
- Paginación (6 tarjetas por página).
- Alta de nuevas ofertas y activación / deshabilitación de tarjetas.

### 2. Catálogo (`/catalogo`, `/catalogo/:id`)
Acceso a los módulos operativos agrupados por catálogo.
- Listado de catálogos con descripción y etiquetas técnicas.
- Vista de detalle de cada catálogo con panel de filtros (categoría, etiqueta técnica y búsqueda libre).

### 3. Gestión de Automatizaciones (`/gestionAutomatizaciones`)
Tabla de automatizaciones asociadas a cambios.
- Filtro global por grupo tecnológico y filtros por columna.
- Filas expandibles con el detalle de la automatización.
- Paginación (10 filas por página).
- Modal para asociar una nueva automatización (cambio, hostnames y grupo asignado).

### Fuera de alcance
- Integración con APIs o backend real.
- Autenticación y gestión de permisos.
- Persistencia: los cambios se pierden al recargar la página.
- Edición de tarjetas (la acción existe en la interfaz pero aún no tiene lógica).
- Lógica de los filtros en la vista de detalle del catálogo.

## Stack tecnológico

| Área | Tecnología |
|---|---|
| Framework | [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`) |
| Lenguaje | TypeScript |
| Build / dev server | [Vite](https://vitejs.dev/) |
| Enrutado | Vue Router |
| Componentes UI | [PrimeVue 4](https://primevue.org/) (tema Material) + PrimeIcons |
| Estilos | Tailwind CSS 3, Flowbite y SCSS |

## Requisitos

- Node.js 18 o superior
- npm

## Puesta en marcha

```bash
npm install       # instala dependencias
npm run dev       # servidor de desarrollo en http://localhost:5173
```

### Otros scripts

| Comando | Descripción |
|---|---|
| `npm run build` | Comprueba tipos con `vue-tsc` y genera el build de producción en `dist/` |
| `npm run preview` | Sirve localmente el build de producción |

## Estructura del proyecto

```
src/
├── components/
│   ├── layout/            # Navbar, Sidebar y contenedor principal
│   ├── CatalogoTarjetas.vue   # Catálogo de tarjetas reutilizable (búsqueda, filtros, paginación)
│   └── Modal.vue              # Modal genérico con slot de contenido y pie
├── pages/                 # Vistas asociadas a cada ruta
├── mocks/                 # Datos simulados de cada módulo
├── ds/                    # Reservado para la integración del design system
├── router.ts              # Definición de rutas
├── main.ts                # Arranque de la app y configuración de PrimeVue
└── style.scss             # Estilos globales
```


