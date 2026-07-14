/* ============================================================
   ÇİZGİ COSMETIC — etkileşim katmanı
   1) Mobil menü  2) Header scroll  3) Reveal  4) Sayaçlar
   ============================================================ */

(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Mobil menü ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    });
  }

  /* ---------- 1b. Orijinal logo dosyası varsa onu kullan ----------
     public/img/logo.png eklendiğinde SVG yerine otomatik o gösterilir. */
  var scriptUrl = document.currentScript ? document.currentScript.src : window.location.href;
  var logoUrl = new URL('../img/logo.png', scriptUrl).pathname;
  fetch(logoUrl, { method: 'HEAD' })
    .then(function (r) {
      if (!r.ok) return;
      document.querySelectorAll('.brand-lockup').forEach(function (el) {
        var img = document.createElement('img');
        img.src = logoUrl;
        img.alt = 'Çizgi Cosmetic';
        img.className = 'brand-logo-img';
        el.replaceWith(img);
      });
    })
    .catch(function () {});

  /* ---------- 2. Header scroll durumu ---------- */
  var header = document.getElementById('siteHeader');
  var hero = document.getElementById('hero') || document.querySelector('.page-hero');
  if (hero) document.body.classList.add('hero-page');
  else if (header) header.classList.add('solid');

  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 3. Reveal (görünüme girince belir) ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- 4. Sayaç animasyonu ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (reducedMotion) { el.textContent = target; return; }
    var duration = 1400;
    var start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animateCounter(e.target);
            cio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCounter);
  }
})();
