# Documentación de Controladores y Middlewares - Backend Turismo

Esta documentación describe todos los controladores y middlewares disponibles para la aplicación de turismo. Los archivos de rutas (routes) pueden ser configurados según sea necesario.

---

## 📁 Estructura del Proyecto

```
src/
├── controllers/          # Lógica de negocio
│   ├── authController.js
│   ├── userController.js
│   ├── experienceController.js
│   ├── routeController.js
│   ├── reviewController.js
│   └── badgeController.js
├── middlewares/          # Middlewares de la aplicación
│   ├── authMiddleware.js
│   ├── uploadMiddleware.js
│   └── errorHandler.js
├── models/              # Modelos de MongoDB
│   ├── User.js
│   ├── Experiencia.js
│   ├── Ruta.js
│   ├── Reseña.js
│   ├── Insignia.js
│   ├── InsigniaUsuario.js
│   └── ExperienciaUsuario.js
└── utils/               # Utilidades
    └── seed.js          # Script para poblar la BD
```

---

## 🔐 1. AUTH CONTROLLER (`authController.js`)

### Funciones Exportadas

#### `register(req, res)`
Registra un nuevo usuario en el sistema.

**Body esperado:**
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@example.com",
  "telefono": "+573001234567",
  "fechaNacimiento": "1995-05-15",
  "genero": "masculino",
  "password": "123456",
  "confirmPassword": "123456"
}
```

**Response exitoso (201):**
```json
{
  "_id": "...",
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@example.com",
  "telefono": "+573001234567",
  "fechaNacimiento": "1995-05-15T00:00:00.000Z",
  "genero": "masculino",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Validaciones:**
- Todos los campos son obligatorios
- Password y confirmPassword deben coincidir
- Email debe ser único
- Teléfono debe ser único
- Password se hashea automáticamente con bcrypt

---

#### `login(req, res)`
Inicia sesión y devuelve un token JWT.

**Body esperado:**
```json
{
  "email": "juan@example.com",
  "password": "123456"
}
```

**Response exitoso (200):**
```json
{
  "_id": "...",
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@example.com",
  "telefono": "+573001234567",
  "fechaNacimiento": "1995-05-15T00:00:00.000Z",
  "genero": "masculino",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

## 👤 2. USER CONTROLLER (`userController.js`)

### Funciones Exportadas

#### `getProfile(req, res)`
Obtiene el perfil del usuario autenticado.

**Requiere:** Token JWT en headers (`Authorization: Bearer TOKEN`)

**Response exitoso (200):**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan@example.com",
    "telefono": "+573001234567",
    "fechaNacimiento": "1995-05-15T00:00:00.000Z",
    "genero": "masculino",
    "rol": "turista",
    "preferenciasViaje": {
      "categoriasPreferidas": ["gastronomía", "cultura"],
      "estiloViaje": "cultural",
      "rangoPresupuesto": { "minimo": 50000, "maximo": 200000 },
      "disponibilidad": "fin de semana"
    },
    "restriccionesSalud": [],
    "idiomas": [],
    "fotoPerfil": null,
    "calificacionPromedio": 5,
    "fechaCreacion": "..."
  }
}
```

---

#### `updateProfile(req, res)`
Actualiza información básica del usuario.

**Requiere:** Token JWT

**Body esperado (todos opcionales):**
```json
{
  "nombre": "Nuevo Nombre",
  "apellido": "Nuevo Apellido",
  "telefono": "+573009999999",
  "fechaNacimiento": "1990-01-01",
  "genero": "femenino",
  "descripcionPerfil": "Amante de la aventura",
  "idiomas": ["Español", "Inglés"],
  "restriccionesSalud": ["vegetariano"]
}
```

**Response exitoso (200):**
```json
{
  "success": true,
  "message": "Perfil actualizado correctamente",
  "data": { /* usuario actualizado */ }
}
```

---

#### `updatePreferences(req, res)`
Actualiza las preferencias de viaje del usuario.

**Requiere:** Token JWT

**Body esperado:**
```json
{
  "categoriasPreferidas": ["gastronomía", "aventura"],
  "estiloViaje": "mochilero",
  "rangoPresupuesto": {
    "minimo": 30000,
    "maximo": 150000
  },
  "disponibilidad": "flexible"
}
```

**Valores válidos:**
- `estiloViaje`: "mochilero" | "familiar" | "lujo" | "aventura" | "cultural"
- `disponibilidad`: "fin de semana" | "una semana" | "dos semanas" | "flexible"

---

#### `getUserHistory(req, res)`
Obtiene el historial de experiencias del usuario.

**Requiere:** Token JWT

**Response exitoso (200):**
```json
{
  "success": true,
  "data": {
    "experiencias": [ /* array de experiencias */ ]
  }
}
```

---

## 🎨 3. EXPERIENCE CONTROLLER (`experienceController.js`)

### Funciones Exportadas

#### `getAllExperiences(req, res)`
Lista todas las experiencias con filtros y paginación.

**Query params (todos opcionales):**
- `categoria`: Filtrar por categoría (gastronomía, cultura, aventura, etc.)
- `ciudad`: Filtrar por ciudad (búsqueda insensible a mayúsculas)
- `precioMin`: Precio mínimo
- `precioMax`: Precio máximo
- `page`: Número de página (default: 1)
- `limit`: Elementos por página (default: 10)
- `sortBy`: Campo para ordenar (default: fechaCreacion)
- `order`: "asc" o "desc" (default: desc)

**Ejemplo:** `/api/experiences?categoria=gastronomía&ciudad=Medellín&page=1&limit=10`

**Response exitoso (200):**
```json
{
  "success": true,
  "data": [ /* array de experiencias */ ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "limit": 10
  }
}
```

---

#### `getExperienceById(req, res)`
Obtiene el detalle completo de una experiencia.

**Params:** `id` - ID de la experiencia

**Response exitoso (200):**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "titulo": "Tour Gastronómico",
    "descripcion": "...",
    "categorias": ["gastronomía", "cultura"],
    "ubicacion": {
      "ciudad": "Medellín",
      "pais": "Colombia",
      "direccion": "...",
      "coordenadas": {
        "type": "Point",
        "coordinates": [-75.5664, 6.2518]
      }
    },
    "guias": [ /* guías poblados */ ],
    "ediciones": [ /* ediciones disponibles */ ],
    "capacidadMaxima": 10,
    "calificacionPromedio": 4.8,
    "cantidadResenas": 25,
    "fotos": ["url1", "url2"]
  }
}
```

---

#### `searchExperiences(req, res)`
Busca experiencias por texto en título y descripción.

**Query params:**
- `q`: Término de búsqueda (requerido)
- `page`: Número de página (default: 1)
- `limit`: Elementos por página (default: 10)

**Ejemplo:** `/api/experiences/search?q=parapente`

---

#### `getExperiencesByLocation(req, res)`
Busca experiencias cercanas a unas coordenadas (búsqueda geoespacial).

**Query params:**
- `lat`: Latitud (requerido)
- `lng`: Longitud (requerido)
- `maxDistance`: Distancia máxima en metros (default: 10000)

**Ejemplo:** `/api/experiences/nearby?lat=6.2518&lng=-75.5664&maxDistance=5000`

---

#### `createExperience(req, res)`
Crea una nueva experiencia (solo para guías).

**Requiere:** Token JWT + rol "guia"

**Body esperado:**
```json
{
  "titulo": "Nueva Experiencia",
  "descripcion": "Descripción detallada",
  "categorias": ["aventura"],
  "ubicacion": {
    "ciudad": "Medellín",
    "pais": "Colombia",
    "direccion": "Dirección exacta",
    "coordenadas": {
      "type": "Point",
      "coordinates": [-75.5664, 6.2518]
    }
  },
  "ediciones": [
    {
      "nombre": "Edición regular",
      "fechaInicio": "2025-01-01",
      "fechaFin": "2025-12-31",
      "precio": 100000,
      "horario": "10:00 AM - 2:00 PM"
    }
  ],
  "capacidadMaxima": 15,
  "fotos": ["url1", "url2"]
}
```

---

## 🗺️ 4. ROUTE CONTROLLER (`routeController.js`)

### Funciones Exportadas

#### `getAllRoutes(req, res)`
Lista las rutas públicas y oficiales.

**Query params:**
- `tema`: Filtrar por tema (gastronomía, cultura, aventura, etc.)
- `page`: Número de página
- `limit`: Elementos por página

---

#### `getRouteById(req, res)`
Obtiene el detalle completo de una ruta con sus experiencias.

**Params:** `id` - ID de la ruta

---

#### `createRoute(req, res)`
Crea una ruta personalizada.

**Requiere:** Token JWT

**Body esperado:**
```json
{
  "nombre": "Mi Ruta Personalizada",
  "descripcion": "Descripción de la ruta",
  "tema": "gastronomía",
  "experiencias": [
    {
      "experienciaId": "ID_EXPERIENCIA_1",
      "orden": 1,
      "duracionEstimada": 120,
      "notas": "Primera parada"
    },
    {
      "experienciaId": "ID_EXPERIENCIA_2",
      "orden": 2,
      "duracionEstimada": 180,
      "notas": "Segunda parada"
    }
  ],
  "dificultad": "media",
  "esPublica": false
}
```

**Valores válidos:**
- `tema`: "gastronomía" | "cultura" | "aventura" | "arte" | "naturaleza" | "historia" | "deportes" | "mixto"
- `dificultad`: "baja" | "media" | "alta"

---

#### `generateRouteByTheme(req, res)`
Genera automáticamente una ruta basada en un tema.

**Params:** `theme` - Tema de la ruta

**Query params:**
- `ciudad`: Filtrar por ciudad (opcional)
- `maxExperiencias`: Número máximo de experiencias (default: 5)

**Ejemplo:** `/api/routes/generate/gastronomía?ciudad=Medellín&maxExperiencias=3`

**Response:** Devuelve una ruta sugerida (NO la guarda en BD)

---

#### `getUserRoutes(req, res)`
Obtiene las rutas creadas por el usuario autenticado.

**Requiere:** Token JWT

---

## ⭐ 5. REVIEW CONTROLLER (`reviewController.js`)

### Funciones Exportadas

#### `createReview(req, res)`
Crea una reseña para una experiencia.

**Requiere:** Token JWT

**Body esperado:**
```json
{
  "experienciaId": "ID_EXPERIENCIA",
  "calificaciones": {
    "general": 5,
    "guia": 5,
    "ubicacion": 4,
    "precio": 4,
    "comodidad": 5
  },
  "comentario": "¡Excelente experiencia!",
  "fotos": ["url1", "url2"]
}
```

**Validaciones:**
- No se puede reseñar la misma experiencia dos veces
- Actualiza automáticamente la calificación promedio de la experiencia

---

#### `getReviewsByExperience(req, res)`
Obtiene las reseñas de una experiencia.

**Params:** `experienceId` - ID de la experiencia

**Query params:**
- `page`: Número de página
- `limit`: Elementos por página

---

#### `updateReview(req, res)`
Edita una reseña propia (solo dentro de 48 horas).

**Requiere:** Token JWT + ser dueño de la reseña

**Params:** `id` - ID de la reseña

**Body esperado (campos opcionales):**
```json
{
  "calificaciones": { /* nuevas calificaciones */ },
  "comentario": "Nuevo comentario",
  "fotos": ["nuevas_urls"]
}
```

**Validación:** Solo se puede editar dentro de las 48 horas siguientes a su creación.

---

#### `deleteReview(req, res)`
Elimina una reseña propia (soft delete).

**Requiere:** Token JWT + ser dueño de la reseña

**Params:** `id` - ID de la reseña

---

#### `reportReview(req, res)`
Reporta una reseña inapropiada.

**Requiere:** Token JWT

**Params:** `id` - ID de la reseña

**Body esperado:**
```json
{
  "razon": "Contenido inapropiado"
}
```

---

## 🏆 6. BADGE CONTROLLER (`badgeController.js`)

### Funciones Exportadas

#### `getAllBadges(req, res)`
Lista todas las insignias disponibles.

**Response exitoso (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "nombre": "Explorador Novato",
      "descripcion": "Completaste tu primera experiencia",
      "iconoUrl": "https://...",
      "tipo": "experiencias",
      "criterio": "Completar 1 experiencia",
      "condicion": { "tipo": "experiencias", "valor": 1 },
      "nivel": 1
    }
  ]
}
```

