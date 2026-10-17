const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Middleware & CORS oo si sax ah u oggolaanaya Vercel iyo Localhost
app.use(cors({
  origin: "*", // Waxaad u bedeli kartaa link-gaaga Vercel hadhow haddii loo baahdo
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));

app.use(express.json());

// Routes Imports (Magacyada faylashaadu siday u kala qoran yihiin ayay u qoran yihiin halkan)
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/ProductRoutes');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const salesRoutes = require('./routes/salesRoutes');
const userRoutes = require('./routes/userRoutes');

// Routes Setup
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/sales', salesRoutes);

// Kudar khadkan muhiimka ah:
const userRoutes = require('./routes/userRoutes'); 
app.use('/api/users', userRoutes); // API-ga users halkan ayuu ka shaqaynayaa

// Kudar kan si aad 404 u baabi'iso
app.get('/api/invoices', (req, res) => {
    res.status(200).json([]);
});

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