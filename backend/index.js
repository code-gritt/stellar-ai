const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const jwt = require('jsonwebtoken');
const schema = require('./schema');
const resolvers = require('./resolvers');
const { migrate, pool } = require('./db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY =
  process.env.JWT_SECRET ||
  '114c01757683f6f56304dcc3b9ab54a9f5113bd157363610f1ef882a9a650799b10ce2a55096e3120bdf7c60be5fb6e46c2e337c6ac06acc86ca68fa2aa0afe3';

app.use(express.json());

// Middleware for auth
const authMiddleware = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return {};
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    console.error('Auth middleware error:', err.message, err.stack);
    return {};
  }
};

app.use(
  '/graphql',
  graphqlHTTP(async (req) => ({
    schema,
    rootValue: resolvers,
    context: authMiddleware(req),
    graphiql: true,
  })),
);

// Migrate on start
migrate().catch((err) => {
  console.error('Startup migration failed:', err.message, err.stack);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/graphql`);
});