---

#### `getUserBadges(req, res)`
Obtiene las insignias del usuario autenticado.

**Requiere:** Token JWT

---

#### `checkAndAwardBadges(req, res)`
Verifica y asigna automáticamente nuevas insignias al usuario.

**Requiere:** Token JWT

**Lógica:**
1. Cuenta las experiencias completadas del usuario
2. Cuenta las reseñas creadas por el usuario
3. Verifica qué insignias cumple según los criterios
4. Asigna las insignias que no tenga

**Response exitoso (200):**
```json
{
  "success": true,
  "message": "¡Felicitaciones! Has obtenido 2 nueva(s) insignia(s)",
  "data": [ /* insignias nuevas */ ]
}
```

---

#### `createBadge(req, res)`
Crea una nueva insignia (admin).

**Requiere:** Token JWT

**Body esperado:**
```json
{
  "nombre": "Nueva Insignia",
  "descripcion": "Descripción de la insignia",
  "iconoUrl": "https://...",
  "tipo": "experiencias",
  "criterio": "Completar X experiencias",
  "condicion": {
    "tipo": "experiencias",
    "valor": 10
  },
  "nivel": 2
}
```

**Valores válidos para `tipo`:**
- "experiencias"
- "categoria"
- "rutas"
- "resenas"
- "logro_especial"

