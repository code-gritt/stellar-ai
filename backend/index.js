const express = require('express');
const cors = require('cors');
const { migrate } = require('./db');
const authRoutes = require('./routes/auth');
const formsRoutes = require('./routes/forms');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://stellar-ai-gold.vercel.app',
  'https://accounts.google.com', // For Google OAuth
];

// CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

// Body parser
app.use(express.json());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/forms', formsRoutes);

// Health check endpoint
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

// Run migrations on startup
migrate().catch((err) => {
  console.error('Startup migration failed:', err.message, err.stack);
  process.exit(1);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
