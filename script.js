// Nomad Genetics — JS ligero (sin dependencias)
(() => {
  // Menú móvil
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    // Cierra al hacer click en un link
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Contadores (hero)
  const counters = [...document.querySelectorAll('[data-counter]')];
  const runCounters = () => {
    counters.forEach(el => {
      const target = Number(el.getAttribute('data-counter') || '0');
      const duration = 700;
      const start = performance.now();
      const from = 0;

      const tick = (t) => {
        const p = Math.min(1, (t - start) / duration);
        const value = Math.round(from + (target - from) * (1 - Math.pow(1 - p, 3)));
        el.textContent = String(value);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  };

  // Solo una vez cuando el hero esté visible
  const hero = document.querySelector('.hero');
  if (hero && counters.length) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting)) {
        runCounters();
        io.disconnect();
      }
    }, { threshold: 0.35 });
    io.observe(hero);
  }

  // Slider de testimonios
  const quotes = [...document.querySelectorAll('.quote')];
  const prevBtn = document.querySelector('[data-quote="prev"]');
  const nextBtn = document.querySelector('[data-quote="next"]');
  let qi = 0;

  const showQuote = (i) => {
    quotes.forEach((q, idx) => q.classList.toggle('is-active', idx === i));
  };

  const step = (dir) => {
    if (!quotes.length) return;
    qi = (qi + dir + quotes.length) % quotes.length;
    showQuote(qi);
  };

  prevBtn?.addEventListener('click', () => step(-1));
  nextBtn?.addEventListener('click', () => step(1));

  // Autoplay rotatorio suave (opcional)
  if (quotes.length) {
    setInterval(() => step(1), 9000);
  }

  // Helix / ADN para logos (Aliados)
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initHelix() {
    const viewport = document.querySelector('[data-helix] .helix__viewport');
    if (!viewport) return;
    if (prefersReducedMotion) return; // CSS muestra versión estática

    let items = Array.from(viewport.querySelectorAll('.helix__item'));
    const MIN_ITEMS = 14;
    let guard = 0;
    while (items.length < MIN_ITEMS && guard < 10) {
      const snapshot = [...items];
      snapshot.forEach(node => {
        if (items.length >= MIN_ITEMS) return;
        const clone = node.cloneNode(true);
        viewport.appendChild(clone);
        items.push(clone);
      });
      guard++;
    }

    // Velocidad de la animación (ajustada a más lenta)
    const scrollSpeed = 12; // px/s (antes 46)
    const waveSpeed = 0.85;  // rad/s (antes 2.4)
    const phaseStep = 0.72;

    function tick(ms) {
      const t = ms / 1000;
      const h = viewport.clientHeight || 260;
      const w = viewport.clientWidth || 900;

      const amp = Math.min(w * 0.24, 210);
      const gap = Math.max(18, (h + 50) / items.length);
      const base = (t * scrollSpeed) % (h + gap);

      items.forEach((el, i) => {
        const y = ((i * gap + base) % (h + gap)) - gap / 2;
        const phase = t * waveSpeed + i * phaseStep;
        const x = Math.sin(phase) * amp;

        const depth = (Math.cos(phase) + 1) / 2; // 0..1
        const scale = 0.75 + depth * 0.75;
        const opacity = 0.40 + depth * 0.60;
        const blur = (1 - depth) * 0.9;

        el.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${Math.sin(phase) * 6}deg)`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(Math.round(depth * 100));
        el.style.filter = `blur(${blur}px)`;
      });

      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  initHelix();

  // Modal embebido (iframe) para catálogo / asesor / representantes
  const modal = document.getElementById('embedModal');
  const modalTitle = document.getElementById('embedModalTitle');
  const modalFrame = modal?.querySelector('.modal__frame');
  const modalNewTab = modal?.querySelector('.modal__newtab');
  let lastFocus = null;

  const openModal = (url, title = 'Vista') => {
    if (!modal || !modalFrame) return;
    lastFocus = document.activeElement;
    modalTitle && (modalTitle.textContent = title);
    modalFrame.setAttribute('title', title);
    modalFrame.src = url;
    if (modalNewTab) modalNewTab.href = url;

    document.body.classList.add('modal-open');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    // Enfoca el botón cerrar
    const closeBtn = modal.querySelector('[data-modal-close]');
    closeBtn?.focus();
  };

  const closeModal = () => {
    if (!modal || !modalFrame) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    // Limpia el iframe para detener audio/CPU
    modalFrame.src = 'about:blank';
    (lastFocus instanceof HTMLElement) && lastFocus.focus();
  };

  // Delegación: cualquier link con data-modal-url abre el modal
  document.addEventListener('click', (e) => {
    const a = e.target?.closest?.('a[data-modal-url]');
    if (!a) return;
    const url = a.getAttribute('data-modal-url');
    if (!url) return;
    e.preventDefault();
    const title = a.getAttribute('data-modal-title') || a.textContent?.trim() || 'Vista';
    openModal(url, title);
  });

  // Cerrar modal
  modal?.querySelectorAll('[data-modal-close]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('is-open')) closeModal();
  });

  // Formulario (demo)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!status) return;

    status.textContent = 'Enviando...';
    const data = Object.fromEntries(new FormData(form).entries());

    // Aquí puedes conectar a tu endpoint (n8n, Firebase, etc.).
    // Por ahora solo simulamos un envío.
    await new Promise(r => setTimeout(r, 700));
    console.log('Contacto (demo):', data);

    status.textContent = '¡Listo! Te contactamos pronto.';
    form.reset();
  });
})();