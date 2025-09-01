// ===== DATOS DE EJEMPLO =====
const restaurants = [
    {
        id: 1,
        name: "La Pizza Nostra",
        category: "Italiana • Pizza • Pasta",
        rating: 4.8,
        reviews: 500,
        deliveryTime: "25-35 min",
        image: "pizza",
        tags: ["pizza", "pasta", "italiana"],
        products: [
            { id: 101, name: "Pizza Margherita", description: "Salsa de tomate, mozzarella y albahaca", price: 9.99, icon: "fas fa-pizza-slice" },
            { id: 102, name: "Pizza Pepperoni", description: "Salsa de tomate, mozzarella y pepperoni", price: 11.99, icon: "fas fa-pizza-slice" },
            { id: 103, name: "Lasagna", description: "Carne, queso y pasta en capas", price: 12.99, icon: "fas fa-utensils" },
            { id: 104, name: "Spaghetti Carbonara", description: "Pasta con salsa cremosa de huevo y pancetta", price: 10.99, icon: "fas fa-utensils" }
        ]
    },
    {
        id: 2,
        name: "Burger Paradise",
        category: "Americana • Hamburguesas",
        rating: 4.5,
        reviews: 350,
        deliveryTime: "20-30 min",
        image: "hamburguesa",
        tags: ["hamburguesa", "americana", "comida rápida"],
        products: [
            { id: 201, name: "Burger Clásica", description: "Carne, lechuga, tomate y queso", price: 8.99, icon: "fas fa-hamburger" },
            { id: 202, name: "Burger BBQ", description: "Carne, bacon, cebolla crispy y salsa BBQ", price: 10.99, icon: "fas fa-hamburger" },
            { id: 203, name: "Burger Veggie", description: "Hamburguesa vegetariana con aguacate", price: 9.99, icon: "fas fa-leaf" },
            { id: 204, name: "Papas Fritas", description: "Porción grande con salsa", price: 3.99, icon: "fas fa-drumstick-bite" }
        ]
    },
    {
        id: 3,
        name: "Sushi Express",
        category: "Japonesa • Sushi • Poke",
        rating: 4.6,
        reviews: 420,
        deliveryTime: "30-40 min",
        image: "sushi",
        tags: ["sushi", "japonesa", "poke", "asia"],
        products: [
            { id: 301, name: "Roll California", description: "Cangrejo, aguacate y pepino", price: 12.99, icon: "fas fa-fish" },
            { id: 302, name: "Roll Philadelphia", description: "Salmón, queso crema y aguacate", price: 13.99, icon: "fas fa-fish" },
            { id: 303, name: "Sashimi Mixto", description: "Variedad de pescado crudo", price: 15.99, icon: "fas fa-fish" },
            { id: 304, name: "Bowl Poke", description: "Arroz, salmón, aguacate y vegetales", price: 11.99, icon: "fas fa-bowl-food" }
        ]
    },
    {
        id: 4,
        name: "Café Central",
        category: "Café • Postres • Breakfast",
        rating: 4.7,
        reviews: 280,
        deliveryTime: "15-25 min",
        image: "cafe",
        tags: ["café", "postres", "desayuno", "té"],
        products: [
            { id: 401, name: "Cappuccino", description: "Café espresso con leche vaporizada", price: 3.99, icon: "fas fa-coffee" },
            { id: 402, name: "Croissant", description: "Crujiente croissant de mantequilla", price: 2.99, icon: "fas fa-bread-slice" },
            { id: 403, name: "Tarta de Manzana", description: "Tarta dulce con manzanas caramelizadas", price: 4.99, icon: "fas fa-pie" },
            { id: 404, name: "Té Chai", description: "Té especiado con leche", price: 3.49, icon: "fas fa-mug-hot" }
        ]
    },
    {
        id: 5,
        name: "Dulce Tentación",
        category: "Postres • Helados • Repostería",
        rating: 4.9,
        reviews: 190,
        deliveryTime: "20-30 min",
        image: "postres",
        tags: ["postres", "helados", "repostería", "dulce"],
        products: [
            { id: 501, name: "Helado de Vainilla", description: "Helado cremoso de vainilla", price: 4.99, icon: "fas fa-ice-cream" },
            { id: 502, name: "Brownie de Chocolate", description: "Brownie esponjoso con nueces", price: 5.99, icon: "fas fa-cookie" },
            { id: 503, name: "Cheesecake", description: "Tarta de queso con base de galleta", price: 6.99, icon: "fas fa-cheese" },
            { id: 504, name: "Cupcakes", description: "Deliciosos cupcakes decorados", price: 3.99, icon: "fas fa-birthday-cake" }
        ]
    }
];

