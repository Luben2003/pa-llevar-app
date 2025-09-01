// Registrar Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('ServiceWorker registrado con éxito: ', registration.scope);
            })
            .catch((error) => {
                console.log('Error al registrar ServiceWorker: ', error);
            });
    });
}

// Notificación de estado offline/online
function updateOnlineStatus() {
    if (!navigator.onLine) {
        showOfflineNotification();
    } else {
        hideOfflineNotification();
    }
}

function showOfflineNotification() {
    let notification = document.getElementById('offline-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'offline-notification';
        notification.className = 'offline-notification';
        notification.innerHTML = `
            <i class="fas fa-wifi"></i>
            <span>Estás trabajando sin conexión. Algunas funciones pueden estar limitadas.</span>
        `;
        document.body.appendChild(notification);
    }
}

function hideOfflineNotification() {
    const notification = document.getElementById('offline-notification');
    if (notification) {
        notification.remove();
    }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus();

// Botón de instalación PWA
let deferredPrompt;
const installButton = document.createElement('button');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installButton.style.display = 'block';
    installButton.innerHTML = '📱 Instalar App';
    installButton.className = 'btn install-btn';
    installButton.style.position = 'fixed';
    installButton.style.bottom = '80px';
    installButton.style.right = '20px';
    installButton.style.zIndex = '1000';
    installButton.addEventListener('click', async () => {
        installButton.style.display = 'none';
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        deferredPrompt = null;
    });
    document.body.appendChild(installButton);
});

window.addEventListener('appinstalled', () => {
    console.log('PWA instalada');
    if (installButton) installButton.style.display = 'none';
});