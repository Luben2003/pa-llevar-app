// ===== SERVICIOS DE SUPABASE =====

// Inicializar cliente de Supabase
const supabase = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);

// ===== SERVICIOS DE AUTENTICACIÓN =====

// Registrar nuevo usuario
async function signUp(email, password, userData = {}) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: userData
            }
        });

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Error en signUp:', error);
        return { success: false, error: error.message };
    }
}

// Iniciar sesión
async function signIn(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Error en signIn:', error);
        return { success: false, error: error.message };
    }
}

// Cerrar sesión
async function signOut() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Error en signOut:', error);
        return { success: false, error: error.message };
    }
}

// Obtener usuario actual
async function getCurrentUser() {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        return { success: true, user };
    } catch (error) {
        console.error('Error en getCurrentUser:', error);
        return { success: false, error: error.message };
    }
}

// Escuchar cambios de autenticación
function onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange((event, session) => {
        callback(event, session);
    });
}

// ===== SERVICIOS DE BASE DE DATOS =====

// Obtener restaurantes
async function getRestaurants(category = null, limit = 20) {
    try {
        let query = supabase
            .from('restaurants')
            .select('*')
            .order('rating', { ascending: false });

        if (category) {
            query = query.eq('category', category);
        }

        if (limit) {
            query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Error en getRestaurants:', error);
        return { success: false, error: error.message };
    }
}

// Obtener productos de un restaurante
async function getRestaurantProducts(restaurantId) {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('restaurant_id', restaurantId)
            .eq('available', true)
            .order('name');

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Error en getRestaurantProducts:', error);
        return { success: false, error: error.message };
    }
}

// Buscar restaurantes
async function searchRestaurants(query) {
    try {
        const { data, error } = await supabase
            .from('restaurants')
            .select('*')
            .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
            .order('rating', { ascending: false });

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Error en searchRestaurants:', error);
        return { success: false, error: error.message };
    }
}

// Crear pedido
async function createOrder(orderData) {
    try {
        const { data, error } = await supabase
            .from('orders')
            .insert([orderData])
            .select()
            .single();

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Error en createOrder:', error);
        return { success: false, error: error.message };
    }
}

// Obtener pedidos del usuario
async function getUserOrders(userId) {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                restaurants (name, image_url)
            `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Error en getUserOrders:', error);
        return { success: false, error: error.message };
    }
}

// Actualizar perfil de usuario
async function updateUserProfile(userId, profileData) {
    try {
        const { data, error } = await supabase
            .from('users')
            .update(profileData)
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Error en updateUserProfile:', error);
        return { success: false, error: error.message };
    }
}

// ===== SERVICIOS DE ALMACENAMIENTO =====

// Subir imagen
async function uploadImage(file, path) {
    try {
        const { data, error } = await supabase.storage
            .from('images')
            .upload(path, file);

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Error en uploadImage:', error);
        return { success: false, error: error.message };
    }
}

// Obtener URL de imagen
function getImageUrl(path) {
    const { data } = supabase.storage
        .from('images')
        .getPublicUrl(path);
    
    return data.publicUrl;
}

// ===== SERVICIOS DE TIEMPO REAL =====

// Suscribirse a cambios de pedidos
function subscribeToOrderUpdates(orderId, callback) {
    return supabase
        .channel(`order-${orderId}`)
        .on('postgres_changes', 
            { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${orderId}` },
            (payload) => callback(payload)
        )
        .subscribe();
}

// Suscribirse a nuevos pedidos
function subscribeToNewOrders(callback) {
    return supabase
        .channel('new-orders')
        .on('postgres_changes', 
            { event: 'INSERT', schema: 'public', table: 'orders' },
            (payload) => callback(payload)
        )
        .subscribe();
}

// ===== FUNCIONES DE UTILIDAD =====

// Verificar si el usuario está autenticado
function isAuthenticated() {
    return supabase.auth.getSession().then(({ data }) => {
        return !!data.session;
    });
}

// Obtener token de sesión
async function getSessionToken() {
    try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        return session?.access_token || null;
    } catch (error) {
        console.error('Error obteniendo token:', error);
        return null;
    }
}

// Exportar funciones para uso global
window.SupabaseService = {
    // Autenticación
    signUp,
    signIn,
    signOut,
    getCurrentUser,
    onAuthStateChange,
    isAuthenticated,
    getSessionToken,
    
    // Base de datos
    getRestaurants,
    getRestaurantProducts,
    searchRestaurants,
    createOrder,
    getUserOrders,
    updateUserProfile,
    
    // Almacenamiento
    uploadImage,
    getImageUrl,
    
    // Tiempo real
    subscribeToOrderUpdates,
    subscribeToNewOrders
};
