const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false // Don't return password by default
    },
    role: {
        type: String,
        enum: ['client', 'freelancer', 'admin'],
        default: 'client'
    },
    status: {
        type: String,
        enum: ['active', 'banned'],
        default: 'active'
    },
    profile: {
        bio: String,
        title: String, // e.g. "Senior React Developer"
        location: String,
        skills: [String],
        portfolio: [{
            title: String,
            description: String,
            image: String, // URL
            link: String
        }],
        hourlyRate: Number,
        companyName: String,
        companyWebsite: String,
        companyDescription: String,
        rating: {
            type: Number,
            default: 0
        },
        reviewCount: {
            type: Number,
            default: 0
        }
    },
    balance: {
        type: Number,
        default: 0
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {
    timestamps: true
});

// Encrypt password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password reset token
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = require('crypto').randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = require('crypto')
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Set expire (10 minutes)
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
