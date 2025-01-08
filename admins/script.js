// Get references to HTML elements
const addUserBtn = document.getElementById("add-user-btn");
const locationInput = document.getElementById("location");
const addressInput = document.getElementById("address");
const descriptionInput = document.getElementById("desc");
const userTable = document.getElementById("user-table");

// Event listener for adding a user
addUserBtn.addEventListener("click", function () {
  const location = locationInput.trim();
  const address = addressInput.value.trim();
  const desc = descriptionInput.trim();

  if (location === "" || address === "" || desc === "") {
    alert("Please enter both name, email, and description!");
    return;
  }

  // Create a new row in the table
  const newRow = document.createElement("tr");

  // location cell
  const locationCell = document.createElement("td");
  locationCell.textContent = location;
  newRow.appendChild(locationCell);

  // address cell
  const addressCell = document.createElement("td");
  addressCell.textContent = address;
  newRow.appendChild(addressCell);

  // desc cell
  const descCell = document.createElement("td");
  descCell.textContent = desc;
  newRow.appendChild(descCell);

  // Actions cell
  const actionsCell = document.createElement("td");

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.style.backgroundColor = "#e76f51";
  editBtn.style.color = "white";
  editBtn.addEventListener("click", function () {
    locationInput.value = locationCell.textContent;
    addressInput.value = addressCell.textContent;
    descriptionInput.value = descCell.textContent;
    userTable.removeChild(newRow);
  });
  actionsCell.appendChild(editBtn);

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.backgroundColor = "#e63946";
  deleteBtn.style.color = "white";
  deleteBtn.addEventListener("click", function () {
    userTable.removeChild(newRow);
  });
  actionsCell.appendChild(deleteBtn);

  newRow.appendChild(actionsCell);
  userTable.appendChild(newRow);

  // Clear input fields
  locationInput.value = "";
  addressInput.value = "";
  descInput.value = "";
});
