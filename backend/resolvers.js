const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('./db');

const SECRET_KEY =
  process.env.JWT_SECRET ||
  '114c01757683f6f56304dcc3b9ab54a9f5113bd157363610f1ef882a9a650799b10ce2a55096e3120bdf7c60be5fb6e46c2e337c6ac06acc86ca68fa2aa0afe3'; // secure in production

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (!context.userId) throw new Error('Unauthorized');

      const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [
        context.userId,
      ]);

      const user = rows[0];
      if (!user) throw new Error('User not found');

      return {
        ...user,
        created_at: user.created_at.toISOString(),
      };
    },
  },

  Mutation: {
    register: async (_, { email, password }) => {
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

      // Insert user
      const { rows } = await pool.query(
        `INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *`,
        [email, hashed],
      );

      const user = rows[0];
      if (!user) throw new Error('Failed to create user');

      // JWT
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
    },

    login: async (_, { email, password }) => {
      const { rows } = await pool.query(
        'SELECT * FROM users WHERE email = $1',
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
    },
  },
};

module.exports = resolvers;
