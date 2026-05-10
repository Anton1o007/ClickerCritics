# ClickerCritics

ClickerCritics es una plataforma web de crítica y descubrimiento de videojuegos. Permite explorar catálogos de juegos, publicar críticas con puntuación, gestionar listas personales (juegos jugados y wishlist) y calcular rankings con ponderación configurable entre valoraciones de usuarios y profesionales.

## Tabla de contenidos

- [Características](#características)
- [Arquitectura](#arquitectura)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Configuración de entorno](#configuración-de-entorno)
- [Instalación y ejecución local](#instalación-y-ejecución-local)
- [Testing](#testing)
- [API (resumen de módulos)](#api-resumen-de-módulos)
- [Modelo de datos (alto nivel)](#modelo-de-datos-alto-nivel)
- [Despliegue](#despliegue)
- [Limitaciones conocidas y mejoras recomendadas](#limitaciones-conocidas-y-mejoras-recomendadas)
- [Licencia](#licencia)

## Características

- Autenticación JWT (`register`, `login`, renovación de token).
- Gestión de perfiles de usuario con roles: `USER`, `PROFESSIONAL`, `ADMIN`.
- Catálogo de juegos con filtros por género, plataforma, estado de lanzamiento y score.
- Ranking de juegos con media ponderada por tipo de crítico.
- Publicación y borrado de críticas por juego con validación de puntuaciones extremas.
- Gestión de biblioteca personal (estado: `NOT_STARTED`, `IN_PROGRESS`, `COMPLETED`).
- Wishlist con notificación por email cuando llega la fecha de lanzamiento.
- Carga de datos de IGDB (Twitch API) para poblar catálogo.

## Arquitectura

Monorepo dividido en dos aplicaciones:

- `back-end`: API REST con FastAPI + MongoDB.
- `front-end`: cliente web en Next.js + React + TypeScript.

Comunicación por HTTP/JSON. El frontend consume la API para autenticación, listado de juegos, gestión de críticas y datos de usuario.

## Stack tecnológico

### Back-end

- Python 3.11.x
- FastAPI
- Uvicorn
- MongoDB + PyMongo
- Autenticación JWT (`python-jose`)
- Hash de contraseñas (`passlib` + `bcrypt`)
- APScheduler (tareas programadas)
- Pytest

### Front-end

- Next.js 13
- React 18
- TypeScript
- Styled Components

## Estructura del proyecto

```text
ClickerCritics/
├─ back-end/
│  ├─ db/                 # cliente, modelos y esquemas
│  ├─ routers/            # módulos de API
│  ├─ tests/              # tests backend
│  ├─ utils/              # utilidades (email)
│  ├─ main.py             # entrypoint FastAPI
│  └─ requirements.txt
├─ front-end/
│  ├─ src/
│  │  ├─ pages/           # rutas Next.js
│  │  ├─ components/      # componentes UI
│  │  ├─ containers/      # composición de vistas
│  │  └─ models/          # tipos TS
│  └─ package.json
├─ .env.example
└─ README.md
```

## Requisitos previos

- Python `3.11.6` (recomendado).
- Node.js `>=18` y npm.
- MongoDB accesible (local o Atlas).
- Credenciales Twitch/IGDB para ingesta de catálogo.
- Cuenta SMTP para notificaciones por email.

## Configuración de entorno

Crear un archivo `.env` en la raíz del proyecto tomando como base `.env.example`.

Variables definidas actualmente:

```env
# Backend
MONGODB_URI=
MONGODB_DB_NAME=
JWT_SECRET=
JWT_ALGORITHM=HS256
ACCESS_TOKEN_DURATION_MINUTES=60
TWITCH_CLIENT_ID=
TWITCH_CLIENT_SECRET=
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM_EMAIL=

# Frontend
NEXT_PUBLIC_API_BASE_URL=
```

Notas importantes:

- `JWT_SECRET` debe ser una cadena larga y aleatoria en entornos reales.
- `NEXT_PUBLIC_API_BASE_URL` existe en el ejemplo, pero actualmente gran parte del frontend consume una URL hardcodeada de Render. Para trabajo local, se recomienda homogeneizar ese consumo (ver sección de mejoras).

## Instalación y ejecución local

### 1) Back-end

```bash
cd back-end
python -m venv .venv
# Windows PowerShell
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API disponible en:

- `http://localhost:8000`
- Swagger UI: `http://localhost:8000/docs`

### 2) Front-end

En otra terminal:

```bash
cd front-end
npm install
npm run build
npm run dev
```

Aplicación disponible en:

- `http://localhost:3000`

## Testing

Desde `back-end/`:

```bash
pytest -v
```

También existe un runner agregado:

```bash
python tests/test_all.py
```

Cobertura funcional actual de tests:

- `critics`
- `games`
- `score_weights`
- `user_games`
- `users`
- `wishlist`

## API (resumen de módulos)

Rutas principales por dominio:

- `/auth`: registro, login, renovación de token.
- `/user`: perfil, actualización, borrado, géneros destacados, juegos puntuados, listado (admin).
- `/game`: listado, detalle, búsqueda, filtros, plataformas/géneros únicos.
- `/critic`: creación/borrado de críticas, listados por juego/usuario, ratings agregados.
- `/user_games`: alta/baja de juegos del usuario y actualización de estado.
- `/wishlist`: alta/baja/listado de wishlist y comprobaciones.
- `/score_weights`: lectura y actualización de pesos usuario/profesional.

Para detalle de contratos, usar Swagger en `GET /docs` cuando la API esté en ejecución.

## Modelo de datos (alto nivel)

Entidades y colecciones principales:

- `users`
- `games`
- `critics`
- `user_games`
- `wishlist`
- `score_weights`
- `platforms`
- `genres`

Relaciones clave:

- Un usuario puede tener múltiples críticas y múltiples juegos en biblioteca.
- Una crítica referencia un juego (`gameId`) y un usuario (`userId`).
- La wishlist agrupa `userIds` por `gameId`.
- Los pesos de score se guardan por usuario y afectan al cálculo de ranking.

## Despliegue

Se referencia una versión desplegada del frontend en Vercel y backend en Render en la documentación del proyecto original.

Para producción se recomienda:

- Definir `allow_origins` de CORS con dominios explícitos (no `*`).
- Configurar secretos y credenciales por entorno.
- Activar observabilidad (logs estructurados, métricas, alertas).
- Ejecutar migraciones/seed de datos de forma controlada.

## Limitaciones conocidas y mejoras recomendadas

- El frontend consume mayoritariamente endpoints hardcodeados a Render en lugar de usar `NEXT_PUBLIC_API_BASE_URL` de forma centralizada.
- La detección de toxicidad en críticas está desactivada en backend (código comentado).
- CORS está abierto globalmente (`*`) en la configuración actual.
- No hay `Dockerfile` ni `docker-compose` para bootstrap reproducible del entorno.

## Licencia

Este proyecto incluye un archivo [LICENSE](./LICENSE). Revisa ese archivo para el detalle legal de uso, modificación y distribución.
