// Tombol Sign-up
const signUpButton = document.querySelector(".sign-up");
if (signUpButton) {
  signUpButton.addEventListener("click", () => {
    window.location.href =
      "https://rrq-dev.github.io/Frontend-berkah.github.io/register/register.html"; // Navigasi ke halaman register.html
  });
}

// Tombol Contact
const contactButton = document.querySelector(".contact");
if (contactButton) {
  contactButton.addEventListener("click", () => {
    window.location.href = "contact.html"; // Navigasi ke halaman contact.html (opsional)
  });
}
