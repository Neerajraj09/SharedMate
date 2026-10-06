const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['1.1.1.1' , '8.8.8.8']);
const { Schema } = mongoose;

const expenseSchema = new Schema({
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    trip: { type: Schema.Types.ObjectId, ref: 'Trips', required: true, index: true },
    paidBy: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', expenseSchema);
