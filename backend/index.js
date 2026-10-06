
require('dotenv').config();

const express = require('express');
const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

const mongoose = require('mongoose');
const cors = require('cors');
const methodOverride = require('method-override');

// Initialize App
const app = express();

// Database Connection
async function main() {
    await mongoose.connect(process.env.MONGO_URI);
}

main()
    .then(() => console.log('Database Connection Successful'))
    .catch((err) => console.log('Database Connection Error:', err.message));

// Middleware
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allowed Frontend Origins
const allowedOrigins = [
    'http://localhost:5173'
];

// CORS Configuration
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Handle CORS preflight requests
app.options(/.*/, cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Routers
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const tripRoutes = require('./routes/trips');
const notificationRoutes = require('./routes/notifications');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/notifications', notificationRoutes);

// Health Check Routes
app.get('/', (req, res) => {
    res.send('SharedMate Backend is Running!');
});

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Start Server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`SharedMate Server is Listening on Port ${PORT}`);
});
