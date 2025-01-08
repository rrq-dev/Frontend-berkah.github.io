// Validasi akses halaman dashboard
document.addEventListener("DOMContentLoaded", async () => {
  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("jwtToken");

  if (!token || role !== "admin") {
    alert("Anda tidak memiliki akses ke halaman ini.");
    window.location.href = "/login/login.html";
    return;
  }

  // Load data lokasi saat halaman dimuat
  await loadLocations(token);
});

// Fungsi untuk memuat data lokasi dari backend
async function loadLocations(token) {
  try {
    const response = await fetch("http://localhost:8080/datalokasi", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Gagal memuat data lokasi.");
    }

    const locations = await response.json();
    const userTable = document.getElementById("user-table");

    // Hapus konten sebelumnya
    userTable.innerHTML = "";

    // Tambahkan setiap lokasi ke tabel
    locations.forEach((location) => {
      const newRow = createTableRow(location);
      userTable.appendChild(newRow);
    });
  } catch (error) {
    console.error("Error saat memuat data:", error);
    alert("Terjadi kesalahan saat memuat data lokasi.");
  }
}

// Fungsi untuk membuat baris tabel
function createTableRow(location) {
  const newRow = document.createElement("tr");

  // Location cell
  const locationCell = document.createElement("td");
  locationCell.textContent = location.location;
  newRow.appendChild(locationCell);

  // Address cell
  const addressCell = document.createElement("td");
  addressCell.textContent = location.address;
  newRow.appendChild(addressCell);

  // Description cell
  const descCell = document.createElement("td");
  descCell.textContent = location.description;
  newRow.appendChild(descCell);

  // Actions cell
  const actionsCell = document.createElement("td");

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.style.backgroundColor = "#e76f51";
  editBtn.style.color = "white";
  editBtn.addEventListener("click", () => handleEdit(location));
  actionsCell.appendChild(editBtn);

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.backgroundColor = "#e63946";
  deleteBtn.style.color = "white";
  deleteBtn.addEventListener("click", () => handleDelete(location.id));
  actionsCell.appendChild(deleteBtn);

  newRow.appendChild(actionsCell);

  return newRow;
}

// Tambah data baru
document.getElementById("add-user-btn").addEventListener("click", async () => {
  const location = document.getElementById("location").value.trim();
  const address = document.getElementById("address").value.trim();
  const desc = document.getElementById("desc").value.trim();
  const token = localStorage.getItem("jwtToken");

  if (!location || !address || !desc) {
    alert("Semua field harus diisi!");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/create/data", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location, address, description: desc }),
    });

    if (!response.ok) {
      throw new Error("Gagal menambahkan lokasi.");
    }

    alert("Lokasi berhasil ditambahkan.");
    document.getElementById("location").value = "";
    document.getElementById("address").value = "";
    document.getElementById("desc").value = "";

    // Muat ulang data setelah penambahan
    await loadLocations(token);
  } catch (error) {
    console.error("Error saat menambahkan lokasi:", error);
    alert("Terjadi kesalahan saat menambahkan lokasi.");
  }
});

// Fungsi untuk menghapus lokasi
async function handleDelete(id) {
  const token = localStorage.getItem("jwtToken");

  if (!confirm("Apakah Anda yakin ingin menghapus lokasi ini?")) {
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/delete/data?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Gagal menghapus lokasi.");
    }

    alert("Lokasi berhasil dihapus.");
    // Muat ulang data setelah penghapusan
    await loadLocations(token);
  } catch (error) {
    console.error("Error saat menghapus lokasi:", error);
    alert("Terjadi kesalahan saat menghapus lokasi.");
  }
}

// Fungsi untuk mengedit lokasi
function handleEdit(location) {
  const locationInput = document.getElementById("location");
  const addressInput = document.getElementById("address");
  const descInput = document.getElementById("desc");

  locationInput.value = location.location;
  addressInput.value = location.address;
  descInput.value = location.description;

  // Ganti teks tombol Add Mosque menjadi Save Changes
  const addUserBtn = document.getElementById("add-user-btn");
  addUserBtn.textContent = "Save Changes";

  // Hapus semua event listener sebelumnya
  const newBtn = addUserBtn.cloneNode(true);
  addUserBtn.parentNode.replaceChild(newBtn, addUserBtn);

  newBtn.addEventListener("click", async function saveChanges() {
    const updatedLocation = locationInput.value.trim();
    const updatedAddress = addressInput.value.trim();
    const updatedDesc = descInput.value.trim();
    const token = localStorage.getItem("jwtToken");

    if (!updatedLocation || !updatedAddress || !updatedDesc) {
      alert("Semua field harus diisi!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/update/data", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: location.id,
          location: updatedLocation,
          address: updatedAddress,
          description: updatedDesc,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal memperbarui lokasi.");
      }

      alert("Lokasi berhasil diperbarui.");
      locationInput.value = "";
      addressInput.value = "";
      descInput.value = "";
      newBtn.textContent = "Add Mosque";
      await loadLocations(token);
    } catch (error) {
      console.error("Error saat memperbarui lokasi:", error);
      alert("Terjadi kesalahan saat memperbarui lokasi.");
    }
  });
}
