const Notification = require('../models/notification');

// @desc    Get all notifications for the logged-in user
// @route   GET /api/notifications
exports.getNotifications = async (req, res) => {
    try {
        const { user } = req.user;
        const notifications = await Notification.find({ recipient: user._id })
            .populate('sender', 'fullname username')
            .populate('trip', 'tripname')
            .sort({ createdAt: -1 });
        res.json(notifications);
    } catch (err) {
        console.error("Error fetching notifications:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Create a new trip invitation notification
// @route   POST /api/notifications/invite
exports.createInvitation = async (req, res) => {
    try {
        const { recipientId, tripId } = req.body;
        const { user: sender } = req.user;

        const newNotification = new Notification({
            recipient: recipientId,
            sender: sender._id,
            trip: tripId,
            type: 'trip_invitation',
        });

        await newNotification.save();
        res.status(201).json({ message: "Invitation sent successfully." });
    } catch (err) {
        console.error("Error sending invitation:", err);
        res.status(500).json({ message: "Error sending invitation" });
    }
};

// @desc    Delete a notification (used for accepting/rejecting)
// @route   DELETE /api/notifications/:id
exports.deleteNotification = async (req, res) => {
    try {
        const result = await Notification.deleteOne({ 
            _id: req.params.id, 
            recipient: req.user.user._id // Authorize by ensuring the logged-in user is the recipient
        });

        if (result.deletedCount === 0) {
            // This means either the notification didn't exist or the user wasn't the recipient.
            return res.status(404).json({ message: "Notification not found or user not authorized." });
        }

        res.json({ message: "Notification handled successfully" });

    } catch (err) {
        console.error("Error deleting notification:", err);
        res.status(500).json({ message: "Server error" });
    }
};
