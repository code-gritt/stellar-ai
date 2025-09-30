const express = require('express');
const jwt = require('jsonwebtoken');
const { pool } = require('../db');

const router = express.Router();
const SECRET_KEY =
  process.env.JWT_SECRET ||
  '114c01757683f6f56304dcc3b9ab54a9f5113bd157363610f1ef882a9a650799b10ce2a55096e3120bdf7c60be5fb6e46c2e337c6ac06acc86ca68fa2aa0afe3';

// Middleware to extract userId from JWT
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error('Auth error:', err.message, err.stack);
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

// GET /api/forms - List user's forms
router.get('/', authenticate, async (req, res) => {
  const { userId } = req;
  try {
    const { rows } = await pool.query(
      'SELECT id, title as activity_name, created_at as timestamp FROM forms WHERE user_id = $1 ORDER BY created_at DESC',
      [userId],
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error('Get forms error:', err.message, err.stack);
    res.status(500).json({ error: 'Failed to fetch forms' });
  }
});

// POST /api/forms - Create form
router.post('/', authenticate, async (req, res) => {
  const { userId } = req;
  const { title, schema_json } = req.body;
  try {
    if (!title || !schema_json) {
      return res.status(400).json({ error: 'Title and schema_json required' });
    }
    const { rows } = await pool.query(
      'INSERT INTO forms (user_id, title, schema_json, updated_at) VALUES ($1, $2, $3, NOW()) RETURNING id, title as activity_name, created_at as timestamp',
      [userId, title, schema_json],
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Create form error:', err.message, err.stack);
    res.status(500).json({ error: 'Failed to create form' });
  }
});

// PUT /api/forms/:id - Update form
router.put('/:id', authenticate, async (req, res) => {
  const { userId } = req;
  const { id } = req.params;
  const { title, schema_json } = req.body;
  try {
    if (!title || !schema_json) {
      return res.status(400).json({ error: 'Title and schema_json required' });
    }
    const { rows } = await pool.query(
      'UPDATE forms SET title = $1, schema_json = $2, updated_at = NOW() WHERE id = $3 AND user_id = $4 RETURNING id, title as activity_name, created_at as timestamp',
      [title, schema_json, id, userId],
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Update form error:', err.message, err.stack);
    res.status(500).json({ error: 'Failed to update form' });
  }
});

// DELETE /api/forms/:id - Delete form
router.delete('/:id', authenticate, async (req, res) => {
  const { userId } = req;
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      'DELETE FROM forms WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, userId],
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.status(200).json({ message: 'Form deleted' });
  } catch (err) {
    console.error('Delete form error:', err.message, err.stack);
    res.status(500).json({ error: 'Failed to delete form' });
  }
});

module.exports = router;
