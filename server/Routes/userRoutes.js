const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authcontrollers");
const paymentController = require("../controllers/paymentControllers");
const bookingController = require("../controllers/bookingController");
const authMiddleware = require("../Middlewares/authMiddleware");

// Register route
router.post("/register", authControllers.register);

// Login route
router.post("/login", authControllers.login);

// Payment order route
router.post("/create-order", paymentController.createOrder);

// Save booking after payment (protected)
router.post("/book-meal", authMiddleware, bookingController.bookMeal);

// Get all paid users for today
router.get("/paid-users", bookingController.getPaidUsers);

module.exports = router;