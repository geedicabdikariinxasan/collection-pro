const dns = require('node:dns');
// Ku qasbi Node.js inuu isticmaalo Google DNS si uusan DNS-ka laptop-kaagu u diidin SRV-ka
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes'); // <-- Waxaa la soo geliyay Product Routes-ka
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');


dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); // <-- Halkan waxaa lagu xiray API-ga Products-ka
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
// Database Connection & Server Running
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