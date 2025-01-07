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

// Function to check if the user is registered
function checkUserRegistration() {
  // Cek status registrasi dari localStorage (atau sessionStorage jika diperlukan)
  const isRegistered = localStorage.getItem("isRegistered");

  // Jika belum terdaftar, arahkan ke halaman register
  if (!isRegistered) {
    alert("Silakan daftar terlebih dahulu sebelum mengakses website.");
    window.location.href =
      "https://rrq-dev.github.io/Frontend-berkah.github.io/register/register.html"; // Ganti dengan path halaman register Anda
  }
}

// Jalankan fungsi saat halaman dimuat
window.onload = function () {
  checkUserRegistration();
};
