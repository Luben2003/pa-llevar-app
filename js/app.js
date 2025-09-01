// ===== APLICACIÓN PRINCIPAL =====

// Estado global de la aplicación
const AppState = {
    currentUser: null,
    cart: [],
    currentView: 'login-view',
    isAuthenticated: false
};

// Elementos DOM
const DOM = {
    views: {},
    forms: {},
    buttons: {},
    inputs: {},
    errors: {} // Added for error elements
};

// Inicializar la aplicación
async function initApp() {
    console.log('🚀 Iniciando Pa Llevar...');
    
    try {
        // Cargar elementos DOM
        loadDOMElements();
        
        // Configurar event listeners
        setupEventListeners();
        
        // Verificar autenticación de forma asíncrona
        await checkAuthentication();
        
        console.log('✅ Aplicación iniciada correctamente');
    } catch (error) {
        console.error('❌ Error iniciando aplicación:', error);
        // Asegurar que siempre se muestre la vista de login
        showView('login-view');
    }
}

// Cargar elementos DOM
function loadDOMElements() {
    // Vistas
    DOM.views = {
        home: document.getElementById('home-view'),
        login: document.getElementById('login-view'),
        products: document.getElementById('products-view'),
        cart: document.getElementById('cart-view'),
        search: document.getElementById('search-view'),
        orders: document.getElementById('orders-view'),
        profile: document.getElementById('profile-view'),
        confirmation: document.getElementById('confirmation-view')
    };
    
    // Formularios
    DOM.forms = {
        login: document.querySelector('.login-form'),
        register: document.querySelector('.register-form')
    };
    
    // Botones de navegación
    DOM.buttons = {
        navItems: document.querySelectorAll('.nav-item'),
        backButtons: document.querySelectorAll('[id*="back-"]'),
        login: document.getElementById('login-btn'),
        register: document.getElementById('register-btn'),
        logout: document.getElementById('logout-btn'),
        checkout: document.getElementById('checkout-btn'),
        backToHome: document.getElementById('back-to-home')
    };
    
    // Inputs
    DOM.inputs = {
        loginEmail: document.getElementById('login-email'),
        loginPassword: document.getElementById('login-password'),
        registerName: document.getElementById('register-name'),
        registerEmail: document.getElementById('register-email'),
        registerPassword: document.getElementById('register-password'),
        search: document.getElementById('home-search'),
        searchInput: document.getElementById('search-input')
    };
    
    // Elementos de error
    DOM.errors = {
        login: document.getElementById('login-error'),
        register: document.getElementById('register-error')
    };
}

// Configurar event listeners
function setupEventListeners() {
    // Navegación inferior
    DOM.buttons.navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const viewName = item.dataset.view;
            if (viewName && AppState.isAuthenticated) {
                showView(viewName);
                updateActiveNavItem(item);
            } else if (!AppState.isAuthenticated) {
                showNotification('Por favor inicia sesión primero', 'warning');
            }
        });
    });
    
    // Botones de regreso
    DOM.buttons.backButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (AppState.isAuthenticated) {
                showView('home-view');
            } else {
                showView('login-view');
            }
        });
    });
    
    // Formulario de login
    DOM.forms.login.addEventListener('submit', handleLogin);
    
    // Formulario de registro
    DOM.forms.register.addEventListener('submit', handleRegister);
    
    // Botón de logout
    DOM.buttons.logout.addEventListener('click', handleLogout);
    
    // Botón de checkout
    DOM.buttons.checkout.addEventListener('click', handleCheckout);
    
    // Botón de volver al inicio
    DOM.buttons.backToHome.addEventListener('click', () => {
        showView('home-view');
    });
    
    // Búsqueda
    if (DOM.inputs.search) {
        DOM.inputs.search.addEventListener('input', debounce(handleSearch, 300));
    }
    
    if (DOM.inputs.searchInput) {
        DOM.inputs.searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    // Categorías
    document.querySelectorAll('.category').forEach(category => {
        category.addEventListener('click', () => {
            const categoryType = category.dataset.category;
            handleCategoryClick(categoryType);
        });
    });
}

