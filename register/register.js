const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Ambil data dari form
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document
    .getElementById("confirm-password")
    .value.trim();

  // Validasi input
  if (!username || !email || !password || !confirmPassword) {
    alert("All fields are required!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Password and Confirm Password do not match!");
    return;
  }

  // Tampilkan pesan loading
  const submitButton = document.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.textContent = "Registering...";

  try {
    // Kirim request ke backend
    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    // Periksa status respons
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData); // Log detail error dari server
      throw new Error(
        errorData.message || "Registration failed. Please try again."
      );
    }

    const data = await response.json();

    // Tampilkan pesan sukses dan redirect
    alert("Registration successful! Welcome, " + data.user.username);
    window.location.href = "https://rrq-dev/Frontend-berkah.github.io"; // Redirect ke halaman utama
  } catch (error) {
    // Tampilkan pesan error
    console.error("There was a problem with the registration process:", error);
    alert("Registration failed: " + error.message);
  } finally {
    // Kembalikan tombol ke keadaan semula
    submitButton.disabled = false;
    submitButton.textContent = "Sign Up";
  }
});
