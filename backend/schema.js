const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type User {
    id: ID!
    email: String!
    role: String!
    credits: Int!
    created_at: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User!
  }

  type Mutation {
    register(email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`);

module.exports = schema;
