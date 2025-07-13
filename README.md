# API E-commerce de Supermercado

Este es un proyecto de API REST para un e-commerce de supermercado desarrollado con Node.js, Express, TypeScript y PostgreSQL.

El sistema permite gestionar productos de supermercado, realizar pedidos, y administrar usuarios con diferentes roles. Implementa una arquitectura limpia y está completamente tipado con TypeScript, asegurando la calidad y mantenibilidad del código.

Características principales:
- Gestión completa de productos
- Sistema de autenticación y autorización con JWT
- Manejo de roles (admin y customer)
- Gestión de órdenes y estados
- API RESTful completamente documentada
- Tests unitarios con alta cobertura
- Base de datos PostgreSQL con TypeORM

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (v16 o superior)
- PostgreSQL (v12 o superior)
- npm (viene con Node.js)

## Configuración del Proyecto

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno**
   
   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```env
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=tu_secreto_super_seguro
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=tu_usuario_postgres
   DB_PASSWORD=tu_contraseña_postgres
   DB_NAME=ecommerce_db
   ```


3. **Crear la base de datos**
   ```bash
   createdb ecommerce_db
   ```

## Ejecutar el Proyecto

1. **Compilar TypeScript**
   ```bash
   npm run build
   ```

2. **Modo desarrollo (con hot-reload)**
   ```bash
   npm run dev
   ```

3. **Modo producción**
   ```bash
   npm start
   ```

## Ejecutar Pruebas

```bash
npm test
```

Para ver la cobertura de pruebas:
```bash
npm test -- --coverage
```

## Estructura del Proyecto

```
src/
├── config/         # Configuraciones (base de datos, etc.)
├── controllers/    # Controladores de la API
├── middlewares/    # Middlewares (auth, etc.)
├── models/         # Modelos de la base de datos
├── repositories/   # Repositorios para acceso a datos
├── routes/         # Rutas de la API
├── services/       # Lógica de negocio
├── tests/         # Tests unitarios e integración
├── types/         # Definiciones de tipos
└── utils/         # Utilidades

```

## Endpoints de la API

### Autenticación

#### POST `/api/auth/register` - Registrar nuevo usuario
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string",
    "firstName": "string",
    "lastName": "string"
  }
  ```
- **Respuesta**: Usuario creado y token JWT
- **Notas**: Por defecto, los usuarios se crean con rol "customer"

#### POST `/api/auth/login` - Iniciar sesión
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Respuesta**: Token JWT para autenticación

### Productos

#### GET `/api/products` - Listar todos los productos
- **Query Params** (opcionales):
  - `page`: número de página
  - `limit`: elementos por página
  - `sort`: campo de ordenamiento
- **Respuesta**: Lista paginada de productos

#### GET `/api/products/:id` - Obtener producto por ID
- **Params**: 
  - `id`: ID del producto
- **Respuesta**: Detalles del producto

#### GET `/api/products/category/:category` - Listar productos por categoría
- **Params**: 
  - `category`: Nombre de la categoría
- **Query Params** (opcionales):
  - `page`: número de página
  - `limit`: elementos por página
- **Respuesta**: Lista de productos de la categoría especificada

#### POST `/api/products` - Crear nuevo producto (admin)
- **Auth**: Requiere token JWT y rol admin
- **Body**:
  ```json
  {
    "name": "string",
    "description": "string",
    "price": number,
    "stock": number,
    "category": "string",
    "imageUrl": "string (opcional)"
  }
  ```
- **Respuesta**: Producto creado

#### PUT `/api/products/:id` - Actualizar producto (admin)
- **Auth**: Requiere token JWT y rol admin
- **Params**: 
  - `id`: ID del producto
- **Body**: Campos a actualizar (todos opcionales)
  ```json
  {
    "name": "string",
    "description": "string",
    "price": number,
    "stock": number,
    "category": "string",
    "imageUrl": "string"
  }
  ```
- **Respuesta**: Producto actualizado

#### DELETE `/api/products/:id` - Eliminar producto (admin)
- **Auth**: Requiere token JWT y rol admin
- **Params**: 
  - `id`: ID del producto
- **Respuesta**: 204 No Content

### Órdenes

#### POST `/api/orders` - Crear nueva orden
- **Auth**: Requiere token JWT
- **Body**:
  ```json
  {
    "items": [
      {
        "productId": number,
        "quantity": number
      }
    ]
  }
  ```
- **Respuesta**: Orden creada con detalles
- **Notas**: Verifica stock disponible y actualiza automáticamente el inventario

#### GET `/api/orders/my-orders` - Listar órdenes del usuario
- **Auth**: Requiere token JWT
- **Query Params** (opcionales):
  - `page`: número de página
  - `limit`: elementos por página
  - `status`: filtrar por estado
- **Respuesta**: Lista de órdenes del usuario autenticado

#### GET `/api/orders/:id` - Obtener orden por ID
- **Auth**: Requiere token JWT
- **Params**: 
  - `id`: ID de la orden
- **Respuesta**: Detalles completos de la orden con sus items
- **Notas**: Los usuarios solo pueden ver sus propias órdenes (excepto admin)

#### PUT `/api/orders/:id/status` - Actualizar estado de la orden (admin)
- **Auth**: Requiere token JWT y rol admin
- **Params**: 
  - `id`: ID de la orden
- **Body**:
  ```json
  {
    "status": "pending" | "processing" | "completed" | "cancelled"
  }
  ```
- **Respuesta**: Orden actualizada
- **Notas**: Solo admins pueden cambiar el estado de las órdenes

## Roles y Permisos

El sistema maneja dos tipos de roles:
- **customer**: Usuario normal que puede crear órdenes y ver sus propias órdenes
- **admin**: Puede gestionar productos y actualizar estados de órdenes

## Tecnologías Utilizadas

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- TypeORM
- Jest
- JSON Web Tokens (JWT)

## Cobertura de Pruebas

- Modelos: 91.52%
- Servicios: 97.05%
- Repositorios: 66.66%
- General: 89.61%

## Scripts Disponibles

- `npm run dev`: Ejecutar en modo desarrollo con hot-reload
- `npm run build`: Compilar TypeScript a JavaScript
- `npm start`: Ejecutar en modo producción
- `npm test`: Ejecutar pruebas
- `npm run migrate:generate`: Generar migraciones
- `npm run migrate:run`: Ejecutar migraciones
- `npm run migrate:revert`: Revertir última migración
