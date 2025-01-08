const loginForm = document.getElementById("login-form"); // Pastikan ID ini sesuai dengan HTML Anda

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Mencegah pengiriman form default

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Validasi input
  if (!email || !password) {
    alert("Silakan masukkan email dan password.");
    return;
  }

  console.log("Mencoba login dengan:", { email, password });

  // Tampilkan status loading
  const submitButton = document.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.textContent = "Logging in...";

  try {
    // Kirim request login ke server
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("Status respons:", response.status); // Log status respons

    if (!response.ok) {
      const errorText = await response.text(); // Dapatkan detail error dari server
      console.error("Error response:", errorText); // Log respons error
      throw new Error(`Login gagal: ${response.statusText}`);
    }

    const data = await response.json(); // Parsing respons JSON
    console.log("Data respons:", data); // Log data respons

    // Pastikan data.token ada
    if (data.token) {
      localStorage.setItem("jwtToken", data.token);
      console.log("Token disimpan:", data.token); // Log token yang disimpan

      // Simpan user ID dan role jika ada
      if (data.user && data.user.id) {
        localStorage.setItem("userId", data.user.id);
        console.log("User ID disimpan:", data.user.id); // Log user ID yang disimpan
      }
      if (data.user && data.user.role) {
        localStorage.setItem("userRole", data.user.role);
        console.log("User Role disimpan:", data.user.role); // Log user role yang disimpan
      }

      // Arahkan pengguna berdasarkan peran
      if (data.user && data.user.role === "admin") {
        window.location.href =
          "https://github.com/rrq-dev/Frontend-berkah.github.io/admin/dashboard.html"; // Halaman untuk admin
      } else {
        window.location.href =
          "https://github.com/rrq-dev/Frontend-berkah.github.io"; // Halaman untuk pengguna biasa
      }
    } else {
      alert("Login gagal: Tidak ada token yang diterima.");
    }
  } catch (error) {
    console.error("Ada masalah dengan operasi fetch:", error);
    alert("Login gagal: " + error.message);
  } finally {
    // Kembalikan tombol ke keadaan semula
    submitButton.disabled = false;
    submitButton.textContent = "Log In";
  }
});
