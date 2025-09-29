const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('./db');

const SECRET_KEY =
  process.env.JWT_SECRET ||
  '114c01757683f6f56304dcc3b9ab54a9f5113bd157363610f1ef882a9a650799b10ce2a55096e3120bdf7c60be5fb6e46c2e337c6ac06acc86ca68fa2aa0afe3';

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (!context.userId) throw new Error('Unauthorized');
      try {
        const { rows } = await pool.query(
          'SELECT id, email, role, credits, created_at FROM users WHERE id = $1',
          [context.userId],
        );
        const user = rows[0];
        if (!user) throw new Error('User not found');
        return {
          ...user,
          created_at: user.created_at.toISOString(),
        };
      } catch (err) {
        console.error('Me query error:', err.message, err.stack);
        throw new Error('Failed to fetch user');
      }
    },
  },
  Mutation: {
    register: async (_, { email, password }) => {
      try {
        // Check for existing user
        const existing = await pool.query(
          'SELECT id FROM users WHERE email = $1',
          [email],
        );
        if (existing.rows.length > 0) {
          throw new Error('Email already registered');
        }

        // Hash password
        const hashed = await bcrypt.hash(password, 10);

        // Insert user with all required fields
        const { rows } = await pool.query(
          'INSERT INTO users (email, password_hash, role, credits, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id, email, role, credits, created_at',
          [email, hashed, 'user', 100],
        );

        const user = rows[0];
        if (!user) {
          console.error('Register: No user returned from INSERT');
          throw new Error('Failed to create user');
        }

        // Generate JWT
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
          expiresIn: '1h',
        });

        return {
          token,
          user: {
            ...user,
            created_at: user.created_at.toISOString(),
          },
        };
      } catch (err) {
        console.error('Register error:', err.message, err.stack);
        throw new Error(err.message || 'Registration failed');
      }
    },
    login: async (_, { email, password }) => {
      try {
        const { rows } = await pool.query(
          'SELECT id, email, role, credits, created_at, password_hash FROM users WHERE email = $1',
          [email],
        );
        const user = rows[0];
        if (!user) throw new Error('Invalid credentials');

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) throw new Error('Invalid credentials');

        const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
          expiresIn: '1h',
        });

        return {
          token,
          user: {
            ...user,
            created_at: user.created_at.toISOString(),
          },
        };
      } catch (err) {
        console.error('Login error:', err.message, err.stack);
        throw new Error('Invalid credentials');
      }
    },
  },
};

module.exports = resolvers;
