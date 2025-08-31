// Datos de ejemplo para la aplicación
const restaurants = [
    {
        id: 1,
        name: "La Pizza Nostra",
        category: "Italiana • Pizza • Pasta",
        rating: 4.8,
        deliveryTime: "25-35 min",
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
        deliveryTime: "20-30 min",
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
        deliveryTime: "30-40 min",
        products: [
            { id: 301, name: "Roll California", description: "Cangrejo, aguacate y pepino", price: 12.99, icon: "fas fa-fish" },
            { id: 302, name: "Roll Philadelphia", description: "Salmón, queso crema y aguacate", price: 13.99, icon: "fas fa-fish" },
            { id: 303, name: "Sashimi Mixto", description: "Variedad de pescado crudo", price: 15.99, icon: "fas fa-fish" },
            { id: 304, name: "Bowl Poke", description: "Arroz, salmón, aguacate y vegetales", price: 11.99, icon: "fas fa-bowl-food" }
        ]
    }
];

// Estado de la aplicación
let cart = [];
let currentRestaurant = null;

// Elementos DOM
const views = document.querySelectorAll('.view');
const navItems = document.querySelectorAll('.nav-item');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const productList = document.getElementById('product-list');
const restaurantName = document.getElementById('restaurant-name');
const subtotalEl = document.getElementById('subtotal');
const shippingEl = document.getElementById('shipping');
const taxEl = document.getElementById('tax');
const totalEl = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout-btn');
const backButton = document.getElementById('back-button');
const backFromCart = document.getElementById('back-from-cart');
const backToHome = document.getElementById('back-to-home');
const orderNumber = document.getElementById('order-number');
const currentTime = document.getElementById('current-time');

// Funciones de navegación
function showView(viewId) {
    views.forEach(view => view.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
    
    navItems.forEach(item => {
        if (item.getAttribute('data-view') === viewId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    if (viewId === 'cart-view') {
        updateCartView();
    }
}

// Inicializar la aplicación
function initApp() {
    // Navegación inferior
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const viewId = item.getAttribute('data-view');
            if (viewId === 'cart-view') {
                updateCartView();
            }
            showView(viewId);
        });
    });
    
    // Botones de retroceso
    backButton.addEventListener('click', () => showView('home-view'));
    backFromCart.addEventListener('click', () => {
        if (currentRestaurant) {
            showView('products-view');
        } else {
            showView('home-view');
        }
    });
    
    // Botón de volver al inicio
    backToHome.addEventListener('click', () => {
        cart = [];
        updateCartCount();
        showView('home-view');
    });
    
    // Botón de checkout
    checkoutBtn.addEventListener('click', () => {
        // Generar número de pedido aleatorio
        orderNumber.textContent = Math.floor(10000 + Math.random() * 90000);
        showView('confirmation-view');
        
        // Limpiar carrito después de realizar pedido
        cart = [];
        updateCartCount();
    });
    
    // Restaurantes clickeables
    document.querySelectorAll('.restaurant-card').forEach(card => {
        card.addEventListener('click', () => {
            const restaurantId = parseInt(card.getAttribute('data-id'));
            openRestaurant(restaurantId);
        });
    });
    
    // Actualizar la hora
    updateTime();
    setInterval(updateTime, 60000);
    
    // Inicializar el carrito
    updateCartCount();
}

// Abrir un restaurante y mostrar sus productos
function openRestaurant(restaurantId) {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    if (restaurant) {
        currentRestaurant = restaurant;
        restaurantName.textContent = restaurant.name;
        renderProducts(restaurant.products);
        showView('products-view');
    }
}

// Renderizar productos
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
                    <button class="add-to-cart" data-id="${product.id}">Añadir</button>
                </div>
            </div>
        `;
        
        productList.appendChild(productElement);
    });
    
    // Añadir event listeners a los botones
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
            e.stopPropagation();
        });
    });
}

// Añadir producto al carrito
function addToCart(productId) {
    // Buscar el producto en todos los restaurantes
    let product = null;
    for (const restaurant of restaurants) {
        product = restaurant.products.find(p => p.id === productId);
        if (product) break;
    }
    
    if (product) {
        // Verificar si el producto ya está en el carrito
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                icon: product.icon
            });
        }
        
        updateCartCount();
        
        // Mostrar feedback visual
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

// Actualizar contador del carrito
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Actualizar vista del carrito
function updateCartView() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 20px; color: #777;">Tu carrito está vacío</p>';
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
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
            `;
            
            cartItems.appendChild(cartItemElement);
        });
        
        // Añadir event listeners a los botones de cantidad
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const productId = parseInt(btn.getAttribute('data-id'));
                const item = cart.find(item => item.id === productId);
                if (item) {
                    item.quantity += 1;
                    updateCartView();
                    updateCartCount();
                }
            });
        });
        
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const productId = parseInt(btn.getAttribute('data-id'));
                const item = cart.find(item => item.id === productId);
                if (item) {
                    item.quantity -= 1;
                    if (item.quantity <= 0) {
                        cart = cart.filter(i => i.id !== productId);
                    }
                    updateCartView();
                    updateCartCount();
                }
            });
        });
    }
    
    // Actualizar totales
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% de impuestos
    const shipping = subtotal > 0 ? 2.5 : 0;
    const total = subtotal + tax + shipping;
    
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    taxEl.textContent = `$${tax.toFixed(2)}`;
    shippingEl.textContent = shipping > 0 ? `$${shipping.toFixed(2)}` : 'Gratis';
    totalEl.textContent = `$${total.toFixed(2)}`;
}

// Actualizar la hora
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    currentTime.textContent = `${hours}:${minutes}`;
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp);