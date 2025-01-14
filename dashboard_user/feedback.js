document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("jwtToken");

  // Load feedback data when the page loads
  await loadFeedback(token);

  // Logout event listener
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userRole");
    alert("Anda telah logout.");
    window.location.href =
      "https://rrq-dev.github.io/Frontend-berkah.github.io";
  });
});

// Function to load feedback from the backend
async function loadFeedback(token) {
  try {
    const response = await fetch("http://localhost:8080/datalokasi/feedback", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Response Error:", errorText);
      throw new Error("Gagal memuat data feedback.");
    }

    const result = await response.json(); // Parsing JSON from API response

    if (result.status !== "success") {
      throw new Error(result.message || "Terjadi kesalahan pada API.");
    }

    const feedbacks = result.data; // Get array data from `data` property

    const feedbackTable = document
      .getElementById("feedbackTable")
      .getElementsByTagName("tbody")[0];

    // Clear previous content
    feedbackTable.innerHTML = "";

    // Add each feedback to the table
    feedbacks.forEach((feedback) => {
      const newRow = createTableRow(feedback);
      feedbackTable.appendChild(newRow);
    });
  } catch (error) {
    console.error("Error saat memuat data:", error);
    alert("Terjadi kesalahan saat memuat data feedback.");
  }
}

// Function to create a table row
function createTableRow(feedback) {
  const newRow = document.createElement("tr");

  // ID cell
  const idCell = document.createElement("td");
  idCell.textContent = feedback.id;
  newRow.appendChild(idCell);

  // Location ID cell
  const locationIdCell = document.createElement("td");
  locationIdCell.textContent = feedback.location_id;
  newRow.appendChild(locationIdCell);

  // User ID cell
  const userIdCell = document.createElement("td");
  userIdCell.textContent = feedback.user_id;
  newRow.appendChild(userIdCell);

  // Rating cell
  const ratingCell = document.createElement("td");
  ratingCell.textContent = feedback.rating;
  newRow.appendChild(ratingCell);

  // Comment cell
  const commentCell = document.createElement("td");
  commentCell.textContent = feedback.comment;
  newRow.appendChild(commentCell);

  // Actions cell
  const actionsCell = document.createElement("td");

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn"; // Add CSS class
  editBtn.addEventListener("click", () => handleEdit(feedback));
  actionsCell.appendChild(editBtn);

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn"; // Add CSS class
  deleteBtn.addEventListener("click", () => handleDelete(feedback.id));
  actionsCell.appendChild(deleteBtn);

  newRow.appendChild(actionsCell);

  return newRow;
}

// Function to create feedback
document
  .getElementById("feedbackForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Capture values and convert to numbers where necessary
    const locationId = parseInt(
      document.getElementById("location_id").value,
      10
    );
    const userId = parseInt(document.getElementById("user_id").value, 10);
    const rating = parseInt(document.getElementById("rating").value, 10);
    const comment = document.getElementById("comment").value;

    const token = localStorage.getItem("jwtToken");

    const feedbackData = {
      location_id: locationId,
      user_id: userId,
      rating: rating,
      comment: comment,
    };

    try {
      const response = await fetch("http://localhost:8080/create/feedback", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response Error:", errorText);
        throw new Error("Gagal menambahkan feedback.");
      }

      alert("Feedback berhasil ditambahkan.");
      await loadFeedback(token); // Reload feedback list
      document.getElementById("feedbackForm").reset(); // Reset form fields
    } catch (error) {
      console.error("Error saat menambahkan feedback:", error);
      alert("Terjadi kesalahan saat menambahkan feedback.");
    }
  });

// Function to delete feedback
async function handleDelete(id) {
  const token = localStorage.getItem("jwtToken");

  if (!confirm("Apakah Anda yakin ingin menghapus feedback ini?")) {
    return;
  }

  try {
    console.log(`Menghapus feedback dengan ID: ${id}`); // Logging for debug

    const response = await fetch(`http://localhost:8080/delete/feedback`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Get error message from response
      console.error("Response Error:", errorText);
      throw new Error("Gagal menghapus feedback.");
    }

    alert("Feedback berhasil dihapus.");
    // Reload data after deletion
    await loadFeedback(token);
  } catch (error) {
    console.error("Error saat menghapus feedback:", error);
    alert("Terjadi kesalahan saat menghapus feedback.");
  }
}

// Function to edit feedback
function handleEdit(feedback) {
  const locationIdInput = document.getElementById("location_id");
  const userIdInput = document.getElementById("user_id");
  const ratingInput = document.getElementById("rating");
  const commentInput = document.getElementById("comment");

  locationIdInput.value = feedback.location_id;
  userIdInput.value = feedback.user_id;
  ratingInput.value = feedback.rating;
  commentInput.value = feedback.comment;

  // Change button text to Save Changes
  const addFeedbackBtn = document.getElementById("add-feedback-btn");
  addFeedbackBtn.textContent = "Save Changes";

  // Remove previous event listeners
  const newBtn = addFeedbackBtn.cloneNode(true);
  addFeedbackBtn.parentNode.replaceChild(newBtn, addFeedbackBtn);

  newBtn.addEventListener("click", async function saveChanges() {
    const updatedLocationId = parseInt(locationIdInput.value.trim(), 10);
    const updatedUserId = parseInt(userIdInput.value.trim(), 10);
    const updatedRating = parseInt(ratingInput.value.trim(), 10);
    const updatedComment = commentInput.value.trim();
    const token = localStorage.getItem("jwtToken");

    if (
      !updatedLocationId ||
      !updatedUserId ||
      !updatedRating ||
      !updatedComment
    ) {
      alert("Semua field harus diisi!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/update/feedback", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: feedback.id,
          location_id: updatedLocationId,
          user_id: updatedUserId,
          rating: updatedRating,
          comment: updatedComment,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get error message from response
        console.error("Response Error:", errorText);
        throw new Error("Gagal memperbarui feedback.");
      }

      alert("Feedback berhasil diperbarui.");
      locationIdInput.value = "";
      userIdInput.value = "";
      ratingInput.value = "";
      commentInput.value = "";
      newBtn.textContent = "Add Feedback";
      await loadFeedback(token);
    } catch (error) {
      console.error("Error saat memperbarui feedback:", error);
      alert("Terjadi kesalahan saat memperbarui feedback.");
    }
  });
}
