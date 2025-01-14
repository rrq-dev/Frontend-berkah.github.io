// JavaScript untuk mengelola login/logout
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const profileBtn = document.getElementById("profile-btn");
const logoutBtn = document.getElementById("logout-btn");

// Simulasi status login
let isLoggedIn = false;

// Fungsi untuk mengupdate tampilan berdasarkan status login
function updateAuthButtons() {
  if (isLoggedIn) {
    loginBtn.style.display = "none";
    signupBtn.style.display = "none";
    profileBtn.style.display = "inline-block";
    logoutBtn.style.display = "inline-block";
  } else {
    loginBtn.style.display = "inline-block";
    signupBtn.style.display = "inline-block";
    profileBtn.style.display = "none";
    logoutBtn.style.display = "none";
  }
}

// Event listener untuk tombol login
loginBtn.addEventListener("click", () => {
  isLoggedIn = true; // Simulasi login
  updateAuthButtons();
});

// Event listener untuk tombol logout
logoutBtn.addEventListener("click", () => {
  isLoggedIn = false; // Simulasi logout
  updateAuthButtons();
});

// Inisialisasi tampilan
updateAuthButtons();
