const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users.js');

exports.signup = async (req, res) => {
    try {
        const { Fullname, Username, Email, Password } = req.body.users;

        const checkEmail = await User.findOne({ email: Email });
        if (checkEmail) {
            return res.status(400).send({ message: "Email already in use" });
        }

        const checkUsername = await User.findOne({ username: Username });
        if (checkUsername) {
            return res.status(400).send({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        const newUser = new User({
            fullname: Fullname,
            username: Username,
            email: Email,
            password: hashedPassword,
        });

        await newUser.save();

        const accessToken = jwt.sign(
            { user: newUser },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "3600m" }
        );

        return res.json({
            error: false,
            newUser,
            accessToken,
            message: "Registration Successful",
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Server error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { Email, Password } = req.body.users;
        const user = await User.findOne({ email: Email });

        if (!user) {
            return res.status(400).json({
                error: true,
                message: "User does not exist",
            });
        }

        const passwordMatch = await bcrypt.compare(Password, user.password);
        if (passwordMatch) {
            const accessToken = jwt.sign(
                { user: user },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "3600m" }
            );

            return res.status(200).json({
                error: false,
                Email,
                accessToken,
                message: "Redirecting you to Dashboard",
            });
        } else {
            return res.status(400).json({
                error: true,
                message: "Wrong Password",
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Server error" });
    }
};
