(function () {
  // GA4 events for leads: calls, directions, review clicks
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-ev]');
    if (a && typeof window.gtag === 'function') {
      window.gtag('event', a.getAttribute('data-ev'), { link_url: a.href || '', page_location: location.href });
    }
  });

  // Cookie consent (only rendered when a GA4 ID is set)
  var box = document.getElementById('consent');
  function get() { try { return localStorage.getItem('ka_consent'); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem('ka_consent', v); } catch (e) {} }
  if (box) {
    if (!get()) box.hidden = false;
    document.getElementById('c-yes').onclick = function () {
      set('yes'); box.hidden = true;
      if (window.gtag) window.gtag('consent', 'update', { analytics_storage: 'granted' });
    };
    document.getElementById('c-no').onclick = function () {
      set('no'); box.hidden = true;
      if (window.gtag) window.gtag('consent', 'update', { analytics_storage: 'denied' });
    };
    var cs = document.getElementById('cookie-settings');
    if (cs) cs.onclick = function (e) { e.preventDefault(); box.hidden = false; };
  }

  // Google Map loads only on click (privacy + speed)
  var btn = document.getElementById('load-map');
  if (btn) btn.onclick = function () {
    var m = document.getElementById('map');
    var q = encodeURIComponent(m.getAttribute('data-q'));
    m.innerHTML = '<iframe title="Mapa – Kebab Ahil" src="https://www.google.com/maps?q=' + q + '&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
  };
})();
