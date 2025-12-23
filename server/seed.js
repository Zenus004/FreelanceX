require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Job = require('./src/models/Job');
const connectDB = require('./src/config/db');

const seedData = async () => {
    await connectDB();

    await User.deleteMany({});
    await Job.deleteMany({});

    const client = await User.create({
        name: 'John Client',
        email: 'client@example.com',
        password: 'password123',
        role: 'client',
        balance: 1000
    });

    const freelancer = await User.create({
        name: 'Jane Freelancer',
        email: 'freelancer@example.com',
        password: 'password123',
        role: 'freelancer',
        profile: {
            bio: 'Expert React Developer',
            skills: ['React', 'Node.js'],
            rating: 4.8
        }
    });

    const admin = await User.create({
        name: 'Super Admin',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin'
    });

    await Job.create({
        title: 'Build a React E-commerce Site',
        description: 'Need a full-stack developer to build a shop.',
        budget: { min: 500, max: 1000 },
        skills: ['React', 'Node.js'],
        category: 'Web Development',
        client: client._id
    });

    console.log('Data Seeded!');
    process.exit();
};

seedData();
