const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const { pool } = require('../db');

const router = express.Router();
const SECRET_KEY =
  process.env.JWT_SECRET ||
  '114c01757683f6f56304dcc3b9ab54a9f5113bd157363610f1ef882a9a650799b10ce2a55096e3120bdf7c60be5fb6e46c2e337c6ac06acc86ca68fa2aa0afe3';
const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ||
  '150796695993-5togdmplcbuvffvme7k1l9s86bnbq0bb.apps.googleusercontent.com';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// POST /api/auth/register (unchanged)
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [
      email,
    ]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      'INSERT INTO users (email, password_hash, role, credits, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id, email, role, credits, created_at',
      [email, hashed, 'user', 100],
    );

    const user = rows[0];
    if (!user) {
      console.error('Register: No user returned from INSERT');
      return res.status(500).json({ error: 'Failed to create user' });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: '1h',
    });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        credits: user.credits,
        created_at: user.created_at.toISOString(),
      },
    });
  } catch (err) {
    console.error('Register error:', err.message, err.stack);
    res.status(500).json({ error: err.message || 'Registration failed' });
  }
});

// POST /api/auth/login (unchanged)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { rows } = await pool.query(
      'SELECT id, email, role, credits, created_at, password_hash FROM users WHERE email = $1',
      [email],
    );
    const user = rows[0];
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: '1h',
    });

    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        credits: user.credits,
        created_at: user.created_at.toISOString(),
      },
    });
  } catch (err) {
    console.error('Login error:', err.message, err.stack);
    res.status(500).json({ error: 'Login failed' });
  }
});

// GET /api/auth/me (unchanged)
router.get('/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { rows } = await pool.query(
      'SELECT id, email, role, credits, created_at FROM users WHERE id = $1',
      [decoded.userId],
    );
    const user = rows[0];
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      id: user.id,
      email: user.email,
      role: user.role,
      credits: user.credits,
      created_at: user.created_at.toISOString(),
    });
  } catch (err) {
    console.error('Me error:', err.message, err.stack);
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
});

// POST /api/auth/google
router.post('/google', async (req, res) => {
  const { token } = req.body;
  try {
    if (!token) {
      return res.status(400).json({ error: 'Google token required' });
    }

    if (!GOOGLE_CLIENT_ID) {
      console.error('Google auth error: GOOGLE_CLIENT_ID not set');
      return res.status(500).json({
        error: 'Server configuration error: Missing Google Client ID',
      });
    }

    // Verify Google ID token
    let payload;
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } catch (err) {
      console.error(
        'Google token verification failed:',
        err.message,
        err.stack,
      );
      return res
        .status(400)
        .json({ error: 'Invalid Google token: Verification failed' });
    }

    const email = payload?.email;
    if (!email) {
      console.error('Google auth error: No email in token payload', payload);
      return res
        .status(400)
        .json({ error: 'Invalid Google token: No email found' });
    }

    // Check if user exists
    let { rows } = await pool.query(
      'SELECT id, email, role, credits, created_at FROM users WHERE email = $1',
      [email],
    );
    let user = rows[0];

    if (!user) {
      // Create new user without password (Google OAuth users)
      try {
        const { rows: newRows } = await pool.query(
          'INSERT INTO users (email, role, credits, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id, email, role, credits, created_at',
          [email, 'user', 100],
        );
        user = newRows[0];
      } catch (err) {
        console.error(
          'Google auth error: Failed to create user:',
          err.message,
          err.stack,
        );
        return res
          .status(500)
          .json({ error: 'Failed to create user in database' });
      }
    }

    if (!user) {
      console.error('Google auth error: No user created or found');
      return res.status(500).json({ error: 'Failed to process Google login' });
    }

    // Generate JWT
    const jwtToken = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: '1h',
    });

    res.status(200).json({
      token: jwtToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        credits: user.credits,
        created_at: user.created_at.toISOString(),
      },
    });
  } catch (err) {
    console.error('Google auth error:', err.message, err.stack);
    res.status(500).json({
      error: `Google authentication failed: ${err.message || 'Unknown error'}`,
    });
  }
});

module.exports = router;
