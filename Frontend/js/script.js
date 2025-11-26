// Add "is-loaded" class for entrance animations
document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.add("is-loaded");
});

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("is-active");
    mainNav.classList.toggle("is-open");
  });
}

// Optional: fake play/pause toggle for the big circle button
const playBtn = document.querySelector(".me-circle-btn-lg");
if (playBtn) {
  let isPlaying = false;

  playBtn.addEventListener("click", () => {
    isPlaying = !isPlaying;
    playBtn.textContent = isPlaying ? "⏸" : "▶";
  });
}


// Scroll reveal for benefit cards using IntersectionObserver
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll("[data-benefit]");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // reveal once
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    cards.forEach((card) => observer.observe(card));
  } else {
    // Fallback if IntersectionObserver not supported
    cards.forEach((card) => card.classList.add("is-visible"));
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".me-program-tab");
  const cards = document.querySelectorAll("[data-program]");

  // Filter logic
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const filter = tab.getAttribute("data-filter");

      // Active tab switch
      tabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");

      // Filter cards
      cards.forEach((card) => {
        const categories = (card.getAttribute("data-category") || "")
          .toLowerCase()
          .split(" ");

        if (filter === "all" || categories.includes(filter)) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
      });
    });
  });

  // Scroll reveal effects with IntersectionObserver
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    cards.forEach((card) => observer.observe(card));
  } else {
    cards.forEach((card) => card.classList.add("is-visible"));
  }

  // Mock CTA behavior (for now just log, you wire real navigation later)
  const ctas = document.querySelectorAll("[data-cta]");
  ctas.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest("[data-program]");
      const name = card?.querySelector(".me-program-name")?.textContent?.trim();
      console.log(`Program clicked: ${name || "Unknown"}`);
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll("[data-why]");
  const counters = document.querySelectorAll("[data-counter]");

  // Scroll reveal for cards
  if ("IntersectionObserver" in window) {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            cardObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    cards.forEach((card) => cardObserver.observe(card));
  } else {
    cards.forEach((card) => card.classList.add("is-visible"));
  }

  // Counter animation for stats
  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          const target = parseInt(el.getAttribute("data-target"), 10);
          if (isNaN(target)) return;

          const duration = 1200; // ms
          const start = 0;
          const startTime = performance.now();

          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const value = Math.floor(start + (target - start) * progress);
            el.textContent = value;

            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };

          requestAnimationFrame(step);
          counterObserver.unobserve(el);
        });
      },
      {
        threshold: 0.4,
      }
    );

    counters.forEach((c) => counterObserver.observe(c));
  } else {
    // Fallback: just set target values
    counters.forEach((el) => {
      const target = el.getAttribute("data-target");
      el.textContent = target || "0";
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const billingToggle = document.querySelector("[data-billing-toggle]");
  const billingBtns = document.querySelectorAll(".me-billing-btn");
  const billingPill = document.querySelector(".me-billing-pill");
  const priceValues = document.querySelectorAll("[data-price]");
  const priceSuffixes = document.querySelectorAll(".me-price-suffix");
  const cards = document.querySelectorAll("[data-plan]");

  let currentBilling = "monthly";

  // Helper to format price
  const formatPrice = (value) => {
    const num = Number(value) || 0;
    if (num === 0) return "0";
    return num.toString();
  };

  const updatePrices = (billing) => {
    priceValues.forEach((el) => {
      const monthly = el.getAttribute("data-monthly");
      const yearly = el.getAttribute("data-yearly");
      const newValue = billing === "yearly" ? yearly : monthly;

      el.textContent = formatPrice(newValue);
    });

    priceSuffixes.forEach((suffix) => {
      if (billing === "yearly") {
        suffix.textContent = "/ month (billed yearly)";
      } else {
        suffix.textContent = "/ month";
      }
    });
  };

  // Billing toggle click
  billingBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const billing = btn.getAttribute("data-billing");
      if (!billing || billing === currentBilling) return;

      currentBilling = billing;

      // Active state
      billingBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      // Move pill
      if (billingPill) {
        const translateX = index === 0 ? 0 : 100;
        billingPill.style.transform = `translateX(${translateX}%)`;
      }

      // Update prices
      updatePrices(currentBilling);
    });
  });

  // Initial pill + prices
  if (billingPill) {
    billingPill.style.transform = "translateX(0%)";
  }
  updatePrices(currentBilling);

  // Scroll reveal for pricing cards
  if ("IntersectionObserver" in window) {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          cardObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    cards.forEach((card) => cardObserver.observe(card));
  } else {
    cards.forEach((card) => card.classList.add("is-visible"));
  }

  // Fake click handlers for CTAs (hook to your real routing later)
  const ctas = document.querySelectorAll(".me-price-cta, .me-final-cta-btn");
  ctas.forEach((btn) => {
    btn.addEventListener("click", () => {
      const plan = btn.closest("[data-plan]")?.getAttribute("data-plan-type");
      console.log("CTA clicked:", plan || btn.textContent.trim());
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  // ==== Dynamic year ====
  const yearEl = document.getElementById("meFooterYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ==== Scroll to top button visibility ====
  const scrollTopBtn = document.getElementById("meScrollTopBtn");

  const toggleScrollTop = () => {
    if (!scrollTopBtn) return;
    const show = window.scrollY > 200;
    scrollTopBtn.classList.toggle("is-visible", show);
  };

  window.addEventListener("scroll", toggleScrollTop, { passive: true });
  toggleScrollTop();

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ==== Fake newsletter form handling ====
  const form = document.getElementById("meFooterForm");
  const emailInput = document.getElementById("meFooterEmail");
  const messageEl = document.getElementById("meFooterMessage");

  if (form && emailInput && messageEl) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = emailInput.value.trim();
      if (!email) {
        messageEl.textContent = "Enter an email first. You’re not that busy.";
        messageEl.style.color = "#f97373";
        return;
      }

      // Super basic email check (don’t overthink it for now)
      const looksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!looksValid) {
        messageEl.textContent = "That doesn’t look like a real email.";
        messageEl.style.color = "#f97373";
        return;
      }

      // Fake success
      messageEl.textContent = "You’re in. Check your inbox for the next calm tip.";
      messageEl.style.color = "#a5b4fc";
      emailInput.value = "";
    });
  }

  // ==== Reveal footer on scroll (if used inside longer page) ====
  const footer = document.querySelector(".me-footer");
  if ("IntersectionObserver" in window && footer) {
    footer.style.opacity = 0;
    footer.style.transform = "translateY(18px)";
    footer.style.transition = "opacity 0.5s ease, transform 0.5s ease";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          footer.style.opacity = 1;
          footer.style.transform = "translateY(0)";
          observer.unobserve(footer);
        });
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(footer);
  }
});
