
require('dotenv').config();

const express = require('express');
const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

const mongoose = require('mongoose');
const cors = require('cors');
const methodOverride = require('method-override');

// Initialize App
const app = express();

// Allowed Frontend Origins
const allowedOrigins = [
    'http://localhost:5173',
    'https://shared-mate.vercel.app'
];

// CORS Configuration
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Database Connection
async function main() {
    await mongoose.connect(process.env.MONGO_URI);
}

main()
    .then(() => console.log('Database Connection Successful'))
    .catch((err) => {
        console.log('Database Connection Error:', err.message);
    });

// Middleware
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
```