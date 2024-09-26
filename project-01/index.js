const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

let users = require("./MOCK_DATA.json"); // Load the users data

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

app.get("/users", (req, res) => {
  const html = `<ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
  </ul>`;
  res.send(html);
});

// REST API's

// Get all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// Get user by id
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

// Create new user
app.post("/api/users", (req, res) => {
  const { first_name, last_name, email, job_title } = req.body;

  // Ensure all required fields are present
  if (!first_name || !last_name || !email || !job_title) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // // Generate a new ID for the user
  const newUser = {
    id: users.length + 1, // Ensure ID is sequential
    first_name,
    last_name,
    email,
    job_title,
  };

  // Add the new user to the array
  users.push(newUser);

  // Write the updated array to the file
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to write data" });
    }

    // Return success and the new user with proper order
    res.status(201).json({ status: "Success", user: newUser });
  });
});

// Delete user by id
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const userIndex = users.findIndex((user) => user.id === id); // Find the index of the user

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const deletedUser = users[userIndex]; // Get the user object to return it later

  // Remove the user from the array
  users.splice(userIndex, 1); // Remove the user from the array

  // Write the updated array back to the file
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to write data" });
    }

    res.status(200).json({
      status: "Success",
      message: `User with id ${id} deleted`,
      user: deletedUser, // Return the deleted user
    });
  });
});

// Update user by id (This is a placeholder)
app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const { first_name, last_name, email, job_title } = req.body;

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(400).json({ error: "User not found!!" });
  }

  if (first_name) {
    user.first_name = first_name;
  }
  if (last_name) {
    user.last_name = last_name;
  }
  if (email) {
    user.email = email;
  }
  if (job_title) {
    user.job_title = job_title;
  }

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to write data" });
    }

    // Return the updated user
    res.status(200).json({
      status: "Success",
      message: `User with id ${id} updated`,
      user, // Return the updated user
    });
  });
});

// Running PORT
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