// ===== ESTADO DE LA APLICACIÓN =====
let cart = JSON.parse(localStorage.getItem('paLlevarCart')) || [];
let orders = JSON.parse(localStorage.getItem('paLlevarOrders')) || [];
let currentRestaurant = null;
let currentUser = JSON.parse(localStorage.getItem('paLlevarCurrentUser')) || {
    name: "Usuario Ejemplo",
    email: "usuario@ejemplo.com"
};
let isOnline = navigator.onLine;

// ===== ELEMENTOS DOM =====
const views = document.querySelectorAll('.view');
const navItems = document.querySelectorAll('.nav-item');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const productList = document.getElementById('product-list');
const restaurantName = document.getElementById('restaurant-name');
const restaurantsList = document.getElementById('restaurants-list');
const subtotalEl = document.getElementById('subtotal');
const shippingEl = document.getElementById('shipping');
const taxEl = document.getElementById('tax');
const totalEl = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout-btn');
const backButton = document.getElementById('back-button');
const backFromCart = document.getElementById('back-from-cart');
const backToHome = document.getElementById('back-to-home');
const backFromSearch = document.getElementById('back-from-search');
const backFromOrders = document.getElementById('back-from-orders');
const backFromProfile = document.getElementById('back-from-profile');
const orderNumber = document.getElementById('order-number');
const homeSearch = document.getElementById('home-search');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const ordersList = document.getElementById('orders-list');
const viewAllRestaurants = document.getElementById('view-all-restaurants');
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const logoutBtn = document.getElementById('logout-btn');
const categories = document.querySelectorAll('.category');

// ===== FUNCIONES DE NAVEGACIÓN =====
function showView(viewId) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    const activeView = document.getElementById(viewId);
    if (activeView) activeView.classList.add('active');
}

// Navegación inferior
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const viewId = item.getAttribute('data-view');
        showView(viewId);
    });
});

// Botones de regreso (flecha)
document.getElementById('back-button')?.addEventListener('click', () => showView('home-view'));
document.getElementById('back-from-cart')?.addEventListener('click', () => showView('home-view'));
document.getElementById('back-from-search')?.addEventListener('click', () => showView('home-view'));
document.getElementById('back-from-orders')?.addEventListener('click', () => showView('home-view'));
document.getElementById('back-from-profile')?.addEventListener('click', () => showView('home-view'));
document.getElementById('back-to-home')?.addEventListener('click', () => showView('home-view'));

// Ejemplo: mostrar productos al seleccionar restaurante
// Debes tener una función que cargue los productos y luego:
function openRestaurant(restaurantId) {
    // ...carga productos del restaurante...
    showView('products-view');
}

// Ejemplo: mostrar carrito
document.getElementById('cart-count')?.addEventListener('click', () => showView('cart-view'));

// Puedes agregar lógica similar para búsqueda, perfil, pedidos, etc.

// Asegúrate de que solo una vista tenga la clase "active" al inicio:
// <div id="home-view" class="view active">...</div>
// Las demás: <div id="products-view" class="view">...</div>

// ===== INICIALIZACIÓN =====
function initApp() {
    // Inicializar vistas
    renderRestaurants(restaurants);
    updateCartCount();
    loadProfile();
    updateOnlineStatus();
    
    document.addEventListener('DOMContentLoaded', () => {
        // Navegación entre secciones
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const section = btn.dataset.section;
                document.querySelectorAll('.section').forEach(sec => {
                    sec.style.display = 'none';
                });
                const activeSection = document.getElementById(section);
                if (activeSection) activeSection.style.display = 'block';
            });
        });

        // Botones de productos
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const productId = parseInt(btn.dataset.productId);
                addToCart(productId);
            });
        });

        // Botón de finalizar compra
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                checkout();
            });
        }

        // Botón de vaciar carrito
        const clearCartBtn = document.getElementById('clear-cart-btn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => {
                clearCart();
            });
        }

        // Botón de inicio de sesión
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                login();
            });
        }
    });
}

