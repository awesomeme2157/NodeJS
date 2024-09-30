const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUserById,
} = require("../controllers/userController");

// Get all users
router.get("/", getAllUsers);

// Get user by ID
router.get("/:id", getUserById);

// Create new user
router.post("/", addUser);

// Delete user by ID
router.delete("/:id", deleteUser);

// Update user by ID (partial update)
router.patch("/:id", updateUserById);

module.exports = router;
