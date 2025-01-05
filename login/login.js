// Base URL API Backend
const API_BASE_URL = "http://127.0.0.1:8080"; // Ganti dengan URL backend Anda

// Event Listener untuk Login Form
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Mencegah form refresh halaman

    // Ambil nilai input
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    // Validasi sederhana
    if (!email || !password) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      // Kirim data ke backend
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Cek respons dari backend
      const data = await response.json();
      if (response.ok) {
        console.log("Login Successful!", data);
        alert("Login Successful!");
        // Redirect ke dashboard atau halaman lain jika diperlukan
      } else {
        console.error("Login Failed:", data);
        alert(data.message || "Login Failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again!");
    }
  });
}
