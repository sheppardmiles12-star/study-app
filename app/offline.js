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
  // "Install the app" box on the class picker (#install). Chrome and Edge offer a one-click install;
  // Safari and others get the steps for their browser.
  var prompt = null;
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); prompt = e; install(); });
  window.addEventListener('appinstalled', function () { prompt = null; install(); });
  function install() {
    var el = document.getElementById('install'); if (!el) return;
    var ua = navigator.userAgent, standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    var ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    var safari = /Safari/.test(ua) && !/Chrome|Chromium|CriOS|FxiOS|Edg|OPR/.test(ua), firefox = /Firefox|FxiOS/.test(ua);
    var how;
    if (standalone) how = '';
    else if (prompt) how = '<button class="btn" data-install>Install Study Gym</button><span class="muted small">Adds it to your apps. It opens in its own window and works offline.</span>';
    else if (ios) how = '<span>In Safari, tap <b>Share</b> (the square with the arrow), then <b>Add to Home Screen</b>.</span>';
    else if (safari) how = '<span>In Safari\'s menu bar, choose <b>File → Add to Dock</b>. (Needs macOS Sonoma or newer.)</span>';
    else if (firefox) how = '<span>Firefox cannot install web apps, but this page still works offline here. To get an app icon, open the gym in <b>Safari</b> (File → Add to Dock) or <b>Chrome</b>.</span>';
    else how = '<span>In Chrome, open the <b>⋮</b> menu, then <b>Cast, Save, and Share → Install page as app</b>.</span>';
    el.hidden = !how;
    el.innerHTML = how ? '<div class="label">Install the app</div><div class="row" style="align-items:center">' + how + '</div>' : '';
    var b = el.querySelector('[data-install]');
    if (b) b.onclick = function () { prompt.prompt(); prompt.userChoice.then(function () { prompt = null; install(); }); };
  }
  document.addEventListener('DOMContentLoaded', install);

  window.addEventListener('online', show);
  window.addEventListener('offline', show);
  document.addEventListener('DOMContentLoaded', show);
  show();
})();
