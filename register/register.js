// Base URL API Backend
const API_BASE_URL = "http://127.0.0.1:8080"; // Ganti dengan URL backend Anda

// Event Listener untuk Register Form
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Mencegah form refresh halaman

    // Ambil nilai input
    const email = registerForm.querySelector('input[type="email"]').value;
    const username = registerForm.querySelector('input[type="text"]').value;
    const password = registerForm.querySelector('input[name="password"]').value;
    const confirmPassword = registerForm.querySelector(
      'input[name="confirm_password"]'
    ).value;
    const role = registerForm.querySelector("select").value;

    // Validasi sederhana
    if (!email || !username || !password || !confirmPassword || !role) {
      alert("Please fill in all fields!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Kirim data ke backend
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
          role,
        }),
      });

      // Cek respons dari backend
      const data = await response.json();
      if (response.ok) {
        console.log("Registration Successful!", data);
        alert("Registration Successful!");
        // Redirect ke halaman login jika diperlukan
      } else {
        console.error("Registration Failed:", data);
        alert(data.message || "Registration Failed!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong. Please try again!");
    }
  });
}
