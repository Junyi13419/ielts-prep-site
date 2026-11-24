/* 雅思备考网 Service Worker — 静态资源离线缓存 */
const CACHE = 'ielts-site-v1';

// 只缓存导航站自身的核心小文件（不含 practice/practice-atlas 的大体积资源）
const CORE = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './words.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './wechat-qr.png',
  './service/index.html',
  './service/wechat-qr.png',
  './teacher/index.html',
  './teacher/wechat-qr.png',
  './learn/index.html',
  './learn/words.js',
  './awesome/index.html'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(CORE).catch(() => {})).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // 只处理同源请求
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    caches.match(req).then(cached => {
      // 网络优先更新（stale-while-revalidate）
      const network = fetch(req).then(res => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
