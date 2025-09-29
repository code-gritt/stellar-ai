const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const schema = require('./schema');
const resolvers = require('./resolvers');
const { migrate } = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY =
  process.env.JWT_SECRET ||
  '114c01757683f6f56304dcc3b9ab54a9f5113bd157363610f1ef882a9a650799b10ce2a55096e3120bdf7c60be5fb6e46c2e337c6ac06acc86ca68fa2aa0afe3';

// Auth middleware
function authMiddleware(req) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return {};
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return {};
  }
}

app.use(
  '/graphql',
  graphqlHTTP((req) => ({
    schema,
    rootValue: resolvers,
    context: authMiddleware(req),
    graphiql: true,
  })),
);

// Run migrations
migrate().catch((err) => {
  console.error('❌ Migration failed:', err.message);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
});
