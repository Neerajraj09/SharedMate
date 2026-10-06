const User = require('../models/users.js');

// @desc    Get current logged in user
// @route   GET /api/users/me
exports.getMe = async (req, res) => {
    try {
        // req.user is set by the authenticateToken middleware
        const user = await User.findById(req.user.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Only return public-safe info
        res.json({
            _id: user._id,
            username: user.username,
            fullname: user.fullname,
            upiId: user.upiId
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get all users (with Pagination and Search)
// @route   GET /api/users
exports.getAllUsers = async (req, res) => {
    try {
        // 1. Get query parameters from URL
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.query || ""; // User's search text

        // 2. Calculate the number of documents to skip
        const skip = (page - 1) * limit;

        // 3. Create a search filter
        // This looks for the search string in username, fullname, or email (case-insensitive)
        const searchFilter = search ? {
            $or: [
                { username: { $regex: search, $options: 'i' } },
                { fullname: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ]
        } : {};

        // 4. Fetch the specific slice of users
        const users = await User.find(searchFilter)
            .select('-password')
            .skip(skip)
            .limit(limit)
            .sort({ fullname: 1 }); // Sort alphabetically

        // 5. (Optional) Get total count for frontend calculations
        const totalUsers = await User.countDocuments(searchFilter);

        res.json({ 
            allUsers: users,
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit),
            totalResults: totalUsers
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Set UPI ID for a user
// @route   POST /api/users/:id/set-upi
exports.setUpi = async (req, res) => {
    try {
        const userId = req.params.id;
        const upiId = req.body.upiId;

        // Ensure the logged-in user can only update their own UPI
        if (req.user.user._id.toString() !== userId) {
            return res.status(403).json({ message: "User not authorized to update this profile" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.upiId = upiId;
        await user.save();
        res.status(200).json({ message: "UPI ID set successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};
