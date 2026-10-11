const cors = require('cors');

// Ku dar koodhkan intaanay routes-ku bilaabbin:
app.use(cors({
  origin: [
    'https://magaca-frontend-kaaga.vercel.app', // Halkaan geli URL-ka saxda ah ee Vercel
    'http://localhost:3000'                      // Localhost-ka tijaabada
  ],
  credentials: true
}));

const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Waa inaan magacyadan la jaanqaadnaa faylashaada GitHub (Xaraf weyn hadduu yahay, xaraf weyn isticmaal)
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/ProductRoutes'); // Faylkaaga GitHub P ayuu ku bilaabmaa
const customerRoutes = require('./routes/customerRoutes'); // Faylkaaga GitHub c ayuu ku bilaabmaa
const orderRoutes = require('./routes/orderRoutes');     // Faylkaaga GitHub o ayuu ku bilaabmaa

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);

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