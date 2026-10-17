const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// ==========================================
// A. AUTH ROUTES (Register & Login)
// ==========================================

// 1. REGISTER ROUTE (Is-diiwaangelinta)
router.post('/register', async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email-kan hore ayuu diiwaangashan yahay!' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

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

        const userRoleUpper = user.role.toUpperCase();
        const inputRoleUpper = role.toUpperCase();

        if (userRoleUpper !== inputRoleUpper) {
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


// ==========================================
// B. USERS MANAGEMENT ROUTES (Admin Dashboard - CRUD)
// ==========================================

// 3. GET ALL USERS / SEARCH (Wuxuu soo celiyaa xogta user-yada oo sifaysan)
router.get('/', async (req, res) => {
    try {
        const { search, role, status } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { fullName: { $regex: search, $options: 'insensitive' } },
                { email: { $regex: search, $options: 'insensitive' } },
                { phone: { $regex: search, $options: 'insensitive' } }
            ];
        }

        if (role && role !== 'All Roles') {
            query.role = { $regex: new RegExp("^" + role + "$", "i") }; // Case-insensitive role match
        }

        if (status && status !== 'All Status') {
            query.status = status;
        }

        const users = await User.find(query).sort({ createdAt: -1 });
        
        const formattedUsers = users.map(u => ({
            _id: u._id,
            id: u._id,
            name: u.fullName,
            email: u.email,
            phone: u.phone || "+252 61 0000000",
            role: u.role,
            status: u.status || "Active",
            joined: u.joinDate || u.createdAt.toISOString().split('T')[0],
            image: u.image || "https://i.pravatar.cc/150?img=47",
            initials: u.fullName ? u.fullName.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase() : "US"
        }));

        res.status(200).json(formattedUsers);
    } catch (error) {
        console.error("Get Users Error:", error);
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// 4. ADD USER (Save user cusub oo ka yimid Dashboard-ka)
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, role, status, image, joinDate } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email-kan hore ayuu diiwaangashan yahay!' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("123456", salt);

        const newUser = new User({
            fullName: name,
            email,
            phone: phone || "+252 61 0000000",
            password: hashedPassword,
            role: role || 'Customer',
            status: status || 'Active',
            image: image || "https://i.pravatar.cc/150?img=47",
            joinDate: joinDate || new Date().toISOString().split('T')[0]
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error("Add User Error:", error);
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// 5. UPDATE USER (Beddelka xogta user-ka)
router.put('/:id', async (req, res) => {
    try {
        const { name, email, phone, role, status, image, joinDate } = req.body;
        
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { fullName: name, email, phone, role, status, image, joinDate },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User-kan lama helin!' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Update User Error:", error);
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// 6. TOGGLE STATUS (Active / Inactive)
router.patch('/:id/status', async (res, req) => { // Halkaas waxaa ku jiray kala hormar yar oo la saxay
    // ...
});

router.patch('/:id/status', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User lama helin' });

        user.status = user.status === 'Active' ? 'Inactive' : 'Active';
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.error("Toggle Status Error:", error);
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// 7. DELETE USER (Tirtirida user-ka)
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User-ka waa la tirtiray' });
    } catch (error) {
        console.error("Delete User Error:", error);
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

module.exports = router;