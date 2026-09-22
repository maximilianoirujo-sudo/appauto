const CACHE_NAME = 'carvlak-pwa-v2-metallic-2026';
const CORE_ASSETS = [
  './',
  './index.html',
  './vehicles.js',
  './manifest.json',
  './icons/apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Instalación: Pre-cacheados de recursos y activación inmediata
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('CARVLAK SW: Algunos recursos iniciales no pudieron cachearse:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activación: Purga total e incondicional de cualquier caché anterior
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('CARVLAK SW: Purgando caché obsoleta:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Soporte para mensajes de control (forzar skipWaiting o purga)
self.addEventListener('message', (event) => {
  if (event.data && (event.data.action === 'skipWaiting' || event.data.type === 'PURGE_CACHE')) {
    self.skipWaiting();
  }
});

// Intercepción de peticiones: Network-First para HTML y scripts para garantizar frescura
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Solo peticiones GET
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // 1. Si es navegación o solicitud de HTML/JS principal: Network-First SIN caché de navegador
  const isHtml = request.mode === 'navigate' || (request.headers.get('accept') && request.headers.get('accept').includes('text/html'));
  const isScript = url.pathname.endsWith('.html') || url.pathname.endsWith('.js') || url.pathname.endsWith('manifest.json');

  if (isHtml || isScript) {
    event.respondWith(
      fetch(request, { cache: 'no-cache' })
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            if (isHtml) return caches.match('./index.html');
          });
        })
    );
    return;
  }

  // 2. Si es un recurso estático de imágenes o fuentes: Cache-First con fallback a red
  const isImageOrFont = (
    request.destination === 'image' || 
    request.destination === 'font' || 
    url.pathname.includes('/images/') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('dcdn-us.mitiendanube.com') ||
    url.hostname.includes('images.unsplash.com')
  );

  if (isImageOrFont) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        }).catch(() => {
          return cachedResponse;
        });
      })
    );
    return;
  }

  // 3. Fallback genérico: Red primero, caché de respaldo
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return networkResponse;
      })
      .catch(() => caches.match(request))
  );
});
