// Get references to HTML elements
const addUserBtn = document.getElementById("add-user-btn");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const userTable = document.getElementById("user-table");

// Event listener for adding a user
addUserBtn.addEventListener("click", function () {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (name === "" || email === "") {
    alert("Please enter both name and email!");
    return;
  }

  // Create a new row in the table
  const newRow = document.createElement("tr");

  // Name cell
  const nameCell = document.createElement("td");
  nameCell.textContent = name;
  newRow.appendChild(nameCell);

  // Email cell
  const emailCell = document.createElement("td");
  emailCell.textContent = email;
  newRow.appendChild(emailCell);

  // Actions cell
  const actionsCell = document.createElement("td");

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.style.backgroundColor = "#e76f51";
  editBtn.style.color = "white";
  editBtn.addEventListener("click", function () {
    nameInput.value = nameCell.textContent;
    emailInput.value = emailCell.textContent;
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
  nameInput.value = "";
  emailInput.value = "";
});
