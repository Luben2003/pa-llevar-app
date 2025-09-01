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

// ===== ESTADO DE LA APP =====
let cart = JSON.parse(localStorage.getItem('paLlevarCart')) || [];
let orders = JSON.parse(localStorage.getItem('paLlevarOrders')) || [];
let currentRestaurant = null;

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
    views.forEach(view => view.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
    navItems.forEach(item => {
        if (item.getAttribute('data-view') === viewId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    if (viewId === 'cart-view') updateCartView();
    if (viewId === 'orders-view') loadOrders();
    if (viewId === 'profile-view') loadProfile();
    if (viewId === 'home-view') renderRestaurants(restaurants);
}

// ===== INICIALIZACIÓN =====
function initApp() {
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const viewId = item.getAttribute('data-view');
            showView(viewId);
        });
    });
    backButton?.addEventListener('click', () => showView('home-view'));
    backFromCart?.addEventListener('click', () => currentRestaurant ? showView('products-view') : showView('home-view'));
    backFromSearch?.addEventListener('click', () => showView('home-view'));
    backFromOrders?.addEventListener('click', () => showView('home-view'));
    backFromProfile?.addEventListener('click', () => showView('home-view'));
    backToHome?.addEventListener('click', () => showView('home-view'));
    checkoutBtn?.addEventListener('click', checkout);
    homeSearch?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 2) {
            showView('search-view');
            searchInput.value = query;
            performSearch(query);
        }
    });
    searchInput?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        performSearch(query);
    });
    viewAllRestaurants?.addEventListener('click', () => {
        showView('search-view');
        searchInput.value = '';
        performSearch('');
    });
    categories.forEach(category => {
        category.addEventListener('click', () => {
            const categoryName = category.getAttribute('data-category');
            showView('search-view');
            searchInput.value = categoryName;
            performSearch(categoryName);
        });
    });
    logoutBtn?.addEventListener('click', () => {
        localStorage.removeItem('paLlevarCart');
        localStorage.removeItem('paLlevarOrders');
        cart = [];
        orders = [];
        updateCartCount();
        showView('home-view');
        alert('Sesión cerrada correctamente');
    });
    renderRestaurants(restaurants);
    updateCartCount();
    loadProfile();
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
        restaurantElement.addEventListener('click', () => openRestaurant(restaurant.id));
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
    orders.unshift(order);
    localStorage.setItem('paLlevarOrders', JSON.stringify(orders));
    cart = [];
    saveCart();
    updateCartCount();
    orderNumber.textContent = order.id;
    showView('confirmation-view');
    showNotification('¡Pedido Confirmado!', `Tu pedido #${order.id} está siendo preparado`);
}

// ===== BÚSQUEDA =====
function performSearch(query) {
    searchResults.innerHTML = '';
    if (query === '') {
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
            restaurantElement.addEventListener('click', () => openRestaurant(restaurant.id));
            searchResults.appendChild(restaurantElement);
        });
        return;
    }
    const restaurantResults = restaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(query) || 
        restaurant.category.toLowerCase().includes(query) ||
        restaurant.tags?.some(tag => tag.includes(query))
    );
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
    if (restaurantResults.length === 0 && productResults.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No se encontraron resultados para "${query}"</p>
            </div>
        `;
        return;
    }
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
            restaurantElement.addEventListener('click', () => openRestaurant(restaurant.id));
            searchResults.appendChild(restaurantElement);
        });
    }
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
    const user = JSON.parse(localStorage.getItem('paLlevarCurrentUser'));
    if (user) {
        userName.textContent = user.name;
        userEmail.textContent = user.email;
    }
}

// ===== NOTIFICACIONES =====
function showNotification(title, message) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body: message, icon: '/assets/icon-192.png' });
    } else {
        alert(`${title}: ${message}`);
    }
}

// ===== INICIALIZAR APP =====
document.addEventListener('DOMContentLoaded', initApp);

// Event listeners para conexión
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// Usuarios registrados (simulado en localStorage)
function getUsers() {
    return JSON.parse(localStorage.getItem('paLlevarUsers')) || [];
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

// Simulación de usuario
const demoUser = {
    email: "usuario@ejemplo.com",
    password: "123456",
    name: "Usuario Ejemplo"
};

const loginBtn = document.getElementById('login-btn');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginError = document.getElementById('login-error');
const registerBtn = document.getElementById('register-btn');
const registerName = document.getElementById('register-name');
const registerEmail = document.getElementById('register-email');
const registerPassword = document.getElementById('register-password');
const registerError = document.getElementById('register-error');

function showLogin() {
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
    document.getElementById('login-view').classList.add('active');
}

loginBtn?.addEventListener('click', async () => {
    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        loginError.textContent = "Correo o contraseña incorrectos";
        loginError.style.display = 'block';
    } else {
        // Obtener nombre del usuario
        const user = data.user;
        localStorage.setItem('paLlevarCurrentUser', JSON.stringify({
            name: user.user_metadata?.name || "",
            email: user.email
        }));
        loginError.style.display = 'none';
        showView('home-view');
        loadProfile();
    }
});

registerBtn?.addEventListener('click', async () => {
    const name = registerName.value.trim();
    const email = registerEmail.value.trim();
    const password = registerPassword.value.trim();

    if (!name || !email || !password) {
        registerError.textContent = "Completa todos los campos";
        registerError.style.display = 'block';
        return;
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { name }
        }
    });

    if (error) {
        registerError.textContent = error.message;
        registerError.style.display = 'block';
    } else {
        localStorage.setItem('paLlevarCurrentUser', JSON.stringify({ name, email }));
        registerError.style.display = 'none';
        showView('home-view');
        loadProfile();
    }
});

// Mostrar login si no hay usuario
document.addEventListener('DOMContentLoaded', async () => {
    const user = localStorage.getItem('paLlevarCurrentUser');
    if (!user) showLogin();
});

// Cerrar sesión
logoutBtn?.addEventListener('click', async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('paLlevarCurrentUser');
    showLogin();
});

// Actualiza el perfil con datos del usuario actual
function loadProfile() {
    const user = JSON.parse(localStorage.getItem('paLlevarCurrentUser'));
    if (user) {
        userName.textContent = user.name;
        userEmail.textContent = user.email;
    }
}