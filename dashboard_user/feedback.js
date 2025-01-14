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
    const response = await fetch("http://localhost:8080/datalokasi/user", {
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

    const feedbackList = document.getElementById("feedbackList");

    // Clear previous content
    feedbackList.innerHTML = "";

    // Add each feedback to the list as a card
    feedbacks.forEach((feedback) => {
      const feedbackCard = createFeedbackCard(feedback);
      feedbackList.appendChild(feedbackCard);
    });
  } catch (error) {
    console.error("Error saat memuat data:", error);
    alert("Terjadi kesalahan saat memuat data feedback.");
  }
}

// Function to create a feedback card
function createFeedbackCard(feedback) {
  console.log(feedback); // Log the feedback object for debugging

  const card = document.createElement("div");
  card.className = "card";

  const id = document.createElement("h3");
  id.textContent = `ID: ${feedback.id || "N/A"}`;
  card.appendChild(id);

  const userId = document.createElement("p");
  userId.textContent = `User ID: ${feedback.user_id || "N/A"}`; // Accessing user ID
  card.appendChild(userId);

  const name = document.createElement("p");
  name.textContent = `Name: ${feedback.name || "N/A"}`; // Accessing name
  card.appendChild(name);

  const address = document.createElement("p");
  address.textContent = `Address: ${feedback.address || "N/A"}`; // Accessing address
  card.appendChild(address);

  const description = document.createElement("p");
  description.textContent = `Description: ${feedback.description || "N/A"}`; // Accessing description
  card.appendChild(description);

  const rating = document.createElement("p");
  rating.textContent = `Rating: ${feedback.rating || "N/A"}`; // Accessing rating
  card.appendChild(rating);

  const comment = document.createElement("p");
  comment.textContent = `Comment: ${feedback.comment || "N/A"}`; // Accessing comment
  card.appendChild(comment);

  // Actions
  const actionsDiv = document.createElement("div");
  actionsDiv.style.display = "flex"; // Flexbox for buttons
  actionsDiv.style.justifyContent = "space-between"; // Space between buttons

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn"; // Add CSS class
  editBtn.addEventListener("click", () => handleEdit(feedback));
  actionsDiv.appendChild(editBtn);

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn"; // Add CSS class
  deleteBtn.addEventListener("click", () => handleDelete(feedback.id));
  actionsDiv.appendChild(deleteBtn);

  card.appendChild(actionsDiv);

  return card;
}

// Function to create feedback
document
  .getElementById("feedbackForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Capture values
    const name = document.getElementById("name").value; // Assuming you have a name field
    const address = document.getElementById("address").value; // Assuming you have an address field
    const description = document.getElementById("description").value; // Assuming you have a description field
    const rating = document.getElementById("rating").value; // Assuming you have a rating field
    const comment = document.getElementById("comment").value; // Assuming you have a comment field

    const token = localStorage.getItem("jwtToken");

    const feedbackData = {
      name: name,
      address: address,
      description: description,
      rating: parseInt(rating, 10),
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
  const userIdInput = document.getElementById("userId");
  const nameInput = document.getElementById("name");
  const addressInput = document.getElementById("address");
  const descriptionInput = document.getElementById("description");
  const ratingInput = document.getElementById("rating");
  const commentInput = document.getElementById("comment");

  // Set values for editing
  userIdInput.value = feedback.user_id || ""; // Ensure it's not undefined
  nameInput.value = feedback.name || ""; // Ensure it's not undefined
  addressInput.value = feedback.address || ""; // Ensure it's not undefined
  descriptionInput.value = feedback.description || ""; // Ensure it's not undefined
  ratingInput.value = feedback.rating || ""; // Ensure it's not undefined
  commentInput.value = feedback.comment || ""; // Ensure it's not undefined

  // Change button text to Save Changes
  const addFeedbackBtn = document.getElementById("add-feedback-btn");
  addFeedbackBtn.textContent = "Save Changes";

  // Remove previous event listeners
  const newBtn = addFeedbackBtn.cloneNode(true);
  addFeedbackBtn.parentNode.replaceChild(newBtn, addFeedbackBtn);

  newBtn.addEventListener("click", async function saveChanges() {
    const updatedFeedback = {
      id: feedback.id, // ID is taken from the feedback object
      user_id: userIdInput.value,
      name: nameInput.value,
      address: addressInput.value,
      description: descriptionInput.value,
      rating: parseInt(ratingInput.value, 10),
      comment: commentInput.value,
    };

    const token = localStorage.getItem("jwtToken");

    try {
      const response = await fetch("http://localhost:8080/update/feedback", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFeedback),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get error message from response
        console.error("Response Error:", errorText);
        throw new Error("Gagal memperbarui feedback.");
      }

      alert("Feedback berhasil diperbarui.");
      await loadFeedback(token); // Reload feedback list
      newBtn.textContent = "Add Feedback"; // Reset button text
      document.getElementById("feedbackForm").reset(); // Reset form fields
    } catch (error) {
      console.error("Error saat memperbarui feedback:", error);
      alert("Terjadi kesalahan saat memperbarui feedback.");
    }
  });
}
