const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { authenticateToken } = require('../utilities');

// All routes here are protected
router.use(authenticateToken);

// @route   GET /api/notifications
// @desc    Get all of a user's notifications
router.get('/', notificationController.getNotifications);

// @route   POST /api/notifications/invite
// @desc    Create a new trip invitation
router.post('/invite', notificationController.createInvitation);

// @route   DELETE /api/notifications/:id
// @desc    Delete a notification (on accept or reject)
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
