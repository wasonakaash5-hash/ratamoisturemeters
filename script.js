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
