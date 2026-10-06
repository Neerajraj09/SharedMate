const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['1.1.1.1' , '8.8.8.8']);
const { Schema } = mongoose;

// Define the trip schema
const tripSchema = new Schema({
    tripname: {
        type: String,
        required: true,
    },
    members: [
        {
            _id: { type: Schema.Types.ObjectId, ref: 'Users', required: true, index: true },
            totalSpend: {
                type: Number,
                default: 0,
            },
            balance: { // Track how much this member owes or is owed
                type: Number,
                default: 0,
            },
            owed: [ // Payments owed to other members
                {
                    toMember: { type: Schema.Types.ObjectId, ref: 'Users', required: true }, // ID of the member to whom money is owed
                    amount: { type: Number, required: true }, // Amount owed
                }
            ]
        }
    ],
    totalTripCost: { // Total cost of the trip
        type: Number,
        default: 0,
    },
    perMemberShare: { // Fair share per member
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // Field to store payment suggestions
    suggestedPayments: [
        {
            from: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
            to: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
            amount: { type: Number, required: true },
        }
    ],
    // New status field, default is "ongoing"
    status: {
        type: String,
        enum: ['ongoing', 'completed'],
        default: 'ongoing',
    },
    admin: { type: Schema.Types.ObjectId, ref: 'Users' },
});

// Create the trips model
const Trips = mongoose.model("Trips", tripSchema);
module.exports = Trips;