// ===== RENDERIZADO DE RESTAURANTES =====
function renderRestaurants(restaurantsToRender) {
    restaurantsList.innerHTML = '';
    
    restaurantsToRender.forEach(restaurant => {
        const restaurantElement = document.createElement('div');
        restaurantElement.className = 'restaurant-card';
        restaurantElement.setAttribute('data-id', restaurant.id);
        restaurantElement.innerHTML = `
            <div class="restaurant-image">
                <i class="fas fa-${restaurant.image}"></i>
            </div>
            <div class="restaurant-info">
                <div class="restaurant-name">${restaurant.name}</div>
                <div class="restaurant-category">${restaurant.category}</div>
                <div class="restaurant-meta">
                    <span class="rating"><i class="fas fa-star"></i> ${restaurant.rating} (${restaurant.reviews}+)</span>
                    <span>${restaurant.deliveryTime}</span>
                </div>
            </div>
        `;
        
        restaurantElement.addEventListener('click', () => {
            openRestaurant(restaurant.id);
        });
        
        restaurantsList.appendChild(restaurantElement);
    });
}

// ===== ABRIR RESTAURANTE =====
function openRestaurant(restaurantId) {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    if (restaurant) {
        currentRestaurant = restaurant;
        restaurantName.textContent = restaurant.name;
        renderProducts(restaurant.products);
        showView('products-view');
    }
}

// ===== RENDERIZADO DE PRODUCTOS =====
function renderProducts(products) {
    productList.innerHTML = '';
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <div class="product-image">
                <i class="${product.icon}"></i>
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-desc">${product.description}</div>
                <div class="product-meta">
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="btn btn-sm add-to-cart" data-id="${product.id}">Añadir</button>
                </div>
            </div>
        `;
        
        productElement.querySelector('.add-to-cart').addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
            e.stopPropagation();
        });
        
        productList.appendChild(productElement);
    });
}

// ===== FUNCIONES DEL CARRITO =====
function addToCart(productId) {
    let product = null;
    for (const restaurant of restaurants) {
        product = restaurant.products.find(p => p.id === productId);
        if (product) break;
    }
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                icon: product.icon,
                restaurant: currentRestaurant.name
            });
        }
        
        updateCartCount();
        saveCart();
        
        // Feedback visual
        const button = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
        const originalText = button.textContent;
        button.textContent = "✓ Añadido";
        button.style.backgroundColor = '#4caf50';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 1500);
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function saveCart() {
    localStorage.setItem('paLlevarCart', JSON.stringify(cart));
}

function updateCartView() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="no-results"><i class="fas fa-shopping-cart"></i>Tu carrito está vacío</p>';
        checkoutBtn.disabled = true;
        checkoutBtn.style.opacity = '0.5';
    } else {
        checkoutBtn.disabled = false;
        checkoutBtn.style.opacity = '1';
        
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div class="cart-item-image">
                    <i class="${item.icon}"></i>
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    <div style="font-size: 12px; color: #777;">${item.restaurant}</div>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
            `;
            
            cartItemElement.querySelector('.plus').addEventListener('click', () => {
                const itemIndex = cart.findIndex(i => i.id === item.id);
                if (itemIndex !== -1) {
                    cart[itemIndex].quantity += 1;
                    updateCartView();
                    updateCartCount();
                    saveCart();
                }
            });
            
            cartItemElement.querySelector('.minus').addEventListener('click', () => {
                const itemIndex = cart.findIndex(i => i.id === item.id);
                if (itemIndex !== -1) {
                    cart[itemIndex].quantity -= 1;
                    if (cart[itemIndex].quantity <= 0) {
                        cart.splice(itemIndex, 1);
                    }
                    updateCartView();
                    updateCartCount();
                    saveCart();
                }
            });
            
            cartItems.appendChild(cartItemElement);
        });
    }
    
    // Actualizar totales
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const shipping = subtotal > 0 ? 2.5 : 0;
    const total = subtotal + tax + shipping;
    
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    taxEl.textContent = `$${tax.toFixed(2)}`;
    shippingEl.textContent = shipping > 0 ? `$${shipping.toFixed(2)}` : 'Gratis';
    totalEl.textContent = `$${total.toFixed(2)}`;
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Carrito vacío', 'Agrega productos antes de continuar');
        return;
    }
    
    const order = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        items: [...cart],
        subtotal: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
        tax: cart.reduce((total, item) => total + (item.price * item.quantity), 0) * 0.1,
        shipping: 2.5,
        total: cart.reduce((total, item) => total + (item.price * item.quantity), 0) * 1.1 + 2.5,
        status: 'Preparando'
    };
    
    if (isOnline) {
        // Enviar al servidor
        sendOrderToServer(order)
            .then(() => {
                orders.unshift(order);
                saveOrders();
                completeCheckout(order);
            })
            .catch(() => {
                // Fallback offline
                offlineManager.addPendingOrder(order);
                completeCheckout(order);
            });
    } else {
        // Modo offline
        offlineManager.addPendingOrder(order);
        completeCheckout(order);
        showNotification('Pedido en modo offline', 'Se enviará cuando tengas conexión');
    }
}

