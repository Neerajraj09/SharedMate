const Trip = require('../models/trips');
const User = require('../models/users');
const Expense = require('../models/expense');
const Notification = require('../models/notification');
const { sendTripEndEmail } = require('../utils/emailService');

// @desc    Create a new trip
// @route   POST /api/trips
exports.createTrip = async (req, res) => {
    try {
        const { tripName } = req.body;
        const { user } = req.user;

        const tripCreator = await User.findById(user._id);
        if (!tripCreator) {
            return res.status(404).json({ message: "User not found" });
        }

        const newTrip = new Trip({
            tripname: tripName,
            admin: tripCreator._id,
            members: [{ _id: tripCreator._id, totalSpend: 0 }]
        });

        await newTrip.save();
        res.status(201).json(newTrip);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get all trips for the logged-in user
// @route   GET /api/trips
exports.getAllTrips = async (req, res) => {
    try {
        const { user } = req.user;
        const userTrips = await Trip.find({ 'members._id': user._id });
        res.json(userTrips);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get a single trip by its ID
// @route   GET /api/trips/:id
exports.getTripById = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id).populate('members._id', 'username fullname email');
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }
        res.json(trip);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Add an expense to a trip
// @route   POST /api/trips/:id/expenses
exports.addExpense = async (req, res) => {
    try {
        const { amount, description } = req.body;
        const { user } = req.user;

        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        const memberIndex = trip.members.findIndex(m => m._id.equals(user._id));
        if (memberIndex === -1) {
            return res.status(403).json({ message: 'User is not a member of this trip' });
        }

        trip.members[memberIndex].totalSpend += amount;
        await trip.save();

        const newExpense = new Expense({
            description: description,
            amount: amount,
            trip: req.params.id,
            paidBy: user._id,
        });
        await newExpense.save();

        res.status(201).json(newExpense);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get all expenses for a trip
// @route   GET /api/trips/:id/expenses
exports.getTripExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ trip: req.params.id }).populate('paidBy', 'username fullname');
        res.json(expenses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Add a member to a trip
// @route   POST /api/trips/:id/members
exports.addMember = async (req, res) => {
    try {
        const { userId } = req.body;
        const trip = await Trip.findById(req.params.id);

        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        if (trip.members.some(member => member._id.equals(userId))) {
            return res.status(400).json({ message: "User is already a member of this trip" });
        }

        trip.members.push({ _id: userId, totalSpend: 0 });
        await trip.save();

        res.status(200).json(trip);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Remove a member from a trip
// @route   DELETE /api/trips/:id/members/:memberId
exports.removeMember = async (req, res) => {
    try {
        const { id, memberId } = req.params;
        const trip = await Trip.findById(id);

        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }
        
        trip.members = trip.members.filter(member => !member._id.equals(memberId));
        await trip.save();

        res.status(200).json({ message: "Member removed successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    End a trip and calculate settlements
// @route   POST /api/trips/:id/end
exports.endTrip = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id)
            .populate('members._id', 'fullname username email upiId');

        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        const totalTripCost = trip.members.reduce(
            (sum, m) => sum + m.totalSpend,
            0
        );

        const perMemberShare = totalTripCost / trip.members.length;

        const balances = trip.members.map(member => ({
            member: member._id,
            balance: member.totalSpend - perMemberShare,
        }));

        let owers = balances.filter(b => b.balance < 0);
        let receivers = balances.filter(b => b.balance > 0);

        const transactions = [];

        while (owers.length && receivers.length) {
            const ower = owers[0];
            const receiver = receivers[0];

            const amount = Math.min(
                Math.abs(ower.balance),
                receiver.balance
            );

            transactions.push({
                from: ower.member._id,
                to: receiver.member._id,
                amount,
            });

            ower.balance += amount;
            receiver.balance -= amount;

            if (ower.balance === 0) owers.shift();
            if (receiver.balance === 0) receivers.shift();
        }

        trip.totalTripCost = totalTripCost;
        trip.perMemberShare = perMemberShare;
        trip.suggestedPayments = transactions;
        trip.status = "completed";

        await trip.save();

        res.status(200).json({
            message: "Trip ended successfully",
            tripId: trip._id
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};


// controllers/emailController.js
exports.sendTripEndEmails = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id)
            .populate('members._id', 'fullname email');

        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        for (const member of trip.members) {
            try {
                await sendTripEndEmail(
                    member,
                    trip,
                    trip.totalTripCost,
                    trip.perMemberShare
                );
                console.log(`Email sent → ${member._id.email}`);
            } catch (err) {
                console.error(`Email failed → ${member._id.email}`, err);
            }
        }

        res.status(200).json({ message: "Emails sent successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Email sending failed" });
    }
};


// @desc    Get settlement suggestions for a trip
// @route   GET /api/trips/:id/suggestions
exports.getSuggestions = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id)
            .populate('suggestedPayments.from', 'fullname username upiId')
            .populate('suggestedPayments.to', 'fullname username upiId');

        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }
        res.json(trip.suggestedPayments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Delete a trip
// @route   DELETE /api/trips/:id
exports.deleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }
        
        // Optional: Check if the user is the admin
        if (!trip.admin.equals(req.user.user._id)) {
            return res.status(403).json({ message: "User is not authorized to delete this trip" });
        }

        await Expense.deleteMany({ trip: req.params.id });
        await Notification.deleteMany({ trip: req.params.id });
        await Trip.findByIdAndDelete(req.params.id);
        
        res.json({ message: "Trip deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

