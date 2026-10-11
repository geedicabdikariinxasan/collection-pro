const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Pending', 'Inactive'], default: 'Active' },
    joinDate: { type: String, required: true },
    image: { type: String, required: true },
    orders: { type: Number, default: 0 },
    spent: { type: Number, default: 0 },
    rating: { type: Number, default: 5.0 },
    address: { type: String, default: 'Mogadishu, Somalia' }
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);