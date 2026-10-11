const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// 1. GET ALL CUSTOMERS / SEARCH
router.get('/', async (req, res) => {
    try {
        const { search, status } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'insensitive' } },
                { email: { $regex: search, $options: 'insensitive' } },
                { phone: { $regex: search, $options: 'insensitive' } }
            ];
        }

        if (status && status !== 'All Status') {
            query.status = status;
        }

        const customers = await Customer.find(query).sort({ createdAt: -1 });
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// 2. ADD CUSTOMER (Save)
router.post('/', async (req, res) => {
    try {
        const newCustomer = new Customer(req.body);
        const savedCustomer = await newCustomer.save();
        res.status(201).json(savedCustomer);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// 3. UPDATE CUSTOMER (Edit)
router.put('/:id', async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customers-kan lama helin!' });
        }
        res.status(200).json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// 4. DELETE CUSTOMER
router.delete('/:id', async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Customer-ka waa la tirtiray' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

module.exports = router;