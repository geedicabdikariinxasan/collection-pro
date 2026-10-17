const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Import-yada oo dhan
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/ProductRoutes');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes'); 

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Routes Setup - Midkasta hal mar ayaa loo yeeray
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/users', userRoutes); 

// Kahortagga Error 404 ee Invoices-ka
app.get('/api/invoices', (req, res) => {
    res.status(200).json([]);
});

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(() => {
    console.log('MongoDB Connected Successfully!');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error('Database connection error:', err);
});