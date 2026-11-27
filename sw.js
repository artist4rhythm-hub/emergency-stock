// 앱 화면 파일만 캐시합니다. 로그인·데이터는 Firebase가 직접 처리합니다.
// index.html을 고친 뒤에는 아래 버전 숫자를 올려야 사용자 기기에 새 화면이 반영됩니다.
const CACHE = 'ebx-v3';
const SHELL = ['./', './index.html', './manifest.json', './img/icon-192.png', './img/mascot.png', './img/brand-96.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return; // Firebase 등 외부 요청은 건드리지 않음
  // 네트워크 우선, 실패하면 캐시 (오프라인에서도 앱이 열리도록)
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
