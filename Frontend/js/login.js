document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("meLoginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const formMessage = document.getElementById("meFormMessage");
  const togglePasswordBtn = document.querySelector('[data-toggle="password"]');
  const submitBtn = form?.querySelector(".me-auth-btn");
  const strengthDot = document.getElementById("meStrengthDot");
  const strengthLabel = document.getElementById("meStrengthLabel");

  const errorEls = {
    email: document.querySelector('[data-error-for="email"]'),
    password: document.querySelector('[data-error-for="password"]'),
  };

  // Basic password quality hint (for login it's just feedback, not real security)
  const evaluatePasswordHint = (value) => {
    if (!value) return { color: "idle", label: "Password check idle" };
    if (value.length < 6) return { color: "weak", label: "Too short. You know that." };
    if (value.length < 10) return { color: "ok", label: "Looks okay." };
    return { color: "good", label: "Looks strong enough." };
  };

  const updatePasswordHint = () => {
    const value = passwordInput.value.trim();
    const { color, label } = evaluatePasswordHint(value);

    if (strengthDot && strengthLabel) {
      strengthLabel.textContent = label;

      let bg = "rgba(148, 163, 184, 0.7)";
      let shadow = "0 0 12px rgba(148, 163, 184, 0.7)";
      let scale = 1;

      if (color === "weak") {
        bg = "#fb7185";
        shadow = "0 0 14px rgba(248, 113, 113, 0.9)";
        scale = 1.05;
      } else if (color === "ok") {
        bg = "#facc15";
        shadow = "0 0 14px rgba(250, 204, 21, 0.9)";
        scale = 1.05;
      } else if (color === "good") {
        bg = "#4ade80";
        shadow = "0 0 14px rgba(74, 222, 128, 0.9)";
        scale = 1.08;
      }

      strengthDot.style.background = bg;
      strengthDot.style.boxShadow = shadow;
      strengthDot.style.transform = `scale(${scale})`;
    }
  };

  if (passwordInput) {
    passwordInput.addEventListener("input", updatePasswordHint);
  }

  // Toggle password visibility
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      togglePasswordBtn.textContent = isPassword ? "🙈" : "👁";
    });
  }

  const clearErrors = () => {
    Object.values(errorEls).forEach((el) => {
      if (el) el.textContent = "";
    });
    if (formMessage) {
      formMessage.textContent = "";
      formMessage.style.color = "";
    }
  };

  const setError = (field, message) => {
    const el = errorEls[field];
    if (el) el.textContent = message;
  };

  const validate = () => {
    clearErrors();
    let valid = true;

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email) {
      setError("email", "Email is required.");
      valid = false;
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setError("email", "Use a proper email, not random junk.");
        valid = false;
      }
    }

    if (!password) {
      setError("password", "Password can’t be empty.");
      valid = false;
    }

    return valid;
  };

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate()) return;

      if (submitBtn) submitBtn.disabled = true;

      // Fake login "success" – replace with real API later
      setTimeout(() => {
        if (formMessage) {
          formMessage.textContent =
            "Logged in (demo). Connect this form to your backend / auth logic.";
          formMessage.style.color = "#a5b4fc";
        }
        if (submitBtn) submitBtn.disabled = false;
      }, 500);
    });
  }
});