// Manejar login
async function handleLogin(e) {
    e.preventDefault();
    
    const email = DOM.inputs.loginEmail.value.trim();
    const password = DOM.inputs.loginPassword.value;
    
    // Validaciones
    if (!email || !password) {
        showError('login', 'Por favor completa todos los campos');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('login', 'Por favor ingresa un email válido');
        return;
    }
    
    if (!isValidPassword(password)) {
        showError('login', 'La contraseña debe tener al menos 6 caracteres');
        return;
    }
    
    try {
        console.log('🔄 Iniciando login...', { email });
        showLoading(document.body, 'Iniciando sesión...');
        
        // Login con Supabase
        const result = await SupabaseService.signIn(email, password);
        console.log('📡 Respuesta de Supabase:', result);
        
        if (result.success) {
            console.log('✅ Login exitoso:', result.data.user);
            // Login exitoso
            AppState.currentUser = {
                id: result.data.user.id,
                name: result.data.user.user_metadata?.name || email.split('@')[0],
                email: result.data.user.email
            };
            AppState.isAuthenticated = true;
            
            // Guardar en localStorage
            saveToStorage('user', AppState.currentUser);
            
            // Limpiar formulario
            DOM.forms.login.reset();
            hideError('login');
            
            // Mostrar notificación
            showNotification('¡Bienvenido!', 'success');
            
            // Cambiar a vista principal
            showView('home-view');
        } else {
            console.log('❌ Error en login:', result.error);
            // Error en login
            showError('login', result.error || 'Error al iniciar sesión');
        }
        
    } catch (error) {
        console.error('💥 Error en handleLogin:', error);
        handleError(error, 'login');
    } finally {
        console.log('🏁 Finalizando login...');
        hideLoading();
    }
}

// Manejar registro
async function handleRegister(e) {
    e.preventDefault();
    
    const name = DOM.inputs.registerName.value.trim();
    const email = DOM.inputs.registerEmail.value.trim();
    const password = DOM.inputs.registerPassword.value;
    
    // Validaciones
    if (!name || !email || !password) {
        showError('register', 'Por favor completa todos los campos');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('register', 'Por favor ingresa un email válido');
        return;
    }
    
    if (!isValidPassword(password)) {
        showError('register', 'La contraseña debe tener al menos 6 caracteres');
        return;
    }
    
    try {
        console.log('🔄 Iniciando registro...', { email, name });
        showLoading(document.body, 'Creando cuenta...');
        
        // Registro con Supabase
        const result = await SupabaseService.signUp(email, password, { name });
        console.log('📡 Respuesta de Supabase:', result);
        
        if (result.success) {
            console.log('✅ Registro exitoso:', result.data.user);
            // Registro exitoso
            AppState.currentUser = {
                id: result.data.user.id,
                name: name,
                email: email
            };
            AppState.isAuthenticated = true;
            
            // Guardar en localStorage
            saveToStorage('user', AppState.currentUser);
            
            // Limpiar formulario
            DOM.forms.register.reset();
            hideError('register');
            
            // Mostrar notificación
            showNotification('¡Cuenta creada exitosamente! Revisa tu email para confirmar.', 'success');
            
            // Cambiar a vista principal
            showView('home-view');
        } else {
            console.log('❌ Error en registro:', result.error);
            // Error en registro
            showError('register', result.error || 'Error al crear la cuenta');
        }
        
    } catch (error) {
        console.error('💥 Error en handleRegister:', error);
        handleError(error, 'register');
    } finally {
        console.log('🏁 Finalizando registro...');
        hideLoading();
    }
}

// Manejar logout
async function handleLogout() {
    try {
        // Logout con Supabase
        const result = await SupabaseService.signOut();
        
        if (result.success) {
            AppState.currentUser = null;
            AppState.isAuthenticated = false;
            AppState.cart = [];
            
            // Limpiar localStorage
            clearStorage();
            
            // Mostrar notificación
            showNotification('Sesión cerrada', 'info');
            
            // Volver a login
            showView('login-view');
        } else {
            showNotification('Error al cerrar sesión', 'error');
        }
    } catch (error) {
        handleError(error, 'logout');
    }
}

