// Saves the gym for offline use (see sw.js) and shows the offline status in the header.
(function () {
  var ready = false;
  function show() {
    var el = document.getElementById('offline'); if (!el) return;
    el.textContent = !navigator.onLine ? 'Offline · using saved copy' : ready ? 'Works offline' : '';
  }
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('sw.js').catch(function () {});
    navigator.serviceWorker.ready.then(function () { ready = true; show(); });
  }
  window.addEventListener('online', show);
  window.addEventListener('offline', show);
  document.addEventListener('DOMContentLoaded', show);
  show();
})();
