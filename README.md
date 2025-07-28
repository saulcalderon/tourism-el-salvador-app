# Tourism El Salvador App

## 📋 Descripción del Proyecto

Aplicación web para promover destinos turísticos de El Salvador. Permite registrar lugares, dar likes y explorar destinos.

### 🛠️ Stack Tecnológico

- **Frontend**: Next.js 15 + React 19 + TypeScript + TailwindCSS
- **Backend**: NestJS + TypeScript + Prisma ORM
- **Base de datos**: PostgreSQL 16
- **Containerización**: Docker & Docker Compose

## 🚀 Pasos para Levantar el Entorno

### Prerequisitos

- Node.js 18+ 
- Docker y Docker Compose
- Git

### 1. Clonar el Repositorio

```bash
git clone https://github.com/saulcalderon/tourism-el-salvador-app
cd tourism-el-salvador-app
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Database Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123
POSTGRES_DB=tourism_el_salvador
POSTGRES_PORT=5432
```

Crea un archivo `.env` en la raíz del proyecto api (apps/api) con las siguientes variables:

```env
# API Configuration
API_PORT=3000

# Prisma Database URL
DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/tourism_el_salvador?schema=public"
```

Crea un archivo `.env.local` en la raíz del proyecto web (apps/web) con las siguientes variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Levantar la Base de Datos

```bash
# Levantar PostgreSQL con Docker
docker-compose up -d
```

### 4. Configurar la API (Backend)

```bash
# Navegar al directorio de la API
cd apps/api

# Instalar dependencias
npm install

# Ejecutar migraciones
npm run db:migrate:dev

# Generar cliente de Prisma
npm run db:generate

# Iniciar en modo desarrollo
npm run start:dev
```

La API estará disponible en: `http://localhost:3000`

### 5. Configurar la Aplicación Web (Frontend)

```bash
# En una nueva terminal, navegar al directorio web
cd apps/web

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev
```

La aplicación web estará disponible en: `http://localhost:3001`

### Comandos de Testing

```bash
# Ejecutar tests en la API
cd apps/api && npm run test
```

### Comandos de Desarrollo

```bash
# Desarrollo API
cd apps/api && npm run start:dev

# Desarrollo Web
cd apps/web && npm run dev

# Formato de código (API)
cd apps/api && npm run format

# Linting API
cd apps/api && npm run lint

# Linting Web
cd apps/web && npm run lint
```

### Comandos de Producción

```bash
# Build de la API
cd apps/api && npm run build

# Ejecutar API en producción
cd apps/api && npm run start:prod

# Build de la aplicación web
cd apps/web && npm run build

# Ejecutar web en producción
cd apps/web && npm run start
```

## 🗂️ Estructura del Proyecto

```
tourism-el-salvador-app/
├── apps/
│   ├── api/                    # Backend NestJS
│   │   ├── src/
│   │   │   ├── modules/        # Módulos de la aplicación
│   │   │   ├── place/          # Módulo de lugares turísticos
│   │   │   └── ...
│   │   ├── prisma/             # Esquemas y migraciones
│   │   └── package.json
│   └── web/                    # Frontend Next.js
│       ├── src/
│       │   ├── app/            # App Router (Next.js 13+)
│       │   ├── components/     # Componentes React
│       │   └── lib/            # Utilidades y configuración
│       └── package.json
├── docker-compose.yml          # Configuración de PostgreSQL
└── README.md
```

## 🔧 URLs de Acceso

- **Frontend**: http://localhost:3001
- **API**: http://localhost:3000
- **Swagger API Docs**: http://localhost:3000/api
- **Base de datos**: localhost:5432

## 🛠️ Configuración Adicional

### Swagger API Documentation

Una vez que la API esté ejecutándose, puedes acceder a la documentación de Swagger en:
`http://localhost:3000/api`
