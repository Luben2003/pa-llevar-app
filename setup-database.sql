-- ===== CONFIGURACIÓN DE BASE DE DATOS PARA PA LLEVAR =====

-- 1. Crear tabla de restaurantes
CREATE TABLE IF NOT EXISTS public.restaurants (
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

-- 2. Crear tabla de productos
CREATE TABLE IF NOT EXISTS public.products (
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

-- 3. Crear tabla de pedidos
CREATE TABLE IF NOT EXISTS public.orders (
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

-- 4. Crear tabla de perfiles (opcional)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    name TEXT,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 5. Crear función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. Crear triggers para updated_at
CREATE TRIGGER IF NOT EXISTS update_restaurants_updated_at 
    BEFORE UPDATE ON restaurants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER IF NOT EXISTS update_products_updated_at 
    BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER IF NOT EXISTS update_orders_updated_at 
    BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER IF NOT EXISTS update_profiles_updated_at 
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 7. Habilitar RLS (Row Level Security)
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 8. Crear políticas de seguridad

-- Políticas para restaurantes (lectura pública)
CREATE POLICY IF NOT EXISTS "Restaurants are viewable by everyone" ON restaurants
    FOR SELECT USING (is_active = true);

-- Políticas para productos (lectura pública)
CREATE POLICY IF NOT EXISTS "Products are viewable by everyone" ON products
    FOR SELECT USING (available = true);

-- Políticas para pedidos (solo usuario propietario)
CREATE POLICY IF NOT EXISTS "Users can view own orders" ON orders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert own orders" ON orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update own orders" ON orders
    FOR UPDATE USING (auth.uid() = user_id);

-- Políticas para perfiles (solo usuario propietario)
CREATE POLICY IF NOT EXISTS "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- 9. Insertar datos de ejemplo

-- Restaurantes de ejemplo
INSERT INTO restaurants (name, description, category, rating, delivery_time, min_order, image_url) VALUES
('Pizza Express', 'Las mejores pizzas de la ciudad', 'pizza', 4.5, 25, 150.00, 'https://images.unsplash.com/photo-1513104890138-7c749659a591'),
('Burger House', 'Hamburguesas gourmet', 'hamburguesa', 4.3, 20, 120.00, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'),
('Sushi Master', 'Sushi fresco y delicioso', 'sushi', 4.7, 30, 200.00, 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351'),
('Café Central', 'Café de especialidad', 'cafe', 4.2, 15, 50.00, 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb'),
('Dulce Tentación', 'Postres artesanales', 'postres', 4.4, 20, 80.00, 'https://images.unsplash.com/photo-1565958011703-44f9829ba187')
ON CONFLICT DO NOTHING;

-- Productos de ejemplo
INSERT INTO products (restaurant_id, name, description, price, category, image_url) VALUES
-- Pizza Express
((SELECT id FROM restaurants WHERE name = 'Pizza Express' LIMIT 1), 'Pizza Margherita', 'Salsa de tomate, mozzarella, albahaca', 180.00, 'pizza', 'https://images.unsplash.com/photo-1513104890138-7c749659a591'),
((SELECT id FROM restaurants WHERE name = 'Pizza Express' LIMIT 1), 'Pizza Pepperoni', 'Salsa de tomate, mozzarella, pepperoni', 220.00, 'pizza', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b'),

-- Burger House
((SELECT id FROM restaurants WHERE name = 'Burger House' LIMIT 1), 'Hamburguesa Clásica', 'Carne, lechuga, tomate, cebolla', 150.00, 'hamburguesa', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'),
((SELECT id FROM restaurants WHERE name = 'Burger House' LIMIT 1), 'Hamburguesa BBQ', 'Carne, bacon, queso, salsa BBQ', 180.00, 'hamburguesa', 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90'),

-- Sushi Master
((SELECT id FROM restaurants WHERE name = 'Sushi Master' LIMIT 1), 'Roll California', 'Cangrejo, aguacate, pepino', 250.00, 'sushi', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351'),
((SELECT id FROM restaurants WHERE name = 'Sushi Master' LIMIT 1), 'Roll Philadelphia', 'Salmón, queso crema, aguacate', 280.00, 'sushi', 'https://images.unsplash.com/photo-1553621042-f6e147245754')
ON CONFLICT DO NOTHING;

-- 10. Verificar que todo se creó correctamente
SELECT 'Tablas creadas:' as status;
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('restaurants', 'products', 'orders', 'profiles');

SELECT 'Políticas creadas:' as status;
SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename IN ('restaurants', 'products', 'orders', 'profiles');

SELECT 'Datos de ejemplo:' as status;
SELECT 'Restaurantes:' as tipo, COUNT(*) as cantidad FROM restaurants
UNION ALL
SELECT 'Productos:' as tipo, COUNT(*) as cantidad FROM products;
