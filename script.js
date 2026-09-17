// Scroll progress bar
const progressBar = document.getElementById('scrollProgress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// Scroll-triggered reveal animation — no HTML edits needed, just targets
// the sections/cards that already exist on every page.
const revealTargets = document.querySelectorAll(
  '.product-card, .why-card, .value-card, .timeline-item, .contact-info-card, form, .section-head, #inquiryForm'
);
revealTargets.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = (i % 6) * 0.08 + 's';
});
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('in-view'));
}

// Animated count-up for stat numbers (data-count="25" data-suffix="+")
const counters = document.querySelectorAll('[data-count]');
if (counters.length && 'IntersectionObserver' in window) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1200;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => countObserver.observe(el));
}

// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('navMenu');
if (toggle && menu) {
  toggle.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

// Product filter (products.html only)
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('#productGrid .product-card');
if (filterButtons.length && productCards.length) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      productCards.forEach(c => {
        c.style.display = (f === 'all' || c.dataset.cat === f) ? '' : 'none';
      });
    });
  });
}

// Contact form -> opens the visitor's email client addressed to you.
// Fully static: no backend, no server, works as-is on GitHub Pages.
const form = document.getElementById('inquiryForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const inquiry = document.getElementById('inquiry').value;
    const message = document.getElementById('message').value;

    const subject = encodeURIComponent(`${inquiry} — from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nInquiry type: ${inquiry}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:wasonakaash5@gmail.com?subject=${subject}&body=${body}`;
  });
}
