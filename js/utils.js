// ===== UTILIDADES DE LA APLICACIÓN =====

// Función para formatear precios
function formatPrice(price) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(price);
}

// Función para formatear fechas
function formatDate(date) {
    return new Intl.DateTimeFormat('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date));
}

// Función para formatear tiempo relativo
function formatRelativeTime(date) {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Hace un momento';
    if (minutes < 60) return `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    if (hours < 24) return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
    if (days < 7) return `Hace ${days} día${days > 1 ? 's' : ''}`;
    return formatDate(date);
}

// Función para validar email
function isValidEmail(email) {
    return CONFIG.VALIDATION.EMAIL_REGEX.test(email);
}

// Función para validar contraseña
function isValidPassword(password) {
    return password.length >= CONFIG.VALIDATION.PASSWORD_MIN_LENGTH;
}

// Función para validar teléfono
function isValidPhone(phone) {
    return CONFIG.VALIDATION.PHONE_REGEX.test(phone);
}

// Función para debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Función para throttle
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Función para generar ID único
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Función para generar número de pedido
function generateOrderNumber() {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `PL${timestamp}${random}`;
}

// Función para calcular distancia entre dos puntos
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Función para formatear distancia
function formatDistance(distance) {
    if (distance < 1) {
        return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
}

// Función para obtener ubicación del usuario
function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocalización no soportada'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            (error) => {
                reject(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            }
        );
    });
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info', duration = CONFIG.NOTIFICATION_DURATION) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos de la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    });

    // Colores según tipo
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6'
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remover después del tiempo especificado
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Función para mostrar loading
function showLoading(container, message = 'Cargando...') {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>${message}</p>
        </div>
    `;
    
    container.appendChild(loading);
    return loading;
}

// Función para ocultar loading
function hideLoading(loadingElement) {
    if (loadingElement && loadingElement.parentNode) {
        loadingElement.parentNode.removeChild(loadingElement);
    }
}

// Función para manejar errores
function handleError(error, context = '') {
    console.error(`Error en ${context}:`, error);
    
    let message = CONFIG.ERROR_MESSAGES.NETWORK_ERROR;
    
    if (error.message) {
        message = error.message;
    } else if (error.status) {
        switch (error.status) {
            case 401:
                message = 'Sesión expirada. Por favor inicia sesión de nuevo.';
                break;
            case 403:
                message = 'No tienes permisos para realizar esta acción.';
                break;
            case 404:
                message = 'Recurso no encontrado.';
                break;
            case 500:
                message = 'Error del servidor. Intenta de nuevo más tarde.';
                break;
            default:
                message = `Error ${error.status}: ${error.statusText || 'Error desconocido'}`;
        }
    }
    
    showNotification(message, 'error');
}

// Función para verificar conexión a internet
function isOnline() {
    return navigator.onLine;
}

// Función para detectar cambios de conexión
function onConnectionChange(callback) {
    window.addEventListener('online', () => callback(true));
    window.addEventListener('offline', () => callback(false));
}

// Función para guardar en localStorage
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error guardando en localStorage:', error);
        return false;
    }
}

// Función para obtener de localStorage
function getFromStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error leyendo de localStorage:', error);
        return defaultValue;
    }
}

// Función para limpiar localStorage
function clearStorage() {
    try {
        localStorage.clear();
        return true;
    } catch (error) {
        console.error('Error limpiando localStorage:', error);
        return false;
    }
}

// Función para capitalizar texto
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// Función para truncar texto
function truncateText(text, maxLength = 50) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Función para limpiar texto
function sanitizeText(text) {
    return text.replace(/[<>]/g, '');
}

// Función para validar URL
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Función para obtener parámetros de URL
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params) {
        result[key] = value;
    }
    return result;
}

// Función para establecer parámetros de URL
function setUrlParams(params) {
    const url = new URL(window.location);
    Object.keys(params).forEach(key => {
        url.searchParams.set(key, params[key]);
    });
    window.history.replaceState({}, '', url);
}

// Exportar funciones si estamos en un entorno de módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatPrice,
        formatDate,
        formatRelativeTime,
        isValidEmail,
        isValidPassword,
        isValidPhone,
        debounce,
        throttle,
        generateId,
        generateOrderNumber,
        calculateDistance,
        formatDistance,
        getUserLocation,
        showNotification,
        showLoading,
        hideLoading,
        handleError,
        isOnline,
        onConnectionChange,
        saveToStorage,
        getFromStorage,
        clearStorage,
        capitalize,
        truncateText,
        sanitizeText,
        isValidUrl,
        getUrlParams,
        setUrlParams
    };
}