// Manejar checkout
function handleCheckout() {
    if (AppState.cart.length === 0) {
        showNotification('Tu carrito está vacío', 'warning');
        return;
    }
    
    // Generar número de pedido
    const orderNumber = generateOrderNumber();
    document.getElementById('order-number').textContent = orderNumber;
    
    // Mostrar confirmación
    showView('confirmation-view');
    
    // Limpiar carrito
    AppState.cart = [];
    updateCartCount();
    
    // Mostrar notificación
    showNotification('¡Pedido realizado con éxito!', 'success');
}

// Manejar búsqueda
function handleSearch(e) {
    const query = e.target.value.trim();
    if (query.length < 2) return;
    
    console.log('Buscando:', query);
    // Aquí iría la lógica de búsqueda real
}

// Manejar click en categoría
function handleCategoryClick(category) {
    console.log('Categoría seleccionada:', category);
    // Aquí iría la lógica para filtrar por categoría
    showNotification(`Mostrando ${category}`, 'info');
}

// Mostrar vista
function showView(viewName) {
    console.log('🔄 Cambiando a vista:', viewName);
    
    // Ocultar todas las vistas
    Object.values(DOM.views).forEach(view => {
        if (view) {
            view.classList.remove('active');
        }
    });
    
    // Mostrar vista seleccionada
    const targetView = DOM.views[viewName.replace('-view', '')];
    if (targetView) {
        targetView.classList.add('active');
        AppState.currentView = viewName;
    }
    
    // Manejar navegación inferior
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
        if (viewName === 'login-view') {
            bottomNav.style.display = 'none';
        } else {
            bottomNav.style.display = 'flex';
            // Actualizar navegación si es necesario
            if (viewName !== 'confirmation-view') {
                updateActiveNavItem(viewName);
            }
        }
    }
    
    console.log('✅ Vista activa:', viewName);
}

// Actualizar elemento activo en navegación
function updateActiveNavItem(viewName) {
    DOM.buttons.navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.view === viewName) {
            item.classList.add('active');
        }
    });
}

// Verificar autenticación
async function checkAuthentication() {
    try {
        console.log('🔍 Verificando autenticación...');
        
        // Verificar sesión actual con Supabase
        const result = await SupabaseService.getCurrentUser();
        console.log('📡 Resultado de verificación:', result);
        
        if (result.success && result.user) {
            console.log('✅ Usuario autenticado:', result.user.email);
            AppState.currentUser = {
                id: result.user.id,
                name: result.user.user_metadata?.name || result.user.email.split('@')[0],
                email: result.user.email
            };
            AppState.isAuthenticated = true;
            showView('home-view');
        } else {
            console.log('ℹ️ No hay sesión activa, mostrando login');
            // No hay sesión activa, mostrar login
            AppState.isAuthenticated = false;
            AppState.currentUser = null;
            showView('login-view');
        }
    } catch (error) {
        console.log('⚠️ Error verificando autenticación (normal si no hay sesión):', error.message);
        // Es normal que haya error si no hay sesión activa
        AppState.isAuthenticated = false;
        AppState.currentUser = null;
        showView('login-view');
    }
}

// Mostrar error
function showError(formType, message) {
    const errorElement = DOM.errors[formType];
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

// Ocultar error
function hideError(formType) {
    const errorElement = DOM.errors[formType];
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

// Actualizar contador del carrito
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = AppState.cart.length;
    }
}

// Agregar al carrito
function addToCart(product) {
    const existingItem = AppState.cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        AppState.cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    showNotification('Producto agregado al carrito', 'success');
}

// Remover del carrito
function removeFromCart(productId) {
    AppState.cart = AppState.cart.filter(item => item.id !== productId);
    updateCartCount();
    showNotification('Producto removido del carrito', 'info');
}

// Calcular total del carrito
function calculateCartTotal() {
    return AppState.cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp);

// Exportar para uso global
window.AppState = AppState;
window.showView = showView;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;