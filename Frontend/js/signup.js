document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("meSignupForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const termsInput = document.getElementById("terms");
  const formMessage = document.getElementById("meFormMessage");
  const strengthFill = document.getElementById("meStrengthFill");
  const strengthLabel = document.getElementById("meStrengthLabel");
  const togglePasswordBtn = document.querySelector('[data-toggle="password"]');
  const submitBtn = form?.querySelector(".me-auth-btn");

  const errorEls = {
    name: document.querySelector('[data-error-for="name"]'),
    email: document.querySelector('[data-error-for="email"]'),
    password: document.querySelector('[data-error-for="password"]'),
    confirmPassword: document.querySelector(
      '[data-error-for="confirmPassword"]'
    ),
    terms: document.querySelector('[data-error-for="terms"]'),
  };

  // ===== Password strength logic =====
  const evaluateStrength = (value) => {
    let score = 0;

    if (!value) return { score: 0, label: "-" };

    if (value.length >= 8) score++;
    if (value.length >= 12) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    let label = "Weak";
    if (score <= 2) label = "Weak";
    else if (score === 3) label = "Okay";
    else if (score === 4) label = "Strong";
    else label = "Very strong";

    return { score, label };
  };

  const updateStrengthUI = () => {
    const value = passwordInput.value.trim();
    const { score, label } = evaluateStrength(value);

    if (!value) {
      strengthFill.style.opacity = "0";
      strengthFill.style.width = "0%";
      strengthLabel.textContent = "Strength: -";
      return;
    }

    const percent = Math.min(score / 5, 1) * 100;
    strengthFill.style.opacity = "1";
    strengthFill.style.width = `${percent}%`;
    strengthLabel.textContent = `Strength: ${label}`;
  };

  if (passwordInput) {
    passwordInput.addEventListener("input", updateStrengthUI);
  }

  // ===== Toggle password visibility =====
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      togglePasswordBtn.textContent = isPassword ? "🙈" : "👁";
    });
  }

  // ===== Helpers for errors =====
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

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    const terms = termsInput.checked;

    if (!name) {
      setError("name", "Name can’t be empty.");
      valid = false;
    }

    if (!email) {
      setError("email", "Email is required.");
      valid = false;
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setError("email", "Use a real email, not random junk.");
        valid = false;
      }
    }

    if (!password) {
      setError("password", "Password can’t be empty.");
      valid = false;
    } else if (password.length < 8) {
      setError("password", "Minimum 8 characters. You’ll survive typing that.");
      valid = false;
    }

    if (!confirmPassword) {
      setError("confirmPassword", "Confirm your password.");
      valid = false;
    } else if (password && confirmPassword !== password) {
      setError("confirmPassword", "Passwords don’t match.");
      valid = false;
    }

    if (!terms) {
      setError("terms", "You have to agree. That’s how this works.");
      valid = false;
    }

    return valid;
  };

  // ===== Submit handler =====
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate()) return;

      if (submitBtn) submitBtn.disabled = true;

      // Fake "API" delay so it feels real
      setTimeout(() => {
        if (formMessage) {
          formMessage.textContent =
            "Account created (demo). Wire this form to your backend next.";
          formMessage.style.color = "#a5b4fc";
        }
        form.reset();
        updateStrengthUI();
        if (submitBtn) submitBtn.disabled = false;
      }, 600);
    });
  }
});
