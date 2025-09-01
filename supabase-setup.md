# 🚀 Configuración de Supabase para Pa Llevar

## 1. Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Anota tu **URL del proyecto** y **anon key**

## 2. Configurar Variables

Edita `config.js` y reemplaza las credenciales:

```javascript
const CONFIG = {
    // ... otras configuraciones
    SUPABASE_URL: 'https://tu-proyecto.supabase.co', // Tu URL real
    SUPABASE_ANON_KEY: 'tu-anon-key-real', // Tu anon key real
    // ... resto de configuraciones
};
```

## 3. Crear Tablas en Supabase

Ejecuta estos comandos SQL en el editor SQL de Supabase:

### Tabla de usuarios (se crea automáticamente)
```sql
-- La tabla auth.users se crea automáticamente
-- Solo necesitamos crear una tabla de perfiles si queremos datos adicionales

CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    name TEXT,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Tabla de restaurantes
```sql
CREATE TABLE public.restaurants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    rating DECIMAL(3,2) DEFAULT 0,
    delivery_time INTEGER DEFAULT 30,
    min_order DECIMAL(10,2) DEFAULT 0,
    image_url TEXT,
    location JSONB,
    address TEXT,
    phone TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TRIGGER update_restaurants_updated_at BEFORE UPDATE ON restaurants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Tabla de productos
```sql
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category TEXT,
    image_url TEXT,
    available BOOLEAN DEFAULT true,
    preparation_time INTEGER DEFAULT 15,
    allergens TEXT[],
    nutritional_info JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Tabla de pedidos
```sql
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    restaurant_id UUID REFERENCES restaurants(id),
    items JSONB NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    shipping_cost DECIMAL(10,2) DEFAULT 2.50,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    status TEXT DEFAULT 'pending',
    delivery_address JSONB,
    delivery_instructions TEXT,
    estimated_delivery_time TIMESTAMP,
    actual_delivery_time TIMESTAMP,
    payment_method TEXT,
    payment_status TEXT DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Tabla de direcciones
```sql
CREATE TABLE public.addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT,
    postal_code TEXT,
    country TEXT DEFAULT 'México',
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## 4. Configurar Políticas de Seguridad (RLS)

### Habilitar RLS
```sql
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
```

### Políticas para restaurantes (lectura pública)
```sql
CREATE POLICY "Restaurants are viewable by everyone" ON restaurants
    FOR SELECT USING (is_active = true);

CREATE POLICY "Restaurants are insertable by authenticated users" ON restaurants
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Restaurants are updatable by owner" ON restaurants
    FOR UPDATE USING (auth.uid() = id);
```

### Políticas para productos (lectura pública)
```sql
CREATE POLICY "Products are viewable by everyone" ON products
    FOR SELECT USING (available = true);

CREATE POLICY "Products are insertable by restaurant owner" ON products
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

### Políticas para pedidos (solo usuario propietario)
```sql
CREATE POLICY "Users can view own orders" ON orders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders" ON orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders" ON orders
    FOR UPDATE USING (auth.uid() = user_id);
```

### Políticas para direcciones (solo usuario propietario)
```sql
CREATE POLICY "Users can view own addresses" ON addresses
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own addresses" ON addresses
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses" ON addresses
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses" ON addresses
    FOR DELETE USING (auth.uid() = user_id);
```

### Políticas para perfiles (solo usuario propietario)
```sql
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);
```

## 5. Configurar Storage

1. Ve a Storage en tu dashboard de Supabase
2. Crea un bucket llamado `images`
3. Configura las políticas de acceso:

```sql
-- Permitir lectura pública de imágenes
CREATE POLICY "Images are publicly accessible" ON storage.objects
    FOR SELECT USING (bucket_id = 'images');

-- Permitir subida de imágenes a usuarios autenticados
CREATE POLICY "Authenticated users can upload images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
```

## 6. Insertar Datos de Ejemplo

### Restaurantes de ejemplo
```sql
INSERT INTO restaurants (name, description, category, rating, delivery_time, min_order, image_url) VALUES
('Pizza Express', 'Las mejores pizzas de la ciudad', 'pizza', 4.5, 25, 150.00, 'https://images.unsplash.com/photo-1513104890138-7c749659a591'),
('Burger House', 'Hamburguesas gourmet', 'hamburguesa', 4.3, 20, 120.00, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'),
('Sushi Master', 'Sushi fresco y delicioso', 'sushi', 4.7, 30, 200.00, 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351'),
('Café Central', 'Café de especialidad', 'cafe', 4.2, 15, 50.00, 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb'),
('Dulce Tentación', 'Postres artesanales', 'postres', 4.4, 20, 80.00, 'https://images.unsplash.com/photo-1565958011703-44f9829ba187');
```

### Productos de ejemplo
```sql
INSERT INTO products (restaurant_id, name, description, price, category, image_url) VALUES
-- Pizza Express
((SELECT id FROM restaurants WHERE name = 'Pizza Express'), 'Pizza Margherita', 'Salsa de tomate, mozzarella, albahaca', 180.00, 'pizza', 'https://images.unsplash.com/photo-1513104890138-7c749659a591'),
((SELECT id FROM restaurants WHERE name = 'Pizza Express'), 'Pizza Pepperoni', 'Salsa de tomate, mozzarella, pepperoni', 220.00, 'pizza', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b'),

-- Burger House
((SELECT id FROM restaurants WHERE name = 'Burger House'), 'Hamburguesa Clásica', 'Carne, lechuga, tomate, cebolla', 150.00, 'hamburguesa', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'),
((SELECT id FROM restaurants WHERE name = 'Burger House'), 'Hamburguesa BBQ', 'Carne, bacon, queso, salsa BBQ', 180.00, 'hamburguesa', 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90'),

-- Sushi Master
((SELECT id FROM restaurants WHERE name = 'Sushi Master'), 'Roll California', 'Cangrejo, aguacate, pepino', 250.00, 'sushi', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351'),
((SELECT id FROM restaurants WHERE name = 'Sushi Master'), 'Roll Philadelphia', 'Salmón, queso crema, aguacate', 280.00, 'sushi', 'https://images.unsplash.com/photo-1553621042-f6e147245754');
```

## 7. Configurar Autenticación

1. Ve a Authentication > Settings en tu dashboard
2. Configura los proveedores que quieras usar (Email, Google, etc.)
3. Personaliza los templates de email si es necesario

## 8. Probar la Configuración

1. Abre tu aplicación
2. Intenta registrarte con un email
3. Verifica que recibes el email de confirmación
4. Confirma tu email y prueba el login

## 9. Monitoreo

- Ve a Logs en tu dashboard para ver errores
- Usa la pestaña Table Editor para ver los datos
- Configura alertas si es necesario

¡Listo! Tu aplicación ya está conectada a Supabase. 🎉