function completeCheckout(order) {
    cart = [];
    saveCart();
    updateCartCount();
    orderNumber.textContent = order.id;
    showView('confirmation-view');
    
    // Mostrar notificación
    showNotification('¡Pedido Confirmado!', {
        body: `Tu pedido #${order.id} está siendo preparado`,
        icon: '/assets/icon-192.png'
    });
}

async function sendOrderToServer(order) {
    // Simulación de envío al servidor
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simular fallo aleatorio (20% de probabilidad)
            if (Math.random() < 0.8) {
                resolve();
            } else {
                reject(new Error('Error de conexión'));
            }
        }, 1000);
    });
}

// ===== BÚSQUEDA =====
function performSearch(query) {
    searchResults.innerHTML = '';
    
    if (query === '') {
        // Mostrar todos los restaurantes si no hay query
        restaurants.forEach(restaurant => {
            const restaurantElement = document.createElement('div');
            restaurantElement.className = 'restaurant-card';
            restaurantElement.setAttribute('data-id', restaurant.id);
            restaurantElement.innerHTML = `
                <div class="restaurant-image">
                    <i class="fas fa-${restaurant.image}"></i>
                </div>
                <div class="restaurant-info">
                    <div class="restaurant-name">${restaurant.name}</div>
                    <div class="restaurant-category">${restaurant.category}</div>
                    <div class="restaurant-meta">
                        <span class="rating"><i class="fas fa-star"></i> ${restaurant.rating} (${restaurant.reviews}+)</span>
                        <span>${restaurant.deliveryTime}</span>
                    </div>
                </div>
            `;
            
            restaurantElement.addEventListener('click', () => {
                openRestaurant(restaurant.id);
            });
            
            searchResults.appendChild(restaurantElement);
        });
        return;
    }
    
    // Buscar restaurantes
    const restaurantResults = restaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(query) || 
        restaurant.category.toLowerCase().includes(query) ||
        restaurant.tags.some(tag => tag.includes(query))
    );
    
    // Buscar productos
    const productResults = [];
    restaurants.forEach(restaurant => {
        restaurant.products.forEach(product => {
            if (product.name.toLowerCase().includes(query) || 
                product.description.toLowerCase().includes(query)) {
                productResults.push({
                    ...product,
                    restaurant: restaurant.name,
                    restaurantId: restaurant.id
                });
            }
        });
    });
    
    // Mostrar resultados
    if (restaurantResults.length === 0 && productResults.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No se encontraron resultados para "${query}"</p>
            </div>
        `;
        return;
    }
    
    // Mostrar restaurantes encontrados
    if (restaurantResults.length > 0) {
        const title = document.createElement('div');
        title.className = 'section-title';
        title.innerHTML = '<span>Restaurantes</span>';
        searchResults.appendChild(title);
        
        restaurantResults.forEach(restaurant => {
            const restaurantElement = document.createElement('div');
            restaurantElement.className = 'restaurant-card';
            restaurantElement.setAttribute('data-id', restaurant.id);
            restaurantElement.innerHTML = `
                <div class="restaurant-image">
                    <i class="fas fa-${restaurant.image}"></i>
                </div>
                <div class="restaurant-info">
                    <div class="restaurant-name">${restaurant.name}</div>
                    <div class="restaurant-category">${restaurant.category}</div>
                    <div class="restaurant-meta">
                        <span class="rating"><i class="fas fa-star"></i> ${restaurant.rating} (${restaurant.reviews}+)</span>
                        <span>${restaurant.deliveryTime}</span>
                    </div>
                </div>
            `;
            
            restaurantElement.addEventListener('click', () => {
                openRestaurant(restaurant.id);
            });
            
            searchResults.appendChild(restaurantElement);
        });
    }
    
    // Mostrar productos encontrados
    if (productResults.length > 0) {
        const title = document.createElement('div');
        title.className = 'section-title';
        title.innerHTML = '<span>Productos</span>';
        searchResults.appendChild(title);
        
        productResults.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-card';
            productElement.innerHTML = `
                <div class="product-image">
                    <i class="${product.icon}"></i>
                </div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-desc">${product.description}</div>
                    <div style="font-size: 12px; color: #777;">${product.restaurant}</div>
                    <div class="product-meta">
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <button class="btn btn-sm add-to-cart" data-id="${product.id}" data-restaurant="${product.restaurantId}">Añadir</button>
                    </div>
                </div>
            `;
            
            productElement.querySelector('.add-to-cart').addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                const restaurantId = parseInt(e.target.getAttribute('data-restaurant'));
                
                // Abrir el restaurante primero
                const restaurant = restaurants.find(r => r.id === restaurantId);
                if (restaurant) {
                    currentRestaurant = restaurant;
                    addToCart(productId);
                }
                
                e.stopPropagation();
            });
            
            searchResults.appendChild(productElement);
        });
    }
}

// ===== PEDIDOS =====
function loadOrders() {
    ordersList.innerHTML = '';
    
    if (orders.length === 0) {
        ordersList.innerHTML = `
            <div class="no-results">
                <i class="fas fa-shopping-bag"></i>
                <p>No tienes pedidos realizados</p>
            </div>
        `;
        return;
    }
    
    orders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.className = 'order-card';
        orderElement.innerHTML = `
            <div class="order-header">
                <div class="order-number">Pedido #${order.id}</div>
                <div class="order-date">${order.date}</div>
            </div>
            <div>${order.items.length} productos</div>
            <div class="order-status status-${order.status.toLowerCase()}">${order.status}</div>
            <div style="margin-top: 10px; font-weight: 600;">Total: $${order.total.toFixed(2)}</div>
        `;
        
        ordersList.appendChild(orderElement);
    });
}

// ===== PERFIL =====
function loadProfile() {
    userName.textContent = currentUser.name;
    userEmail.textContent = currentUser.email;
}

// ===== NOTIFICACIONES =====
function showNotification(title, message) {
    let body = typeof message === 'string' ? message : (message.body || '');
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body: body, icon: '/assets/icon-192.png' });
    } else {
        // Fallback para navegadores sin notificaciones
        alert(`${title}: ${body}`);
    }
}

// ===== MANEJO DE CONEXIÓN =====
function updateOnlineStatus() {
    isOnline = navigator.onLine;
    const statusElement = document.getElementById('online-status');
    
    if (!statusElement) {
        const status = document.createElement('div');
        status.id = 'online-status';
        status.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
            z-index: 1000;
            background: ${isOnline ? '#10B981' : '#F59E0B'};
            color: white;
        `;
        status.innerHTML = isOnline ? 
            '<i class="fas fa-wifi"></i> En línea' : 
            '<i class="fas fa-wifi-slash"></i> Sin conexión';
        
        document.body.appendChild(status);
    } else {
        statusElement.style.background = isOnline ? '#10B981' : '#F59E0B';
        statusElement.innerHTML = isOnline ? 
            '<i class="fas fa-wifi"></i> En línea' : 
            '<i class="fas fa-wifi-slash"></i> Sin conexión';
    }
    
    // Sincronizar si volvemos a tener conexión
    if (isOnline) {
        offlineManager.syncPendingOrders();
    }
}

