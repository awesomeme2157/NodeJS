const User = require("../models/user");
const mongoose = require("mongoose");

// Get all users
async function getAllUsers(req, res) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// Get a user by ID
async function getUserById(req, res) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// Add a new user
async function addUser(req, res) {
  const { firstName, lastName, email, jobTitle } = req.body;

  // Ensure all required fields are present
  if (!firstName || !lastName || !email || !jobTitle) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      jobTitle: jobTitle,
    });

    res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// Delete a user by ID
async function deleteUser(req, res) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: `User with ID ${id} deleted`,
      user: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// Update a user by ID
async function updateUserById(req, res) {
  const { id } = req.params;
  const { firstName, lastName, email, jobTitle } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        jobTitle: jobTitle,
      },
      { new: true } // Return the updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: `User with ID ${id} updated`,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUserById,
};
