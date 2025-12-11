# Backend - App Turismo

Backend de la aplicación de turismo construido con Node.js, Express y MongoDB.

## 🚀 Inicio Rápido

### 1. Instalar dependencias
```bash
cd travel-explorer
npm install
```

### 2. Configurar variables de entorno
El archivo `.env` ya está configurado con:
```
PORT=5000
MONGO_URI=mongodb+srv://LangWuu:juanesgc1@base.cd0vi9h.mongodb.net/turismoapp?retryWrites=true&w=majority
JWT_SECRET=zullie12345
```

### 3. Poblar la base de datos con datos de prueba
```bash
npm run seed
```

Esto creará:
- 3 usuarios de prueba
- 6 experiencias de ejemplo
- 3 rutas temáticas
- 4 insignias

### 4. Iniciar el servidor
```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

El servidor estará corriendo en `http://localhost:5000`

---

## 👥 Usuarios de Prueba

| Email | Password | Rol |
|-------|----------|-----|
| juan@test.com | 123456 | Turista |
| maria@test.com | 123456 | Guía |
| carlos@test.com | 123456 | Guía |

---

## 📚 Documentación

Para información detallada sobre los controladores y middlewares disponibles, consulta:

**[CONTROLADORES_Y_MIDDLEWARES.md](./CONTROLADORES_Y_MIDDLEWARES.md)**

Este archivo contiene:
- Documentación completa de todos los controladores
- Explicación de middlewares
- Ejemplos de uso
- Formato de requests y responses
- Guía de integración con Express

---

## 📁 Estructura del Proyecto

```
src/
├── controllers/        # ✅ Lógica de negocio (COMPLETADO)
│   ├── authController.js
│   ├── userController.js
│   ├── experienceController.js
│   ├── routeController.js
│   ├── reviewController.js
│   └── badgeController.js
├── middlewares/        # ✅ Middlewares (COMPLETADO)
│   ├── authMiddleware.js
│   ├── uploadMiddleware.js
│   └── errorHandler.js
├── models/             # ✅ Modelos de MongoDB (YA EXISTÍAN)
│   ├── User.js
│   ├── Experiencia.js
│   ├── Ruta.js
│   ├── Reseña.js
│   ├── Insignia.js
│   ├── InsigniaUsuario.js
│   └── ExperienciaUsuario.js
├── routes/             # ⏳ PENDIENTE: Integración con Express
│   └── authRoutes.js   # (ejemplo ya creado)
├── utils/
│   └── seed.js         # ✅ Script de datos de prueba
├── config/
│   └── db.js           # ✅ Configuración de MongoDB
└── app.js              # ⏳ PENDIENTE: Registrar rutas
```

---

## ✅ Estado Actual

### Completado
- ✅ 6 Controladores con toda la lógica de negocio
- ✅ 2 Middlewares (autenticación y uploads)
- ✅ Script de seed con datos de prueba
- ✅ Documentación completa

### Pendiente
- ⏳ Crear archivos de rutas y conectar controladores
- ⏳ Registrar rutas en `app.js`
- ⏳ Configurar CORS según necesidades del frontend
- ⏳ Testing de endpoints

---

## 🛠️ Scripts Disponibles

```bash
npm start       # Iniciar servidor en producción
npm run dev     # Iniciar servidor con nodemon (desarrollo)
npm run seed    # Poblar base de datos con datos de prueba
```

---

## 🔐 Autenticación

Las rutas protegidas requieren un token JWT en el header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Para obtener un token, haz login con uno de los usuarios de prueba.

---

## 📝 Próximos Pasos

1. **Crear archivos de rutas** en `src/routes/`:
   - `userRoutes.js`
   - `experienceRoutes.js`
   - `routeRoutes.js`
   - `reviewRoutes.js`
   - `badgeRoutes.js`

2. **Importar controladores** y aplicar middlewares según sea necesario

3. **Registrar rutas en `app.js`**

4. **Probar endpoints** con Postman o Thunder Client

Consulta `CONTROLADORES_Y_MIDDLEWARES.md` para ver ejemplos de cómo integrar cada controlador.

---

## 📦 Dependencias

- **express**: Framework web
- **mongoose**: ODM para MongoDB
- **bcryptjs**: Hasheo de contraseñas
- **jsonwebtoken**: Autenticación con JWT
- **cors**: Cross-Origin Resource Sharing
- **dotenv**: Variables de entorno
- **morgan**: Logger HTTP
- **multer**: Upload de archivos
- **axios**: Cliente HTTP (para futuras APIs)

---

## 🤝 Equipo

- **Controladores y Middlewares**: Completados y documentados
- **Integración de Rutas**: Pendiente (asignado a compañera)

---

## 📞 Soporte

Si tienes dudas sobre algún controlador o middleware, consulta la documentación en `CONTROLADORES_Y_MIDDLEWARES.md` o revisa los comentarios en el código fuente.
