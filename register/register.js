const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Validasi input (misalnya, cek apakah password dan confirm password cocok)
  const confirmPassword = document.getElementById("confirm-password").value;
  if (password !== confirmPassword) {
    alert("Password and Confirm Password do not match!");
    return;
  }

  fetch("http://localhost:8080/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Registration failed");
      }
      return response.json();
    })
    .then((data) => {
      alert("Registration successful! Welcome, " + data.user.username);
      // Redirect ke halaman utama
      window.location.href = "index.html"; // Redirect ke home page setelah sukses
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      alert("Registration failed: " + error.message);
    });
});
