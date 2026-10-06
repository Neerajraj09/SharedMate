// backend/utils/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/**
 * Sends a "Trip Ended" notification email to a trip member.
 * @param {object} member - The populated member object, containing at least _id.email and _id.fullname.
 * @param {object} trip - The trip object, containing tripname.
 * @param {number} totalTripCost - The total cost of the trip.
 * @param {number} perMemberShare - The calculated share for each member.
 * @returns {Promise} A promise from the transporter.sendMail call.
 */
function sendTripEndEmail(member, trip, totalTripCost, perMemberShare) {
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: member._id.email,
        subject: `Your Trip "${trip.tripname}" Has Ended`,
        text: `
Hi ${member._id.fullname},

The trip "${trip.tripname}" has ended. Here are the summary details:

- Total Trip Cost: ₹${totalTripCost.toFixed(2)}
- Per Member Cost: ₹${perMemberShare.toFixed(2)}

You can check the details of any suggested payments in your account.

Thank you for using Sharedmate!

Regards,
Sharedmate Team
        `,
    };

    return transporter.sendMail(mailOptions);
}

module.exports = { sendTripEndEmail };