---

## 🛡️ MIDDLEWARES

### 1. `authMiddleware.js`

#### `protect(req, res, next)`
Middleware para proteger rutas que requieren autenticación.

**Uso:**
```javascript
router.get('/perfil', protect, getProfile);
```

**Funcionamiento:**
1. Verifica que exista el header `Authorization: Bearer TOKEN`
2. Valida el token JWT
3. Busca el usuario en la BD
4. Agrega el usuario a `req.user`
5. Continúa con el siguiente middleware/controlador

**Errores:**
- 401: No hay token
- 401: Token inválido
- 401: Usuario no encontrado

---

#### `isGuia(req, res, next)`
Middleware para verificar que el usuario sea un guía.

**Uso:**
```javascript
router.post('/experiencias', protect, isGuia, createExperience);
```

**Requiere:** Debe usarse después de `protect`

---

### 2. `uploadMiddleware.js`

#### `upload`
Middleware de Multer para subir imágenes.

**Configuración:**
- **Destino:** `./uploads/`
- **Tamaño máximo:** 5MB por archivo
- **Formatos permitidos:** jpeg, jpg, png, webp, gif
- **Nombre de archivo:** Generado automáticamente con timestamp

**Uso para un solo archivo:**
```javascript
router.post('/subir-foto', upload.single('foto'), (req, res) => {
  // req.file contiene la información del archivo
  const fotoUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fotoUrl });
});
```

