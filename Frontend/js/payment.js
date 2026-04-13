const cardNumber = document.getElementById("cardNumber");
const cardNumberPreview = document.getElementById("cardNumberPreview");

const nameInput = document.getElementById("name");
const namePreview = document.getElementById("cardNamePreview");

const expiry = document.getElementById("expiry");
const expiryPreview = document.getElementById("cardExpiryPreview");

const form = document.getElementById("paymentForm");
const msg = document.getElementById("paymentMessage");

/* Live card preview */
cardNumber.addEventListener("input", () => {
  let value = cardNumber.value.replace(/\D/g, "").substring(0,16);
  value = value.replace(/(.{4})/g, "$1 ").trim();
  cardNumber.value = value;
  cardNumberPreview.textContent = value || "•••• •••• •••• ••••";
});

nameInput.addEventListener("input", () => {
  namePreview.textContent = nameInput.value.toUpperCase() || "YOUR NAME";
});

expiry.addEventListener("input", () => {
  expiryPreview.textContent = expiry.value || "MM/YY";
});

/* Plan toggle */
const buttons = document.querySelectorAll(".toggle-btn");
const price = document.getElementById("price");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");

    if(btn.dataset.plan === "yearly"){
      price.textContent = "1499";
    } else {
      price.textContent = "199";
    }
  });
});

/* Fake payment */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  msg.textContent = "Processing payment...";
  
  setTimeout(()=>{
    msg.textContent = "Payment successful (demo). Connect real gateway.";
  },1500);
});