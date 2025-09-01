// ===== DATOS DE EJEMPLO =====

// Restaurantes de ejemplo
const SAMPLE_RESTAURANTS = [
    {
        id: '1',
        name: 'Pizza Express',
        description: 'Las mejores pizzas de la ciudad con ingredientes frescos',
        category: 'pizza',
        rating: 4.5,
        delivery_time: 25,
        min_order: 15.00,
        image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
        is_active: true
    },
    {
        id: '2',
        name: 'Burger House',
        description: 'Hamburguesas gourmet con carne de res premium',
        category: 'hamburguesa',
        rating: 4.3,
        delivery_time: 20,
        min_order: 12.00,
        image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
        is_active: true
    },
    {
        id: '3',
        name: 'Sushi Master',
        description: 'Sushi fresco preparado por chefs expertos',
        category: 'sushi',
        rating: 4.7,
        delivery_time: 30,
        min_order: 20.00,
        image_url: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
        is_active: true
    },
    {
        id: '4',
        name: 'Café Central',
        description: 'Café de especialidad y pastelería artesanal',
        category: 'cafe',
        rating: 4.2,
        delivery_time: 15,
        min_order: 8.00,
        image_url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400',
        is_active: true
    },
    {
        id: '5',
        name: 'Dulce Tentación',
        description: 'Postres caseros y helados artesanales',
        category: 'postres',
        rating: 4.4,
        delivery_time: 18,
        min_order: 10.00,
        image_url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400',
        is_active: true
    }
];

// Productos de ejemplo
const SAMPLE_PRODUCTS = {
    '1': [ // Pizza Express
        {
            id: 'p1',
            name: 'Pizza Margherita',
            description: 'Salsa de tomate, mozzarella y albahaca',
            price: 12.50,
            image_url: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=300',
            available: true
        },
        {
            id: 'p2',
            name: 'Pizza Pepperoni',
            description: 'Salsa de tomate, mozzarella y pepperoni',
            price: 14.00,
            image_url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300',
            available: true
        },
        {
            id: 'p3',
            name: 'Pizza Hawaiana',
            description: 'Salsa de tomate, mozzarella, jamón y piña',
            price: 15.50,
            image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300',
            available: true
        }
    ],
    '2': [ // Burger House
        {
            id: 'b1',
            name: 'Hamburguesa Clásica',
            description: 'Carne de res, lechuga, tomate y queso',
            price: 8.50,
            image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300',
            available: true
        },
        {
            id: 'b2',
            name: 'Hamburguesa BBQ',
            description: 'Carne de res, bacon, cebolla caramelizada y salsa BBQ',
            price: 11.00,
            image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300',
            available: true
        },
        {
            id: 'b3',
            name: 'Hamburguesa Vegetariana',
            description: 'Pollo de soja, lechuga, tomate y queso vegano',
            price: 9.50,
            image_url: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300',
            available: true
        }
    ],
    '3': [ // Sushi Master
        {
            id: 's1',
            name: 'Roll California',
            description: 'Cangrejo, aguacate y pepino',
            price: 8.00,
            image_url: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300',
            available: true
        },
        {
            id: 's2',
            name: 'Roll Philadelphia',
            description: 'Salmón ahumado, queso crema y pepino',
            price: 10.50,
            image_url: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=300',
            available: true
        },
        {
            id: 's3',
            name: 'Roll Dragon',
            description: 'Camarón tempura, aguacate y salsa especial',
            price: 12.00,
            image_url: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=300',
            available: true
        }
    ],
    '4': [ // Café Central
        {
            id: 'c1',
            name: 'Café Americano',
            description: 'Café negro con agua caliente',
            price: 3.50,
            image_url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300',
            available: true
        },
        {
            id: 'c2',
            name: 'Cappuccino',
            description: 'Espresso con leche espumada',
            price: 4.50,
            image_url: 'https://images.unsplash.com/photo-1534778101976-62847782c3b7?w=300',
            available: true
        },
        {
            id: 'c3',
            name: 'Croissant',
            description: 'Croissant de mantequilla recién horneado',
            price: 2.50,
            image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300',
            available: true
        }
    ],
    '5': [ // Dulce Tentación
        {
            id: 'd1',
            name: 'Tiramisú',
            description: 'Postre italiano con café y mascarpone',
            price: 6.50,
            image_url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300',
            available: true
        },
        {
            id: 'd2',
            name: 'Helado de Vainilla',
            description: 'Helado artesanal de vainilla con toppings',
            price: 4.00,
            image_url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300',
            available: true
        },
        {
            id: 'd3',
            name: 'Chocolate Cake',
            description: 'Pastel de chocolate con ganache',
            price: 7.50,
            image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300',
            available: true
        }
    ]
};

// Función para obtener restaurantes por categoría
function getRestaurantsByCategory(category = null) {
    if (category) {
        return SAMPLE_RESTAURANTS.filter(restaurant => restaurant.category === category);
    }
    return SAMPLE_RESTAURANTS;
}

// Función para obtener productos de un restaurante
function getProductsByRestaurant(restaurantId) {
    return SAMPLE_PRODUCTS[restaurantId] || [];
}

// Función para buscar restaurantes
function searchRestaurants(query) {
    const searchTerm = query.toLowerCase();
    return SAMPLE_RESTAURANTS.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchTerm) ||
        restaurant.description.toLowerCase().includes(searchTerm) ||
        restaurant.category.toLowerCase().includes(searchTerm)
    );
}

// Exportar para uso global
window.SampleData = {
    restaurants: SAMPLE_RESTAURANTS,
    products: SAMPLE_PRODUCTS,
    getRestaurantsByCategory,
    getProductsByRestaurant,
    searchRestaurants
};
