const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: "+252 61 0000000" },
    role: { type: String, default: 'Customer' }, // Laga dhigay flexible si aysan enum u xannibin
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    image: { type: String, default: "https://i.pravatar.cc/150?img=47" },
    joinDate: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;