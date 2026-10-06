const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const { authenticateToken } = require('../utilities');

// All routes here are protected
router.use(authenticateToken);

// Trips
router.route('/')
    .post(tripController.createTrip)
    .get(tripController.getAllTrips);

router.route('/:id')
    .get(tripController.getTripById)
    .delete(tripController.deleteTrip);

// Trip Lifecycle
router.post('/:id/end', tripController.endTrip);
router.post("/:id/send-emails", tripController.sendTripEndEmails);
router.get('/:id/suggestions', tripController.getSuggestions);

// Expenses within a trip
router.route('/:id/expenses')
    .post(tripController.addExpense)
    .get(tripController.getTripExpenses);

// Members of a trip
router.post('/:id/members', tripController.addMember);
router.delete('/:id/members/:memberId', tripController.removeMember);

module.exports = router;
