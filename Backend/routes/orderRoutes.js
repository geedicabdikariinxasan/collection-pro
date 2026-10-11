const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const Customer = require('../models/Customer');

// 1. GET ALL ORDERS (Soo bandhigida orders-ka iyo xogtooda xiran)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('customer', 'name email phone image city') // Xogta Customer
            .populate('items.product', 'name price image category') // Xogta Product
            .sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// 2. CREATE ORDER (Abuurista Order cusub oo xiriirinaya Customer iyo Products)
router.post('/', async (req, res) => {
    try {
        const { customerId, items, paymentMethod } = req.body; 
        // items waa array tusaale: [{ productId: '...', quantity: 2 }]

        let totalAmount = 0;
        let formattedItems = [];

        for (let item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product-ga lama helin!` });
            }

            // Hubi in stock-gu ku filanyahay
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Badeecada ${product.name} stock-geedu wuu ka yar yahay inta la dalbaday!` });
            }

            // Ka jar stock-ga
            product.stock -= item.quantity;
            await product.save();

            totalAmount += product.price * item.quantity;
            formattedItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });
        }

        const newOrder = new Order({
            customer: customerId,
            items: formattedItems,
            totalAmount,
            paymentMethod: paymentMethod || 'Mobile Money'
        });

        const savedOrder = await newOrder.save();
        
        // Kusoo dar customer-ka tirada orders-ka uu sameeyay
        await Customer.findByIdAndUpdate(customerId, { $inc: { orders: 1, spent: totalAmount } });

        const populatedOrder = await Order.findById(savedOrder._id)
            .populate('customer', 'name email phone image city')
            .populate('items.product', 'name price image category');

        res.status(201).json(populatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// 3. DELETE / CANCEL ORDER
router.delete('/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Order-ka waa la tirtiray' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});
// GET ALL ORDERS FOR INVOICES
router.get('/invoices-list', async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('customer', 'name email phone image city')
            .populate('items.product', 'name price image')
            .sort({ createdAt: -1 });
            
        // U beddel qaab Invoice ah
        const invoicesFormatted = orders.map((ord, idx) => ({
            id: `INV-${String(idx + 1).padStart(3, "0")}`,
            orderId: ord._id.toString().slice(-6),
            customerName: ord.customer?.name || "Macmiil",
            customerEmail: ord.customer?.email || "N/A",
            customerPhone: ord.customer?.phone || "N/A",
            customerImage: ord.customer?.image || "https://i.pravatar.cc/150?img=47",
            date: ord.createdAt.toISOString().split('T')[0],
            totalAmount: ord.totalAmount,
            status: ord.status === "Paid" ? "Paid" : "Unpaid",
            items: ord.items.map(i => ({
                name: i.product?.name || "Badeecad",
                price: i.price,
                qty: i.quantity,
                image: i.product?.image
            }))
        }));

        res.status(200).json(invoicesFormatted);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

module.exports = router;