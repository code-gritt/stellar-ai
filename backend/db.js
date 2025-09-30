const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://neondb_owner:npg_KOCa9MuoQiS7@ep-bold-glitter-aeaonyue-pooler.c-2.us-east-2.aws.neon.tech/stellar-database?sslmode=require&channel_binding=require',
  ssl: { rejectUnauthorized: false }, // Neon requires SSL
});

async function migrate() {
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255),
        role VARCHAR(50) DEFAULT 'user' NOT NULL,
        credits INTEGER DEFAULT 100 NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create forms table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS forms (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        schema_json TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Migration completed: users and forms tables ready.');
  } catch (err) {
    console.error('Migration error:', err.message, err.stack);
    throw err;
  }
}

module.exports = { pool, migrate };