// ===== OFFLINE MANAGER =====
class OfflineManager {
    constructor() {
        this.pendingOrders = JSON.parse(localStorage.getItem('pendingOrders')) || [];
    }

    addPendingOrder(order) {
        this.pendingOrders.push({
            ...order,
            timestamp: Date.now(),
            status: 'pending'
        });
        this.savePendingOrders();
    }

    savePendingOrders() {
        localStorage.setItem('pendingOrders', JSON.stringify(this.pendingOrders));
    }

    async syncPendingOrders() {
        if (!navigator.onLine) return;

        for (const order of this.pendingOrders) {
            try {
                // Aquí iría la lógica para enviar los pedidos al servidor
                console.log('Sincronizando pedido:', order);
                
                // Simulamos el envío
                await this.sendOrderToServer(order);
                
                // Eliminamos el pedido de la lista de pendientes
                this.pendingOrders = this.pendingOrders.filter(o => o.timestamp !== order.timestamp);
                this.savePendingOrders();
            } catch (error) {
                console.error('Error sincronizando pedido:', error);
            }
        }
    }

    async sendOrderToServer(order) {
        // Simulación de envío al servidor
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Pedido enviado al servidor:', order);
                resolve();
            }, 1000);
        });
    }
}

// Inicializar el manager offline
const offlineManager = new OfflineManager();

