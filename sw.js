// Service Worker para Pa Llevar
const CACHE_NAME = 'pa-llevar-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/app.js',
    '/js/pwa.js',
    '/manifest.json',
    '/assets/icon-192.png',
    '/assets/icon-512.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch events
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Devuelve la respuesta cacheadas o fetch de la red
                return response || fetch(event.request);
            })
    );
});

// Actualizar Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Manejar notificaciones push
self.addEventListener('push', (event) => {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/assets/icon-192.png',
        badge: '/assets/icon-192.png',
        vibrate: [200, 100, 200],
        tag: 'pa-llevar-notification'
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Manejar clics en notificaciones
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});