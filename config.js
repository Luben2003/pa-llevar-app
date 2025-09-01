// ===== CONFIGURACIÓN DE LA APLICACIÓN =====
const CONFIG = {
    // Configuración de la aplicación
    APP_NAME: 'Pa Llevar',
    APP_VERSION: '1.0.0',
    APP_DESCRIPTION: 'App de pedidos de comida a domicilio',
    
    // Configuración de Supabase
    SUPABASE_URL: 'https://jbtpwzpdkxrgqaedduai.supabase.co', // Reemplaza con tu URL real
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpidHB3enBka3hyZ3FhZWRkdWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2OTM2MjIsImV4cCI6MjA3MjI2OTYyMn0._Kmq-AxZSntip4iO9FCQ1-7tKb_nRyot4HmnAsgFujw', // Reemplaza con tu anon key real
    
    // Configuración de la API
    API_BASE_URL: 'https://api.pallevar.com',
    API_TIMEOUT: 10000, // 10 segundos
    
    // Configuración de envío
    SHIPPING_COST: 2.50,
    TAX_RATE: 0.16, // 16% IVA
    MIN_ORDER_AMOUNT: 5.00,
    
    // Configuración de tiempo
    ESTIMATED_DELIVERY_TIME: '30-40 minutos',
    SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 horas en ms
    
    // Configuración de UI
    ANIMATION_DURATION: 300,
    DEBOUNCE_DELAY: 300,
    MAX_SEARCH_RESULTS: 20,
    
    // Configuración de notificaciones
    NOTIFICATION_DURATION: 5000, // 5 segundos
    ENABLE_PUSH_NOTIFICATIONS: true,
    
    // Configuración de caché
    CACHE_DURATION: {
        RESTAURANTS: 30 * 60 * 1000, // 30 minutos
        PRODUCTS: 15 * 60 * 1000,    // 15 minutos
        USER_PROFILE: 60 * 60 * 1000  // 1 hora
    },
    
    // Configuración de validación
    VALIDATION: {
        PASSWORD_MIN_LENGTH: 6,
        EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        PHONE_REGEX: /^\+?[\d\s\-\(\)]{10,}$/
    },
    
    // Configuración de categorías
    CATEGORIES: [
        { id: 'pizza', name: 'Pizza', icon: 'fas fa-pizza-slice' },
        { id: 'hamburguesa', name: 'Hamburguesas', icon: 'fas fa-hamburger' },
        { id: 'sushi', name: 'Sushi', icon: 'fas fa-fish' },
        { id: 'cafe', name: 'Café', icon: 'fas fa-coffee' },
        { id: 'postres', name: 'Postres', icon: 'fas fa-ice-cream' },
        { id: 'mexicana', name: 'Mexicana', icon: 'fas fa-pepper-hot' },
        { id: 'italiana', name: 'Italiana', icon: 'fas fa-cheese' },
        { id: 'asiatica', name: 'Asiática', icon: 'fas fa-dragon' }
    ],
    
    // Configuración de estados de pedido
    ORDER_STATUS: {
        PENDING: 'pending',
        CONFIRMED: 'confirmed',
        PREPARING: 'preparing',
        READY: 'ready',
        DELIVERING: 'delivering',
        DELIVERED: 'delivered',
        CANCELLED: 'cancelled'
    },
    
    // Configuración de métodos de pago
    PAYMENT_METHODS: [
        { id: 'cash', name: 'Efectivo', icon: 'fas fa-money-bill-wave' },
        { id: 'card', name: 'Tarjeta', icon: 'fas fa-credit-card' },
        { id: 'transfer', name: 'Transferencia', icon: 'fas fa-university' }
    ],
    
    // Configuración de errores
    ERROR_MESSAGES: {
        NETWORK_ERROR: 'Error de conexión. Verifica tu internet.',
        INVALID_EMAIL: 'Por favor ingresa un email válido.',
        INVALID_PASSWORD: 'La contraseña debe tener al menos 6 caracteres.',
        LOGIN_FAILED: 'Email o contraseña incorrectos.',
        REGISTER_FAILED: 'Error al crear la cuenta. Intenta de nuevo.',
        CART_EMPTY: 'Tu carrito está vacío.',
        ORDER_FAILED: 'Error al procesar el pedido. Intenta de nuevo.',
        LOCATION_ERROR: 'No se pudo obtener tu ubicación.',
        OFFLINE_MODE: 'Modo sin conexión activado.'
    },
    
    // Configuración de desarrollo
    DEBUG: false,
    LOG_LEVEL: 'info', // 'debug', 'info', 'warn', 'error'
    
    // Configuración de PWA
    PWA: {
        NAME: 'Pa Llevar',
        SHORT_NAME: 'Pa Llevar',
        DESCRIPTION: 'App de pedidos de comida a domicilio',
        THEME_COLOR: '#2D5BFF',
        BACKGROUND_COLOR: '#FFFFFF',
        DISPLAY: 'standalone',
        ORIENTATION: 'portrait'
    }
};

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}
