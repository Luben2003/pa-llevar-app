# 🍕 Pa Llevar - App de Comida

Una aplicación web progresiva (PWA) moderna para pedidos de comida a domicilio, construida con HTML5, CSS3 y JavaScript vanilla.

## ✨ Características

- 🚀 **PWA (Progressive Web App)** - Instalable y funciona offline
- 📱 **Diseño Responsivo** - Optimizado para móviles y tablets
- ♿ **Accesibilidad** - Cumple con estándares WCAG 2.1
- 🔍 **Búsqueda Inteligente** - Filtrado por categorías y restaurantes
- 🛒 **Carrito de Compras** - Gestión completa de pedidos
- 💳 **Múltiples Métodos de Pago** - Efectivo, tarjeta, transferencia
- 📍 **Geolocalización** - Ubicación automática del usuario
- 🔔 **Notificaciones Push** - Alertas en tiempo real
- 🌙 **Modo Oscuro** - Soporte para preferencias del sistema
- 🔄 **Sincronización Offline** - Datos guardados localmente

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Backend**: Supabase (Base de datos y autenticación)
- **Iconos**: Font Awesome 6.4.0
- **PWA**: Service Workers, Manifest
- **Estilos**: CSS Variables, Flexbox, Grid

## 📁 Estructura del Proyecto

```
pa-llevar/
├── index.html              # Página principal
├── config.js              # Configuración de la aplicación
├── css/
│   └── style.css          # Estilos principales
├── js/
│   ├── app.js             # Lógica principal
│   ├── pwa.js             # Service Worker y PWA
│   └── utils.js           # Funciones utilitarias
├── assets/
│   └── icon-192.png       # Icono de la aplicación
├── manifest.json          # Manifesto PWA
└── README.md             # Documentación
```

## 🚀 Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/pa-llevar.git
   cd pa-llevar
   ```

2. **Configura Supabase**
   - Crea una cuenta en [Supabase](https://supabase.com)
   - Crea un nuevo proyecto
   - Copia las credenciales a `config.js`

3. **Ejecuta localmente**
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js
   npx serve .
   
   # Con PHP
   php -S localhost:8000
   ```

4. **Abre en el navegador**
   ```
   http://localhost:8000
   ```

## ⚙️ Configuración

### Variables de Entorno

Edita `config.js` con tus configuraciones:

```javascript
const CONFIG = {
    SUPABASE_URL: 'https://tu-proyecto.supabase.co',
    SUPABASE_ANON_KEY: 'tu-anon-key',
    API_BASE_URL: 'https://api.pallevar.com',
    // ... más configuraciones
};
```

### Base de Datos

Crea las siguientes tablas en Supabase:

```sql
-- Tabla de usuarios
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de restaurantes
CREATE TABLE restaurants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    rating DECIMAL(3,2) DEFAULT 0,
    delivery_time INTEGER DEFAULT 30,
    min_order DECIMAL(10,2) DEFAULT 0,
    image_url TEXT,
    location JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de productos
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID REFERENCES restaurants(id),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category TEXT,
    image_url TEXT,
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de pedidos
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    restaurant_id UUID REFERENCES restaurants(id),
    items JSONB NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'pending',
    delivery_address JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## 🎨 Personalización

### Colores

Modifica las variables CSS en `css/style.css`:

```css
:root {
    --primary: #2D5BFF;
    --secondary: #00C2A9;
    --accent: #FF4B8B;
    /* ... más colores */
}
```

### Categorías

Agrega nuevas categorías en `config.js`:

```javascript
CATEGORIES: [
    { id: 'nueva-categoria', name: 'Nueva Categoría', icon: 'fas fa-icon' },
    // ... más categorías
]
```

## 📱 Funcionalidades

### Autenticación
- Registro de usuarios
- Inicio de sesión
- Recuperación de contraseña
- Sesiones persistentes

### Búsqueda y Filtros
- Búsqueda por nombre de restaurante
- Filtrado por categorías
- Ordenamiento por rating, distancia, tiempo
- Búsqueda de productos específicos

### Carrito de Compras
- Agregar/remover productos
- Modificar cantidades
- Cálculo automático de totales
- Aplicación de descuentos

### Pedidos
- Confirmación de pedido
- Seguimiento en tiempo real
- Historial de pedidos
- Notificaciones de estado

### Perfil de Usuario
- Información personal
- Direcciones guardadas
- Métodos de pago
- Preferencias

## 🔧 API Endpoints

### Autenticación
```
POST /auth/login
POST /auth/register
POST /auth/logout
GET  /auth/profile
```

### Restaurantes
```
GET  /restaurants
GET  /restaurants/:id
GET  /restaurants/category/:category
GET  /restaurants/search?q=:query
```

### Productos
```
GET  /restaurants/:id/products
GET  /products/:id
GET  /products/search?q=:query
```

### Pedidos
```
POST /orders
GET  /orders
GET  /orders/:id
PUT  /orders/:id/status
```

## 🧪 Testing

```bash
# Ejecutar tests de accesibilidad
npm install -g axe-core
axe index.html

# Validar HTML
npm install -g html-validate
html-validate index.html

# Validar CSS
npm install -g stylelint
stylelint css/style.css
```

## 📊 Performance

- **Lighthouse Score**: 95+ en todas las categorías
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔒 Seguridad

- Validación de entrada en cliente y servidor
- Sanitización de datos
- HTTPS obligatorio en producción
- Tokens JWT para autenticación
- Rate limiting en API

## 🌐 Despliegue

### Netlify
1. Conecta tu repositorio a Netlify
2. Configura las variables de entorno
3. Despliega automáticamente

### Vercel
1. Instala Vercel CLI
2. Ejecuta `vercel`
3. Configura las variables de entorno

### Firebase Hosting
1. Instala Firebase CLI
2. Ejecuta `firebase init hosting`
3. Despliega con `firebase deploy`

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

- 📧 Email: soporte@pallevar.com
- 💬 Discord: [Pa Llevar Community](https://discord.gg/pallevar)
- 📖 Documentación: [docs.pallevar.com](https://docs.pallevar.com)
- 🐛 Issues: [GitHub Issues](https://github.com/tu-usuario/pa-llevar/issues)

## 🙏 Agradecimientos

- [Supabase](https://supabase.com) por el backend
- [Font Awesome](https://fontawesome.com) por los iconos
- [Inter Font](https://rsms.me/inter/) por la tipografía
- [Unsplash](https://unsplash.com) por las imágenes de ejemplo

---

**Desarrollado con ❤️ por el equipo de Pa Llevar** 
