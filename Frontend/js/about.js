// Small interactions: reveal-on-scroll, animated counters, stack toggle, set year
document.addEventListener('DOMContentLoaded', () => {
  // set current year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // reveal on scroll
  const reveal = (el) => {
    el.classList.add('is-visible');
  };
  const targets = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries, obsr) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          reveal(e.target);
          obsr.unobserve(e.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(t => obs.observe(t));
  } else {
    targets.forEach(reveal);
  }

  // counter animation
  const animateCounter = (el, target, opts = {}) => {
    const duration = opts.duration || 1200;
    const start = 0;
    const startTime = performance.now();
    const fmt = opts.fmt || (v => Math.round(v).toLocaleString());
    const step = (now) => {
      const t = Math.min(1, (now - startTime) / duration);
      const ease = t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t; // simple ease
      const val = start + (target - start) * ease;
      el.textContent = fmt(val);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const statEls = document.querySelectorAll('.stat[data-target], .stat .stat-value');
  statEls.forEach(node => {
    const statRoot = node.closest('.stat');
    const target = Number(statRoot?.getAttribute('data-target') || node.closest('.stat')?.dataset.target || 0);
    const valueNode = statRoot?.querySelector('.stat-value');
    if (!valueNode) return;
    // observe stat to start animation only when visible
    if ('IntersectionObserver' in window) {
      const o = new IntersectionObserver((entries, o2) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            animateCounter(valueNode, target, {
              duration: 1200,
              fmt: (v) => {
                // percent style for second stat
                if (target <= 100 && target > 1) return Math.round(v) + (target === 92 ? '%' : '');
                return Math.round(v).toLocaleString();
              }
            });
            o2.unobserve(e.target);
          }
        });
      }, {threshold: 0.25});
      o.observe(statRoot);
    } else {
      animateCounter(valueNode, target);
    }
  });

  // stack toggle
  const toggle = document.getElementById('toggleStack');
  const stack = document.getElementById('meStack');
  if (toggle && stack) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      if (expanded) {
        stack.hidden = true;
      } else {
        stack.hidden = false;
        // small focus for accessibility
        stack.setAttribute('tabindex', '-1');
        stack.focus({preventScroll:true});
        setTimeout(()=> stack.removeAttribute('tabindex'), 400);
      }
    });
  }
});