**Uso para múltiples archivos:**
```javascript
router.post('/subir-fotos', upload.array('fotos', 5), (req, res) => {
  // req.files contiene array de archivos
  const fotosUrls = req.files.map(f => `/uploads/${f.filename}`);
  res.json({ urls: fotosUrls });
});
```

---

#### `handleMulterError(err, req, res, next)`
Middleware para manejar errores de multer.

**Uso:**
```javascript
app.use(handleMulterError);
```

---

### 3. `errorHandler.js`

Middleware global para manejo de errores (ya existe).

---

## 🗄️ MODELOS DE DATOS

### User.js
- Campos: nombre, apellido, email, telefono, fechaNacimiento, genero, password, rol, preferenciasViaje, etc.
- Método: `matchPassword(password)` - Compara contraseñas

### Experiencia.js
- Campos: titulo, descripcion, categorias, ubicacion, guias, ediciones, capacidadMaxima, calificacionPromedio, fotos
- Índice geoespacial para búsquedas por ubicación

### Ruta.js
- Campos: nombre, descripcion, tema, experiencias[], tiempoTotalEstimado, dificultad, creadaPor, esOficial, esPublica

### Reseña.js
- Campos: usuarioId, experienciaId, calificaciones, comentario, fotos, puedeEditarse (48h)

### Insignia.js
- Campos: nombre, descripcion, iconoUrl, tipo, criterio, condicion, nivel

### InsigniaUsuario.js
- Relación entre usuarios e insignias obtenidas

### ExperienciaUsuario.js
- Relación entre usuarios y experiencias realizadas

---

## 🌱 SEED DATA

Para poblar la base de datos con datos de prueba:

```bash
npm run seed
```

**Usuarios de prueba creados:**
- `juan@test.com` / `123456` (Turista)
- `maria@test.com` / `123456` (Guía)
- `carlos@test.com` / `123456` (Guía)

**También crea:**
- 6 experiencias de ejemplo (gastronomía, cultura, aventura, arte)
- 3 rutas temáticas
- 4 insignias básicas

---

## 📝 NOTAS PARA INTEGRACIÓN CON EXPRESS

### Formato de Response Estándar

**Éxito:**
```json
{
  "success": true,
  "data": { /* datos */ },
  "message": "Mensaje opcional"
}
```

**Error:**
```json
{
  "success": false,
  "message": "Descripción del error"
}
```

### Headers Requeridos para Rutas Protegidas

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Variables de Entorno Necesarias

```
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=tu_secreto_aqui
```

---

## ✅ CHECKLIST DE INTEGRACIÓN

Para integrar los controladores con Express:

- [ ] Importar el controlador necesario
- [ ] Crear las rutas en el archivo correspondiente
- [ ] Aplicar middlewares según sea necesario (`protect`, `isGuia`, `upload`)
- [ ] Configurar el router en `app.js`
- [ ] Probar los endpoints con Postman/Thunder Client
- [ ] Verificar manejo de errores

**Ejemplo de integración:**

```javascript
// routes/userRoutes.js
import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

export default router;
```

```javascript
// app.js
import userRoutes from './routes/userRoutes.js';
app.use('/api/users', userRoutes);
```

---

## 📞 Contacto

Si tienes dudas sobre los controladores o middlewares, revisa los archivos fuente que contienen comentarios explicativos.
