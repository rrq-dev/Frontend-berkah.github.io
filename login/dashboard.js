document.addEventListener("DOMContentLoaded", async () => {
  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("jwtToken");

  if (!token || role !== "admin") {
    alert("Anda tidak memiliki akses ke halaman ini.");
    window.location.href = "/login/login.html";
    return;
  }

  // Load data masjid saat halaman dimuat
  await loadLocations(token);

  // Logout event listener
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userRole");
    alert("Anda telah logout.");
    window.location.href = "/login/login.html";
  });
});

// Fungsi untuk memuat data masjid dari backend
async function loadLocations(token) {
  try {
    const response = await fetch("http://localhost:8080/datalokasi", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Gagal memuat data masjid.");
    }

    const result = await response.json(); // Parsing JSON dari respons API

    if (result.status !== "success") {
      throw new Error(result.message || "Terjadi kesalahan pada API.");
    }

    const locations = result.data; // Ambil array data dari properti `data`

    const userTable = document.getElementById("user-table");

    // Hapus konten sebelumnya
    userTable.innerHTML = "";

    // Tambahkan setiap masjid ke tabel
    locations.forEach((location) => {
      const newRow = createTableRow(location);
      userTable.appendChild(newRow);
    });
  } catch (error) {
    console.error("Error saat memuat data:", error);
    alert("Terjadi kesalahan saat memuat data masjid.");
  }
}

// Fungsi untuk membuat baris tabel
function createTableRow(location) {
  const newRow = document.createElement("tr");

  // Name cell
  const nameCell = document.createElement("td");
  nameCell.textContent = location.name;
  newRow.appendChild(nameCell);

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

// Fungsi untuk menghapus masjid
async function handleDelete(id) {
  const token = localStorage.getItem("jwtToken");

  if (!confirm("Apakah Anda yakin ingin menghapus masjid ini?")) {
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
      throw new Error("Gagal menghapus masjid.");
    }

    alert("Masjid berhasil dihapus.");
    // Muat ulang data setelah penghapusan
    await loadLocations(token);
  } catch (error) {
    console.error("Error saat menghapus masjid:", error);
    alert("Terjadi kesalahan saat menghapus masjid.");
  }
}

// Fungsi untuk mengedit masjid
function handleEdit(location) {
  const nameInput = document.getElementById("name");
  const addressInput = document.getElementById("address");
  const descInput = document.getElementById("desc");

  nameInput.value = location.name;
  addressInput.value = location.address;
  descInput.value = location.description;

  // Ganti teks tombol Add Mosque menjadi Save Changes
  const addUserBtn = document.getElementById("add-user-btn");
  addUserBtn.textContent = "Save Changes";

  // Hapus semua event listener sebelumnya
  const newBtn = addUserBtn.cloneNode(true);
  addUserBtn.parentNode.replaceChild(newBtn, addUserBtn);

  newBtn.addEventListener("click", async function saveChanges() {
    const updatedName = nameInput.value.trim();
    const updatedAddress = addressInput.value.trim();
    const updatedDesc = descInput.value.trim();
    const token = localStorage.getItem("jwtToken");

    if (!updatedName || !updatedAddress || !updatedDesc) {
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
          name: updatedName,
          address: updatedAddress,
          description: updatedDesc,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal memperbarui masjid.");
      }

      alert("Masjid berhasil diperbarui.");
      nameInput.value = "";
      addressInput.value = "";
      descInput.value = "";
      newBtn.textContent = "Add Mosque";
      await loadLocations(token);
    } catch (error) {
      console.error("Error saat memperbarui masjid:", error);
      alert("Terjadi kesalahan saat memperbarui masjid.");
    }
  });
}