// ===== INICIALIZAR APLICACIÓN =====
document.addEventListener('DOMContentLoaded', initApp);

// Event listeners para conexión
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// Usuarios registrados (simulado en localStorage)
function getUsers() {
    return JSON.parse(localStorage.getItem('paLlevarUsers') || '[]');
}
function saveUsers(users) {
    localStorage.setItem('paLlevarUsers', JSON.stringify(users));
}

// Login mejorado
function login() {
    const userInput = document.getElementById('username');
    const passInput = document.getElementById('password');
    const loginSection = document.getElementById('login');
    if (userInput && passInput) {
        const username = userInput.value.trim();
        const password = passInput.value.trim();

        if (!username || !password) {
            alert('Por favor ingresa usuario y contraseña.');
            return;
        }

        const users = getUsers();
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            alert('¡Bienvenido, ' + username + '!');
            localStorage.setItem('paLlevarUser', username);
            loginSection.style.display = 'none';
            document.getElementById('home').style.display = 'block';
            document.getElementById('logout-btn').style.display = 'inline-block';
        } else {
            alert('Usuario o contraseña incorrectos.');
        }
    }
}

// Registro de usuario
function register() {
    const newUserInput = document.getElementById('new-username');
    const newPassInput = document.getElementById('new-password');
    if (newUserInput && newPassInput) {
        const username = newUserInput.value.trim();
        const password = newPassInput.value.trim();

        if (!username || !password) {
            alert('Por favor ingresa usuario y contraseña para registrarte.');
            return;
        }

        let users = getUsers();
        if (users.find(u => u.username === username)) {
            alert('El usuario ya existe.');
            return;
        }

        users.push({ username, password });
        saveUsers(users);
        alert('Usuario registrado con éxito. Ahora puedes iniciar sesión.');
        newUserInput.value = '';
        newPassInput.value = '';
    }
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('paLlevarUser');
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.style.display = 'none';

    // Corrige los IDs según tu HTML
    const homeSection = document.getElementById('home');
    if (homeSection) homeSection.style.display = 'none';

    const loginSection = document.getElementById('login');
    if (loginSection) loginSection.style.display = 'block';

    // Si usas vistas con clase "view" y "active"
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
    const loginView = document.getElementById('login-view');
    if (loginView) loginView.classList.add('active');
}

// Listeners para registro y logout
document.addEventListener('DOMContentLoaded', () => {
    const registerBtn = document.getElementById('register-btn');
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            register();
        });
    }
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            logout();
        });
    }

    // Mostrar login o home según sesión
    const currentUser = localStorage.getItem('paLlevarUser');
    if (currentUser) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('home').style.display = 'block';
        document.getElementById('logout-btn').style.display = 'inline-block';
    } else {
        document.getElementById('login').style.display = 'block';
        document.getElementById('home').style.display = 'none';
        document.getElementById('logout-btn').style.display = 'none';
    }
});