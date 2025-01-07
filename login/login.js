// Pastikan ID form sesuai dengan HTML
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Mencegah pengiriman form default

  // Ambil nilai dari input form
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value; // Ambil nilai role

  // Validasi input
  if (!email || !password || !role) {
    alert("Silakan masukkan email, password, dan pilih role.");
    return;
  }

  console.log("Mencoba login dengan:", { email, password, role });

  // Kirim data login ke server
  fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, role }), // Tambahkan role ke body
  })
    .then((response) => {
      console.log("Status respons:", response.status); // Log status respons
      if (!response.ok) {
        return response.text().then((text) => {
          console.error("Error response:", text); // Log respons error
          throw new Error("Login gagal: " + response.statusText);
        });
      }
      return response.json(); // Mengembalikan respons dalam format JSON
    })
    .then((data) => {
      console.log("Data respons:", data); // Log data respons
      // Pastikan data.token ada
      if (data.token) {
        localStorage.setItem("jwtToken", data.token);
        console.log("Token disimpan:", data.token); // Log token yang disimpan
        // Simpan user ID jika ada
        if (data.user && data.user.id) {
          localStorage.setItem("userId", data.user.id);
          console.log("User ID disimpan:", data.user.id); // Log user ID yang disimpan
        }
        // Arahkan pengguna berdasarkan peran
        if (role === "admin") {
          window.location.href = "admin_home.html"; // Halaman untuk admin
        } else if (role === "user") {
          window.location.href = "user_home.html"; // Halaman untuk pengguna biasa
        } else {
          alert("Role tidak dikenal.");
        }
      } else {
        alert("Login gagal: Tidak ada token yang diterima.");
      }
    })
    .catch((error) => {
      console.error("Ada masalah dengan operasi fetch:", error);
      alert("Login gagal: " + error.message);
    });
});
