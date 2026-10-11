const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// 1. REGISTER ROUTE (Is-diiwaangelinta)
router.post('/register', async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;

        // Hubi inuu user hore u jiro
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email-kan hore ayuu diiwaangashan yahay!' });
        }

        // Encryption (Password-ka oo la qariyo)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Abuur user cusub
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            role: role || 'CUSTOMER'
        });

        await newUser.save();
        res.status(201).json({ message: 'Account-ka si guul leh ayaa loo abuuray!' });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// 2. LOGIN ROUTE (Gelitaanka)
router.post('/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email-kan ama Password-ka waa qaldan yihiin!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email-kan ama Password-ka waa qaldan yihiin!' });
        }

        if (user.role !== role) {
            return res.status(400).json({ message: `Account-kani ma laha roolka ${role}! Waa ${user.role}` });
        }

        res.status(200).json({
            message: 'Login-ka waa la guulaystay!',
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

module.exports = router;