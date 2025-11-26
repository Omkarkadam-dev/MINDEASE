document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".me-filter-pill");
  const searchInput = document.getElementById("meProgramSearch");
  const cards = document.querySelectorAll("[data-program]");
  const emptyState = document.getElementById("meProgramsEmpty");
  const searchHint = document.getElementById("meSearchHint");

  let activeFilter = "all";
  let searchQuery = "";

  // ===== FILTER + SEARCH LOGIC =====
  const applyFilters = () => {
    let visibleCount = 0;
    const query = searchQuery.trim().toLowerCase();

    cards.forEach((card) => {
      const categories = (card.getAttribute("data-category") || "")
        .toLowerCase()
        .split(" ");
      const title = card.querySelector(".me-program-title")?.textContent?.toLowerCase() || "";
      const desc = card.querySelector(".me-program-desc")?.textContent?.toLowerCase() || "";

      const matchesFilter =
        activeFilter === "all" || categories.includes(activeFilter);

      const matchesSearch =
        !query ||
        title.includes(query) ||
        desc.includes(query) ||
        categories.some((c) => c.includes(query));

      if (matchesFilter && matchesSearch) {
        card.classList.remove("is-hidden");
        visibleCount++;
      } else {
        card.classList.add("is-hidden");
      }
    });

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }

    if (searchHint) {
      if (!query && activeFilter === "all") {
        searchHint.textContent = "Showing all programs.";
      } else if (!query) {
        searchHint.textContent = `Filtered by: ${activeFilter}.`;
      } else if (visibleCount === 0) {
        searchHint.textContent = "No results. Try a simpler search or clear filters.";
      } else {
        searchHint.textContent = `Found ${visibleCount} program${visibleCount > 1 ? "s" : ""} for “${searchQuery}”.`;
      }
    }
  };

  // Filter buttons
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      if (!filter || filter === activeFilter) return;

      activeFilter = filter;

      filterButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      applyFilters();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value || "";
      applyFilters();
    });
  }

  // ===== SCROLL REVEAL =====
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
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

  // ===== CTA LOGGING (HOOK YOUR ROUTING HERE) =====
  const ctas = document.querySelectorAll("[data-cta]");
  ctas.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest("[data-program]");
      const title = card?.querySelector(".me-program-title")?.textContent?.trim() || "Unknown";
      console.log("Program CTA clicked:", title);
      // In real app, navigate or open program detail here
    });
  });

  // Initial state
  applyFilters();
});
