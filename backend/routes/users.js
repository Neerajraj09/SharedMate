const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../utilities');

// All routes here are protected by the authenticateToken middleware
router.use(authenticateToken);

// @route   GET /api/users/me
// @desc    Get current logged in user's profile
router.get('/me', userController.getMe);

// @route   GET /api/users
// @desc    Get all users
router.get('/', userController.getAllUsers);

// @route   GET /api/users/:id
// @desc    Get user profile by ID
router.get('/:id', userController.getUserById);

// @route   POST /api/users/:id/set-upi
// @desc    Set UPI ID for a user
router.post('/:id/set-upi', userController.setUpi);


module.exports = router;