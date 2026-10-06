// backend/models/notification.js
const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['1.1.1.1' , '8.8.8.8']);
const { Schema } = mongoose;

const notificationSchema = new Schema({
    recipient: { type: Schema.Types.ObjectId, ref: 'Users', required: true, index: true },
    sender: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    trip: { type: Schema.Types.ObjectId, ref: 'Trips' },
    type: {
        type: String,
        enum: ['trip_invitation'], // For now, only this type exists
        required: true
    },
    read: { type: Boolean, default: false, index: true },
    createdAt: { type: Date, default: Date.now, expires: '90d' } // Automatically delete notifications after 90 days
});

module.exports = mongoose.model('Notification', notificationSchema);
